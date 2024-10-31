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
  { name: 'Home', href: '/models' },
  { name: 'Models', href: '/models' },
  { name: 'Creator', href: '/creators' },
];

export const Navigation = () => {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [action, setAction] = useState<(() => void) | null>(null);
  const [label, setLabel] = useState("Loading...");

  useEffect(() => {
    if (!wallet) return;

    if (signedAccountId) {
      setAction(() => () => wallet.signOut());
      setLabel(`Disconnect ${signedAccountId}`);
    } else {
      setAction(() => () => wallet.signIn());
      setLabel("Connect wallet");
    }
  }, [signedAccountId, wallet]);

  const pathname = usePathname();

  return (
    <nav className="navbar navbar-expand-lg w-full">
      <div className="container-fluid flex items-center space-x-4 text-gray-500">
        <Link href="/" passHref legacyBehavior>
          <Image
            priority
            src={NearLogo}
            alt="NEAR"
            width="50" // Further increase width
            height="40" // Further increase height
            className="d-inline-block align-text-top"
          />
        </Link>

        <div className="font-bold text-2xl flex items-center"> {/* Increase text size to 2xl */}
          {links.map((link) => {
            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  'p-3 text-2xl font-medium hover:text-blue-600 md:p-2 md:px-3', // Increase link text size to 2xl
                  {
                    'text-blue-600': pathname === link.href,
                  },
                )}
              >
                <div className="hover:text-blue-400 pl-8">
                  <strong>{link.name}</strong> {/* Keep the bold style */}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="flex-1"></div>
        <div className="navbar-nav pt-1">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105" // Increase button padding
            onClick={action || (() => {})}
          >
            {label}
          </button>
        </div>
      </div>
    </nav>
  );
};