import { useMutation, useQueryClient } from "react-query";

import { useContext } from "react";
import { NearContext } from "@/wallets/near";
import { FTNearContract } from "@/config";

export function useTransferToken() {
  const { wallet } = useContext(NearContext);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({
      receiver,
      amount,
      memo,
    }: {
      receiver: string;
      amount: string;
      memo: string;
    }) => {
      if (!wallet) return;

      const result = await wallet.callMethod({
        contractId: FTNearContract,
        method: "ft_transfer",
        args: { receiver_id: receiver, amount, memo },
        deposit: "1"
      });

      return result;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["ftBalance"]);
      },
    }
  );

  return mutation;
}
