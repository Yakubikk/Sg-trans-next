import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/server/auth";
import { affiliationsService } from "@/lib/directories";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: idParam } = await params;
    
    if (!idParam) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const affiliation = await affiliationsService.getById(idParam);
    
    if (!affiliation) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(affiliation);
  } catch (error) {
    console.error("Error fetching affiliation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: idParam } = await params;
    
    if (!idParam) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const body = await request.json();
    const { value } = body;

    const affiliation = await affiliationsService.update(idParam, {
      value,
    });

    return NextResponse.json(affiliation);
  } catch (error) {
    console.error("Error updating affiliation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: idParam } = await params;
    
    if (!idParam) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await affiliationsService.delete(idParam);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting affiliation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
