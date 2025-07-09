"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DataTable } from "@/components/ui/data-table"
import { SemesterBadge } from "@/components/ui/semester-badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Plus, UserPlus, UserMinus, Crown, Clock, CheckCircle, AlertCircle, Search } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

interface GroupMember {
  id: string
  name: string
  studentNumber: string
  email: string
  role: "leader" | "member"
  joinDate: string
  status: "active" | "pending" | "left"
}

interface StudentGroup {
  id: string
  name: string
  description: string
  course: string
  maxMembers: number
  currentMembers: number
  leader: GroupMember
  members: GroupMember[]
  isPublic: boolean
  requiresApproval: boolean
  createdDate: string
  status: "active" | "inactive" | "full"
}

interface JoinRequest {
  id: string
  studentId: string
  studentName: string
  studentNumber: string
  groupId: string
  groupName: string
  requestDate: string
  message: string
  status: "pending" | "approved" | "rejected"
}

const mockGroups: StudentGroup[] = [
  {
    id: "1",
    name: "Algoritmos Avançados",
    description: "Grupo de estudo focado em algoritmos complexos e estruturas de dados avançadas",
    course: "Algoritmos e Estruturas de Dados",
    maxMembers: 5,
    currentMembers: 4,
    leader: {
      id: "1",
      name: "Ana Silva",
      studentNumber: "20240001",
      email: "ana.silva@ust.ac.mz",
      role: "leader",
      joinDate: "2024-02-15",
      status: "active",
    },
    members: [
      {
        id: "2",
        name: "João Santos",
        studentNumber: "20240002",
        email: "joao.santos@ust.ac.mz",
        role: "member",
        joinDate: "2024-02-16",
        status: "active",
      },
      {
        id: "3",
        name: "Maria Costa",
        studentNumber: "20240003",
        email: "maria.costa@ust.ac.mz",
        role: "member",
        joinDate: "2024-02-17",
        status: "active",
      },
      {
        id: "4",
        name: "Pedro Oliveira",
        studentNumber: "20240004",
        email: "pedro.oliveira@ust.ac.mz",
        role: "member",
        joinDate: "2024-02-18",
        status: "active",
      },
    ],
    isPublic: true,
    requiresApproval: true,
    createdDate: "2024-02-15",
    status: "active",
  },
  {
    id: "2",
    name: "Base de Dados Práticos",
    description: "Grupo para projetos práticos de base de dados e SQL",
    course: "Base de Dados",
    maxMembers: 5,
    currentMembers: 3,
    leader: {
      id: "5",
      name: "Carla Mendes",
      studentNumber: "20240005",
      email: "carla.mendes@ust.ac.mz",
      role: "leader",
      joinDate: "2024-02-20",
      status: "active",
    },
    members: [
      {
        id: "6",
        name: "Ricardo Silva",
        studentNumber: "20240006",
        email: "ricardo.silva@ust.ac.mz",
        role: "member",
        joinDate: "2024-02-21",
        status: "active",
      },
      {
        id: "7",
        name: "Sofia Costa",
        studentNumber: "20240007",
        email: "sofia.costa@ust.ac.mz",
        role: "member",
        joinDate: "2024-02-22",
        status: "active",
      },
    ],
    isPublic: false,
    requiresApproval: true,
    createdDate: "2024-02-20",
    status: "active",
  },
]

const mockJoinRequests: JoinRequest[] = [
  {
    id: "1",
    studentId: "8",
    studentName: "Miguel Santos",
    studentNumber: "20240008",
    groupId: "1",
    groupName: "Algoritmos Avançados",
    requestDate: "2024-03-15",
    message: "Gostaria de participar do grupo para melhorar meus conhecimentos em algoritmos.",
    status: "pending",
  },
  {
    id: "2",
    studentId: "9",
    studentName: "Lucia Pereira",
    studentNumber: "20240009",
    groupId: "2",
    groupName: "Base de Dados Práticos",
    requestDate: "2024-03-14",
    message: "Tenho interesse em projetos práticos de base de dados.",
    status: "pending",
  },
]

