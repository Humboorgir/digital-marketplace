"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { useState } from "react";
import NavItem from "./nav-item";

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  return (
    <div className="flex h-full items-center">
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
