"use client"

import { useState } from "react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, ChevronLeft, ChevronRight, Settings2, Download, Filter } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: string
  searchPlaceholder?: string
  roleTheme?: "student" | "faculty" | "admin"
  title?: string
  description?: string
  showExport?: boolean
  onExport?: () => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Pesquisar...",
  roleTheme = "student",
  title,
  description,
  showExport = false,
  onExport,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const getThemeColors = () => {
    switch (roleTheme) {
      case "student":
        return {
          primary: "bg-green-600 hover:bg-green-700 text-white",
          secondary: "border-green-200 focus:border-green-500 focus:ring-green-500",
          badge: "bg-green-100 text-green-800 border-green-200",
          accent: "text-green-600",
        }
      case "faculty":
        return {
          primary: "bg-blue-600 hover:bg-blue-700 text-white",
          secondary: "border-blue-200 focus:border-blue-500 focus:ring-blue-500",
          badge: "bg-blue-100 text-blue-800 border-blue-200",
          accent: "text-blue-600",
        }
      case "admin":
        return {
          primary: "bg-violet-600 hover:bg-violet-700 text-white",
          secondary: "border-violet-200 focus:border-violet-500 focus:ring-violet-500",
          badge: "bg-violet-100 text-violet-800 border-violet-200",
          accent: "text-violet-600",
        }
      default:
        return {
          primary: "bg-gray-600 hover:bg-gray-700 text-white",
          secondary: "border-gray-200 focus:border-gray-500 focus:ring-gray-500",
          badge: "bg-gray-100 text-gray-800 border-gray-200",
          accent: "text-gray-600",
        }
    }
  }

  const themeColors = getThemeColors()

  return (
    <div className="space-y-4">
      {/* Header */}
      {(title || description) && (
        <div className="space-y-2">
          {title && <h2 className="text-2xl font-bold tracking-tight">{title}</h2>}
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1 w-full sm:w-auto">
          {searchKey && (
            <div className="relative flex-1 min-w-0 sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={searchPlaceholder}
                value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                onChange={(event) => table.getColumn(searchKey)?.setFilterValue(event.target.value)}
                className={`pl-10 ${themeColors.secondary}`}
              />
            </div>
          )}

          <div className="flex gap-2">
            {/* Column visibility */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-10 bg-transparent">
                  <Settings2 className="h-4 w-4 mr-2" />
                  Colunas
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Export button */}
            {showExport && (
              <Button variant="outline" size="sm" onClick={onExport} className="h-10 bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className={themeColors.badge}>
            {table.getFilteredRowModel().rows.length} resultado(s)
          </Badge>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-gray-50/50">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="font-semibold text-gray-900">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2 text-gray-500">
                      <Filter className="h-8 w-8" />
                      <p>Nenhum resultado encontrado.</p>
                      <p className="text-sm">Tente ajustar os filtros de pesquisa.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 py-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>
            {table.getFilteredSelectedRowModel().rows.length} de {table.getFilteredRowModel().rows.length} linha(s)
            selecionada(s)
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Página</span>
            <strong>
              {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
            </strong>
          </div>

          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
