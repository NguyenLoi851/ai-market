import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { FTNearContract, NetworkId, PaymentNearContract } from "@/config";
import { NearContext, Wallet } from "@/wallets/near";
import { MainLayout } from "@/layouts";
import { QueryClient, QueryClientProvider } from "react-query";

const wallet = new Wallet({ networkId: NetworkId, createAccessKeyFor: PaymentNearContract });

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const [signedAccountId, setSignedAccountId] = useState("");

  useEffect(() => {
    wallet.startUp(setSignedAccountId);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NearContext.Provider value={{ wallet, signedAccountId }}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </NearContext.Provider>
    </QueryClientProvider>
  );
}
