"use client";

import { getUser } from "@/features/users/actions";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TIMEOUT_MS = 30000; // 30 seconds
const CHECK_INTERVAL_MS = 1000; // 1 second

export function OnboardingClient({ userId }: { userId: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    let timeoutId: ReturnType<typeof setTimeout>;
    let startTime = Date.now();

    const initializeUser = async () => {
      try {
        // First, trigger user creation via API
        const response = await fetch("/api/onboarding", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to initialize user");
        }

        console.log("User initialized, starting verification...");
      } catch (err) {
        console.error("Error initializing user:", err);
      }
    };

    const checkUser = async () => {
      try {
        const user = await getUser(userId);
        if (!isMounted) return;

        if (user != null) {
          console.log("User found, redirecting to /app");
          router.replace("/app");
        } else {
          // Check if we've been polling for too long
          const elapsed = Date.now() - startTime;
          if (elapsed > TIMEOUT_MS) {
            console.error(
              "Onboarding timeout: User not created after 30 seconds",
            );
            setError(
              "Account creation is taking too long. Please try refreshing the page.",
            );
            return;
          }

          console.log(
            `User not found yet (${Math.round(elapsed / 1000)}s), retrying...`,
          );
          timeoutId = setTimeout(checkUser, CHECK_INTERVAL_MS);
        }
      } catch (err) {
        console.error("Error checking user:", err);
        if (isMounted) {
          const elapsed = Date.now() - startTime;
          if (elapsed > TIMEOUT_MS) {
            setError("Failed to verify account. Please try refreshing.");
            return;
          }
          timeoutId = setTimeout(checkUser, CHECK_INTERVAL_MS);
        }
      }
    };

    // Initialize user first, then start checking
    initializeUser().then(() => {
      if (isMounted) checkUser();
    });

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [userId, router]);

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return <Loader2Icon className="animate-spin size-24" />;
}
