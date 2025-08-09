import { NextRequest, NextResponse } from "next/server";
import { savedFilterService } from "@/lib/saved-filters";
import { requireAuth } from "@/server/auth";

// GET - получить конкретный сохраненный фильтр
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    const { id } = await context.params;

    const savedFilter = await savedFilterService.getById(id);

    if (!savedFilter) {
      return NextResponse.json(
        { error: "Saved filter not found" },
        { status: 404 }
      );
    }

    // Проверяем, что фильтр принадлежит текущему пользователю
    if (savedFilter.UserId !== session.sub) {
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403 }
      );
    }

    return NextResponse.json(savedFilter);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    console.error("Error fetching saved filter:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - обновить сохраненный фильтр
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    const { id } = await context.params;
    const body = await request.json();
    const { name, filterJson, sortFieldsJson } = body;

    if (!name || !filterJson || !sortFieldsJson) {
      return NextResponse.json(
        { error: "name, filterJson, and sortFieldsJson are required" },
        { status: 400 }
      );
    }

    // Проверяем, что фильтр существует и принадлежит пользователю
    const existingFilter = await savedFilterService.getById(id);
    if (!existingFilter) {
      return NextResponse.json(
        { error: "Saved filter not found" },
        { status: 404 }
      );
    }

    if (existingFilter.UserId !== session.sub) {
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403 }
      );
    }

    const savedFilter = await savedFilterService.update(id, {
      name,
      filterJson,
      sortFieldsJson,
    });

    if (!savedFilter) {
      return NextResponse.json(
        { error: "Failed to update saved filter" },
        { status: 500 }
      );
    }

    return NextResponse.json(savedFilter);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    console.error("Error updating saved filter:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - удалить сохраненный фильтр
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    const { id } = await context.params;

    // Проверяем, что фильтр существует и принадлежит пользователю
    const existingFilter = await savedFilterService.getById(id);
    if (!existingFilter) {
      return NextResponse.json(
        { error: "Saved filter not found" },
        { status: 404 }
      );
    }

    if (existingFilter.UserId !== session.sub) {
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403 }
      );
    }

    const success = await savedFilterService.delete(id);

    if (!success) {
      return NextResponse.json(
        { error: "Failed to delete saved filter" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Saved filter deleted successfully" });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    console.error("Error deleting saved filter:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
