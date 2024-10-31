import { useMutation, useQueryClient } from "react-query";

import { useContext } from "react";
import { NearContext, THIRTY_TGAS } from "@/wallets/near";
import { FTNearContract, PaymentNearContract } from "@/config";
import BigNumber from "bignumber.js";
import { utils } from "near-api-js";

export function useBatchRegisterModel() {
  const { signedAccountId, wallet } = useContext(NearContext);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({ feePerPrompt }: { feePerPrompt: string }) => {
      if (!wallet) return;

      const ftTx = {
        receiverId: FTNearContract,
        actions: [
          {
            type: "FunctionCall",
            params: {
              methodName: "storage_deposit",
              args: { account_id: signedAccountId },
              gas: THIRTY_TGAS,
              deposit: utils.format.parseNearAmount("0.01") || "0",
            },
          },
        ],
      };

      const paymentTx = {
        receiverId: PaymentNearContract,
        actions: [
          {
            type: "FunctionCall",
            params: {
              methodName: "register_model",
              args: {
                fee_per_prompt: new BigNumber(feePerPrompt)
                  .shiftedBy(8)
                  .toString(),
              },
              gas: THIRTY_TGAS,
              deposit: 0,
            },
          },
        ],
      };

      const result = await wallet.signAndSendTransactions({
        transactions: [ftTx, paymentTx],
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
