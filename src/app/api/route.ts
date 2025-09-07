"use server";

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest, res:NextResponse) {
    return NextResponse.json({ message: "Hello, World!" });     
}
