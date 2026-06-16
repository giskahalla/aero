

export interface Task {
    id: string
    status: number
    priority: number
    title: string
    start_date?: string
    due_date: string
    created_at: string
    updated_at: string,
    assignee?: number
}

export interface TaskFormInput {
    title: string
    desc: string
    assignee: string
    status: string
    priority: string
    start_date: Date | undefined;
    due_date: Date | undefined;
}