

import { DataTable } from "@/components/ui/dataTable"
import { genericColumns } from "@/components/ui/columns"

import { ColumnConfig } from "@/types"

import { COLOR } from "@/constants"

const statuses = Object.values(COLOR.statusColors).map(({ label, value, text }) => ({ label, value, text }))

const taskColumnsConfig: ColumnConfig[] = [
    { accessorKey: "name", title: "Name", type: "text" },
    { accessorKey: "role", title: "Role", type: "text", enableSorting: false },
    { accessorKey: "status", title: "Status", type: "badge", options: statuses },
    { type: "actions" }
]

const columns = genericColumns(taskColumnsConfig)

export function TeamList({ teams = [], total, onPageChange }: { teams?: any[]; total: number; onPageChange: (page: number) => void }) {
    return (
        <div className="h-[270]">
            <DataTable columns={columns} data={teams} total={total} onPageChange={onPageChange} />
        </div>
    )
}