import { deleteUser, upsertUser } from "@/features/users/db";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const event = await verifyWebhook(request);
    console.log("Clerk webhook received:", event.type);

    switch (event.type) {
      case "user.created":
      case "user.updated":
        const clerkData = event.data;
        const email = clerkData.email_addresses.find(
          (e) => e.id === clerkData.primary_email_address_id,
        )?.email_address;
        if (email == null) {
          console.error("No primary email found", clerkData);
          return new Response("No primary email found", { status: 400 });
        }

        console.log("Creating/updating user:", clerkData.id, email);
        await upsertUser({
          id: clerkData.id,
          email,
          name: `${clerkData.first_name} ${clerkData.last_name}`,
          imageUrl: clerkData.image_url,
          createdAt: new Date(clerkData.created_at),
          updatedAt: new Date(clerkData.updated_at),
        });
        console.log("User created/updated successfully:", clerkData.id);

        break;
      case "user.deleted":
        if (event.data.id == null) {
          console.error("No user ID found for deletion");
          return new Response("No user ID found", { status: 400 });
        }

        console.log("Deleting user:", event.data.id);
        await deleteUser(event.data.id);
        console.log("User deleted successfully:", event.data.id);
        break;
    }
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("Invalid webhook", { status: 400 });
  }

  return new Response("Webhook received", { status: 200 });
}
