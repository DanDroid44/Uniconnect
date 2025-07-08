"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Filter, UserPlus, Mail, Phone, MapPin, Calendar, CheckCircle, XCircle } from "lucide-react"

const students = [
  {
    id: "CS2024001",
    name: "Daniel Darsamo",
    email: "daniel.darsamo@stu.edu.mz",
    phone: "+258 84 123 4567",
    address: "Maputo, Mozambique",
    enrollmentDate: "2024-01-15",
    year: "2nd Year",
    gpa: 3.37,
    paymentStatus: "paid",
    totalFees: 31250,
    paidAmount: 23190,
    outstandingAmount: 8060,
    courses: ["CS101", "MATH201", "ENG202", "PSYC101", "HIST105", "PHIL101"],
  },
  {
    id: "CS2024002",
    name: "Ana Costa Silva",
    email: "ana.costa@stu.edu.mz",
    phone: "+258 84 234 5678",
    address: "Beira, Mozambique",
    enrollmentDate: "2024-01-15",
    year: "2nd Year",
    gpa: 3.65,
    paymentStatus: "partial",
    totalFees: 31250,
    paidAmount: 15625,
    outstandingAmount: 15625,
    courses: ["CS101", "MATH201", "ENG202", "PSYC101", "HIST105"],
  },
  {
    id: "CS2024003",
    name: "Carlos Mendes",
    email: "carlos.mendes@stu.edu.mz",
    phone: "+258 84 345 6789",
    address: "Nampula, Mozambique",
    enrollmentDate: "2024-01-15",
    year: "2nd Year",
    gpa: 3.12,
    paymentStatus: "overdue",
    totalFees: 31250,
    paidAmount: 5670,
    outstandingAmount: 25580,
    courses: ["CS101", "MATH201", "ENG202", "PSYC101"],
  },
  {
    id: "CS2023001",
    name: "Isabel Rodrigues",
    email: "isabel.rodrigues@stu.edu.mz",
    phone: "+258 84 456 7890",
    address: "Quelimane, Mozambique",
    enrollmentDate: "2023-01-15",
    year: "3rd Year",
    gpa: 3.78,
    paymentStatus: "paid",
    totalFees: 31250,
    paidAmount: 31250,
    outstandingAmount: 0,
    courses: ["CS301", "CS302", "MATH301", "ENG301", "PROJ301"],
  },
  {
    id: "CS2023002",
    name: "António Pereira",
    email: "antonio.pereira@stu.edu.mz",
    phone: "+258 84 567 8901",
    address: "Tete, Mozambique",
    enrollmentDate: "2023-01-15",
    year: "3rd Year",
    gpa: 3.45,
    paymentStatus: "partial",
    totalFees: 31250,
    paidAmount: 20000,
    outstandingAmount: 11250,
    courses: ["CS301", "CS302", "MATH301", "ENG301"],
  },
]

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())

    if (selectedTab === "all") return matchesSearch
    if (selectedTab === "paid") return matchesSearch && student.paymentStatus === "paid"
    if (selectedTab === "partial") return matchesSearch && student.paymentStatus === "partial"
    if (selectedTab === "overdue") return matchesSearch && student.paymentStatus === "overdue"

    return matchesSearch
  })

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Paid
          </Badge>
        )
      case "partial":
        return <Badge variant="secondary">Partial</Badge>
      case "overdue":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Overdue
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} MT`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Students Management</h1>
          <p className="text-gray-600 mt-1">Computer Science Faculty - Manage student records and payments</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="h-4 w-4 mr-2" />
          Add New Student
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search students by name, ID, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">Computer Science Faculty</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Fees</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.filter((s) => s.paymentStatus === "paid").length}</div>
            <p className="text-xs text-muted-foreground">Students with full payment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Partial Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.filter((s) => s.paymentStatus === "partial").length}</div>
            <p className="text-xs text-muted-foreground">Students with partial payment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.filter((s) => s.paymentStatus === "overdue").length}</div>
            <p className="text-xs text-muted-foreground">Students with overdue payments</p>
          </CardContent>
        </Card>
      </div>

      {/* Students List */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">All Students ({students.length})</TabsTrigger>
          <TabsTrigger value="paid">Paid ({students.filter((s) => s.paymentStatus === "paid").length})</TabsTrigger>
          <TabsTrigger value="partial">
            Partial ({students.filter((s) => s.paymentStatus === "partial").length})
          </TabsTrigger>
          <TabsTrigger value="overdue">
            Overdue ({students.filter((s) => s.paymentStatus === "overdue").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold">{student.name}</h3>
                        <Badge variant="outline">{student.id}</Badge>
                        <Badge variant="secondary">{student.year}</Badge>
                        {getPaymentStatusBadge(student.paymentStatus)}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <span>{student.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <span>{student.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{student.address}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">GPA:</span>
                          <span className="ml-2">{student.gpa.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="font-medium">Courses:</span>
                          <span className="ml-2">{student.courses.length} enrolled</span>
                        </div>
                        <div>
                          <span className="font-medium">Outstanding:</span>
                          <span
                            className={`ml-2 ${student.outstandingAmount > 0 ? "text-red-600 font-semibold" : "text-green-600"}`}
                          >
                            {formatCurrency(student.outstandingAmount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm">
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
