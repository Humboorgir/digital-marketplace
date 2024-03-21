"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { useRef, useState } from "react";
import NavItem from "./nav-item";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(navRef, () => setActiveIndex(null));

  return (
    <div ref={navRef} className="flex h-full items-center">
      {PRODUCT_CATEGORIES.map((category, i) => {
        const handleOpen = () => {
          if (activeIndex == i) {
            setActiveIndex(null);
          } else {
            setActiveIndex(i);
          }
        };

        const isOpen = i == activeIndex;
        const isAnyOpen = activeIndex !== null;

        return (
          <NavItem
            category={category}
            handleOpen={handleOpen}
            isOpen={isOpen}
            isAnyOpen={isAnyOpen}
            key={category.value}
          />
        );
      })}
    </div>
  );
};

export default NavItems;
