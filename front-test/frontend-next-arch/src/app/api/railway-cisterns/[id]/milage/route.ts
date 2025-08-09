import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/server/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await params; // Awaiting params as required by Next.js

    // Пока возвращаем пустой массив, так как модель MilageCistern не определена в схеме
    // TODO: Добавить модель MilageCistern в schema.prisma
    const milageCisterns: unknown[] = [];

    return NextResponse.json(milageCisterns);
  } catch (error) {
    console.error("Error fetching milage data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
