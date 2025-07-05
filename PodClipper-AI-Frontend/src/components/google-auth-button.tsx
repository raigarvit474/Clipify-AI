"use client";

import { signIn } from "next-auth/react";
import { Button } from "~/components/ui/button";
import { FcGoogle } from "react-icons/fc";

interface GoogleAuthButtonProps {
  text: string;
}

export function GoogleAuthButton({ text }: GoogleAuthButtonProps) {
  const handleGoogleSignIn = async () => {
    await signIn("google", {
      callbackUrl: "/dashboard", // Redirect after login
    });
  };

  return (
    <Button
      onClick={handleGoogleSignIn}
      variant="outline"
      className="w-full flex items-center justify-center gap-2 border-gray-300"
    >
      <FcGoogle className="h-5 w-5" />
      {text}
    </Button>
  );
}
