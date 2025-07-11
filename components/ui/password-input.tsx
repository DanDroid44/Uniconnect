"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showPasswordLabel?: string
  hidePasswordLabel?: string
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, showPasswordLabel = "Show password", hidePasswordLabel = "Hide password", ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
      <div className="relative">
        <Input type={showPassword ? "text" : "password"} className={cn("pr-10", className)} ref={ref} {...props} />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? hidePasswordLabel : showPasswordLabel}
        >
          {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
        </Button>
      </div>
    )
  },
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
