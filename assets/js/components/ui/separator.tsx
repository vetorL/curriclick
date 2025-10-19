import * as React from "react"

import { cn } from "../../lib/utils"

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Separator({ className, ...props }: SeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn("-mx-6 my-4 h-px w-auto bg-border", className)}
      {...props}
    />
  )
}
