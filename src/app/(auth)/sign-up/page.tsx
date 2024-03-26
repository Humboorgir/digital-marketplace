"use client";

import Container from "@/components/ui/container";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

import { credentialsValidator } from "@/lib/validators/credentials-validator";
import type { CredentialsValidator } from "@/lib/validators/credentials-validator";

import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ArrowRight, Loader2 } from "lucide-react";
import { Icons } from "@/components/ui/icons";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialsValidator>({
    resolver: zodResolver(credentialsValidator),
  });

  const { isLoading, mutate } = trpc.auth.createPayloadUser.useMutation({});

  function onSubmit({ email, password }: CredentialsValidator) {
    mutate({ email, password });
  }

  return (
    <Container className="max-w-[600px] pt-20 min-h-full flex flex-col items-center justify-center">
      <Icons.hippo className="w-20 h-20" />
      <h1 className="font-bold text-xl sm:text-2xl mt-2 text-center">Create an account</h1>
      <Button href="/sign-in" size="sm" className="flex items-center text-center" variant="link">
        Already have an account? Sign in <ArrowRight className="w-3.5 h-3.5 ml-1" />
      </Button>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-2">
        <div className={cn("py-2", errors.email && "py-0")}>
          <label htmlFor="email" className="text-gray-900">
            Email
          </label>
          <Input
            {...register("email")}
            className={cn("w-full", errors.email && "border-red-500 focus-visible:outline-red-500")}
            placeholder="email@example.com"
            name="email"
            id="email"
          />
          {errors.email && <span className="text-xs text-red-600">{errors.email?.message}</span>}
        </div>
        <div className="py-2">
          <label htmlFor="password" className="text-gray-900">
            Password
          </label>
          <Input
            {...register("password")}
            type="password"
            className={cn("w-full", errors.password && "border-red-500 focus-visible:outline-red-500")}
            placeholder="Password"
            name="password"
            id="password"
          />
          {errors.password && <span className="text-xs text-red-600">{errors.password?.message}</span>}
        </div>
        <Button type="submit" className="mt-2 w-full transition-all duration-300" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin h-6 w-6" /> : <>Sign up</>}
        </Button>
      </form>
    </Container>
  );
};

export default Page;
