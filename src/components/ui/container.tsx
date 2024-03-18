import React from "react";

import { cn } from "@/lib/utils";

export type ContainerProps = React.HTMLProps<HTMLDivElement>;

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        className={cn("w-full mx-auto max-w-screen-xl px-2.5 md:px-20", className)}
        ref={ref}
        {...props}>
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export default Container;
