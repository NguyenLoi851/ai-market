import { useMutation, useQueryClient } from "react-query";

import { useContext } from "react";
import { NearContext } from "@/wallets/near";
import { HelloNearContract } from "@/config";

const CONTRACT = HelloNearContract;

export function useSetGreeting() {
  const { wallet } = useContext(NearContext);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (newGreeting: string) => {
      if (!wallet) return;

      const result = await wallet.callMethod({
        contractId: CONTRACT,
        method: "set_greeting",
        args: { greeting: newGreeting },
      });

      return result;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["greeting"]);
      },
    }
  );

  return mutation;
}
