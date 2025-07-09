"use client"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { getActiveSemester, getDaysRemaining, formatDateRange } from "@/lib/academic-calendar"
import { cn } from "@/lib/utils"

interface SemesterBadgeProps {
  showProgress?: boolean
  showDetails?: boolean
  className?: string
  variant?: "default" | "compact" | "detailed"
}

export function SemesterBadge({
  showProgress = false,
  showDetails = false,
  className,
  variant = "default",
}: SemesterBadgeProps) {
  const activeSemester = getActiveSemester()

  if (!activeSemester) {
    return (
      <Badge variant="secondary" className={cn("flex items-center gap-2", className)}>
        <Calendar className="w-3 h-3" />
        Período de Férias
      </Badge>
    )
  }

  const daysRemaining = getDaysRemaining(activeSemester)
  const isNearEnd = daysRemaining <= 30 && daysRemaining > 0

  if (variant === "compact") {
    return (
      <Badge variant="default" className={cn("bg-blue-600 hover:bg-blue-700 flex items-center gap-1", className)}>
        <Calendar className="w-3 h-3" />
        {activeSemester.name}
      </Badge>
    )
  }

  if (variant === "detailed") {
    return (
      <div className={cn("space-y-3 p-4 bg-white rounded-lg border shadow-sm", className)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="default" className="bg-blue-600 hover:bg-blue-700">
              <Calendar className="w-3 h-3 mr-1" />
              {activeSemester.name} {activeSemester.academicYear}
            </Badge>
            {activeSemester.status === "active" && (
              <Badge variant="outline" className="text-green-600 border-green-200">
                <CheckCircle className="w-3 h-3 mr-1" />
                Ativo
              </Badge>
            )}
          </div>
          {isNearEnd && (
            <Badge variant="outline" className="text-amber-600 border-amber-200">
              <AlertCircle className="w-3 h-3 mr-1" />
              Terminando em breve
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{formatDateRange(activeSemester.startDate, activeSemester.endDate)}</span>
            <span className="font-medium">{Math.round(activeSemester.progress)}% concluído</span>
          </div>
          <Progress value={activeSemester.progress} className="h-2" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Início: {activeSemester.startDate.toLocaleDateString("pt-MZ")}</span>
            <span>{daysRemaining} dias restantes</span>
            <span>Fim: {activeSemester.endDate.toLocaleDateString("pt-MZ")}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="default" className="bg-blue-600 hover:bg-blue-700">
          <Calendar className="w-3 h-3 mr-1" />
          {activeSemester.name} Ativo
        </Badge>
        <Badge
          variant="outline"
          className={cn("text-xs", isNearEnd ? "text-amber-600 border-amber-200" : "text-gray-600")}
        >
          <Clock className="w-3 h-3 mr-1" />
          {daysRemaining} dias restantes
        </Badge>
      </div>

      {showProgress && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-600">
            <span>{formatDateRange(activeSemester.startDate, activeSemester.endDate)}</span>
            <span className="font-medium">{Math.round(activeSemester.progress)}%</span>
          </div>
          <Progress value={activeSemester.progress} className="h-2" />
        </div>
      )}

      {showDetails && (
        <div className="text-xs text-gray-500 space-y-1">
          <div>Ano Acadêmico: {activeSemester.academicYear}</div>
          <div>Duração: {formatDateRange(activeSemester.startDate, activeSemester.endDate)}</div>
        </div>
      )}
    </div>
  )
}
