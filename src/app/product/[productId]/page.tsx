import Container from "@/components/ui/container";

type Props = {
  params: {
    productId: string;
  };
};

const Page = ({ params }: Props) => {
  const { productId } = params;
  return <Container></Container>;
};

export default Page;
