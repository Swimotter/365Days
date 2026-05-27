import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { auth } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";

export async function GET(req: Request) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });

  if (!user?.onboardingComplete) {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  return NextResponse.redirect(new URL("/dashboard", req.url));
}
