import Container from "../ui/container";
import Button from "../ui/button";

import NavItems from "./nav-items";
import Cart from "./cart";

import { Icons } from "../ui/icons";

import Link from "next/link";

const Navbar = () => {
  const user = null;
  return (
    <header className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <Container>
        <div className="border-b border-gray-200 flex h-16 items-center">
          {/* TODO: implement mobile navbar  */}

          {/* logo  */}
          <Link className="ml-4 sm:mr-8 flex lg:ml-0" href="/">
            <Icons.logo className="h-10 w-10" />
          </Link>

          {/* links  */}
          <div className="z-50 hidden lg:block lg:self-stretch">
            <NavItems />
          </div>

          {/* user related stuff  */}
          <div className="hidden lg:flex flex-1 items-center justify-end">
            {user ? null : (
              <Button href="/sign-in" variant="ghost">
                Sign in
              </Button>
            )}

            {user ? null : <span className="lg:mx-1 h-6 w-px bg-gray-200" aria-hidden="true" />}

            {user ? (
              <p></p>
            ) : (
              <Button href="/sign-up" variant="ghost">
                Create account
              </Button>
            )}

            {user ? <span className="h-6 w-px bg-gray-200" aria-hidden="true" /> : null}

            {user ? null : (
              <div className="flex lg:mx-1">
                <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
              </div>
            )}

            <div className="grid place-items-center ml-2 lg:ml-4">
              <Cart />
            </div>
          </div>

          {/* closing tags  */}
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
