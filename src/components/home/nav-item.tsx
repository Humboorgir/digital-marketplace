"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import Button from "../ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";

type Category = (typeof PRODUCT_CATEGORIES)[number];

type Props = {
  category: Category;
  handleOpen: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
};

const NavItem = ({ category, isOpen, isAnyOpen, handleOpen }: Props) => {
  return (
    <div className="flex">
      <div className="relative flex items-center">
        <Button
          className="flex items-center font-medium mr-3"
          onClick={handleOpen}
          variant={isOpen ? "secondary" : "ghost"}>
          {category.label}
          <ChevronDown
            className={cn("ml-1.5 h-4 w-4 transition-all text-muted-foreground", isOpen && "rotate-180")}
          />
        </Button>
      </div>

      <div
        className={cn(
          "invisible transition-all scale-95 opacity-0 absolute inset-x-0 top-full text-sm text-muted-foreground",
          isOpen &&
            "transition-all visible right-0 scale-100 opacity-100 ease-out origin-top duration-200"
        )}>
        <div className="relative bg-white shadow">
          <div className="mx-auto max-w-7xl px-8">
            <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
              <div className="col-span-4 col-start-1 grid grid-cols-3 gap-x-8">
                {category.featured.map((item) => (
                  <div
                    onClick={() => close}
                    key={item.name}
                    className="group relative text-base sm:text-sm">
                    <Link href={item.href}>
                      <div className="relative aspect-video overflow-hidden rounded-lg">
                        <Image
                          src={item.imageSrc}
                          alt="product category image"
                          fill
                          className="object-cover object-center duration-500 ease-out transition-transform group-hover:scale-105"
                        />
                      </div>

                      <h4 className="mt-6 block font-medium text-gray-900">{item.name}</h4>
                    </Link>
                    <p className="mt-1" aria-hidden="true">
                      Click to view
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavItem;
