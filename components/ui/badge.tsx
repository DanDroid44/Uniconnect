import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Role-specific badges
        student: "border-transparent bg-green-100 text-green-700 hover:bg-green-200",
        lecturer: "border-transparent bg-blue-100 text-blue-700 hover:bg-blue-200",
        coordinator: "border-transparent bg-violet-100 text-violet-700 hover:bg-violet-200",
        // Status badges
        success: "border-transparent bg-green-100 text-green-700 hover:bg-green-200",
        warning: "border-transparent bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
        info: "border-transparent bg-blue-100 text-blue-700 hover:bg-blue-200",
        // Priority badges
        high: "border-transparent bg-red-100 text-red-700 hover:bg-red-200",
        medium: "border-transparent bg-orange-100 text-orange-700 hover:bg-orange-200",
        low: "border-transparent bg-gray-100 text-gray-700 hover:bg-gray-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
