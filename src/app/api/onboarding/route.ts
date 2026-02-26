import { auth, clerkClient } from "@clerk/nextjs/server";
import { upsertUser } from "@/features/users/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Get full Clerk user data - clerkClient is already initialized
    const client = await clerkClient();
    const clerkUser = await client.users.getUser(userId);

    if (!clerkUser) {
      return NextResponse.json(
        { error: "User data not available from Clerk" },
        { status: 400 },
      );
    }

    // Create user in database if it doesn't exist
    const primaryEmail = clerkUser.emailAddresses.find(
      (e: any) => e.id === clerkUser.primaryEmailAddressId,
    );

    await upsertUser({
      id: userId,
      email: primaryEmail?.emailAddress || "",
      name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
      imageUrl: clerkUser.imageUrl,
      createdAt: new Date(clerkUser.createdAt),
      updatedAt: new Date(clerkUser.updatedAt),
    });

    return NextResponse.json({
      success: true,
      message: "User created/updated successfully",
    });
  } catch (error) {
    console.error("Onboarding error:", error);
    return NextResponse.json(
      { error: "Failed to complete onboarding" },
      { status: 500 },
    );
  }
}
