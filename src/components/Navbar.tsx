import Image from 'next/image';
import Link from 'next/link';

import MobileNav from './MobileNav';
import { SignedIn, UserButton } from '@clerk/nextjs';

const Navbar = () => {
  return (
    <nav className="flex flex-between justify-between fixed z-50 w-full bg-[#1C1F2E] px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/logo.png"
          width={47}
          height={50}
          alt="zuno logo"
          className="max-sm:h-7 max-sm:w-10 "
        />
        <p className="text-[27px] font-extrabold text-white max-sm:hidden ml-0.5">
          ZUNO
        </p>
      </Link>
      <div className="flex flex-between justify-between gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;