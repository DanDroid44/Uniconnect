"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, MapPin, User, Calendar, BookOpen } from "lucide-react"
import { SemesterBadge } from "@/components/ui/semester-badge"
import { getActiveSemester, getCurrentAcademicYear, getSemestersForYears } from "@/lib/academic-calendar"

const currentSemesterSchedule = [
  {
    day: "Segunda-feira",
    dayEn: "Monday",
    classes: [
      {
        time: "09:30 - 11:00",
        course: "Introdução à Ciência da Computação",
        code: "CS101",
        room: "Edifício A, Sala 203",
        instructor: "Prof. Maria Santos",
        credits: 3,
      },
      {
        time: "14:00 - 15:30",
        course: "Cálculo II",
        code: "MATH201",
        room: "Edifício B, Sala 105",
        instructor: "Dr. João Silva",
        credits: 4,
      },
    ],
  },
  {
    day: "Terça-feira",
    dayEn: "Tuesday",
    classes: [
      {
        time: "10:00 - 11:30",
        course: "Redação Técnica",
        code: "ENG202",
        room: "Edifício C, Sala 301",
        instructor: "Prof. Ana Costa",
        credits: 2,
      },
      {
        time: "15:00 - 16:30",
        course: "Introdução à Psicologia",
        code: "PSYC101",
        room: "Edifício A, Sala 150",
        instructor: "Dr. Carlos Mendes",
        credits: 3,
      },
    ],
  },
  {
    day: "Quarta-feira",
    dayEn: "Wednesday",
    classes: [
      {
        time: "09:30 - 11:00",
        course: "Introdução à Ciência da Computação",
        code: "CS101",
        room: "Edifício A, Sala 203",
        instructor: "Prof. Maria Santos",
        credits: 3,
      },
      {
        time: "13:00 - 14:30",
        course: "História Mundial",
        code: "HIST105",
        room: "Edifício D, Sala 201",
        instructor: "Prof. Isabel Rodrigues",
        credits: 3,
      },
    ],
  },
  {
    day: "Quinta-feira",
    dayEn: "Thursday",
    classes: [
      {
        time: "11:00 - 12:30",
        course: "Cálculo II",
        code: "MATH201",
        room: "Edifício B, Sala 105",
        instructor: "Dr. João Silva",
        credits: 4,
      },
      {
        time: "14:30 - 16:00",
        course: "Redação Técnica",
        code: "ENG202",
        room: "Edifício C, Sala 301",
        instructor: "Prof. Ana Costa",
        credits: 2,
      },
    ],
  },
  {
    day: "Sexta-feira",
    dayEn: "Friday",
    classes: [
      {
        time: "10:00 - 11:30",
        course: "Introdução à Psicologia",
        code: "PSYC101",
        room: "Edifício A, Sala 150",
        instructor: "Dr. Carlos Mendes",
        credits: 3,
      },
      {
        time: "15:00 - 16:30",
        course: "História Mundial",
        code: "HIST105",
        room: "Edifício D, Sala 201",
        instructor: "Prof. Isabel Rodrigues",
        credits: 3,
      },
    ],
  },
]

const previousSemesters = [
  {
    semester: "2º Semestre 2024/2025",
    semesterId: "2024-S2",
    courses: [
      { code: "MATH101", name: "Cálculo I", grade: "16", credits: 4, status: "Aprovado" },
      { code: "CS100", name: "Fundamentos de Programação", grade: "17", credits: 3, status: "Aprovado" },
      { code: "ENG101", name: "Composição em Inglês", grade: "15", credits: 3, status: "Aprovado" },
      { code: "PHYS101", name: "Física I", grade: "14", credits: 4, status: "Aprovado" },
      { code: "PHIL101", name: "Introdução à Filosofia", grade: "18", credits: 2, status: "Aprovado" },
    ],
  },
  {
    semester: "1º Semestre 2024/2025",
    semesterId: "2024-S1",
    courses: [
      { code: "MATH102", name: "Álgebra Linear", grade: "15", credits: 3, status: "Aprovado" },
      { code: "CS150", name: "Estruturas de Dados", grade: "16", credits: 4, status: "Aprovado" },
      { code: "STAT101", name: "Estatística", grade: "17", credits: 3, status: "Aprovado" },
      { code: "ECON101", name: "Microeconomia", grade: "14", credits: 3, status: "Aprovado" },
      { code: "PORT101", name: "Língua Portuguesa", grade: "18", credits: 2, status: "Aprovado" },
    ],
  },
]

