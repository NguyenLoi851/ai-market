import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { NetworkId } from "@/config";
import { NearContext, Wallet } from "@/wallets/near";
import { Navigation } from "@/components/navigation";
import { MainLayout } from "@/layouts";

const wallet = new Wallet({ networkId: NetworkId });

export default function App({ Component, pageProps }: AppProps) {
  const [signedAccountId, setSignedAccountId] = useState("");

  useEffect(() => {
    wallet.startUp(setSignedAccountId);
  }, []);

  return (
    <NearContext.Provider value={{ wallet, signedAccountId }}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </NearContext.Provider>
  );
}
