"use client"

import { useState } from "react"
import { Search, UserPlus, Eye, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockStudents = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@student.stu.ac.mz",
    studentId: "CS2024001",
    faculty: "Computer Science",
    year: "2nd Year",
    paymentStatus: "paid",
    enrollmentDate: "2024-01-15",
    phone: "+258 84 123 4567",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria.santos@student.stu.ac.mz",
    studentId: "BM2024002",
    faculty: "Business Management",
    year: "1st Year",
    paymentStatus: "partial",
    enrollmentDate: "2024-01-20",
    phone: "+258 85 234 5678",
  },
  {
    id: "3",
    name: "Carlos Mendes",
    email: "carlos.mendes@student.stu.ac.mz",
    studentId: "AC2024003",
    faculty: "Accounting",
    year: "3rd Year",
    paymentStatus: "overdue",
    enrollmentDate: "2023-01-10",
    phone: "+258 86 345 6789",
  },
  {
    id: "4",
    name: "Ana Costa",
    email: "ana.costa@student.stu.ac.mz",
    studentId: "CS2024004",
    faculty: "Computer Science",
    year: "2nd Year",
    paymentStatus: "paid",
    enrollmentDate: "2024-01-18",
    phone: "+258 87 456 7890",
  },
  {
    id: "5",
    name: "Pedro Oliveira",
    email: "pedro.oliveira@student.stu.ac.mz",
    studentId: "BM2024005",
    faculty: "Business Management",
    year: "1st Year",
    paymentStatus: "paid",
    enrollmentDate: "2024-01-25",
    phone: "+258 88 567 8901",
  },
]

export default function StudentsPage() {
  const [students] = useState(mockStudents)
  const [searchTerm, setSearchTerm] = useState("")
  const [facultyFilter, setFacultyFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFaculty = facultyFilter === "all" || student.faculty === facultyFilter
    const matchesPayment = paymentFilter === "all" || student.paymentStatus === paymentFilter

    return matchesSearch && matchesFaculty && matchesPayment
  })

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>
      case "partial":
        return <Badge className="bg-yellow-100 text-yellow-800">Partial</Badge>
      case "overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const stats = {
    total: students.length,
    paid: students.filter((s) => s.paymentStatus === "paid").length,
    partial: students.filter((s) => s.paymentStatus === "partial").length,
    overdue: students.filter((s) => s.paymentStatus === "overdue").length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Student Management</h1>
          <p className="text-gray-600">Manage all students in your faculty</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.paid}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Partial Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.partial}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
          <CardDescription>View and manage all students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={facultyFilter} onValueChange={setFacultyFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by Faculty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Faculties</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Business Management">Business Management</SelectItem>
                <SelectItem value="Accounting">Accounting</SelectItem>
              </SelectContent>
            </Select>
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by Payment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Faculty</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Payment Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono">{student.studentId}</TableCell>
                    <TableCell>{student.faculty}</TableCell>
                    <TableCell>{student.year}</TableCell>
                    <TableCell>{getPaymentBadge(student.paymentStatus)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Actions
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Student
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove Student
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
