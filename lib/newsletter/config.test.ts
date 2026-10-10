import assert from "node:assert/strict"
import { describe, it } from "node:test"

import {
  NewsletterConfigError,
  parseNewsletterConfig,
} from "@/lib/newsletter/config"
import { EMAIL } from "@/lib/seo"

const completeEnv = {
  RESEND_API_KEY: "re_test_key",
  NEWSLETTER_FROM: "Sara Presa <hello@news.example.com>",
  NEWSLETTER_TOPIC_ID: "topic_1",
  NEWSLETTER_SEGMENT_PT: "segment_pt",
  NEWSLETTER_SEGMENT_EN: "segment_en",
  NEWSLETTER_TOKEN_SECRET: "x".repeat(32),
}

describe("newsletter config", () => {
  it("maps the environment to a typed config", () => {
    assert.deepEqual(parseNewsletterConfig(completeEnv), {
      apiKey: "re_test_key",
      from: "Sara Presa <hello@news.example.com>",
      replyTo: EMAIL,
      topicId: "topic_1",
      tokenSecret: "x".repeat(32),
      segmentByLocale: { pt: "segment_pt", en: "segment_en" },
      testSegmentId: undefined,
    })
  })

  it("accepts an explicit reply-to and a test segment", () => {
    const config = parseNewsletterConfig({
      ...completeEnv,
      NEWSLETTER_REPLY_TO: "hello@example.com",
      NEWSLETTER_SEGMENT_TEST: "segment_test",
    })

    assert.equal(config.replyTo, "hello@example.com")
    assert.equal(config.testSegmentId, "segment_test")
  })

  it("names every missing variable", () => {
    assert.throws(
      () => parseNewsletterConfig({}),
      (error: Error) =>
        error instanceof NewsletterConfigError &&
        Object.keys(completeEnv).every((name) => error.message.includes(name))
    )
  })

  it("rejects a short token secret without echoing it", () => {
    const secret = "too-short-secret"

    assert.throws(
      () =>
        parseNewsletterConfig({ ...completeEnv, NEWSLETTER_TOKEN_SECRET: secret }),
      (error: Error) =>
        error.message.includes("NEWSLETTER_TOKEN_SECRET") &&
        !error.message.includes(secret)
    )
  })
})
