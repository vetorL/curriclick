import * as React from "react"

import { cn } from "../../lib/utils"

export interface SliderProps {
  defaultValue?: number[]
  max?: number
  step?: number
  className?: string
  onChange?: (value: number) => void
}

export function Slider({ defaultValue = [0], max = 100, step = 1, className, onChange }: SliderProps) {
  const [value, setValue] = React.useState<number>(defaultValue?.[0] ?? 0)

  return (
    <input
      type="range"
      min={0}
      max={max}
      step={step}
      value={value}
      onChange={(e) => {
        const v = Number(e.target.value)
        setValue(v)
        onChange?.(v)
      }}
      className={cn("w-full h-2 cursor-pointer appearance-none rounded bg-muted", className)}
    />
  )
}
