"use client"

import { useId, useRef, useState, type KeyboardEvent } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowDown01Icon, Tick02Icon } from "@hugeicons/core-free-icons"

import { controlClassName } from "@/components/form-card"
import { matchByPrefix, nextIndex } from "@/lib/ui/listbox"
import { cn } from "@/lib/utils"

const TYPEAHEAD_RESET_MS = 500

const PANEL_RADIUS = "rounded-2xl"
const PANEL_PADDING = "p-1.5"
const OPTION_RADIUS = "rounded-[calc(1rem-0.375rem)]"

const navigationKeys = [
  "ArrowDown",
  "ArrowUp",
  "Home",
  "End",
  "PageDown",
  "PageUp",
]

type SelectOption = { value: string; label: string }

type SelectFieldProps = {
  id: string
  name: string
  labelId: string
  options: SelectOption[]
  placeholder: string
  defaultValue?: string
  invalid?: boolean
  describedBy?: string
}

function SelectField({
  id,
  name,
  labelId,
  options,
  placeholder,
  defaultValue = "",
  invalid = false,
  describedBy,
}: SelectFieldProps) {
  const listboxId = useId()
  const [value, setValue] = useState(defaultValue)
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const typeahead = useRef({ query: "", timer: 0 })

  const selectedIndex = options.findIndex((option) => option.value === value)
  const selected = options[selectedIndex]
  const optionId = (index: number) => `${listboxId}-option-${index}`

  function openList(index = selectedIndex) {
    setActiveIndex(Math.max(index, 0))
    setOpen(true)
  }

  function commit(index: number) {
    const option = options[index]

    if (option) {
      setValue(option.value)
    }

    setOpen(false)
  }

  function search(key: string) {
    const state = typeahead.current
    const labels = options.map((option) => option.label)

    window.clearTimeout(state.timer)
    state.query += key
    state.timer = window.setTimeout(() => {
      state.query = ""
    }, TYPEAHEAD_RESET_MS)

    const { query } = state

    if (open) {
      setActiveIndex((current) => {
        const match = matchByPrefix(labels, query, current)

        return match === -1 ? current : match
      })
      return
    }

    setValue((current) => {
      const from = options.findIndex((option) => option.value === current)
      const match = matchByPrefix(labels, query, from)

      return match === -1 ? current : options[match].value
    })
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const { key } = event

    if (!open) {
      if (
        key === "ArrowDown" ||
        key === "ArrowUp" ||
        key === "Enter" ||
        key === " "
      ) {
        event.preventDefault()
        openList()
        return
      }

      if (key === "Home" || key === "End") {
        event.preventDefault()
        openList(nextIndex(key, selectedIndex, options.length))
        return
      }
    } else {
      if (navigationKeys.includes(key)) {
        event.preventDefault()
        setActiveIndex((current) => nextIndex(key, current, options.length))
        return
      }

      if (key === "Enter" || key === " ") {
        event.preventDefault()
        commit(activeIndex)
        return
      }

      if (key === "Escape") {
        event.preventDefault()
        setOpen(false)
        return
      }

      if (key === "Tab") {
        commit(activeIndex)
        return
      }
    }

    const isCharacter =
      key.length === 1 &&
      key !== " " &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.altKey

    if (isCharacter) {
      search(key)
    }
  }

  return (
    <div className="relative">
      <input type="hidden" name={name} value={value} />

      <div
        id={id}
        role="combobox"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-labelledby={labelId}
        aria-activedescendant={
          open && activeIndex >= 0 ? optionId(activeIndex) : undefined
        }
        aria-required="true"
        aria-invalid={invalid ? true : undefined}
        aria-describedby={describedBy}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={handleKeyDown}
        onBlur={() => setOpen(false)}
        className={cn(
          controlClassName,
          "flex h-12 cursor-pointer items-center justify-between gap-3 select-none",
          selected ? "text-ink" : "text-ink/60"
        )}
      >
        <span className="truncate">
          {selected ? selected.label : placeholder}
        </span>
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          size={20}
          strokeWidth={2}
          className={cn(
            "shrink-0 text-ink transition-transform duration-200 motion-reduce:transition-none",
            open ? "rotate-180" : "rotate-0"
          )}
        />
      </div>

      {open ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={labelId}
          onMouseDown={(event) => event.preventDefault()}
          className={cn(
            PANEL_RADIUS,
            PANEL_PADDING,
            "absolute top-full right-0 left-0 z-20 mt-2 max-h-72 overflow-auto bg-paper shadow-xl ring-1 shadow-ink/30 ring-ink/10 transition-[opacity,translate] duration-150 motion-reduce:transition-none starting:-translate-y-1 starting:opacity-0"
          )}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value

            return (
              <li
                key={option.value}
                id={optionId(index)}
                role="option"
                aria-selected={isSelected}
                onClick={() => commit(index)}
                onMouseMove={() => setActiveIndex(index)}
                className={cn(
                  OPTION_RADIUS,
                  "flex cursor-pointer items-center justify-between gap-3 px-3.5 py-3 text-base text-ink",
                  index === activeIndex ? "bg-ink/10" : "bg-transparent",
                  isSelected ? "font-semibold" : "font-normal"
                )}
              >
                {option.label}
                {isSelected ? (
                  <HugeiconsIcon
                    icon={Tick02Icon}
                    size={18}
                    strokeWidth={2.2}
                    className="shrink-0"
                  />
                ) : null}
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}

export { SelectField }
export type { SelectOption }
