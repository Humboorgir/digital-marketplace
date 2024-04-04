"use client";

import Button from "../ui/button";

import { trpc } from "@/trpc/client";
import { QueryValidator } from "@/lib/validators/query-validator";
import { formatPrice } from "@/lib/formatPrice";

import Image from "next/image";

type Props = {
  title: string;
  subtitle?: string;
  href?: string;
  query: QueryValidator;
};

const ProductReel = ({ title, subtitle, href, query }: Props) => {
  const { data } = trpc.getInfiniteProducts.useInfiniteQuery(
    {
      limit: query.limit ?? 4,
      query,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );

  const products = data?.pages.flatMap((page) => page.products);
  const list = products?.length ? products : new Array<null>(query.limit ?? 4).fill(null);

  return (
    <section className="flex flex-col space-y-4 py-12 mb-4">
      <div className="md:flex justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h2>
          {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
        </div>
        {href && (
          <Button variant="link">
            Shop the collectio
            <span className="tracking-[4px]">n</span>
            <span aria-hidden="true">&rarr;</span>
          </Button>
        )}
      </div>

      <div className="flex space-x-2">
        {list.map((product) => {
          if (!product) return "loading";
          const imageUrl = (product.images[0].image as any).url;
          return (
            <div className="shadow-sm w-[300px] h-[330px] border border-border rounded-md p-5 pb-0">
              <div className="relative w-full h-[200px] overflow-hidden rounded-md bg-border">
                <Image className="object-cover object-top" src={imageUrl} fill alt="Product image" />
              </div>
              <h3 className="mt-2 text-gray-900 font-bold text-xl">{product.name}</h3>
              <p className="mt-1.5 text-muted-foreground text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                {product.description}
              </p>
              <p className="mt-2 text-gray-800">${product.price}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductReel;
