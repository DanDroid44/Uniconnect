"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, MapPin, Users } from "lucide-react"

const courses = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Computer Science",
    instructor: "Dr. Maria Santos",
    credits: 3,
    semester: "Spring 2025",
    schedule: "Mon/Wed 09:30-11:00",
    room: "Building A, Room 203",
    progress: 65,
    grade: "B+",
    status: "In Progress",
  },
  {
    id: 2,
    code: "MATH201",
    name: "Calculus II",
    instructor: "Prof. João Silva",
    credits: 4,
    semester: "Spring 2025",
    schedule: "Tue/Thu 14:00-15:30",
    room: "Building B, Room 105",
    progress: 72,
    grade: "A-",
    status: "In Progress",
  },
  {
    id: 3,
    code: "ENG202",
    name: "Technical Writing",
    instructor: "Dr. Ana Costa",
    credits: 2,
    semester: "Spring 2025",
    schedule: "Fri 10:00-12:00",
    room: "Building C, Room 301",
    progress: 58,
    grade: "B",
    status: "In Progress",
  },
  {
    id: 4,
    code: "PSYC101",
    name: "Introduction to Psychology",
    instructor: "Dr. Carlos Mendes",
    credits: 3,
    semester: "Spring 2025",
    schedule: "Mon/Wed 15:00-16:30",
    room: "Building A, Room 105",
    progress: 80,
    grade: "A",
    status: "In Progress",
  },
  {
    id: 5,
    code: "HIST105",
    name: "World History",
    instructor: "Prof. Isabel Rodrigues",
    credits: 3,
    semester: "Spring 2025",
    schedule: "Tue/Thu 10:00-11:30",
    room: "Building B, Room 201",
    progress: 45,
    grade: "C+",
    status: "In Progress",
  },
  {
    id: 6,
    code: "PHIL101",
    name: "Introduction to Philosophy",
    instructor: "Dr. António Pereira",
    credits: 3,
    semester: "Spring 2025",
    schedule: "Wed/Fri 13:00-14:30",
    room: "Building C, Room 205",
    progress: 90,
    grade: "A+",
    status: "In Progress",
  },
]

export default function CoursesPage() {
  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0)
  const averageProgress = Math.round(courses.reduce((sum, course) => sum + course.progress, 0) / courses.length)
  const completedCourses = courses.filter((course) => course.progress === 100).length
  const inProgressCourses = courses.filter((course) => course.progress < 100).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
        <p className="text-gray-600 mt-1">Spring 2025 Semester - Computer Science Program</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCredits}</div>
            <p className="text-xs text-muted-foreground">Credit hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageProgress}%</div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressCourses}</div>
            <p className="text-xs text-muted-foreground">Active courses</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Badge variant="outline">{course.code}</Badge>
                    <span className="text-lg">{course.name}</span>
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {course.instructor} • {course.credits} credit{course.credits !== 1 ? "s" : ""}
                  </CardDescription>
                </div>
                <Badge
                  variant={
                    course.grade.startsWith("A") ? "default" : course.grade.startsWith("B") ? "secondary" : "outline"
                  }
                  className={
                    course.grade.startsWith("A")
                      ? "bg-green-100 text-green-800"
                      : course.grade.startsWith("B")
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                  }
                >
                  {course.grade}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Course Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{course.schedule}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{course.room}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <Badge variant="outline" className="text-xs">
                  {course.status}
                </Badge>
                <span className="text-sm text-gray-500">{course.semester}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
