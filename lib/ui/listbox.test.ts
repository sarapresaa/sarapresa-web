import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { matchByPrefix, nextIndex } from "@/lib/ui/listbox"

describe("nextIndex", () => {
  it("moves down and up one option at a time", () => {
    assert.equal(nextIndex("ArrowDown", 1, 5), 2)
    assert.equal(nextIndex("ArrowUp", 3, 5), 2)
  })

  it("stops at the first and last option instead of wrapping", () => {
    assert.equal(nextIndex("ArrowDown", 4, 5), 4)
    assert.equal(nextIndex("ArrowUp", 0, 5), 0)
  })

  it("starts from the first option when nothing is active yet", () => {
    assert.equal(nextIndex("ArrowDown", -1, 5), 0)
    assert.equal(nextIndex("ArrowUp", -1, 5), 0)
  })

  it("jumps to the ends with Home and End", () => {
    assert.equal(nextIndex("Home", 3, 5), 0)
    assert.equal(nextIndex("End", 1, 5), 4)
  })

  it("moves ten options with PageUp and PageDown, clamped to the list", () => {
    assert.equal(nextIndex("PageDown", 2, 30), 12)
    assert.equal(nextIndex("PageUp", 15, 30), 5)
    assert.equal(nextIndex("PageDown", 2, 5), 4)
    assert.equal(nextIndex("PageUp", 2, 5), 0)
  })

  it("keeps the current option for keys it does not handle", () => {
    assert.equal(nextIndex("a", 2, 5), 2)
  })

  it("has no active option in an empty list", () => {
    assert.equal(nextIndex("ArrowDown", -1, 0), -1)
    assert.equal(nextIndex("End", -1, 0), -1)
  })
})

describe("matchByPrefix", () => {
  const labels = [
    "Estágio ou emprego",
    "Colaboração ou parceria",
    "Projeto web ou freelance",
    "Pergunta ou feedback",
    "Outro assunto",
  ]

  it("finds an option by the start of its label", () => {
    assert.equal(matchByPrefix(labels, "col", -1), 1)
  })

  it("ignores case and accents", () => {
    assert.equal(matchByPrefix(labels, "ESTAGIO", -1), 0)
    assert.equal(matchByPrefix(labels, "colaboracao", -1), 1)
  })

  it("matches only the start of the label", () => {
    assert.equal(matchByPrefix(labels, "emp", -1), -1)
  })

  it("returns -1 when nothing matches", () => {
    assert.equal(matchByPrefix(labels, "zzz", -1), -1)
  })

  it("cycles through options sharing a letter when it is repeated", () => {
    const similar = ["Projeto web", "Pergunta", "Parceria"]

    assert.equal(matchByPrefix(similar, "p", -1), 0)
    assert.equal(matchByPrefix(similar, "p", 0), 1)
    assert.equal(matchByPrefix(similar, "pp", 1), 2)
    assert.equal(matchByPrefix(similar, "p", 2), 0)
  })

  it("keeps the current option while a longer prefix still matches it", () => {
    const similar = ["Projeto web", "Projeto mobile", "Pergunta"]

    assert.equal(matchByPrefix(similar, "proj", 1), 1)
  })
})
