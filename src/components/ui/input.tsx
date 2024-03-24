import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        `relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2
         text-sm placeholder:text-muted-foreground outline-2 outline-transparent
         outline-double focus-visible:transition-[outline-color] focus-visible:outline-primary
         duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-50`,
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

export default Input;
