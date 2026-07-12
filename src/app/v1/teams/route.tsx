import { NextResponse } from "next/server";

import  dbConnect  from "@/lib/dbConnect";

import Team from "@/models/team";
import { generateId } from "@/lib/utils";

export async function GET(request: Request) {
    try{
      await dbConnect();
      const { searchParams } = new URL(request.url);
      const id = searchParams.get('id'); 
      const keyword = searchParams.get('keyword'); 
      const page = parseInt(searchParams.get('page') || '1');
      const limit = 5

      let filter: Record<string, any> = {};
      if (id) {
        filter.id = { $in: id };
      }
      if (keyword) {
        filter.name = { $regex: keyword, $options: 'i' };
      }

      const skip = (page - 1) * limit;
      const teams = await Team.find(filter)
      .select("-_id")
      .skip(skip)
      .limit(limit);

      const total = await Team.countDocuments(filter);

      return NextResponse.json({ data:teams, page, total }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch teams" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try{
        await dbConnect()
        const body = await request.json()
        const createdTeam = {
            ...body,
            created_at: new Date(),
            id: generateId(1)
        }
        const newTeam = await Team.create(createdTeam)
        return NextResponse.json(newTeam, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Failed to create team" }, { status: 500 })
    }
}