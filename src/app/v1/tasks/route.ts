import { NextResponse } from "next/server";

import  dbConnect  from "@/lib/dbConnect";
import { generateId } from "@/lib/utils";

import Task from "@/models/task";
import Team from "@/models/team";

export async function GET(request: Request) {
    try{
      await dbConnect();

      const { searchParams } = new URL(request.url);
      const month = searchParams.get('month'); 

      let filter: Record<string, any> = {};

      if (month) {
        const [year, monthStr] = month.split("-");
        const yearNum = Number(year);
        const monthNum = Number(monthStr);

        const start = `${year}-${monthStr}-01`;

        const nextMonth =
            monthNum === 12
            ? `${yearNum + 1}-01-01`
            : `${year}-${String(monthNum + 1).padStart(2, "0")}-01`;

        filter = {
            start_date: { $lt: nextMonth },
            due_date: { $gte: start },
        };
      }
      const tasks = await Task.find(filter).select("-_id").sort({ updated_at: -1 })
      return NextResponse.json(tasks, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try{
        await dbConnect()
        const body = await request.json()
        const assigneeInfo = await Team.findOne({ id: body.assignee_id })
        const task = {
            ...body,
            updated_at: new Date(),
            created_at: new Date(),
            id: generateId(2),
            assignee_info: {
                name: assigneeInfo?.name || '',
                email: assigneeInfo?.email || '',
                id: assigneeInfo?.id || ''
            }
        }
        const newTask = await Task.create(task)
        return NextResponse.json(newTask, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Failed to create task" }, { status: 500 })
    }
}

