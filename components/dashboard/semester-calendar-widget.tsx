"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock } from "lucide-react"
import { getAcademicCalendar, getDaysRemaining, formatDateRange } from "@/lib/academic-calendar"

export function SemesterCalendarWidget() {
  const calendar = getAcademicCalendar()
  const { activeSemester, currentYear } = calendar

  const nextSemester = currentYear.semesters.find((s) => s.status === "upcoming")

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          Calendário Acadêmico
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeSemester ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{activeSemester.name}</h3>
                <p className="text-sm text-gray-600">{activeSemester.academicYear}</p>
              </div>
              <Badge className="bg-green-600 hover:bg-green-700">Ativo</Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso do semestre</span>
                <span className="font-medium">{Math.round(activeSemester.progress)}%</span>
              </div>
              <Progress value={activeSemester.progress} className="h-2" />
            </div>

            <div className="flex items-center justify-between text-sm bg-blue-50 p-2 rounded">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span>Dias restantes</span>
              </div>
              <span className="font-semibold text-blue-600">{getDaysRemaining(activeSemester)}</span>
            </div>

            <div className="text-xs text-gray-600 pt-2 border-t">
              <p>{formatDateRange(activeSemester.startDate, activeSemester.endDate)}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Período de férias</p>
            {nextSemester && (
              <div className="mt-3 p-2 bg-blue-50 rounded">
                <p className="text-xs text-blue-700">Próximo: {nextSemester.name}</p>
                <p className="text-xs text-blue-600">Inicia em {nextSemester.startDate.toLocaleDateString("pt-MZ")}</p>
              </div>
            )}
          </div>
        )}

        {/* Quick semester overview */}
        <div className="space-y-2 pt-3 border-t">
          <h4 className="text-sm font-medium text-gray-700">Semestres {currentYear.year}</h4>
          <div className="space-y-1">
            {currentYear.semesters.map((semester) => (
              <div key={semester.id} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      semester.status === "active"
                        ? "bg-green-500"
                        : semester.status === "completed"
                          ? "bg-gray-400"
                          : "bg-blue-400"
                    }`}
                  />
                  {semester.name}
                </span>
                <span className="text-gray-500">
                  {semester.startDate.toLocaleDateString("pt-MZ", { month: "short" })} -{" "}
                  {semester.endDate.toLocaleDateString("pt-MZ", { month: "short" })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
