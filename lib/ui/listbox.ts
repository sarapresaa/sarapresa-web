const PAGE_SIZE = 10

export function nextIndex(key: string, current: number, count: number) {
  if (count === 0) {
    return -1
  }

  const last = count - 1

  switch (key) {
    case "ArrowDown":
      return current < 0 ? 0 : Math.min(current + 1, last)
    case "ArrowUp":
      return current < 0 ? 0 : Math.max(current - 1, 0)
    case "Home":
      return 0
    case "End":
      return last
    case "PageDown":
      return current < 0 ? 0 : Math.min(current + PAGE_SIZE, last)
    case "PageUp":
      return Math.max(current - PAGE_SIZE, 0)
    default:
      return current
  }
}

function normalize(value: string) {
  return value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase()
}

export function matchByPrefix(labels: string[], query: string, from: number) {
  const needle = normalize(query)

  if (!needle || labels.length === 0) {
    return -1
  }

  const repeatsOneLetter = [...needle].every((char) => char === needle[0])
  const prefix = repeatsOneLetter ? needle[0] : needle
  const start = repeatsOneLetter ? from + 1 : Math.max(from, 0)

  for (let offset = 0; offset < labels.length; offset += 1) {
    const index = (start + offset) % labels.length

    if (normalize(labels[index]).startsWith(prefix)) {
      return index
    }
  }

  return -1
}
