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
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link href="/" passHref legacyBehavior>
          <Image
            priority
            src={NearLogo}
            alt="NEAR"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />
        </Link>
        <div className="navbar-nav pt-1">
          <button className="btn btn-secondary" onClick={action || (() => {})}>
            {label}
          </button>
        </div>
      </div>
    </nav>
  );
};
