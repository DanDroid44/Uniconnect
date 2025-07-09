"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Bell,
  BellRing,
  Check,
  X,
  BookOpen,
  DollarSign,
  Settings,
  Users,
  AlertTriangle,
  Info,
  CheckCircle,
} from "lucide-react"

interface Notification {
  id: string
  type: "academic" | "financial" | "system" | "social"
  title: string
  message: string
  timestamp: string
  isRead: boolean
  priority: "low" | "medium" | "high"
  actionUrl?: string
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "academic",
    title: "Nova nota disponível",
    message: "Sua nota para o 2º teste de Programação I foi publicada: 16.5/20",
    timestamp: "2024-03-15T10:30:00Z",
    isRead: false,
    priority: "medium",
    actionUrl: "/dashboard/grades",
  },
  {
    id: "2",
    type: "academic",
    title: "Prazo de entrega próximo",
    message: "O trabalho de Algoritmos e Estruturas de Dados deve ser entregue até 20/03/2024",
    timestamp: "2024-03-15T09:15:00Z",
    isRead: false,
    priority: "high",
    actionUrl: "/dashboard/courses",
  },
  {
    id: "3",
    type: "financial",
    title: "Propina em dia",
    message: "Sua propina do mês de março foi confirmada como paga",
    timestamp: "2024-03-14T14:20:00Z",
    isRead: true,
    priority: "low",
    actionUrl: "/dashboard/finance",
  },
  {
    id: "4",
    type: "system",
    title: "Manutenção programada",
    message: "O sistema estará em manutenção no sábado das 02:00 às 06:00",
    timestamp: "2024-03-14T11:45:00Z",
    isRead: false,
    priority: "medium",
  },
  {
    id: "5",
    type: "social",
    title: "Novo membro no grupo",
    message: "João Santos se juntou ao seu grupo 'Algoritmos Avançados'",
    timestamp: "2024-03-13T16:30:00Z",
    isRead: true,
    priority: "low",
    actionUrl: "/dashboard/student-groups",
  },
  {
    id: "6",
    type: "academic",
    title: "Horário de aula alterado",
    message: "A aula de Base de Dados de terça-feira foi transferida para quarta-feira às 14:00",
    timestamp: "2024-03-13T08:00:00Z",
    isRead: false,
    priority: "high",
    actionUrl: "/dashboard/schedule",
  },
]

interface NotificationSystemProps {
  className?: string
}

