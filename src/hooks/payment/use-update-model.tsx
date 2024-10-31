import { useMutation, useQueryClient } from "react-query";

import { useContext } from "react";
import { NearContext } from "@/wallets/near";
import { PaymentNearContract } from "@/config";
import BigNumber from "bignumber.js";

interface UpdateModelInfoArgs {
  model_id: number;
  new_fee_per_prompt?: string;
  new_creator?: string;
}

export function useUpdateModel() {
  const { wallet } = useContext(NearContext);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({
      modelId,
      newFeePerPrompt,
      newCreator,
    }: {
      modelId: number;
      newFeePerPrompt?: string;
      newCreator?: string;
    }) => {
      if (!wallet || (!newFeePerPrompt && !newCreator)) return;

      const args: UpdateModelInfoArgs = { model_id: modelId };

      if (newFeePerPrompt) {
        args.new_fee_per_prompt = new BigNumber(newFeePerPrompt).shiftedBy(8).toString();
      }
      
      if (newCreator) {
        args.new_creator = newCreator;
      }
      
      const result = await wallet.callMethod({
        contractId: PaymentNearContract,
        method: "update_model_info",
        args,
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
