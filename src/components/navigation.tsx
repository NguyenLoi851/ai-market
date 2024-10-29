import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import React from "react";
import NearLogo from "/public/near-logo.svg";
import { NearContext } from "@/wallets/near";
import { useGetFtBalance } from "@/hooks/ft/use-get-ft-balance";
import BigNumber from "bignumber.js";
import { useTransferTokenCall } from "@/hooks/ft/use-transfer-token-call";
import { PaymentNearContract } from "@/config";
import { useGetDeposit } from "@/hooks/payment/use-get-deposit";

export const Navigation = () => {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [action, setAction] = useState<(() => void) | null>(null); // Initialize as null
  const [label, setLabel] = useState("Loading...");
  const [transferTokenAmount, setTransferTokenAmount] = useState(0);

  const { data: ftBalance } = useGetFtBalance();
  const { mutateAsync: transferTokenCall } = useTransferTokenCall();
  const { data: userDepositAmount } = useGetDeposit("");

  const handleDeposit = async () => {
    await transferTokenCall({
      contractReceiver: PaymentNearContract,
      amount: new BigNumber(transferTokenAmount).shiftedBy(8).toString(),
      msg: "Deposit from " + signedAccountId,
    });
  };

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
          <button
            className="bg-blue-300 border-black border-2"
            onClick={action || (() => {})}
          >
            {label}
          </button>
        </div>
        <div>Balance: {ftBalance ? new BigNumber(ftBalance).shiftedBy(-8).toNumber(): "Loading ..."} OpenAgents Token</div>
        <div>Deposited Amount: {userDepositAmount ? new BigNumber(userDepositAmount).shiftedBy(-8).toNumber(): "Loading ..."} OpenAgents Token</div>
        <span>(dev TODO: Use modal for better UX)</span>
        <input
          type="text"
          className="border-black border-2 rounded-md m-2"
          placeholder="Deposit amount"
          onChange={(t) => setTransferTokenAmount(Number(t.target.value))}
        />
        <button
          className="bg-purple-300 rounded-md p-1"
          onClick={handleDeposit}
        >
          Deposit
        </button>
      </div>
    </nav>
  );
};
