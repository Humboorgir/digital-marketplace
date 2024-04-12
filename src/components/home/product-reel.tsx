"use client";

import Button from "../ui/button";

import { trpc } from "@/trpc/client";
import { QueryValidator } from "@/lib/validators/query-validator";
import ImageSlider from "../ui/image-slider";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  subtitle?: string;
  href?: string;
  query: QueryValidator;
  className?: string;
};

const ProductReel = ({ title, subtitle, href, query, className }: Props) => {
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
    <section className={cn("flex flex-col space-y-4 py-12 mb-4", className)}>
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

      <div className="flex flex-wrap -ml-4">
        {list.map((product, i) => {
          if (!product) return "loading";

          const imageUrls = product.images
            .map(({ image }) => (typeof image === "string" ? image : image.url))
            .filter(Boolean) as string[];

          return (
            <Link
              href={`/product/${product.id}`}
              className="flex flex-col w-[260px] hover:bg-primary/5 transition-all p-5 rounded-md">
              <ImageSlider urls={imageUrls} />

              <h3 className="mt-4 font-medium text-gray-700">{product.name}</h3>
              <p className="mt-1 text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
                {product.description}
              </p>
              <p className="mt-1 font-medium text-gray-900">${product.price}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default ProductReel;
