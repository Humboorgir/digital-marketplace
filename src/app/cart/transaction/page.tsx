"use client";

import Button from "@/components/ui/button";
import Container from "@/components/ui/container";
import { PRODUCT_CATEGORIES } from "@/config";

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/formatPrice";
import { Media } from "@/payload-types";
import { trpc } from "@/trpc/client";
import { Check, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const { items, removeItem } = useCart();
  const router = useRouter();

  const productIds = items.map(({ product }) => product.id);

  const hasItems = Boolean(items.length);
  const total = items.reduce((total, { product }) => total + product.price, 0);
  // 9% transaction fee
  const fee = (total * 9) / 100;

  const { mutate: createSession, isLoading } = trpc.payment.createSession.useMutation({
    onSuccess({ link }) {
      router.push(link);
    },
  });

  return (
    <Container className="py-24 flex flex-col items-center">
      <Image className="mb-8" height={480} width={300} src="/payment.svg" alt="payment" />
      <h1 className="text-3xl sm:text-4xl tracking-tight text-gray-900 font-bold mb-3">
        Awaiting transaction...
      </h1>
      <p className="text-gray-600 mb-4 max-w-prose text-center">
        Once the transaction's complete, you will be granted access to your products. Note that the
        transaction might take a full day to be processed.
      </p>
      <Button href="/" className="px-16">
        Back to home
      </Button>
    </Container>
  );
};

export default Page;
