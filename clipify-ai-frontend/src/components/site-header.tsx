// components/site-header.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export function SiteHeader() {
  const { data: session } = useSession();

  return (
    <header className="w-full border-b bg-background">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold tracking-tight">
          PodClipper
        </Link>
        <div className="flex gap-4">
          {!session ? (
            <>
              <Link href="/login">
                <Button variant="outline">Log In</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          ) : (
            <Button variant="outline" onClick={() => signOut()}>
              Log Out
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
