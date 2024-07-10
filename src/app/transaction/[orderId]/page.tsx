import Button from "@/components/ui/button";
import Container from "@/components/ui/container";
import { PRODUCT_CATEGORIES } from "@/config";
import { getPayloadClient } from "@/lib/getPayloadClient";
import getServerSideUser from "@/lib/payload-utilities/getServerSideUser";
import { Product, ProductFile } from "@/payload-types";
import { Download } from "lucide-react";
import { cookies } from "next/headers";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    orderId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { orderId } = params;
  const payload = await getPayloadClient();

  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  const { docs: orders } = await payload.find({
    collection: "orders",
    depth: 2,
    where: {
      id: {
        equals: orderId,
      },
    },
  });

  const [order] = orders;
  if (!order) return notFound();

  const products = order.products as Product[];

  return (
    <Container className="py-12 flex flex-col items-center">
      {order._isPaid ? (
        <>
          <Image
            className="mb-6 border-b-2 border-b-gray-200"
            height={360}
            width={240}
            src="/order-success.svg"
            alt="payment"
          />
          <p className="text-blue-800 bg-blue-200/80 text-sm px-3 py-1 rounded-full mb-2">
            Order Successful
          </p>
          <h1 className="text-3xl sm:text-4xl tracking-tight text-gray-900 font-bold mb-3">
            Thanks for ordering!
          </h1>
          <p className="text-gray-600 mb-4 max-w-prose text-center">
            Your order was processed and your assets are available to download below. Receipt and other
            details have been sent to <span className="font-bold">{user?.email}</span>
          </p>
          <Button href="/" className="px-16 mb-20">
            Back to home
          </Button>
        </>
      ) : (
        <>
          <Image className="mt-12 mb-8" height={480} width={300} src="/payment.svg" alt="payment" />
          <h1 className="text-3xl sm:text-4xl tracking-tight text-gray-900 font-bold mb-3">
            Processing transaction...
          </h1>
          <p className="text-gray-600 mb-4 max-w-prose text-center">
            Once the transaction's complete, you will be granted access to your products. Note that the
            transaction might take a full day to be processed.
          </p>
          <Button href="/" className="px-16 mb-20">
            Back to home
          </Button>
        </>
      )}

      <h2 className="text-2xl sm:text-3xl tracking-tight text-gray-900 font-bold mb-6">
        Items ({products.length})
      </h2>
      <ul className="flex justify-center items-center flex-wrap w-full max-w-3xl">
        {products.map((product) => {
          const label = PRODUCT_CATEGORIES.find((x) => x.value == product.category)?.label;

          const downloadUrl = (product.productFiles as ProductFile).url as string;

          const { image } = product.images[0];

          return (
            <li
              key={product.id}
              className="flex flex-col items-stretch mr-8 mb-4
             border border-gray-200 p-5 rounded-md">
              <div className="relative h-32 w-40 shrink-0 mb-3 bg-gray-200 border border-gray-200">
                {typeof image != "string" && image.url && (
                  <Image
                    fill
                    src={image.url}
                    alt="Product image"
                    className="h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48"
                  />
                )}
              </div>

              <Link
                href={`/product/${product.id}`}
                className="maxw-40 font-medium text-gray-700 hover:text-gray-800">
                {product.name}
              </Link>

              <p className="max-w-40 mt-1.5 text-sm text-muted-foreground">{label}</p>

              <p className="mt-2 text-sm font-medium text-gray-900">$99.9</p>

              {order._isPaid && (
                <a
                  href={downloadUrl}
                  download={product.name}
                  className="flex items-center bg-primary mt-4 font-medium px-4 py-2 rounded-md text-primary-foreground hover:bg-primary/90 active:bg-primary/80">
                  <Download className="h-4 w-4 mr-1.5" /> DOWNLOAD
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </Container>
  );
};

export default Page;
