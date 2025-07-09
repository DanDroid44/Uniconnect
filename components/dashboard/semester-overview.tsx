"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, BookOpen, TrendingUp, AlertCircle } from "lucide-react"
import {
  getAcademicCalendar,
  formatMozambiqueDate,
  getDaysRemaining,
  getDaysSinceStart,
  getSemesterDuration,
  formatDateRange,
} from "@/lib/academic-calendar"

export function SemesterOverview() {
  const calendar = getAcademicCalendar()
  const { currentYear, activeSemester } = calendar

  const upcomingSemester = currentYear.semesters.find((s) => s.status === "upcoming")
  const completedSemesters = currentYear.semesters.filter((s) => s.status === "completed")

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Active Semester Card */}
        {activeSemester && (
          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Semestre Atual
                </CardTitle>
                <Badge className="bg-blue-600 hover:bg-blue-700">Ativo</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-xl">{activeSemester.name}</h3>
                <p className="text-sm text-gray-600">{activeSemester.academicYear}</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso</span>
                  <span className="font-medium">{Math.round(activeSemester.progress)}%</span>
                </div>
                <Progress value={activeSemester.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Dias decorridos</p>
                  <p className="font-semibold">{getDaysSinceStart(activeSemester)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Dias restantes</p>
                  <p className="font-semibold">{getDaysRemaining(activeSemester)}</p>
                </div>
              </div>

              <div className="pt-2 border-t">
                <p className="text-xs text-gray-600">
                  {formatDateRange(activeSemester.startDate, activeSemester.endDate)}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Academic Year Overview */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-600" />
              Ano Acadêmico
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-xl">{currentYear.year}</h3>
              <p className="text-sm text-gray-600">{currentYear.isActive ? "Em andamento" : "Inativo"}</p>
            </div>

            <div className="space-y-3">
              {currentYear.semesters.map((semester) => (
                <div key={semester.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                  <div>
                    <p className="font-medium text-sm">{semester.name}</p>
                    <p className="text-xs text-gray-600">{formatDateRange(semester.startDate, semester.endDate)}</p>
                  </div>
                  <Badge
                    variant={semester.status === "active" ? "default" : "outline"}
                    className={
                      semester.status === "active"
                        ? "bg-green-600 hover:bg-green-700"
                        : semester.status === "completed"
                          ? "text-gray-600"
                          : "text-blue-600"
                    }
                  >
                    {semester.status === "active" ? "Ativo" : semester.status === "completed" ? "Concluído" : "Próximo"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              Estatísticas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">
                  {currentYear.semesters.filter((s) => s.status === "completed").length}
                </p>
                <p className="text-xs text-gray-600">Semestres Concluídos</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {activeSemester ? Math.round(activeSemester.progress) : 0}%
                </p>
                <p className="text-xs text-gray-600">Progresso Atual</p>
              </div>
            </div>

            {activeSemester && getDaysRemaining(activeSemester) <= 30 && (
              <div className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg border border-amber-200">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <p className="text-xs text-amber-700">Semestre termina em {getDaysRemaining(activeSemester)} dias</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detailed Calendar View */}
      <Card>
        <CardHeader>
          <CardTitle>Calendário Acadêmico Detalhado</CardTitle>
          <CardDescription>Calendário completo baseado no sistema acadêmico de Moçambique</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="current" className="space-y-4">
            <TabsList>
              <TabsTrigger value="current">Ano Atual</TabsTrigger>
              <TabsTrigger value="next">Próximo Ano</TabsTrigger>
              {calendar.previousYear && <TabsTrigger value="previous">Ano Anterior</TabsTrigger>}
            </TabsList>

            <TabsContent value="current" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {currentYear.semesters.map((semester) => (
                  <Card key={semester.id} className={semester.isActive ? "border-blue-200 bg-blue-50/30" : ""}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{semester.name}</CardTitle>
                        <Badge
                          variant={semester.status === "active" ? "default" : "outline"}
                          className={
                            semester.status === "active"
                              ? "bg-blue-600 hover:bg-blue-700"
                              : semester.status === "completed"
                                ? "text-gray-600"
                                : "text-blue-600"
                          }
                        >
                          {semester.status === "active"
                            ? "Ativo"
                            : semester.status === "completed"
                              ? "Concluído"
                              : "Próximo"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Início:</span>
                          <span className="font-medium">{formatMozambiqueDate(semester.startDate)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Fim:</span>
                          <span className="font-medium">{formatMozambiqueDate(semester.endDate)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Duração:</span>
                          <span className="font-medium">{getSemesterDuration(semester)} dias</span>
                        </div>
                      </div>

                      {semester.isActive && (
                        <div className="space-y-2 pt-2 border-t">
                          <div className="flex justify-between text-sm">
                            <span>Progresso:</span>
                            <span className="font-medium">{Math.round(semester.progress)}%</span>
                          </div>
                          <Progress value={semester.progress} className="h-2" />
                          <p className="text-xs text-gray-600 text-center">
                            {getDaysRemaining(semester)} dias restantes
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="next" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {calendar.nextYear.semesters.map((semester) => (
                  <Card key={semester.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{semester.name}</CardTitle>
                        <Badge variant="outline" className="text-blue-600">
                          Futuro
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Início:</span>
                        <span className="font-medium">{formatMozambiqueDate(semester.startDate)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Fim:</span>
                        <span className="font-medium">{formatMozambiqueDate(semester.endDate)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Duração:</span>
                        <span className="font-medium">{getSemesterDuration(semester)} dias</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {calendar.previousYear && (
              <TabsContent value="previous" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {calendar.previousYear.semesters.map((semester) => (
                    <Card key={semester.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{semester.name}</CardTitle>
                          <Badge variant="outline" className="text-gray-600">
                            Concluído
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Início:</span>
                          <span className="font-medium">{formatMozambiqueDate(semester.startDate)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Fim:</span>
                          <span className="font-medium">{formatMozambiqueDate(semester.endDate)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Duração:</span>
                          <span className="font-medium">{getSemesterDuration(semester)} dias</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
