"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { CreditCard, Calendar, AlertCircle, CheckCircle, Clock, Download } from "lucide-react"

const outstandingPayments = [
  {
    id: 1,
    description: "Monthly Tuition Fee - March 2025",
    amount: 5670,
    dueDate: "2025-03-01",
    status: "overdue",
    type: "tuition",
  },
  {
    id: 2,
    description: "Subject Fee - CS101",
    amount: 945,
    dueDate: "2025-03-15",
    status: "pending",
    type: "subject_fee",
  },
  {
    id: 3,
    description: "Subject Fee - MATH201",
    amount: 945,
    dueDate: "2025-03-15",
    status: "pending",
    type: "subject_fee",
  },
  {
    id: 4,
    description: "Library Fee",
    amount: 500,
    dueDate: "2025-03-20",
    status: "pending",
    type: "other",
  },
]

const paymentHistory = [
  {
    id: 1,
    description: "Monthly Tuition Fee - February 2025",
    amount: 5670,
    paidDate: "2025-02-01",
    method: "MPesa",
    reference: "MP240201001",
    status: "paid",
  },
  {
    id: 2,
    description: "Subject Fee - CS100",
    amount: 945,
    paidDate: "2025-01-15",
    method: "Bank Transfer",
    reference: "BT240115002",
    status: "paid",
  },
  {
    id: 3,
    description: "Monthly Tuition Fee - January 2025",
    amount: 5670,
    paidDate: "2025-01-01",
    method: "MPesa",
    reference: "MP240101003",
    status: "paid",
  },
  {
    id: 4,
    description: "Registration Fee",
    amount: 2000,
    paidDate: "2024-12-15",
    method: "Cash",
    reference: "CSH241215004",
    status: "paid",
  },
]

const semesterSummary = {
  totalFees: 31250,
  paidAmount: 23190,
  outstandingAmount: 8060,
  paymentProgress: 74,
}

export default function FinancePage() {
  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} MT`
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Paid
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "overdue":
        return (
          <Badge variant="destructive">
            <AlertCircle className="h-3 w-3 mr-1" />
            Overdue
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Finance</h1>
        <p className="text-gray-600 mt-1">Manage your payments and financial records</p>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(semesterSummary.totalFees)}</div>
            <p className="text-xs text-muted-foreground">Spring 2025 Semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Amount</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(semesterSummary.paidAmount)}</div>
            <p className="text-xs text-muted-foreground">{semesterSummary.paymentProgress}% completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(semesterSummary.outstandingAmount)}</div>
            <p className="text-xs text-muted-foreground">Due within 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Progress</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{semesterSummary.paymentProgress}%</div>
            <Progress value={semesterSummary.paymentProgress} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="outstanding" className="space-y-6">
        <TabsList>
          <TabsTrigger value="outstanding">Outstanding Payments</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="outstanding" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <span>Outstanding Payments</span>
              </CardTitle>
              <CardDescription>Payments that are due or overdue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {outstandingPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{payment.description}</h4>
                        {getStatusBadge(payment.status)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Due: {new Date(payment.dueDate).toLocaleDateString()}</span>
                        </div>
                        <span className="text-lg font-semibold text-gray-900">{formatCurrency(payment.amount)}</span>
                      </div>
                    </div>
                    <Button className="ml-4">Pay Now</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Payment History</span>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </CardTitle>
              <CardDescription>Your completed payment transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentHistory.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{payment.description}</h4>
                        {getStatusBadge(payment.status)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Paid: {new Date(payment.paidDate).toLocaleDateString()}</span>
                        </div>
                        <span>Method: {payment.method}</span>
                        <span>Ref: {payment.reference}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-green-600">{formatCurrency(payment.amount)}</div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Receipt
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
