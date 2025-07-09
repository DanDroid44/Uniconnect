"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DataTable } from "@/components/ui/data-table"
import { SemesterBadge } from "@/components/ui/semester-badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Users, BookOpen, Search, Filter, AlertCircle, CheckCircle, Clock, GraduationCap } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

interface Student {
  id: string
  name: string
  studentNumber: string
  program: string
  year: number
  email: string
  enrollmentStatus: "enrolled" | "pending" | "dropped"
  enrollmentDate?: string
  gpa: number
}

interface Course {
  id: string
  name: string
  code: string
  semester: string
  maxStudents: number
  currentEnrollment: number
  prerequisites: string[]
  credits: number
}

interface EnrollmentRequest {
  id: string
  studentId: string
  studentName: string
  studentNumber: string
  courseId: string
  courseName: string
  requestDate: string
  status: "pending" | "approved" | "rejected"
  reason?: string
}

const mockCourses: Course[] = [
  {
    id: "1",
    name: "Programação I",
    code: "CC101",
    semester: "1º Semestre",
    maxStudents: 50,
    currentEnrollment: 45,
    prerequisites: [],
    credits: 6,
  },
  {
    id: "2",
    name: "Algoritmos e Estruturas de Dados",
    code: "CC201",
    semester: "2º Semestre",
    maxStudents: 40,
    currentEnrollment: 38,
    prerequisites: ["CC101"],
    credits: 6,
  },
  {
    id: "3",
    name: "Base de Dados",
    code: "CC202",
    semester: "2º Semestre",
    maxStudents: 45,
    currentEnrollment: 40,
    prerequisites: ["CC101"],
    credits: 6,
  },
]

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Ana Silva",
    studentNumber: "20240001",
    program: "Ciências da Computação",
    year: 1,
    email: "ana.silva@ust.ac.mz",
    enrollmentStatus: "enrolled",
    enrollmentDate: "2024-02-15",
    gpa: 15.2,
  },
  {
    id: "2",
    name: "João Santos",
    studentNumber: "20240002",
    program: "Ciências da Computação",
    year: 2,
    email: "joao.santos@ust.ac.mz",
    enrollmentStatus: "enrolled",
    enrollmentDate: "2024-02-16",
    gpa: 13.8,
  },
  {
    id: "3",
    name: "Maria Costa",
    studentNumber: "20240003",
    program: "Gestão de Negócios",
    year: 1,
    email: "maria.costa@ust.ac.mz",
    enrollmentStatus: "pending",
    gpa: 14.5,
  },
]

const mockEnrollmentRequests: EnrollmentRequest[] = [
  {
    id: "1",
    studentId: "3",
    studentName: "Maria Costa",
    studentNumber: "20240003",
    courseId: "1",
    courseName: "Programação I",
    requestDate: "2024-03-15",
    status: "pending",
  },
  {
    id: "2",
    studentId: "4",
    studentName: "Pedro Oliveira",
    studentNumber: "20240004",
    courseId: "2",
    courseName: "Algoritmos e Estruturas de Dados",
    requestDate: "2024-03-14",
    status: "pending",
  },
]

