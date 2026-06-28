
import { DataTable } from "@/components/ui/dataTable";
import { genericColumns } from "@/components/ui/columns";

import { COLOR } from "@/constants";
import { teams } from "@/features/Teams/constants";

import { Task, ColumnConfig } from "@/types";

const statuses = Object.values(COLOR.statusColors).map(({ label, value, text }) => ({ label, value, text }))
const priorities = Object.values(COLOR.priorityColors).map(({ label, value, text }) => ({ label, value, text }))

const taskColumnsConfig: ColumnConfig[] = [
    { accessorKey: "title", title: "Title", type: "text" },
    { accessorKey: "status", title: "Status", type: "badge", options: statuses },
    { accessorKey: "priority", title: "Priority", type: "badge", options: priorities, enableSorting: false },
    { accessorKey: "due_date", title: "Due Date", type: "date" },
    { accessorKey: "assignee", title: "Assignee", type: "user", options: teams },
    { type: "actions" }
]

const columns = genericColumns(taskColumnsConfig)

export default function TaskList({ tasks, setEditTask, editTask }: { tasks: Task[]; setEditTask: (task: Task | null) => void; editTask: Task | null }) {

    return (
        <div className="my-10">
            <DataTable columns={columns} data={tasks}/>
        </div>
    )
}