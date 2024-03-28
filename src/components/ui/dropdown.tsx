// NOTE: this component hasnt been tested and is only being added for my own usage.
// TODO: rewrite the animations with framer-motion and organize the code

import Button, { ButtonProps } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useState } from "react";

type Props = Omit<React.HTMLProps<HTMLDivElement>, "onChange"> & {
  children: React.ReactNode;
  triggerVariant?: "default" | "secondary" | "outline" | "ghost" | "link";
  triggerText: string;
};

export const Dropdown = ({ triggerVariant = "default", triggerText, children, className }: Props) => {
  const [open, setOpen] = useState(false);

  function toggleOpen() {
    setOpen(!open);
  }

  return (
    <div className={cn("relative w-fit h-fit", className)}>
      <Button
        className={cn("transition-all", open && "rounded-b-none")}
        variant={triggerVariant}
        onClick={toggleOpen}>
        {triggerText}
      </Button>

      <div
        className={cn(
          `absolute invisible top-[calc(100%+1px)] right-0 bg-background z-50 scale-[.9]
           opacity-0 transition-all duration-150 delay-100 origin-top-right rounded-md
          border border-border shadow-sm min-w-[240px]`,
          open && "scale-100 opacity-100 visible"
        )}
        onClick={toggleOpen}>
        {children}
      </div>
    </div>
  );
};

export const DropdownItem = ({
  children,
  className,
  asDiv,
  ...props
}: ButtonProps & { asDiv?: boolean }) => {
  if (asDiv)
    return (
      // @ts-ignore
      <div
        className={cn(`flex items-center justify-start w-full py-2 px-4 h-[42px] text-sm`, className)}
        rippleColor="#7C72FF"
        variant="ghost"
        {...props}>
        {children}
      </div>
    );
  return (
    <Button className={cn(`justify-start w-full`, className)} variant="ghost" {...props}>
      {children}
    </Button>
  );
};
