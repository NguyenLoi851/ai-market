import { useMutation, useQueryClient } from "react-query";

import { useContext } from "react";
import { NearContext } from "@/wallets/near";
import { PaymentNearContract } from "@/config";

export function useWithdraw() {
  const { wallet } = useContext(NearContext);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (amount: string) => {
      if (!wallet) return;

      const result = await wallet.callMethod({
        contractId: PaymentNearContract,
        method: "ft_withdraw",
        args: { amount },
      });

      return result;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["ftDeposit"]);
        queryClient.invalidateQueries(["ftBalance"]);
      },
    }
  );

  return mutation;
}
