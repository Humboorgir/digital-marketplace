"use client";

import { trpc } from "@/trpc/client";
import { Loader2, XCircle } from "lucide-react";
import Image from "next/image";
import Button from "../ui/button";

const VerifyEmail = ({ token }: { token: string }) => {
  const { data, isLoading, isError, error } = trpc.auth.verifyEmail.useQuery({
    token,
  });

  console.log(error);
  if (isError) {
    return (
      <div className="flex flex-col items-center space-y-2">
        <XCircle className="h-8 w-8 text-red-600" />
        <h3 className="font-bold text-xl">Failed to verify your email</h3>
        <p className="text-muted-foreground">
          The provided token was invalid or might have been expired.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center space-y-2">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
        <h3 className="animate-pulse font-bold text-xl">Verifying your email...</h3>
        <p className="text-muted-foreground">This won't take long.</p>
      </div>
    );
  }

  if (data?.success)
    return (
      <>
        <Image
          className="border-b-2 border-foreground/20"
          width="240"
          height="240"
          alt="email sent"
          src="/email-sent.svg"
        />
        <h2 className="mt-6 font-bold text-2xl text-gray-800">You're all set</h2>
        <p className="mt-1 text-muted-foreground">Your email has been verified.</p>
        <Button size="sm" className="mt-2 px-6" href="/sign-in">
          Sign in
        </Button>
      </>
    );
};

export default VerifyEmail;
