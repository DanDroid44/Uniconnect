"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/ui/data-table"
import { SemesterBadge } from "@/components/ui/semester-badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { FileText, Download, BarChart3, TrendingUp, Users, BookOpen, Filter, Calendar } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

interface StudentGradeReport {
  id: string
  studentName: string
  studentNumber: string
  test1: number | null
  test2: number | null
  exam: number | null
  finalGrade: number | null
  status: "approved" | "failed" | "pending"
  attendance: number
}

interface CourseStatistics {
  totalStudents: number
  approvedStudents: number
  failedStudents: number
  pendingStudents: number
  averageGrade: number
  highestGrade: number
  lowestGrade: number
  attendanceRate: number
}

const mockGradeReports: StudentGradeReport[] = [
  {
    id: "1",
    studentName: "Ana Silva",
    studentNumber: "20240001",
    test1: 15,
    test2: 16,
    exam: 14,
    finalGrade: 15.1,
    status: "approved",
    attendance: 95,
  },
  {
    id: "2",
    studentName: "João Santos",
    studentNumber: "20240002",
    test1: 12,
    test2: 8,
    exam: 11,
    finalGrade: 10.2,
    status: "approved",
    attendance: 88,
  },
  {
    id: "3",
    studentName: "Maria Costa",
    studentNumber: "20240003",
    test1: 8,
    test2: 9,
    exam: 7,
    finalGrade: 7.9,
    status: "failed",
    attendance: 75,
  },
  {
    id: "4",
    studentName: "Pedro Oliveira",
    studentNumber: "20240004",
    test1: 18,
    test2: 17,
    exam: 19,
    finalGrade: 18.1,
    status: "approved",
    attendance: 100,
  },
  {
    id: "5",
    studentName: "Carla Mendes",
    studentNumber: "20240005",
    test1: null,
    test2: 14,
    exam: null,
    finalGrade: null,
    status: "pending",
    attendance: 82,
  },
]

const mockCourses = [
  { id: "1", name: "Programação I", code: "CC101", semester: "1º Semestre" },
  { id: "2", name: "Matemática Discreta", code: "CC102", semester: "1º Semestre" },
  { id: "3", name: "Algoritmos e Estruturas de Dados", code: "CC201", semester: "2º Semestre" },
]

