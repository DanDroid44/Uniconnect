"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CreditCard, DollarSign, Receipt, Calendar, Download, Eye, AlertCircle } from "lucide-react"

export default function FinancePage() {
  // Mock data - in real app, this would come from your database
  const financialData = {
    totalFees: 45000, // MZN
    paidAmount: 30000,
    pendingAmount: 15000,
    nextDueDate: "2024-02-15",
    paymentHistory: [
      {
        id: 1,
        description: "Propinas 1º Semestre 2024",
        amount: 15000,
        date: "2024-01-15",
        status: "paid",
        method: "Transferência Bancária",
      },
      {
        id: 2,
        description: "Taxa de Matrícula 2024",
        amount: 5000,
        date: "2024-01-10",
        status: "paid",
        method: "M-Pesa",
      },
      {
        id: 3,
        description: "Material Didático",
        amount: 10000,
        date: "2024-01-20",
        status: "paid",
        method: "Transferência Bancária",
      },
      {
        id: 4,
        description: "Propinas 2º Semestre 2024",
        amount: 15000,
        date: "2024-02-15",
        status: "pending",
        method: "-",
      },
    ],
  }

  const paymentProgress = (financialData.paidAmount / financialData.totalFees) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Finanças</h1>
        <p className="text-gray-600 mt-1">Gerencie suas finanças acadêmicas e histórico de pagamentos</p>
      </div>

      {/* Financial Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Anual</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{financialData.totalFees.toLocaleString()} MZN</div>
            <p className="text-xs text-muted-foreground">Ano acadêmico 2024</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Pago</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{financialData.paidAmount.toLocaleString()} MZN</div>
            <p className="text-xs text-muted-foreground">{Math.round(paymentProgress)}% do total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Pendente</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{financialData.pendingAmount.toLocaleString()} MZN</div>
            <p className="text-xs text-muted-foreground">Vencimento: {financialData.nextDueDate}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximo Vencimento</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 Fev</div>
            <p className="text-xs text-muted-foreground">2024</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Progresso de Pagamentos</CardTitle>
          <CardDescription>Acompanhe o progresso dos seus pagamentos anuais</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso Anual</span>
              <span className="font-medium">{Math.round(paymentProgress)}%</span>
            </div>
            <Progress value={paymentProgress} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Pago</p>
              <p className="font-semibold text-green-600">{financialData.paidAmount.toLocaleString()} MZN</p>
            </div>
            <div>
              <p className="text-muted-foreground">Restante</p>
              <p className="font-semibold text-orange-600">{financialData.pendingAmount.toLocaleString()} MZN</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Histórico de Pagamentos</CardTitle>
              <CardDescription>Todos os seus pagamentos e transações</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {financialData.paymentHistory.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      payment.status === "paid" ? "bg-green-100" : "bg-orange-100"
                    }`}
                  >
                    {payment.status === "paid" ? (
                      <CreditCard className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-orange-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{payment.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {payment.date} • {payment.method}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-semibold">{payment.amount.toLocaleString()} MZN</p>
                    <Badge variant={payment.status === "paid" ? "success" : "warning"} className="text-xs">
                      {payment.status === "paid" ? "Pago" : "Pendente"}
                    </Badge>
                  </div>

                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Métodos de Pagamento</CardTitle>
          <CardDescription>Formas disponíveis para efetuar pagamentos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Transferência Bancária</h4>
              <p className="text-sm text-muted-foreground mb-3">Transfira diretamente para a conta da universidade</p>
              <div className="space-y-1 text-xs">
                <p>
                  <strong>Banco:</strong> Millennium BIM
                </p>
                <p>
                  <strong>Conta:</strong> 0001234567890
                </p>
                <p>
                  <strong>NIB:</strong> 0001 0000 1234567890 123
                </p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">M-Pesa</h4>
              <p className="text-sm text-muted-foreground mb-3">Pagamento via carteira móvel M-Pesa</p>
              <div className="space-y-1 text-xs">
                <p>
                  <strong>Número:</strong> +258 84 123 4567
                </p>
                <p>
                  <strong>Nome:</strong> Universidade São Tomás
                </p>
                <p>
                  <strong>Referência:</strong> Seu número de estudante
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
