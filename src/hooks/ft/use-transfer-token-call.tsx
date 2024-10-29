import { useMutation, useQueryClient } from "react-query";

import { useContext } from "react";
import { NearContext } from "@/wallets/near";
import { FTNearContract } from "@/config";

export function useTransferTokenCall() {
  const { wallet } = useContext(NearContext);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({
      contractReceiver,
      amount,
      msg,
    }: {
      contractReceiver: string;
      amount: string;
      msg: string;
    }) => {
      if (!wallet) return;

      const result = await wallet.callMethod({
        contractId: FTNearContract,
        method: "ft_transfer_call",
        args: { receiver_id: contractReceiver, amount, msg },
        deposit: "1",
        gas: "100000000000000",
      });

      return result;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["ftBalance"]);
        queryClient.invalidateQueries(["ftDeposit"]);
      },
    }
  );

  return mutation;
}
