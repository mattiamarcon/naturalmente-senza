"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useContext, useEffect, useState } from "react"
import { createSupabaseClient } from "@/utils/supabase/client"
import { UserProvider } from "@/app/components/backOffice/user-provider"


export type Utenti = {
  ruolo: string
  stato: "approvato" | "non approvato"
  email: string
}



async function gestisiciStato(email:string,stato:string){
    const db = createSupabaseClient();

    console.log(email,stato)

    if(stato=="approvato"){
        const {data,error}=await db.from("users").update({
            stato:false
        }).eq("email",email)
        console.log(data,error)
    }else{
        const {data,error}=await db.from("users").update({
            stato:true
        }).eq("email",email)
        console.log(data,error)
    }

    window.location.reload()
}

async function gestisciRuolo(email:string,ruolo:string){
    const db = createSupabaseClient();

    if(ruolo=="Utente"){
        await db.from("users").update({
            ruolo:"Admin"
        }).eq("email",email)
    }else{
        await db.from("users").update({
            ruolo:"Utente"
        }).eq("email",email)
    }

    window.location.reload()
}

export const columns: ColumnDef<Utenti>[] = [
    {
        accessorKey: "email",
        header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            Email
            <ArrowUpDown />
            </Button>
        )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
    accessorKey: "stato",
    header: "Stato",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("stato")}</div>
    ),
  },
  {
    accessorKey: "ruolo",
    header: "Ruolo",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("ruolo")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {

        

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Azioni</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={()=> gestisiciStato(row.getValue("email"),row.getValue("stato"))}>{(row.getValue("stato")=="approvato")?"Disattiva Account":"Attiva Account"}</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>gestisciRuolo(row.getValue("email"),row.getValue("ruolo"))}>{(row.getValue("ruolo")=="Utente")?"Rendi Admin":"Rendi Utente"}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const user=useContext(UserProvider)

  const dbClient = createSupabaseClient();
  
  const [data,setData]=useState<Utenti[]>([])

  useEffect(()=>{
    async function getUsers(){

        if(user){
            const {data:utenti} = await dbClient.from("users").select("*").neq("email",user?.email)

            if(utenti){
                const dati:Utenti[]=[];
                utenti.forEach(ut=>{
                    dati.push({
                        email:ut.email,
                        ruolo:ut.ruolo,
                        stato:(ut.stato)?"approvato":"non approvato",
                    })
                })
                setData(dati)
            }
        }
        
    }

    getUsers();
  },[user])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtra email..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Seleziona <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nessun risultato
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
