import NavItems from "./nav-items";
import Link from "next/link";
import Container from "../ui/container";

import { Icons } from "../ui/icons";

const Navbar = () => {
  return (
    <header className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <Container>
        <div className="border-b border-gray-200 flex h-16 items-center">
          {/* TODO: implement mobile navbar  */}

          {/* logo  */}
          <Link className="ml-4 sm:mr-8 flex lg:ml-0" href="/">
            <Icons.logo className="h-10 w-10" />
          </Link>

          <div className="z-50 hidden lg:block lg:self-stretch">
            <NavItems />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
