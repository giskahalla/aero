

export interface Team {
    id: number
    status: number
    name: string
    email: string
    role: string
    created_at: string
}

export interface TeamFormInput {
    name: string
    email: string
    role: string
}