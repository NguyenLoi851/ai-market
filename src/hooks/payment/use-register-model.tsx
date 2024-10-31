import { useMutation, useQueryClient } from "react-query";

import { useContext } from "react";
import { NearContext } from "@/wallets/near";
import { PaymentNearContract } from "@/config";
import BigNumber from "bignumber.js";

export function useRegisterModel() {
  const { wallet } = useContext(NearContext);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({
      feePerPrompt,
      metadataId,
    }: {
      feePerPrompt: string;
      metadataId: number;
    }) => {
      if (!wallet) return;

      const result = await wallet.callMethod({
        contractId: PaymentNearContract,
        method: "register_model",
        args: {
          fee_per_prompt: new BigNumber(feePerPrompt).shiftedBy(8).toString(),
          metadata_id: metadataId,
        },
      });

      return result;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["ftCountModels"]);
      },
    }
  );

  return mutation;
}
