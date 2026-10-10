import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { createContactDirectory } from "@/lib/newsletter/contacts"

type ContactsApi = Parameters<typeof createContactDirectory>[0]

const email = "sara@example.com"
const topicId = "topic_1"

const ok = <T>(data: T) => ({ data, error: null, headers: null })

const failure = (name: string) => ({
  data: null,
  error: { name, message: "failed", statusCode: 500 },
  headers: null,
})

type FakeOptions = {
  existing?: boolean
  memberOf?: string[]
  getFailure?: string
  createFailure?: string
}

function createFakeContacts({
  existing = false,
  memberOf = [],
  getFailure,
  createFailure,
}: FakeOptions = {}) {
  const calls: [string, unknown][] = []

  const api = {
    async get(options: unknown) {
      calls.push(["get", options])

      if (getFailure) {
        return failure(getFailure)
      }

      return existing ? ok({ id: "contact_1", email }) : failure("not_found")
    },
    async create(options: unknown) {
      calls.push(["create", options])

      return createFailure ? failure(createFailure) : ok({ id: "contact_1" })
    },
    async update(options: unknown) {
      calls.push(["update", options])

      return ok({ id: "contact_1" })
    },
    segments: {
      async list(options: unknown) {
        calls.push(["segments.list", options])

        return ok({
          object: "list",
          has_more: false,
          data: memberOf.map((id) => ({ id })),
        })
      },
      async add(options: unknown) {
        calls.push(["segments.add", options])

        return ok({ id: "segment_link" })
      },
      async remove(options: unknown) {
        calls.push(["segments.remove", options])

        return ok({ id: "segment_link" })
      },
    },
    topics: {
      async update(options: unknown) {
        calls.push(["topics.update", options])

        return ok({ id: "contact_1" })
      },
    },
  }

  return { api: api as unknown as ContactsApi, calls }
}

function directoryFor(
  options: FakeOptions,
  segmentByLocale = { pt: "seg_pt", en: "seg_en" }
) {
  const fake = createFakeContacts(options)
  const directory = createContactDirectory(fake.api, {
    topicId,
    segmentByLocale,
  })

  return { directory, calls: fake.calls }
}

const names = (calls: [string, unknown][]) => calls.map(([name]) => name)

describe("contact directory", () => {
  it("creates a new contact in the locale segment and the topic", async () => {
    const { directory, calls } = directoryFor({})

    await directory.subscribe({ email, locale: "pt" })

    assert.deepEqual(calls, [
      ["get", { email }],
      [
        "create",
        {
          email,
          unsubscribed: false,
          segments: [{ id: "seg_pt" }],
          topics: [{ id: topicId, subscription: "opt_in" }],
        },
      ],
    ])
  })

  it("resubscribes an existing contact without touching its segments", async () => {
    const { directory, calls } = directoryFor({
      existing: true,
      memberOf: ["seg_pt"],
    })

    await directory.subscribe({ email, locale: "pt" })

    assert.deepEqual(names(calls), [
      "get",
      "update",
      "segments.list",
      "topics.update",
    ])
    assert.deepEqual(calls[1], ["update", { email, unsubscribed: false }])
    assert.deepEqual(calls[3], [
      "topics.update",
      { email, topics: [{ id: topicId, subscription: "opt_in" }] },
    ])
  })

  it("moves a contact from the other locale segment to the chosen one", async () => {
    const { directory, calls } = directoryFor({
      existing: true,
      memberOf: ["seg_en"],
    })

    await directory.subscribe({ email, locale: "pt" })

    assert.deepEqual(names(calls), [
      "get",
      "update",
      "segments.list",
      "segments.add",
      "segments.remove",
      "topics.update",
    ])
    assert.deepEqual(calls[3], ["segments.add", { email, segmentId: "seg_pt" }])
    assert.deepEqual(calls[4], [
      "segments.remove",
      { email, segmentId: "seg_en" },
    ])
  })

  it("never removes the chosen segment when both locales share it", async () => {
    const { directory, calls } = directoryFor(
      { existing: true, memberOf: ["seg_all"] },
      { pt: "seg_all", en: "seg_all" }
    )

    await directory.subscribe({ email, locale: "en" })

    assert.deepEqual(names(calls), [
      "get",
      "update",
      "segments.list",
      "topics.update",
    ])
  })

  it("fails when looking up the contact errors for another reason", async () => {
    const { directory } = directoryFor({ getFailure: "internal_server_error" })

    await assert.rejects(
      directory.subscribe({ email, locale: "pt" }),
      /get contact.*internal_server_error/
    )
  })

  it("fails without leaking the address when creation errors", async () => {
    const { directory } = directoryFor({ createFailure: "validation_error" })

    await assert.rejects(
      directory.subscribe({ email, locale: "pt" }),
      (error: Error) =>
        /create contact.*validation_error/.test(error.message) &&
        !error.message.includes(email)
    )
  })
})
