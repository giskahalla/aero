import { NextResponse } from "next/server";

import  dbConnect  from "@/lib/dbConnect";

import Task from "@/models/task";
import Team from "@/models/team";


export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try{
        await dbConnect()

        const { id } = params
        const body = await request.json()

        const assigneeInfo = await Team.findOne({ id: body.assignee_id })
        const taskPrev = await Task.findOne({ id })

        if (!taskPrev) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 })
        }
        
        const task = {
            ...body,
            updated_at: new Date(),
            ...(body.assignee_id !== taskPrev.assignee_id && {
                assignee_info: {
                    name: assigneeInfo?.name || '',
                    email: assigneeInfo?.email || '',
                    id: assigneeInfo?.id || ''
                }
            })
        }
        const updatedTask = await Task.findByIdAndUpdate(id, task, { new: true })
        return NextResponse.json(updatedTask, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Failed to update task" }, { status: 500 })
    }
}
