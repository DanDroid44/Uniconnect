"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { NotificationSystem } from "./notification-system"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/hooks/use-language"
import { User, Settings, LogOut, HelpCircle, Moon, Sun, GraduationCap } from "lucide-react"

interface DashboardHeaderProps {
  user?: {
    name: string
    email: string
    role: string
    avatar?: string
  }
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const { t } = useLanguage()
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    // Here you would implement actual dark mode toggle
    document.documentElement.classList.toggle("dark")
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "student":
        return "text-green-600 bg-green-50"
      case "lecturer":
      case "coordinator":
        return "text-blue-600 bg-blue-50"
      case "admin":
        return "text-violet-600 bg-violet-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "student":
        return "Estudante"
      case "lecturer":
        return "Professor"
      case "coordinator":
        return "Coordenador"
      case "admin":
        return "Administrador"
      default:
        return role
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Left side - Sidebar trigger and logo */}
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="h-8 w-8 lg:hidden" />

          {/* Logo - visible on mobile when sidebar is collapsed */}
          <Link href="/dashboard" className="flex items-center space-x-2 lg:hidden">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              UniConnect
            </span>
          </Link>
        </div>

        {/* Center - Search (hidden on mobile) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">{/* Search functionality can be added here */}</div>

        {/* Right side - Actions and user menu */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Language Switcher */}
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          {/* Dark Mode Toggle */}
          <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="hidden sm:flex h-9 w-9">
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="sr-only">Toggle dark mode</span>
          </Button>

          {/* Notifications */}
          <NotificationSystem />

          {/* Help */}
          <Button variant="ghost" size="icon" className="hidden sm:flex h-9 w-9">
            <HelpCircle className="h-4 w-4" />
            <span className="sr-only">Help</span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "User"} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    {user?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "User"} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm">
                        {user?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name || "Usuário"}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email || "user@ust.ac.mz"}</p>
                    </div>
                  </div>
                  {user?.role && (
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getRoleColor(user.role)}`}
                    >
                      {getRoleLabel(user.role)}
                    </div>
                  )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Perfil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configurações</span>
                  </Link>
                </DropdownMenuItem>

                {/* Mobile-only items */}
                <div className="sm:hidden">
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={toggleDarkMode}>
                    {isDarkMode ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                    <span>{isDarkMode ? "Modo Claro" : "Modo Escuro"}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Ajuda</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
