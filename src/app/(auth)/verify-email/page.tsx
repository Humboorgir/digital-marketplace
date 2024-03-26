import Container from "@/components/ui/container";
import VerifyEmail from "@/components/verify-email/verify-email";
import Image from "next/image";

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const Page = ({ searchParams }: Props) => {
  const token = searchParams.token;
  const toEmail = searchParams.to;
  const isEmailProvided = token && typeof token == "string";

  return (
    <Container className="pt-20 max-w-[600px] flex flex-col items-center justify-center text-center">
      {isEmailProvided ? (
        <VerifyEmail token={token} />
      ) : (
        // If no token was provided
        <>
          <Image
            className="border-b-2 border-foreground/20"
            width="240"
            height="240"
            alt="email sent"
            src="/email-sent.svg"
          />
          <h2 className="mt-6 font-bold text-2xl text-gray-800">Check your email</h2>
          {/* If the user's email was provided in the url, display it */}
          {toEmail ? (
            <p className="mt-1 text-muted-foreground">
              We have sent a verification link to
              <br />
              <span className="mt-1 font-bold">{toEmail}</span>.
            </p>
          ) : (
            <p className="mt-1 text-muted-foreground">We have sent a verification link to your email.</p>
          )}
        </>
      )}
    </Container>
  );
};

export default Page;
