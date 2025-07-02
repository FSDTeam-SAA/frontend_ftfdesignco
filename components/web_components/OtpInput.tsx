"use client"

import { useRef, type ChangeEvent, type KeyboardEvent } from "react"
import { Input } from "@/components/ui/input"

interface OtpInputProps {
  length: number
  value: string[]
  onChange: (value: string[]) => void
}

export function OtpInput({ length, value, onChange }: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = [...value]
    newValue[index] = e.target.value.slice(-1) // Take only the last character
    onChange(newValue)

    // Move focus to the next input if a digit is entered
    if (e.target.value && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move focus to the previous input on backspace if current is empty
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <div className="flex justify-center space-x-2">
      {Array.from({ length }).map((_, index) => (
        <Input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type="text"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-12 h-12 text-center text-lg font-bold"
          inputMode="numeric"
          pattern="[0-9]"
        />
      ))}
    </div>
  )
}
