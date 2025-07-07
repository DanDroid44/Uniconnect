"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, MapPin, User, Calendar } from "lucide-react"

const currentSemesterSchedule = [
  {
    day: "Monday",
    classes: [
      {
        time: "09:30 - 11:00",
        course: "Introduction to Computer Science",
        code: "CS101",
        room: "Building A, Room 203",
        instructor: "Prof. Maria Santos",
      },
      {
        time: "14:00 - 15:30",
        course: "Calculus II",
        code: "MATH201",
        room: "Building B, Room 105",
        instructor: "Dr. João Silva",
      },
    ],
  },
  {
    day: "Tuesday",
    classes: [
      {
        time: "10:00 - 11:30",
        course: "Technical Writing",
        code: "ENG202",
        room: "Building C, Room 301",
        instructor: "Prof. Ana Costa",
      },
      {
        time: "15:00 - 16:30",
        course: "Introduction to Psychology",
        code: "PSYC101",
        room: "Building A, Room 150",
        instructor: "Dr. Carlos Mendes",
      },
    ],
  },
  {
    day: "Wednesday",
    classes: [
      {
        time: "09:30 - 11:00",
        course: "Introduction to Computer Science",
        code: "CS101",
        room: "Building A, Room 203",
        instructor: "Prof. Maria Santos",
      },
      {
        time: "13:00 - 14:30",
        course: "World History",
        code: "HIST105",
        room: "Building D, Room 201",
        instructor: "Prof. Isabel Rodrigues",
      },
    ],
  },
  {
    day: "Thursday",
    classes: [
      {
        time: "11:00 - 12:30",
        course: "Calculus II",
        code: "MATH201",
        room: "Building B, Room 105",
        instructor: "Dr. João Silva",
      },
      {
        time: "14:30 - 16:00",
        course: "Technical Writing",
        code: "ENG202",
        room: "Building C, Room 301",
        instructor: "Prof. Ana Costa",
      },
    ],
  },
  {
    day: "Friday",
    classes: [
      {
        time: "10:00 - 11:30",
        course: "Introduction to Psychology",
        code: "PSYC101",
        room: "Building A, Room 150",
        instructor: "Dr. Carlos Mendes",
      },
      {
        time: "15:00 - 16:30",
        course: "World History",
        code: "HIST105",
        room: "Building D, Room 201",
        instructor: "Prof. Isabel Rodrigues",
      },
    ],
  },
]

const previousSemesters = [
  {
    semester: "Fall 2024",
    courses: [
      { code: "MATH101", name: "Calculus I", grade: "A", credits: 4, status: "Passed" },
      { code: "CS100", name: "Programming Fundamentals", grade: "A-", credits: 3, status: "Passed" },
      { code: "ENG101", name: "English Composition", grade: "B+", credits: 3, status: "Passed" },
      { code: "PHYS101", name: "Physics I", grade: "B", credits: 4, status: "Passed" },
      { code: "PHIL101", name: "Introduction to Philosophy", grade: "A", credits: 2, status: "Passed" },
    ],
  },
  {
    semester: "Spring 2024",
    courses: [
      { code: "MATH102", name: "Linear Algebra", grade: "A-", credits: 3, status: "Passed" },
      { code: "CS150", name: "Data Structures", grade: "B+", credits: 4, status: "Passed" },
      { code: "STAT101", name: "Statistics", grade: "A", credits: 3, status: "Passed" },
      { code: "ECON101", name: "Microeconomics", grade: "B", credits: 3, status: "Passed" },
      { code: "PORT101", name: "Portuguese Language", grade: "A", credits: 2, status: "Passed" },
    ],
  },
]

export default function SchedulePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Schedule</h1>
        <p className="text-gray-600 mt-1">View your current and previous semester schedules</p>
      </div>

      <Tabs defaultValue="current" className="space-y-6">
        <TabsList>
          <TabsTrigger value="current">Current Semester</TabsTrigger>
          <TabsTrigger value="previous">Previous Semesters</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Spring 2025 - Weekly Schedule</span>
              </CardTitle>
              <CardDescription>Your current semester class schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {currentSemesterSchedule.map((day) => (
                  <div key={day.day} className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900">{day.day}</h3>
                    <div className="grid gap-3">
                      {day.classes.map((classItem, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-gray-900">{classItem.course}</h4>
                              <Badge variant="outline">{classItem.code}</Badge>
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="previous" className="space-y-6">
          {previousSemesters.map((semester) => (
            <Card key={semester.semester}>
              <CardHeader>
                <CardTitle>{semester.semester}</CardTitle>
                <CardDescription>
                  Completed courses - Total Credits: {semester.courses.reduce((sum, course) => sum + course.credits, 0)}
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
                        <p className="text-sm text-gray-600 mt-1">{course.credits} credits</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge
                          variant={course.status === "Passed" ? "default" : "destructive"}
                          className={course.status === "Passed" ? "bg-green-100 text-green-800" : ""}
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
      </Tabs>
    </div>
  )
}
