import { NextResponse } from "next/server";

import  dbConnect  from "@/lib/dbConnect";

import Team from "@/models/team";

export async function GET() {
    try{
      await dbConnect();
      const teams = await Team.find({}).sort({ updated_at: -1 })
      return NextResponse.json(teams, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch teams" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try{
        await dbConnect()
        const body = await request.json()
        const newTeam = await Team.create(body)
        return NextResponse.json(newTeam, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Failed to create team" }, { status: 500 })
    }
}