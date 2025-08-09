import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/server/auth";
import { affiliationsService } from "@/lib/directories";

export async function GET() {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const affiliations = await affiliationsService.getAll();
    return NextResponse.json(affiliations);
  } catch (error) {
    console.error("Error fetching affiliations:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { value } = body;

    if (!value) {
      return NextResponse.json(
        { error: "Value is required" },
        { status: 400 }
      );
    }

    const affiliation = await affiliationsService.create({
      value,
    });

    return NextResponse.json(affiliation, { status: 201 });
  } catch (error) {
    console.error("Error creating affiliation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
