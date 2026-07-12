'use client'

import { DataTable } from "@/components/ui/dataTable";
import { genericColumns } from "@/components/ui/columns";

import { COLOR } from "@/constants";

import { Task, ColumnConfig } from "@/types";

const statuses = Object.values(COLOR.statusColors).map(({ label, value, text }) => ({ label, value, text }))
const priorities = Object.values(COLOR.priorityColors).map(({ label, value, text }) => ({ label, value, text }))

export default function TaskList({ tasks }: { tasks: Task[] }) {

    const taskColumnsConfig: ColumnConfig[] = [
        { accessorKey: "title", title: "Title", type: "text" },
        { accessorKey: "status", title: "Status", type: "badge", options: statuses },
        { accessorKey: "priority", title: "Priority", type: "badge", options: priorities, enableSorting: false },
        { accessorKey: "due_date", title: "Due Date", type: "date" },
        { accessorKey: "assignee_id", title: "Assignee", type: "user", options: tasks.map(task => ({...task.assignee_info})) },
        { type: "actions" }
    ]

    const columns = genericColumns(taskColumnsConfig)

    return (
        <div className="my-10">
            <DataTable columns={columns} data={tasks}/>
        </div>
    )
}