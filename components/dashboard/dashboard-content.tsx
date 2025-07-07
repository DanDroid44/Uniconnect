"use client"

import type { User } from "@supabase/supabase-js"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, BookOpen, Bell, DollarSign, Clock, MapPin, AlertCircle } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { useLanguage } from "@/hooks/use-language"

const gradeData = [
  { subject: "CS101", grade: 95 },
  { subject: "MATH201", grade: 88 },
  { subject: "ENG202", grade: 92 },
  { subject: "PSYC101", grade: 96 },
  { subject: "HIST105", grade: 85 },
]

interface DashboardContentProps {
  user: User
}

export function DashboardContent({ user }: DashboardContentProps) {
  const { t } = useLanguage()
  const userName = user.user_metadata?.full_name || "Student"
  const firstName = userName.split(" ")[0]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {t("welcomeBack")}, {firstName}!
        </h1>
        <p className="text-gray-600 mt-1">{t("academicActivities")}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("upcomingClasses")}</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">{t("nextClass")} 1hr 20min</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("assignmentsDue")}</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              {t("nextDue")} 2 {t("days")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("newAnnouncements")}</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">2 {t("highPriority")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("balanceDue")}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">31,250 MT</div>
            <p className="text-xs text-muted-foreground">
              {t("dueIn")} 14 {t("days")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Classes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{"Today's Classes"}</CardTitle>
            <Button variant="outline" size="sm">
              View Full Schedule
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-4 p-3 rounded-lg border">
              <div className="flex-1">
                <h4 className="font-medium">Introduction to Computer Science</h4>
                <p className="text-sm text-gray-600">CS101</p>
                <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>09:30 - 11:00</span>
                </div>
                <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span>Building A, Room 203</span>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-3 rounded-lg border">
              <div className="flex-1">
                <h4 className="font-medium">Calculus II</h4>
                <p className="text-sm text-gray-600">MATH201</p>
                <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>12:30 - 14:00</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Assignments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upcoming Assignments</CardTitle>
            <Button variant="outline" size="sm">
              View All Assignments
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between p-3 rounded-lg border">
                <div className="flex-1">
                  <h4 className="font-medium">Problem Set 3</h4>
                  <p className="text-sm text-gray-600">Calculus II (MATH201)</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">May 22, 2025</span>
                    <Badge variant="destructive" className="text-xs">
                      2 days left
                    </Badge>
                  </div>
                  <Progress value={75} className="mt-2" />
                  <p className="text-xs text-gray-500 mt-1">75% complete</p>
                </div>
              </div>

              <div className="flex items-start justify-between p-3 rounded-lg border">
                <div className="flex-1">
                  <h4 className="font-medium">Research Paper</h4>
                  <p className="text-sm text-gray-600">History (HIST105)</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">May 25, 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Announcements */}
        <Card>
          <CardHeader>
            <CardTitle>Announcements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3 p-3 rounded-lg border-l-4 border-l-red-500 bg-red-50">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-red-900">Important update on final exam schedule</h4>
                <p className="text-sm text-red-700 mt-1">Academic Affairs • 1h ago</p>
              </div>
              <Badge variant="destructive">High</Badge>
            </div>

            <div className="flex items-start space-x-3 p-3 rounded-lg border-l-4 border-l-yellow-500 bg-yellow-50">
              <Bell className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-yellow-900">Library hours extended for exam week</h4>
                <p className="text-sm text-yellow-700 mt-1">Library Services • 3h ago</p>
              </div>
              <Badge variant="secondary">Medium</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Academic Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Academic Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold">87.4%</h3>
                <p className="text-sm text-gray-600">Current GPA: 3.37</p>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={gradeData}>
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Bar dataKey="grade" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Registration Status</CardTitle>
              <CardDescription>Spring 2025 Semester</CardDescription>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Add/Drop Classes</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Status:</p>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  Registered
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600">Credits:</p>
                <p className="font-medium">15 credit hours</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Academic Standing:</p>
              <p className="font-medium">Good Standing</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
