
import type { ComponentType } from "react"

import { TasksOverview } from "@/features"

import { Task } from "@/types/index"

const tasks: Task[] = [
    { id: "1", status: 0, priority: 1, title: "Design new landing page", start_date: "2026-06-01", due_date: "2026-06-07", created_at: "2026-05-25T10:00:00Z", updated_at: "2026-05-30T15:00:00Z", assignee: 402030 },
    { id: "2", status: 1, priority: 2, title: "Implement authentication flow", start_date: "2026-06-03", due_date: "2026-06-10", created_at: "2026-05-26T10:00:00Z", updated_at: "2026-05-31T15:00:00Z", assignee: 503020 },
    { id: "3", status: 2, priority: 3, title: "Fix bug in payment processing", start_date: "2026-06-05", due_date: "2026-06-12", created_at: "2026-05-27T10:00:00Z", updated_at: "2026-06-01T15:00:00Z", assignee: 304050 },
    { id: "4", status: 0, priority: 2, title: "Write unit tests for user service", start_date: "2026-05-08", due_date: "2026-05-15", created_at: "2026-05-08T10:00:00Z", updated_at: "2026-05-12T15:00:00Z", assignee: 503060 },
]


export default function Sprint() {

    const TypedTasksOverview = TasksOverview as ComponentType<{ tasks: Task[] }>
    
    return (
        <TypedTasksOverview tasks={tasks} />
    )
}