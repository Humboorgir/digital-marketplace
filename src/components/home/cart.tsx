"use client";

import Button from "../ui/button";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { ShoppingCart } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";

import Image from "next/image";

import { useCart } from "@/hooks/useCart";
import CartItem from "./cart-item";

const Cart = () => {
  const { items } = useCart();
  const itemCount = items.length;
  const total = items.reduce((total, { product }) => total + product.price, 0);

  // 9% transaction fee
  const fee = (total * 9) / 100;

  const hasItems = itemCount > 0;

  return (
    <Sheet>
      <SheetTrigger className="group flex items-center p-2">
        <ShoppingCart
          aria-hidden="true"
          className="w-6 h-6 text-gray-400 group-hover:text-gray-500 shrink-0"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          {itemCount}
        </span>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader className="mb-3 pr-6">
          <SheetTitle>Cart ({itemCount})</SheetTitle>
        </SheetHeader>

        {hasItems ? (
          <>
            <div className="flex flex-col w-full text-gray-700 text-sm">
              {items.map((item) => {
                return <CartItem product={item.product} />;
              })}
            </div>
            {/* Seperator  */}
            <div className="h-[1px] w-full bg-border shrink-0 my-2" />
            <div className="space-y-1.5 text-sm text-gray-700">
              <div className="flex">
                <span className="flex-1">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex">
                <span className="flex-1">Transaction fee</span>
                <span>{formatPrice(fee)}</span>
              </div>
              <div className="flex">
                <span className="flex-1">Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div aria-hidden="true" className="relative mb-4 h-60 w-60 text-muted-foreground">
              <Image src="/empty-cart.svg" fill alt="empty shopping cart hippo" />
            </div>
            <div className="text-xl font-semibold">Your cart is empty</div>
            <SheetTrigger asChild>
              <Button href="/products" variant="link" className="font-medium text-sm">
                Add items to your cart to checkout
              </Button>
            </SheetTrigger>
          </div>
        )}

        <SheetFooter className="mt-3">
          <SheetTrigger asChild>
            <Button href="/cart" className="w-full">
              Continue to checkout
            </Button>
          </SheetTrigger>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
