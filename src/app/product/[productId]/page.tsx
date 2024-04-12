import ProductReel from "@/components/home/product-reel";
import AddToCartButton from "@/components/product/add-to-cart-button";
import Button from "@/components/ui/button";
import Container from "@/components/ui/container";
import ImageSlider from "@/components/ui/image-slider";

import { PRODUCT_CATEGORIES } from "@/config";
import { getPayloadClient } from "@/lib/getPayloadClient";
import { Check, Shield } from "lucide-react";
import { notFound } from "next/navigation";

type Props = {
  params: {
    productId: string;
  };
};

const Page = async ({ params }: Props) => {
  const { productId } = params;
  const payload = await getPayloadClient();

  const { docs: products } = await payload.find({
    collection: "products",
    depth: 1,
    where: {
      id: {
        equals: productId,
      },
      approvedForSale: {
        equals: "approved",
      },
    },
  });

  const [product] = products;
  if (!product) return notFound();

  const label = PRODUCT_CATEGORIES.find(({ value }) => value === product.category)?.label;
  const imageUrls = product.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[];

  return (
    <Container>
      <div className="max-w-2xl lg:max-w-7xl lg:grid lg:gap-x-8 lg:grid-rows-[auto,1fr] pt-12 sm:pt-16 px-8 lg:grid-cols-2">
        <div className="h-fit">
          <p className="text-muted-foreground text-sm flex items-center">
            Home <span className="px-2 text-lg">/</span> Products
          </p>
          <h1 className="mt-2 font-bold text-3xl sm:text-4xl tracking-tight">{product.name}</h1>
          <div className="mt-4 text-muted-foreground text-sm flex items-center">
            <span className="text-gray-900 font-medium">${product.price}</span>
            <span className="px-2 text-lg">|</span>
            {label}
          </div>

          <p className="text-muted-foreground mt-4">{product.description}</p>

          <span className="mt-6 flex items-center">
            <Check aria-hidden="true" className="h-5 w-5 shrink-0 text-green-500" />
            <p className="ml-2 text-sm text-muted-foreground">Eligible for instant delivery</p>
          </span>
          <span className="flex my-3 text-muted-foreground text-center text-sm items-center self-center">
            <Shield className="h-5 w-5 mr-2 font-medium" /> 30 Day return guarantee
          </span>
        </div>

        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="aspect-square rounded-lg">
            <ImageSlider urls={imageUrls} />
          </div>
        </div>

        <div className="lg:col-start-1 flex flex-col items-center w-auto">
          <AddToCartButton product={product} />
        </div>
      </div>

      <ProductReel
        className="max-w-2xl lg:max-w-7xl pl-8"
        query={{ category: product.category, limit: 3 }}
        title={`Similar ${label}`}
        subtitle={`Browse similar high-quality ${label} just like '${product.name}'`}
      />
    </Container>
  );
};

export default Page;
