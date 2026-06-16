

import { DataTable } from "@/components/ui/dataTable"
import { genericColumns } from "@/components/ui/columns"

import { ColumnConfig } from "@/types"

import { teams } from "../constants"
import { COLOR } from "@/constants"

const statuses = Object.values(COLOR.statusColors).map(({ label, value, text }) => ({ label, value, text }))

const taskColumnsConfig: ColumnConfig[] = [
    { accessorKey: "name", title: "Name", type: "text" },
    { accessorKey: "role", title: "Role", type: "text", enableSorting: false },
  { accessorKey: "status", title: "Status", type: "badge", options: statuses },
  { type: "actions" }
]

const columns = genericColumns(taskColumnsConfig)

export function TeamList() {
    return (
        <DataTable columns={columns} data={teams}/>
    )
}