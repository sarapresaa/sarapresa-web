import type { Resend } from "resend"

import type { SubscriberDirectory } from "@/lib/newsletter/types"
import type { Locale } from "@/lib/seo"

type ContactsClient = Resend["contacts"]

export type ContactsApi = Pick<ContactsClient, "get" | "create" | "update"> & {
  segments: Pick<ContactsClient["segments"], "list" | "add" | "remove">
  topics: Pick<ContactsClient["topics"], "update">
}

type DirectoryIds = {
  topicId: string
  segmentByLocale: Record<Locale, string>
}

type Outcome<T> =
  { data: T; error: null } | { data: null; error: { name: string } }

function unwrap<T>(outcome: Outcome<T>, step: string): T {
  if (outcome.error) {
    throw new Error(`Resend ${step} failed: ${outcome.error.name}`)
  }

  return outcome.data
}

async function contactExists(api: ContactsApi, email: string) {
  const result = await api.get({ email })

  if (result.error?.name === "not_found") {
    return false
  }

  unwrap(result, "get contact")

  return true
}

async function moveToSegment(
  api: ContactsApi,
  email: string,
  segmentId: string,
  otherSegmentIds: string[]
) {
  const memberships = unwrap(
    await api.segments.list({ email }),
    "list contact segments"
  )
  const memberIds = new Set(memberships.data.map((segment) => segment.id))

  if (!memberIds.has(segmentId)) {
    unwrap(await api.segments.add({ email, segmentId }), "add contact segment")
  }

  for (const otherId of otherSegmentIds) {
    if (memberIds.has(otherId)) {
      unwrap(
        await api.segments.remove({ email, segmentId: otherId }),
        "remove contact segment"
      )
    }
  }
}

export function createContactDirectory(
  api: ContactsApi,
  ids: DirectoryIds
): SubscriberDirectory {
  const topics = [{ id: ids.topicId, subscription: "opt_in" as const }]

  return {
    async subscribe({ email, locale }) {
      const segmentId = ids.segmentByLocale[locale]
      const otherSegmentIds = [
        ...new Set(Object.values(ids.segmentByLocale)),
      ].filter((id) => id !== segmentId)

      if (!(await contactExists(api, email))) {
        unwrap(
          await api.create({
            email,
            unsubscribed: false,
            segments: [{ id: segmentId }],
            topics,
          }),
          "create contact"
        )
        return
      }

      unwrap(await api.update({ email, unsubscribed: false }), "update contact")
      await moveToSegment(api, email, segmentId, otherSegmentIds)
      unwrap(await api.topics.update({ email, topics }), "update topics")
    },
  }
}
