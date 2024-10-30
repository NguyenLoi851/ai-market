import { useMutation, useQueryClient } from "react-query";

import { useContext } from "react";
import { NearContext } from "@/wallets/near";
import { PaymentNearContract } from "@/config";
import BigNumber from "bignumber.js";

export function usePayModel() {
  const { wallet } = useContext(NearContext);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (modelId: number) => {
      if (!wallet) return;

      const result = await wallet.callMethod({
        contractId: PaymentNearContract,
        method: "pay",
        args: {
          model_id: modelId,
        },
      });

      return result;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["ftModel"]);
        queryClient.invalidateQueries(["ftDeposit"]);
      },
    }
  );

  return mutation;
}
