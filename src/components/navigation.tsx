import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import React from "react";
import NearLogo from "/public/near-logo.svg";
import { NearContext } from "@/wallets/near";
import { Balance } from "./balance";
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Home', href: '/' },
  {
    name: 'Models',
    href: '/models',
  },
  { name: 'Creator', href: '/creators'},
];

export const Navigation = () => {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [action, setAction] = useState<(() => void) | null>(null); // Initialize as null
  const [label, setLabel] = useState("Loading...");

  useEffect(() => {
    if (!wallet) return;

    if (signedAccountId) {
      setAction(() => () => wallet.signOut()); // Use a callback function
      setLabel(`Disconnect ${signedAccountId}`);
    } else {
      setAction(() => () => wallet.signIn()); // Use a callback function
      setLabel("Connect wallet");
    }
  }, [signedAccountId, wallet]);

  const pathname = usePathname();

  return (
    <nav className="navbar navbar-expand-lg w-full">
      <div className="container-fluid flex items-center space-x-4 text-gray-500 ">
        <Link href="/" passHref legacyBehavior >
          <Image
            priority
            src={NearLogo}
            alt="NEAR"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />
        </Link>

        <div className="font-bold text-lg flex items-center">
        {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'p-3 text-lg font-medium hover:text-blue-600 md:p-2 md:px-3',
              {
                'text-blue-600': pathname === link.href,
              },
            )}
          >
            <div className="hover:text-blue-400 pl-8">{link.name}</div>
          </Link>
        );
      })}
          {/* <Link href="#">
            <div className="hover:text-black pl-8">Documentation</div>
          </Link>
          <Link href="#">
            <div className="hover:text-black pl-8">Guides</div>
          </Link>
          <Link href="#">
            <div className="hover:text-black pl-8">Help</div>
          </Link> */}
        </div>
        

        <div className="flex-1"></div>

        <div className="navbar-nav pt-1">
          <button
            className="bg-blue-300 border-black border-2"
            onClick={action || (() => {})}
          >
            {label}
          </button>
        </div>
        <Balance />
      </div>
    </nav>
  );
};