export default function StudentGroupsPage() {
  const [groups, setGroups] = useState<StudentGroup[]>(mockGroups)
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>(mockJoinRequests)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
    course: "",
    maxMembers: 5,
    isPublic: true,
    requiresApproval: true,
  })

  const handleCreateGroup = () => {
    const group: StudentGroup = {
      id: Date.now().toString(),
      ...newGroup,
      currentMembers: 1,
      leader: {
        id: "current-user",
        name: "Usuário Atual",
        studentNumber: "20240000",
        email: "user@ust.ac.mz",
        role: "leader",
        joinDate: new Date().toISOString().split("T")[0],
        status: "active",
      },
      members: [],
      createdDate: new Date().toISOString().split("T")[0],
      status: "active",
    }

    setGroups((prev) => [...prev, group])
    setNewGroup({
      name: "",
      description: "",
      course: "",
      maxMembers: 5,
      isPublic: true,
      requiresApproval: true,
    })
    setIsCreateDialogOpen(false)
  }

  const handleJoinRequest = (requestId: string, action: "approve" | "reject") => {
    setJoinRequests((prev) =>
      prev.map((request) => {
        if (request.id === requestId) {
          return {
            ...request,
            status: action === "approve" ? "approved" : "rejected",
          }
        }
        return request
      }),
    )

    if (action === "approve") {
      const request = joinRequests.find((r) => r.id === requestId)
      if (request) {
        setGroups((prev) =>
          prev.map((group) => {
            if (group.id === request.groupId && group.currentMembers < group.maxMembers) {
              const newMember: GroupMember = {
                id: request.studentId,
                name: request.studentName,
                studentNumber: request.studentNumber,
                email: `${request.studentName.toLowerCase().replace(" ", ".")}@ust.ac.mz`,
                role: "member",
                joinDate: new Date().toISOString().split("T")[0],
                status: "active",
              }
              return {
                ...group,
                members: [...group.members, newMember],
                currentMembers: group.currentMembers + 1,
                status: group.currentMembers + 1 >= group.maxMembers ? "full" : "active",
              }
            }
            return group
          }),
        )
      }
    }
  }

  const leaveGroup = (groupId: string, memberId: string) => {
    setGroups((prev) =>
      prev.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            members: group.members.filter((m) => m.id !== memberId),
            currentMembers: group.currentMembers - 1,
            status: "active",
          }
        }
        return group
      }),
    )
  }

  const groupColumns: ColumnDef<StudentGroup>[] = [
    {
      accessorKey: "name",
      header: "Nome do Grupo",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.getValue("name")}</div>
          <div className="text-sm text-muted-foreground">{row.original.course}</div>
        </div>
      ),
    },
    {
      accessorKey: "leader",
      header: "Líder",
      cell: ({ row }) => {
        const leader = row.getValue("leader") as GroupMember
        return (
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                {leader.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-sm">{leader.name}</div>
              <div className="text-xs text-muted-foreground">{leader.studentNumber}</div>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "currentMembers",
      header: "Membros",
      cell: ({ row }) => {
        const current = row.getValue("currentMembers") as number
        const max = row.original.maxMembers
        return (
          <div className="text-center">
            <Badge variant={current >= max ? "destructive" : "default"}>
              {current}/{max}
            </Badge>
          </div>
        )
      },
    },
    {
      accessorKey: "isPublic",
      header: "Visibilidade",
      cell: ({ row }) => {
        const isPublic = row.getValue("isPublic") as boolean
        return <Badge variant={isPublic ? "default" : "secondary"}>{isPublic ? "Público" : "Privado"}</Badge>
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        const variants = {
          active: "default" as const,
          full: "secondary" as const,
          inactive: "destructive" as const,
        }
        const labels = {
          active: "Ativo",
          full: "Completo",
          inactive: "Inativo",
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
        const group = row.original
        const canJoin = group.status === "active" && group.currentMembers < group.maxMembers

        return (
          <div className="flex space-x-2">
            {canJoin ? (
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <UserPlus className="w-4 h-4 mr-1" />
                Solicitar
              </Button>
            ) : (
              <Button size="sm" variant="outline" disabled>
                Completo
              </Button>
            )}
          </div>
        )
      },
    },
  ]

  const requestColumns: ColumnDef<JoinRequest>[] = [
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
      accessorKey: "groupName",
      header: "Grupo",
      cell: ({ row }) => <div className="font-medium">{row.getValue("groupName")}</div>,
    },
    {
      accessorKey: "message",
      header: "Mensagem",
      cell: ({ row }) => {
        const message = row.getValue("message") as string
        return (
          <div className="max-w-xs truncate" title={message}>
            {message}
          </div>
        )
      },
    },
    {
      accessorKey: "requestDate",
      header: "Data",
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
              onClick={() => handleJoinRequest(request.id, "approve")}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Aprovar
            </Button>
            <Button size="sm" variant="destructive" onClick={() => handleJoinRequest(request.id, "reject")}>
              <AlertCircle className="w-4 h-4 mr-1" />
              Rejeitar
            </Button>
          </div>
        )
      },
    },
  ]

  const myGroups = groups.filter(
    (g) => g.leader.id === "current-user" || g.members.some((m) => m.id === "current-user"),
  )

  const availableGroups = groups.filter(
    (g) =>
      g.isPublic &&
      g.status === "active" &&
      g.leader.id !== "current-user" &&
      !g.members.some((m) => m.id === "current-user"),
  )

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Grupos de Estudantes</h1>
          <p className="text-muted-foreground">
            Crie e participe de grupos de estudo colaborativos (máximo 5 membros por grupo)
          </p>
        </div>
        <div className="flex items-center gap-4">
          <SemesterBadge />
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Criar Grupo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Criar Novo Grupo</DialogTitle>
                <DialogDescription>Crie um grupo de estudo para colaborar com outros estudantes</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="groupName">Nome do Grupo</Label>
                  <Input
                    id="groupName"
                    placeholder="Ex: Algoritmos Avançados"
                    value={newGroup.name}
                    onChange={(e) => setNewGroup((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course">Disciplina</Label>
                  <Select
                    value={newGroup.course}
                    onValueChange={(value) => setNewGroup((prev) => ({ ...prev, course: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma disciplina" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Programação I">Programação I</SelectItem>
                      <SelectItem value="Algoritmos e Estruturas de Dados">Algoritmos e Estruturas de Dados</SelectItem>
                      <SelectItem value="Base de Dados">Base de Dados</SelectItem>
                      <SelectItem value="Matemática Discreta">Matemática Discreta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva o objetivo do grupo..."
                    value={newGroup.description}
                    onChange={(e) => setNewGroup((prev) => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxMembers">Máximo de Membros</Label>
                  <Select
                    value={newGroup.maxMembers.toString()}
                    onValueChange={(value) => setNewGroup((prev) => ({ ...prev, maxMembers: Number.parseInt(value) }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 membros</SelectItem>
                      <SelectItem value="4">4 membros</SelectItem>
                      <SelectItem value="5">5 membros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button
                  onClick={handleCreateGroup}
                  disabled={!newGroup.name || !newGroup.course || !newGroup.description}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Criar Grupo
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meus Grupos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{myGroups.length}</div>
            <p className="text-xs text-muted-foreground">Grupos que participo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Grupos Disponíveis</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{availableGroups.length}</div>
            <p className="text-xs text-muted-foreground">Grupos públicos para participar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solicitações</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {joinRequests.filter((r) => r.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">Pendentes de aprovação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Liderança</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {groups.filter((g) => g.leader.id === "current-user").length}
            </div>
            <p className="text-xs text-muted-foreground">Grupos que lidero</p>
          </CardContent>
        </Card>
      </div>

      {/* My Groups */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Meus Grupos
          </CardTitle>
          <CardDescription>Grupos dos quais você participa como líder ou membro</CardDescription>
        </CardHeader>
        <CardContent>
          {myGroups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myGroups.map((group) => (
                <Card key={group.id} className="border-l-4 border-l-green-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                        <CardDescription className="text-sm">{group.course}</CardDescription>
                      </div>
                      <Badge variant={group.status === "active" ? "default" : "secondary"}>
                        {group.currentMembers}/{group.maxMembers}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{group.description}</p>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Crown className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium">Líder:</span>
                        <span className="text-sm">{group.leader.name}</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {group.members.map((member) => (
                          <div
                            key={member.id}
                            className="flex items-center space-x-1 bg-gray-100 rounded-full px-2 py-1"
                          >
                            <Avatar className="h-5 w-5">
                              <AvatarFallback className="text-xs">
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs">{member.name.split(" ")[0]}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t">
                      <div className="flex space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {group.isPublic ? "Público" : "Privado"}
                        </Badge>
                        {group.requiresApproval && (
                          <Badge variant="outline" className="text-xs">
                            Requer Aprovação
                          </Badge>
                        )}
                      </div>

                      {group.leader.id !== "current-user" && (
                        <Button size="sm" variant="outline" onClick={() => leaveGroup(group.id, "current-user")}>
                          <UserMinus className="w-4 h-4 mr-1" />
                          Sair
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum grupo</h3>
              <p className="mt-1 text-sm text-gray-500">
                Você ainda não participa de nenhum grupo. Crie um novo ou participe de um existente.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Groups */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Grupos Disponíveis
          </CardTitle>
          <CardDescription>Grupos públicos que você pode solicitar para participar</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={groupColumns}
            data={availableGroups}
            searchKey="name"
            searchPlaceholder="Pesquisar grupos..."
            roleTheme="student"
            showExport={false}
          />
        </CardContent>
      </Card>

      {/* Join Requests Management */}
      {groups.some((g) => g.leader.id === "current-user") && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Solicitações de Participação
            </CardTitle>
            <CardDescription>Gerencie solicitações para participar dos grupos que você lidera</CardDescription>
          </CardHeader>
          <CardContent>
            {joinRequests.length > 0 ? (
              <DataTable
                columns={requestColumns}
                data={joinRequests}
                searchKey="studentName"
                searchPlaceholder="Pesquisar por nome do estudante..."
                roleTheme="student"
              />
            ) : (
              <div className="text-center py-8">
                <Clock className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma solicitação</h3>
                <p className="mt-1 text-sm text-gray-500">Não há solicitações pendentes para seus grupos.</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Guidelines */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Diretrizes dos Grupos:</strong> Cada grupo pode ter no máximo 5 membros. Grupos privados requerem
          aprovação do líder para novos membros. Mantenha um ambiente respeitoso e colaborativo.
        </AlertDescription>
      </Alert>
    </div>
  )
}
