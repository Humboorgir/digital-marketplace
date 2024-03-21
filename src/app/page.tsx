import Button from "@/components/ui/button";
import Container from "@/components/ui/container";

import { ArrowDownToLine, CheckCircle, Undo2 } from "lucide-react";

const Home = () => {
  const perks = [
    {
      name: "Instant Delivery",
      Icon: ArrowDownToLine,
      description:
        "No need to wait! Get your digital product delivered to your email right after payment.",
    },
    {
      name: "Guaranteed Quality",
      Icon: CheckCircle,
      description:
        "All the assets on our platform are verified by our team to ensure the proper quality standards.",
    },
    {
      name: "Refund Policy",
      Icon: Undo2,
      description:
        "Not happy with the product? We offer a 30 day refund guarantee to ensure customer satisfaction.",
    },
  ];

  return (
    <>
      <Container>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="font-bold text-4xl sm:text-6xl tracking-tight text-gray-900">
            Your marketplace for high-quality <span className="text-blue-600">digital assets</span>.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to our digital marketplace. All the assets here are verified by our team to meet the
            required quality standards.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 mt-6">
            <Button href="/products">Browse trending</Button>
            <Button className="group" variant="ghost">
              Our quality promise
              <span className="ml-1 transition-all duration-300 group-hover:translate-x-1">&rarr;</span>
            </Button>
          </div>
        </div>

        {/* TODO: list products here  */}
      </Container>

      <section className="bg-gray-50 border-t border-gray-200">
        <Container className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => {
              return (
                <div
                  key={perk.name}
                  className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left lg:block lg:text-center">
                  <div className="flex justify-center shrink-0">
                    <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                      <perk.Icon className="h-1/3 w-1/3" />
                    </div>
                  </div>

                  <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                    <h3 className="text-base font-medium text-gray-900">{perk.name}</h3>
                    <h3 className="mt-3 text-sm text-muted-foreground max-w-sm">{perk.description}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
};

export default Home;
