"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    variant?: "default" | "student" | "lecturer" | "coordinator"
  }
>(({ className, value, variant = "default", ...props }, ref) => {
  const getIndicatorColor = () => {
    switch (variant) {
      case "student":
        return "bg-green-600"
      case "lecturer":
        return "bg-blue-600"
      case "coordinator":
        return "bg-violet-600"
      default:
        return "bg-primary"
    }
  }

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-secondary", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn("h-full w-full flex-1 transition-all", getIndicatorColor())}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
