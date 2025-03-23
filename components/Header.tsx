"use client";

import type { JSX } from "react";
import Link from "next/link";

import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"

const links: {
  href: string;
  label: string;
}[] = [
  {
    href: "/#features",
    label: "Features",
  },
  {
    href: "/#faq",
    label: "FAQ",
  },
  {
    href: "/docs",
    label: "Docs",
  }
];

// const cta: JSX.Element = <ButtonSignin extraStyle="btn-primary hover:bg-transparent hover:text-white " />;
const waitlist: JSX.Element =<Link href='/#cta' key='#cta' className="btn btn-secondary text-black hover:bg-transparent hover:text-white border h-13 " >Join Waitlist</Link>;
const demo: JSX.Element =<Button className=" bg-transparent hover:bg-transparent shadow-none  border hover:border-secondary h-13 w-fit" > <Link  href={'https://app.aiklyra.com/'} >See Aiklyra in Action</Link></Button>;
// A header with a logo on the left, links in the center (like Pricing, etc...), and a CTA (like Get Started or Login) on the right.
// The header is responsive, and on mobile, the links are hidden behind a burger button.
const Header = () => {


  return (
    <header className="  w-full fixed top-0 flex justify-center text-white backdrop-blur-md z-50 ">
      <nav
        className="container flex items-center justify-between py-4 max-w-7xl  left-0 w-full   px-8  "
        aria-label="Global"
      >
        {/* Your logo/name on large screens */}
        <div className="flex lg:flex-1 !w-fit max-w-fit">
          <Link
            className="flex  items-center gap-2 shrink-0 "
            href="/"
            title={`Blue Blog homepage`}
          >
            {/* <Image
              src={logoDark}
              alt={`${config.appName} logo`}
              className="w-8 fill-white"
              
              priority={true}
              width={32}
              height={32}
            /> */}
            <span className={`font-normal text-lg font-NeueMachina  `}>Blue Blog</span>
          </Link>
        </div>
        {/* Burger button to open menu on mobile */}
        <div className="flex lg:hidden">
        <Sheet>
      <SheetTrigger >
      <span className="sr-only">Open main menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-base-content"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
      </SheetTrigger>
      <SheetContent className="text-white" >
        <SheetHeader className="text-white "  >
        <div className="flex items-center justify-between">
            <Link
              className="flex items-center gap-2 shrink-0 "
              title={`Blue Blog homepage`}
              href="/"
            >
              {/* <Image
                src={logoDark}
                alt={`${config.appName} logo`}
                className="w-8"

                priority={true}
                width={32}
                height={32}
              /> */}
              <span className={`font-bold text-lg`}>Blue Blog</span>
            </Link>
            
          </div>
        </SheetHeader>
        {/* Mobile menu, show/hide based on menu state. */}
      <div className={`relative bg-black text-white `}>

        <div
          className={`  bg-background  w-full px-8 py-4 overflow-y-auto sm:max-w-sm sm:ring-1 sm:ring-neutral/10 `}
        >
          {/* Your logo/name on small screens */}

          {/* Your links on small screens */}
          <div className="flow-root mt-6 ">
            <div className="py-4 ">
              <div className="flex flex-col gap-y-4 items-start">
                {links.map((link) => (
                  <Link
                    href={link.href}
                    key={link.href}
                    className="link link-hover"
                    title={link.label}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="divider"></div>
            {/* Your CTA on small screens */}
            <div className="flex flex-col">{waitlist}</div>
          </div>
        </div>
      </div>



      </SheetContent>
    </Sheet>

        </div>

        {/* Your links on large screens */}
        <div className="hidden lg:flex lg:justify-center lg:gap-12 lg:items-center">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className="link link-hover"
              title={link.label}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA on large screens */}
        <div className="hidden lg:flex flex-row w-[300px]">

        <div className="hidden lg:flex lg:justify-end lg:flex-1 ">{demo}</div>
        <div className="hidden lg:flex lg:justify-end lg:flex-1 btn-primary">{waitlist}</div>
        </div>
      </nav>

      
    </header>
  );
};

export default Header;
