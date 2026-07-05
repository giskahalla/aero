import { NextResponse } from "next/server";

import  dbConnect  from "@/lib/dbConnect";

import Task from "@/models/task";

export async function GET() {
    try{
      await dbConnect();
      const tasks = await Task.find({}).sort({ updated_at: -1 })
      return NextResponse.json(tasks, { status: 200})
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try{
        await dbConnect()
        const body = await request.json()
        const newTask = await Task.create(body)
        return NextResponse.json(newTask, { status: 200})
    } catch (error) {
        return NextResponse.json({ error: "Failed to create task" }, { status: 500 })
    }
}