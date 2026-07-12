

export interface Task {
    id: string
    status: number
    priority: number
    title: string
    start_date?: string
    due_date: string
    created_at: string
    updated_at: string,
    assignee_id?: number
    assignee_info: {
        id: number
        name: string
        email: string
    }

}

export interface TaskFormInput {
    title: string
    desc: string
    assignee_id: string
    status: string
    priority: string
    start_date: Date | undefined;
    due_date: Date | undefined;
}