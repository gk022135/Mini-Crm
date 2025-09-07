import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/extension";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        source: data.source,
        interestLevel: data.interestLevel,
      },
    });

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error("Lead creation error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to capture lead" },
      { status: 500 }
    );
  }
}
