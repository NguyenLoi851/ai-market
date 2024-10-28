import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import React from "react";
import NearLogo from "/public/near-logo.svg";
import { NearContext } from "@/wallets/near";

export const Navigation = () => {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [action, setAction] = useState<(() => void) | null>(null); // Initialize as null
  const [label, setLabel] = useState("Loading...");

  useEffect(() => {
    if (!wallet) return;

    if (signedAccountId) {
      setAction(() => () => wallet.signOut()); // Use a callback function
      setLabel(`Logout ${signedAccountId}`);
    } else {
      setAction(() => () => wallet.signIn()); // Use a callback function
      setLabel("Login");
    }
  }, [signedAccountId, wallet]);

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
          <Link href="#">
            <div className="hover:text-black pl-8">Documentation</div>
          </Link>
          <Link href="#">
            <div className="hover:text-black pl-8">Guides</div>
          </Link>
          <Link href="#">
            <div className="hover:text-black pl-8">Help</div>
          </Link>
        </div>
        

        <div className="flex-1"></div>

        <div className="navbar-nav pt-1">
          <button className="bg-blue-300" onClick={action || (() => {})}>
            {label}
          </button>
        </div>
      </div>
    </nav>
  );
};