export function NotificationSystem({ className }: NotificationSystemProps) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.isRead).length
  const unreadNotifications = notifications.filter((n) => !n.isRead)
  const recentNotifications = notifications.slice(0, 5)

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification,
      ),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })))
  }

  const deleteNotification = (notificationId: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== notificationId))
  }

  const getNotificationIcon = (type: string, priority: string) => {
    const iconClass = priority === "high" ? "text-red-500" : priority === "medium" ? "text-yellow-500" : "text-blue-500"

    switch (type) {
      case "academic":
        return <BookOpen className={`h-4 w-4 ${iconClass}`} />
      case "financial":
        return <DollarSign className={`h-4 w-4 ${iconClass}`} />
      case "system":
        return <Settings className={`h-4 w-4 ${iconClass}`} />
      case "social":
        return <Users className={`h-4 w-4 ${iconClass}`} />
      default:
        return <Info className={`h-4 w-4 ${iconClass}`} />
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="h-3 w-3 text-red-500" />
      case "medium":
        return <Info className="h-3 w-3 text-yellow-500" />
      case "low":
        return <CheckCircle className="h-3 w-3 text-green-500" />
      default:
        return null
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return "Agora mesmo"
    } else if (diffInHours < 24) {
      return `${diffInHours}h atrás`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d atrás`
    }
  }

  const groupedNotifications = {
    academic: notifications.filter((n) => n.type === "academic"),
    financial: notifications.filter((n) => n.type === "financial"),
    system: notifications.filter((n) => n.type === "system"),
    social: notifications.filter((n) => n.type === "social"),
  }

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // This would typically come from a WebSocket or Server-Sent Events
      // For demo purposes, we'll just update timestamps
      setNotifications((prev) => [...prev])
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={`relative ${className}`}>
          {unreadCount > 0 ? <BellRing className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
          <span className="sr-only">{unreadCount > 0 ? `${unreadCount} notificações não lidas` : "Notificações"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 max-h-96" align="end" forceMount>
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notificações</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-auto p-1 text-xs">
              Marcar todas como lidas
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {notifications.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            <Bell className="mx-auto h-8 w-8 mb-2 opacity-50" />
            <p>Nenhuma notificação</p>
          </div>
        ) : (
          <ScrollArea className="h-80">
            <div className="space-y-1">
              {recentNotifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={`flex flex-col items-start p-3 cursor-pointer ${
                    !notification.isRead ? "bg-blue-50 hover:bg-blue-100" : "hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    if (!notification.isRead) {
                      markAsRead(notification.id)
                    }
                    if (notification.actionUrl) {
                      window.location.href = notification.actionUrl
                    }
                  }}
                >
                  <div className="flex items-start justify-between w-full">
                    <div className="flex items-start space-x-2 flex-1">
                      {getNotificationIcon(notification.type, notification.priority)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1">
                          <p
                            className={`text-sm font-medium truncate ${
                              !notification.isRead ? "text-gray-900" : "text-gray-700"
                            }`}
                          >
                            {notification.title}
                          </p>
                          {getPriorityIcon(notification.priority)}
                          {!notification.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{notification.message}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {notification.type === "academic" && "Acadêmico"}
                            {notification.type === "financial" && "Financeiro"}
                            {notification.type === "system" && "Sistema"}
                            {notification.type === "social" && "Social"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-1 ml-2">
                      {!notification.isRead && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation()
                            markAsRead(notification.id)
                          }}
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteNotification(notification.id)
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          </ScrollArea>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center justify-center">
          <Button variant="ghost" size="sm" className="w-full">
            Ver todas as notificações
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Notification Categories Component for detailed view
export function NotificationCategories() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = [
    { id: "all", name: "Todas", icon: Bell, count: notifications.length },
    {
      id: "academic",
      name: "Acadêmicas",
      icon: BookOpen,
      count: notifications.filter((n) => n.type === "academic").length,
    },
    {
      id: "financial",
      name: "Financeiras",
      icon: DollarSign,
      count: notifications.filter((n) => n.type === "financial").length,
    },
    { id: "system", name: "Sistema", icon: Settings, count: notifications.filter((n) => n.type === "system").length },
    { id: "social", name: "Sociais", icon: Users, count: notifications.filter((n) => n.type === "social").length },
  ]

  const filteredNotifications =
    selectedCategory === "all" ? notifications : notifications.filter((n) => n.type === selectedCategory)

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification,
      ),
    )
  }

  const deleteNotification = (notificationId: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== notificationId))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center space-x-2"
          >
            <category.icon className="h-4 w-4" />
            <span>{category.name}</span>
            {category.count > 0 && (
              <Badge variant="secondary" className="ml-1">
                {category.count}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground">Nenhuma notificação</h3>
              <p className="text-sm text-muted-foreground">Não há notificações nesta categoria.</p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <Card key={notification.id} className={`${!notification.isRead ? "border-l-4 border-l-blue-500" : ""}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {notification.type === "academic" && <BookOpen className="h-5 w-5 text-blue-500 mt-0.5" />}
                    {notification.type === "financial" && <DollarSign className="h-5 w-5 text-green-500 mt-0.5" />}
                    {notification.type === "system" && <Settings className="h-5 w-5 text-gray-500 mt-0.5" />}
                    {notification.type === "social" && <Users className="h-5 w-5 text-purple-500 mt-0.5" />}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <CardTitle className={`text-base ${!notification.isRead ? "font-semibold" : "font-medium"}`}>
                          {notification.title}
                        </CardTitle>
                        {!notification.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                        <Badge variant="outline" className="text-xs">
                          {notification.priority === "high" && "Alta"}
                          {notification.priority === "medium" && "Média"}
                          {notification.priority === "low" && "Baixa"}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm mt-1">
                        {new Date(notification.timestamp).toLocaleString("pt-MZ")}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {!notification.isRead && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => markAsRead(notification.id)}
                        className="h-8 w-8"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteNotification(notification.id)}
                      className="h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{notification.message}</p>
                {notification.actionUrl && (
                  <Button size="sm" variant="outline">
                    Ver detalhes
                  </Button>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
