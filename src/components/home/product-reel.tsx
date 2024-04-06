"use client";

import Button from "../ui/button";

import { trpc } from "@/trpc/client";
import { QueryValidator } from "@/lib/validators/query-validator";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import type SwiperType from "swiper";
import { Pagination } from "swiper/modules";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [swiper, setSwiper] = useState<null | SwiperType>(null);

  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd: false,
  });

  useEffect(() => {
    swiper?.on("slideChange", ({ activeIndex }) => {
      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === list.length - 1,
      });
    });
  }, [swiper, list]);

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

      <Swiper
        onSwiper={(swiper) => setSwiper(swiper)}
        spaceBetween={30}
        modules={[Pagination]}
        slidesPerView="auto"
        className="relative h-full w-full">
        {list.map((product, i) => {
          if (!product) return "loading";
          const imageUrl = (product.images[0].image as any).url;
          return (
            <SwiperSlide key={i} className="!w-auto">
              <div className="flex flex-col w-[260px]">
                <div className="relative h-[240px] rounded-md overflow-hidden bg-border">
                  <Image
                    fill
                    className="h-full w-full object-cover object-center"
                    src={imageUrl}
                    alt="Product image"
                  />
                </div>

                <h3 className="mt-4 font-medium text-gray-700">{product.name}</h3>
                <p className="mt-1 text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
                  {product.description}
                </p>
                <p className="mt-1 font-medium text-gray-900">${product.price}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default ProductReel;
