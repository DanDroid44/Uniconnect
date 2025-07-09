import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Role-specific variants
        student: "bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500",
        "student-outline": "border border-green-600 text-green-600 hover:bg-green-50 focus-visible:ring-green-500",
        "student-ghost": "text-green-600 hover:bg-green-50 focus-visible:ring-green-500",
        lecturer: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500",
        "lecturer-outline": "border border-blue-600 text-blue-600 hover:bg-blue-50 focus-visible:ring-blue-500",
        "lecturer-ghost": "text-blue-600 hover:bg-blue-50 focus-visible:ring-blue-500",
        coordinator: "bg-violet-600 text-white hover:bg-violet-700 focus-visible:ring-violet-500",
        "coordinator-outline":
          "border border-violet-600 text-violet-600 hover:bg-violet-50 focus-visible:ring-violet-500",
        "coordinator-ghost": "text-violet-600 hover:bg-violet-50 focus-visible:ring-violet-500",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-md px-10",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
