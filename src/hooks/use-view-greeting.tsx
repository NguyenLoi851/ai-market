import { useQuery } from "react-query";

import { HelloNearContract } from "@/config";
import { useContext } from "react";
import { NearContext } from "@/wallets/near";

const CONTRACT = HelloNearContract;

export const useViewGreeting = () => {
  const { wallet } = useContext(NearContext);

  const fetchGreeting = async () => {
    if (!wallet) return;

    const greeting = await wallet.viewMethod({
      contractId: CONTRACT,
      method: "get_greeting",
    });
    return greeting;
  };

  return useQuery(["greeting"], fetchGreeting);
};
