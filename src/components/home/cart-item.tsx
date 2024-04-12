import { PRODUCT_CATEGORIES } from "@/config";
import { Media, Product } from "@/payload-types";

import Image from "next/image";
import Button from "../ui/button";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

const CartItem = ({ product }: { product: Product }) => {
  const imgUrl = (product.images[0].image as Media).sizes?.thumbnail?.url;
  const label = PRODUCT_CATEGORIES.find(({ value }) => value === product.category)?.label;
  const { removeItem } = useCart();

  return (
    <div className="flex py-2">
      <div className="relative h-16 w-16 overflow-hidden aspect-square border border-border py-2 rounded-md">
        <Image
          // @ts-ignore
          src={imgUrl}
          alt={product.name}
          fill
          className="aspect-square object-center absolute object-cover"
        />
      </div>
      <div className="ml-3">
        <h3 className="font-bold text-sm text-gray-900">{product.name}</h3>
        <p className="mt-1 text-muted-foreground text-xs overflow-hidden text-ellipsis">{label}</p>
        <Button
          onClick={() => {
            removeItem(product.id);
            toast.warning(`Removed '${product.name}' from your cart`);
          }}
          variant="ghost"
          size="sm"
          className="p-0 px-0.5 h-auto text-[11px] hover:bg-red-200/50 mt-1 hover:text-red-500 text-red-600">
          Remove from cart
        </Button>
      </div>
      <div className="ml-3 grow flex justify-end font-medium text-sm">${product.price}</div>
    </div>
  );
};

export default CartItem;