export default function CourseEnrollmentPage() {
  const [selectedCourse, setSelectedCourse] = useState<string>("1")
  const [students, setStudents] = useState<Student[]>(mockStudents)
  const [enrollmentRequests, setEnrollmentRequests] = useState<EnrollmentRequest[]>(mockEnrollmentRequests)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [filterProgram, setFilterProgram] = useState<string>("all")
  const [filterYear, setFilterYear] = useState<string>("all")

  const selectedCourseData = mockCourses.find((c) => c.id === selectedCourse)

  const toggleEnrollment = (studentId: string, enrolled: boolean) => {
    setStudents((prev) =>
      prev.map((student) => {
        if (student.id === studentId) {
          return {
            ...student,
            enrollmentStatus: enrolled ? "enrolled" : "dropped",
            enrollmentDate: enrolled ? new Date().toISOString().split("T")[0] : undefined,
          }
        }
        return student
      }),
    )
  }

  const handleEnrollmentRequest = (requestId: string, action: "approve" | "reject", reason?: string) => {
    setEnrollmentRequests((prev) =>
      prev.map((request) => {
        if (request.id === requestId) {
          return {
            ...request,
            status: action === "approve" ? "approved" : "rejected",
            reason,
          }
        }
        return request
      }),
    )

    if (action === "approve") {
      const request = enrollmentRequests.find((r) => r.id === requestId)
      if (request) {
        setStudents((prev) => [
          ...prev,
          {
            id: request.studentId,
            name: request.studentName,
            studentNumber: request.studentNumber,
            program: "Ciências da Computação", // This would come from the actual student data
            year: 1,
            email: `${request.studentName.toLowerCase().replace(" ", ".")}@ust.ac.mz`,
            enrollmentStatus: "enrolled",
            enrollmentDate: new Date().toISOString().split("T")[0],
            gpa: 0,
          },
        ])
      }
    }
  }

  const enrolledStudents = students.filter((s) => s.enrollmentStatus === "enrolled")
  const pendingStudents = students.filter((s) => s.enrollmentStatus === "pending")
  const droppedStudents = students.filter((s) => s.enrollmentStatus === "dropped")

  const studentColumns: ColumnDef<Student>[] = [
    {
      accessorKey: "studentNumber",
      header: "Número",
      cell: ({ row }) => <div className="font-mono text-sm">{row.getValue("studentNumber")}</div>,
    },
    {
      accessorKey: "name",
      header: "Nome",
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "program",
      header: "Programa",
      cell: ({ row }) => <Badge variant="outline">{row.getValue("program")}</Badge>,
    },
    {
      accessorKey: "year",
      header: "Ano",
      cell: ({ row }) => <Badge variant="secondary">{row.getValue("year")}º Ano</Badge>,
    },
    {
      accessorKey: "gpa",
      header: "Média",
      cell: ({ row }) => {
        const gpa = row.getValue("gpa") as number
        return <Badge variant={gpa >= 14 ? "default" : gpa >= 10 ? "secondary" : "destructive"}>{gpa.toFixed(1)}</Badge>
      },
    },
    {
      accessorKey: "enrollmentStatus",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("enrollmentStatus") as string
        const variants = {
          enrolled: "default" as const,
          pending: "secondary" as const,
          dropped: "destructive" as const,
        }
        const labels = {
          enrolled: "Matriculado",
          pending: "Pendente",
          dropped: "Desistente",
        }

        return (
          <Badge variant={variants[status as keyof typeof variants]}>{labels[status as keyof typeof labels]}</Badge>
        )
      },
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const student = row.original
        const isEnrolled = student.enrollmentStatus === "enrolled"

        return (
          <div className="flex items-center space-x-2">
            <Switch checked={isEnrolled} onCheckedChange={(checked) => toggleEnrollment(student.id, checked)} />
            <span className="text-sm text-muted-foreground">{isEnrolled ? "Matriculado" : "Não matriculado"}</span>
          </div>
        )
      },
    },
  ]

  const requestColumns: ColumnDef<EnrollmentRequest>[] = [
    {
      accessorKey: "studentNumber",
      header: "Número",
      cell: ({ row }) => <div className="font-mono text-sm">{row.getValue("studentNumber")}</div>,
    },
    {
      accessorKey: "studentName",
      header: "Nome do Estudante",
      cell: ({ row }) => <div className="font-medium">{row.getValue("studentName")}</div>,
    },
    {
      accessorKey: "courseName",
      header: "Disciplina",
      cell: ({ row }) => <div className="font-medium">{row.getValue("courseName")}</div>,
    },
    {
      accessorKey: "requestDate",
      header: "Data da Solicitação",
      cell: ({ row }) => {
        const date = new Date(row.getValue("requestDate") as string)
        return <div>{date.toLocaleDateString("pt-MZ")}</div>
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        const variants = {
          pending: "secondary" as const,
          approved: "default" as const,
          rejected: "destructive" as const,
        }
        const labels = {
          pending: "Pendente",
          approved: "Aprovado",
          rejected: "Rejeitado",
        }

        return (
          <Badge variant={variants[status as keyof typeof variants]}>{labels[status as keyof typeof labels]}</Badge>
        )
      },
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const request = row.original

        if (request.status !== "pending") {
          return <span className="text-sm text-muted-foreground">Processado</span>
        }

        return (
          <div className="flex space-x-2">
            <Button
              size="sm"
              onClick={() => handleEnrollmentRequest(request.id, "approve")}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Aprovar
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleEnrollmentRequest(request.id, "reject", "Não atende aos pré-requisitos")}
            >
              <AlertCircle className="w-4 h-4 mr-1" />
              Rejeitar
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Matrículas</h1>
          <p className="text-muted-foreground">
            Gerencie matrículas de estudantes nas disciplinas e processe solicitações
          </p>
        </div>
        <SemesterBadge showProgress />
      </div>

      {/* Course Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Seleção de Disciplina
          </CardTitle>
          <CardDescription>Escolha a disciplina para gerenciar as matrículas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Disciplina</label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma disciplina" />
                </SelectTrigger>
                <SelectContent>
                  {mockCourses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      <div className="flex flex-col">
                        <span className="font-medium">{course.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {course.code} • {course.currentEnrollment}/{course.maxStudents} estudantes
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedCourseData && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{selectedCourseData.currentEnrollment}</div>
                    <div className="text-sm text-blue-600">Matriculados</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">
                      {selectedCourseData.maxStudents - selectedCourseData.currentEnrollment}
                    </div>
                    <div className="text-sm text-green-600">Vagas Restantes</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Capacidade</span>
                    <span>
                      {selectedCourseData.currentEnrollment}/{selectedCourseData.maxStudents}
                    </span>
                  </div>
                  <Progress
                    value={(selectedCourseData.currentEnrollment / selectedCourseData.maxStudents) * 100}
                    className="h-2"
                  />
                </div>
              </div>
            )}
          </div>

          {selectedCourseData && selectedCourseData.prerequisites.length > 0 && (
            <Alert className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Pré-requisitos:</strong> {selectedCourseData.prerequisites.join(", ")}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {selectedCourse && (
        <Tabs defaultValue="enrolled" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="enrolled">Estudantes Matriculados ({enrolledStudents.length})</TabsTrigger>
            <TabsTrigger value="requests">
              Solicitações de Matrícula ({enrollmentRequests.filter((r) => r.status === "pending").length})
            </TabsTrigger>
            <TabsTrigger value="all">Todos os Estudantes ({students.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="enrolled" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Estudantes Matriculados
                </CardTitle>
                <CardDescription>Lista de estudantes atualmente matriculados na disciplina</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={studentColumns}
                  data={enrolledStudents}
                  searchKey="name"
                  searchPlaceholder="Pesquisar por nome do estudante..."
                  roleTheme="faculty"
                  showExport
                  onExport={() => console.log("Exporting enrolled students")}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Solicitações de Matrícula
                </CardTitle>
                <CardDescription>Processe solicitações de matrícula pendentes</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={requestColumns}
                  data={enrollmentRequests}
                  searchKey="studentName"
                  searchPlaceholder="Pesquisar por nome do estudante..."
                  roleTheme="faculty"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filtros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Programa</label>
                    <Select value={filterProgram} onValueChange={setFilterProgram}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos os programas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os programas</SelectItem>
                        <SelectItem value="Ciências da Computação">Ciências da Computação</SelectItem>
                        <SelectItem value="Gestão de Negócios">Gestão de Negócios</SelectItem>
                        <SelectItem value="Contabilidade">Contabilidade</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ano</label>
                    <Select value={filterYear} onValueChange={setFilterYear}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos os anos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os anos</SelectItem>
                        <SelectItem value="1">1º Ano</SelectItem>
                        <SelectItem value="2">2º Ano</SelectItem>
                        <SelectItem value="3">3º Ano</SelectItem>
                        <SelectItem value="4">4º Ano</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Pesquisar</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Nome ou número do estudante"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* All Students */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Todos os Estudantes
                </CardTitle>
                <CardDescription>Gerencie matrículas de todos os estudantes elegíveis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{enrolledStudents.length}</div>
                    <div className="text-sm text-green-600">Matriculados</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{pendingStudents.length}</div>
                    <div className="text-sm text-yellow-600">Pendentes</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{droppedStudents.length}</div>
                    <div className="text-sm text-red-600">Desistentes</div>
                  </div>
                </div>

                <DataTable
                  columns={studentColumns}
                  data={students}
                  searchKey="name"
                  searchPlaceholder="Pesquisar por nome do estudante..."
                  roleTheme="faculty"
                  showExport
                  onExport={() => console.log("Exporting all students")}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
