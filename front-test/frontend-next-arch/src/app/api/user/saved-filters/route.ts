import { NextRequest, NextResponse } from "next/server";
import { savedFilterService } from "@/lib/saved-filters";
import { requireAuth } from "@/server/auth";

// GET - получить все сохраненные фильтры пользователя
export async function GET() {
  try {
    const session = await requireAuth();
    const userId = session.sub;

    const savedFilters = await savedFilterService.getByUserId(userId);
    return NextResponse.json(savedFilters);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    console.error("Error fetching saved filters:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - создать новый сохраненный фильтр
export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth();
    const userId = session.sub;

    const body = await request.json();
    const { name, filterJson, sortFieldsJson } = body;

    if (!name || !filterJson || !sortFieldsJson) {
      return NextResponse.json(
        { error: "name, filterJson, and sortFieldsJson are required" },
        { status: 400 }
      );
    }

    const savedFilter = await savedFilterService.create({
      userId,
      name,
      filterJson,
      sortFieldsJson,
    });

    if (!savedFilter) {
      return NextResponse.json(
        { error: "Failed to create saved filter" },
        { status: 500 }
      );
    }

    return NextResponse.json(savedFilter, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    console.error("Error creating saved filter:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
