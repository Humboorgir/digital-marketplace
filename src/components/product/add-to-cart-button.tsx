"use client";

import { useCart } from "@/hooks/useCart";
import Button from "../ui/button";
import { Product } from "@/payload-types";
import { toast } from "sonner";
import { useState } from "react";

const AddToCartButton = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const [onCooldown, setOnCooldown] = useState(false);

  return (
    <Button
      onClick={() => {
        // this isnt realy needed cuz the button will be disabled but im putting it in just in case
        if (onCooldown) return;

        addItem(product);
        toast.success(`Added '${product.name}' to your cart.`);

        setOnCooldown(true);
        setTimeout(() => {
          setOnCooldown(false);
        }, 2000);
      }}
      disabled={onCooldown}
      className="mt-6 w-full transition-all">
      Add to cart
    </Button>
  );
};

export default AddToCartButton;