export default function SchedulePage() {
  const activeSemester = getActiveSemester()
  const currentYear = getCurrentAcademicYear()
  const allSemesters = getSemestersForYears(2023, 2025)

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Horário de Aulas</h1>
          <p className="text-gray-600 mt-1">Visualize seus horários atuais e histórico de semestres</p>
        </div>

        <SemesterBadge variant="compact" />
      </div>

      <Tabs defaultValue="current" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="current">Semestre Atual</TabsTrigger>
          <TabsTrigger value="previous">Semestres Anteriores</TabsTrigger>
          <TabsTrigger value="calendar">Calendário Acadêmico</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>
                  {activeSemester
                    ? `${activeSemester.name} ${activeSemester.academicYear} - Horário Semanal`
                    : "Período de Férias"}
                </span>
              </CardTitle>
              <CardDescription>
                {activeSemester
                  ? `Seu horário de aulas para o semestre atual (${Math.round(activeSemester.progress)}% concluído)`
                  : "Não há aulas programadas durante o período de férias"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activeSemester ? (
                <div className="space-y-6">
                  {currentSemesterSchedule.map((day) => (
                    <div key={day.day} className="space-y-3">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        {day.day}
                      </h3>
                      <div className="grid gap-3">
                        {day.classes.map((classItem, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-gray-900">{classItem.course}</h4>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline">{classItem.code}</Badge>
                                  <Badge variant="secondary" className="text-xs">
                                    {classItem.credits} créditos
                                  </Badge>
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                  <Clock className="h-4 w-4" />
                                  <span>{classItem.time}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <MapPin className="h-4 w-4" />
                                  <span>{classItem.room}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <User className="h-4 w-4" />
                                  <span>{classItem.instructor}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Período de Férias</h3>
                  <p className="text-gray-600 mb-4">Não há aulas programadas durante este período.</p>
                  {currentYear.semesters.find((s) => s.status === "upcoming") && (
                    <div className="bg-blue-50 p-4 rounded-lg inline-block">
                      <p className="text-sm text-blue-700">
                        Próximo semestre inicia em{" "}
                        {currentYear.semesters
                          .find((s) => s.status === "upcoming")
                          ?.startDate.toLocaleDateString("pt-MZ")}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="previous" className="space-y-6">
          {previousSemesters.map((semester) => (
            <Card key={semester.semester}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{semester.semester}</span>
                  <Badge variant="outline" className="text-gray-600">
                    Concluído
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Disciplinas concluídas - Total de Créditos:{" "}
                  {semester.courses.reduce((sum, course) => sum + course.credits, 0)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {semester.courses.map((course) => (
                    <div key={course.code} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline">{course.code}</Badge>
                          <span className="font-medium">{course.name}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{course.credits} créditos</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge
                          variant={course.status === "Aprovado" ? "default" : "destructive"}
                          className={course.status === "Aprovado" ? "bg-green-100 text-green-800" : ""}
                        >
                          {course.status}
                        </Badge>
                        <span className="font-semibold text-lg">{course.grade}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Calendário Acadêmico de Moçambique
              </CardTitle>
              <CardDescription>Sistema de semestres baseado no calendário acadêmico moçambicano</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
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
                            <span className="font-medium">
                              {semester.startDate.toLocaleDateString("pt-MZ", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Fim:</span>
                            <span className="font-medium">
                              {semester.endDate.toLocaleDateString("pt-MZ", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Duração:</span>
                            <span className="font-medium">
                              {Math.ceil(
                                (semester.endDate.getTime() - semester.startDate.getTime()) / (1000 * 60 * 60 * 24),
                              )}{" "}
                              dias
                            </span>
                          </div>
                        </div>

                        {semester.isActive && (
                          <div className="space-y-2 pt-2 border-t">
                            <div className="flex justify-between text-sm">
                              <span>Progresso:</span>
                              <span className="font-medium">{Math.round(semester.progress)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${semester.progress}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-600 text-center">
                              {Math.ceil((semester.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}{" "}
                              dias restantes
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Sistema Acadêmico de Moçambique</h4>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p>
                      <strong>1º Semestre:</strong> 1 de Fevereiro - 31 de Julho
                    </p>
                    <p>
                      <strong>2º Semestre:</strong> 1 de Agosto - 7 de Dezembro
                    </p>
                    <p>
                      <strong>Férias:</strong> 8 de Dezembro - 31 de Janeiro
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
