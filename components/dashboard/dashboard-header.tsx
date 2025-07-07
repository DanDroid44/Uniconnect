"use client"

import { useState } from "react"
import { Bell, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LanguageSwitcher } from "@/components/language-switcher"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

const announcements = [
  {
    id: 1,
    title: "Important update on final exam schedule",
    content:
      "The final exam schedule has been updated. Please check your student portal for the latest information and make note of any changes to your exam dates and times.",
    priority: "high",
    author: "Academic Affairs",
    time: "1h ago",
    read: false,
  },
  {
    id: 2,
    title: "Library hours extended for exam week",
    content:
      "The library will be open 24/7 during exam week (March 15-22) to support student studies. Additional study spaces have been made available.",
    priority: "medium",
    author: "Library Services",
    time: "3h ago",
    read: false,
  },
  {
    id: 3,
    title: "New course registration opens next week",
    content:
      "Course registration for the Fall 2025 semester will open on Monday, March 10th at 8:00 AM. Prepare your course selections in advance.",
    priority: "medium",
    author: "Registrar's Office",
    time: "1d ago",
    read: true,
  },
  {
    id: 4,
    title: "Campus maintenance scheduled",
    content: "Scheduled maintenance will occur in Building A this weekend. Some areas may be temporarily inaccessible.",
    priority: "low",
    author: "Facilities Management",
    time: "2d ago",
    read: true,
  },
  {
    id: 5,
    title: "Student health services update",
    content:
      "The student health center has extended hours during exam period. Mental health counseling is also available.",
    priority: "medium",
    author: "Health Services",
    time: "3d ago",
    read: true,
  },
]

export function DashboardHeader() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const unreadCount = announcements.filter((a) => !a.read).length

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50"
      case "medium":
        return "border-l-yellow-500 bg-yellow-50"
      case "low":
        return "border-l-blue-500 bg-blue-50"
      default:
        return "border-l-gray-500 bg-gray-50"
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return <Badge variant="secondary">Medium</Badge>
      case "low":
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div className="flex items-center space-x-4">
        <SidebarTrigger className="md:hidden" />
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span className="font-medium text-blue-600">UC</span>
          <ChevronRight className="h-4 w-4" />
          <span>Dashboard</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <LanguageSwitcher />

        <Sheet open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Announcements</SheetTitle>
              <SheetDescription>Stay updated with the latest announcements and notifications</SheetDescription>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-120px)] mt-6">
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className={`p-4 rounded-lg border-l-4 ${getPriorityColor(announcement.priority)} ${
                      !announcement.read ? "ring-2 ring-blue-100" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 pr-2">{announcement.title}</h4>
                      {getPriorityBadge(announcement.priority)}
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{announcement.content}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{announcement.author}</span>
                      <span>{announcement.time}</span>
                    </div>
                    {!announcement.read && (
                      <div className="mt-2">
                        <Badge variant="outline" className="text-xs">
                          New
                        </Badge>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>DD</AvatarFallback>
              </Avatar>
              <span className="hidden md:block">DD</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
