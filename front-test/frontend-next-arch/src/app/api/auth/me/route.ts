import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { getSession } from "@/server/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ user: null }, { status: 200 });
  const user = await prisma.users.findUnique({
    where: { id: session.sub },
    select: { id: true, email: true, firstName: true, lastName: true, patronymic: true, phoneNumber: true },
  });
  return NextResponse.json({ user, roles: session.roles, perms: session.perms });
}