export default function GradeReportsPage() {
  const [selectedCourse, setSelectedCourse] = useState<string>("")
  const [selectedSemester, setSelectedSemester] = useState<string>("")
  const [gradeReports] = useState<StudentGradeReport[]>(mockGradeReports)

  const calculateStatistics = (): CourseStatistics => {
    const totalStudents = gradeReports.length
    const approvedStudents = gradeReports.filter((s) => s.status === "approved").length
    const failedStudents = gradeReports.filter((s) => s.status === "failed").length
    const pendingStudents = gradeReports.filter((s) => s.status === "pending").length

    const validGrades = gradeReports.filter((s) => s.finalGrade !== null).map((s) => s.finalGrade!)
    const averageGrade = validGrades.length > 0 ? validGrades.reduce((a, b) => a + b, 0) / validGrades.length : 0
    const highestGrade = validGrades.length > 0 ? Math.max(...validGrades) : 0
    const lowestGrade = validGrades.length > 0 ? Math.min(...validGrades) : 0

    const attendanceRate = gradeReports.reduce((sum, s) => sum + s.attendance, 0) / totalStudents

    return {
      totalStudents,
      approvedStudents,
      failedStudents,
      pendingStudents,
      averageGrade,
      highestGrade,
      lowestGrade,
      attendanceRate,
    }
  }

  const statistics = calculateStatistics()

  const exportToPDF = () => {
    console.log("Exporting to PDF...")
    // Here you would implement PDF export functionality
  }

  const exportToExcel = () => {
    console.log("Exporting to Excel...")
    // Here you would implement Excel export functionality
  }

  const columns: ColumnDef<StudentGradeReport>[] = [
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
      accessorKey: "test1",
      header: "1º Teste",
      cell: ({ row }) => {
        const grade = row.getValue("test1") as number | null
        return (
          <div className="text-center">
            {grade !== null ? (
              <Badge variant={grade >= 10 ? "default" : "destructive"}>{grade.toFixed(1)}</Badge>
            ) : (
              <Badge variant="secondary">N/A</Badge>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: "test2",
      header: "2º Teste",
      cell: ({ row }) => {
        const grade = row.getValue("test2") as number | null
        return (
          <div className="text-center">
            {grade !== null ? (
              <Badge variant={grade >= 10 ? "default" : "destructive"}>{grade.toFixed(1)}</Badge>
            ) : (
              <Badge variant="secondary">N/A</Badge>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: "exam",
      header: "Exame",
      cell: ({ row }) => {
        const grade = row.getValue("exam") as number | null
        return (
          <div className="text-center">
            {grade !== null ? (
              <Badge variant={grade >= 10 ? "default" : "destructive"}>{grade.toFixed(1)}</Badge>
            ) : (
              <Badge variant="secondary">N/A</Badge>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: "finalGrade",
      header: "Nota Final",
      cell: ({ row }) => {
        const grade = row.getValue("finalGrade") as number | null
        return (
          <div className="text-center">
            {grade !== null ? (
              <Badge variant={grade >= 10 ? "default" : "destructive"} className="font-bold">
                {grade.toFixed(1)}
              </Badge>
            ) : (
              <Badge variant="secondary">Pendente</Badge>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: "attendance",
      header: "Presença",
      cell: ({ row }) => {
        const attendance = row.getValue("attendance") as number
        return (
          <div className="text-center">
            <Badge variant={attendance >= 75 ? "default" : "destructive"}>{attendance}%</Badge>
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        const variants = {
          approved: "default" as const,
          failed: "destructive" as const,
          pending: "secondary" as const,
        }
        const labels = {
          approved: "Aprovado",
          failed: "Reprovado",
          pending: "Pendente",
        }

        return (
          <Badge variant={variants[status as keyof typeof variants]}>{labels[status as keyof typeof labels]}</Badge>
        )
      },
    },
  ]

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatórios de Notas</h1>
          <p className="text-muted-foreground">
            Visualize e exporte relatórios detalhados de desempenho acadêmico dos estudantes
          </p>
        </div>
        <SemesterBadge showProgress />
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros de Relatório
          </CardTitle>
          <CardDescription>Selecione a disciplina e período para gerar o relatório</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        <span className="text-sm text-muted-foreground">{course.code}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Semestre</label>
              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o semestre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1º Semestre 2024</SelectItem>
                  <SelectItem value="2">2º Semestre 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end gap-2">
              <Button onClick={exportToPDF} variant="outline" className="flex-1 bg-transparent">
                <FileText className="w-4 h-4 mr-2" />
                PDF
              </Button>
              <Button onClick={exportToExcel} variant="outline" className="flex-1 bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Excel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedCourse && selectedSemester && (
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="detailed">Relatório Detalhado</TabsTrigger>
            <TabsTrigger value="analytics">Análises</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Estudantes</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{statistics.totalStudents}</div>
                  <p className="text-xs text-muted-foreground">Matriculados na disciplina</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Taxa de Aprovação</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {((statistics.approvedStudents / statistics.totalStudents) * 100).toFixed(1)}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {statistics.approvedStudents} de {statistics.totalStudents} aprovados
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Média da Turma</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{statistics.averageGrade.toFixed(1)}</div>
                  <p className="text-xs text-muted-foreground">Escala de 0 a 20 pontos</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Presença Média</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{statistics.attendanceRate.toFixed(1)}%</div>
                  <p className="text-xs text-muted-foreground">Taxa de comparecimento</p>
                </CardContent>
              </Card>
            </div>

            {/* Performance Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Desempenho</CardTitle>
                <CardDescription>Análise da distribuição de notas na disciplina</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Aprovados (≥10)</span>
                    <span className="text-sm text-muted-foreground">{statistics.approvedStudents} estudantes</span>
                  </div>
                  <Progress value={(statistics.approvedStudents / statistics.totalStudents) * 100} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Reprovados (&lt;10)</span>
                    <span className="text-sm text-muted-foreground">{statistics.failedStudents} estudantes</span>
                  </div>
                  <Progress value={(statistics.failedStudents / statistics.totalStudents) * 100} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Pendentes</span>
                    <span className="text-sm text-muted-foreground">{statistics.pendingStudents} estudantes</span>
                  </div>
                  <Progress value={(statistics.pendingStudents / statistics.totalStudents) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="detailed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Relatório Detalhado de Notas
                </CardTitle>
                <CardDescription>Visualização completa das notas e status de todos os estudantes</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={columns}
                  data={gradeReports}
                  searchKey="studentName"
                  searchPlaceholder="Pesquisar por nome do estudante..."
                  roleTheme="faculty"
                  showExport
                  onExport={exportToExcel}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Estatísticas de Notas</CardTitle>
                  <CardDescription>Análise estatística das avaliações</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{statistics.highestGrade.toFixed(1)}</div>
                      <div className="text-sm text-green-600">Nota Máxima</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">{statistics.lowestGrade.toFixed(1)}</div>
                      <div className="text-sm text-red-600">Nota Mínima</div>
                    </div>
                  </div>

                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{statistics.averageGrade.toFixed(1)}</div>
                    <div className="text-sm text-blue-600">Média Geral</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Análise de Presença</CardTitle>
                  <CardDescription>Correlação entre presença e desempenho</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Presença ≥ 90%</span>
                      <span className="text-sm text-muted-foreground">
                        {gradeReports.filter((s) => s.attendance >= 90).length} estudantes
                      </span>
                    </div>
                    <Progress
                      value={(gradeReports.filter((s) => s.attendance >= 90).length / statistics.totalStudents) * 100}
                      className="h-2"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Presença 75-89%</span>
                      <span className="text-sm text-muted-foreground">
                        {gradeReports.filter((s) => s.attendance >= 75 && s.attendance < 90).length} estudantes
                      </span>
                    </div>
                    <Progress
                      value={
                        (gradeReports.filter((s) => s.attendance >= 75 && s.attendance < 90).length /
                          statistics.totalStudents) *
                        100
                      }
                      className="h-2"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Presença &lt; 75%</span>
                      <span className="text-sm text-muted-foreground">
                        {gradeReports.filter((s) => s.attendance < 75).length} estudantes
                      </span>
                    </div>
                    <Progress
                      value={(gradeReports.filter((s) => s.attendance < 75).length / statistics.totalStudents) * 100}
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
