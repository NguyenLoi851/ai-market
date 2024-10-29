import { useMutation, useQueryClient } from "react-query";

import { useContext } from "react";
import { NearContext, THIRTY_TGAS } from "@/wallets/near";
import { FTNearContract, PaymentNearContract } from "@/config";
import { utils } from "near-api-js";

export function useBatchPayModel() {
  const { wallet } = useContext(NearContext);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (modelId: number) => {
      if (!wallet) return;

      const modelInfo = await wallet.viewMethod({
        contractId: PaymentNearContract,
        method: "get_model_info",
        args: { model_id: modelId },
      });

      const ftTx = {
        receiverId: FTNearContract,
        actions: [
          {
            type: "FunctionCall",
            params: {
              methodName: "ft_transfer_call",
              args: {
                receiver_id: PaymentNearContract,
                amount: modelInfo.fee_per_prompt,
                msg: "",
              },
              gas: "100000000000000",
              deposit: 1,
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
              methodName: "pay",
              args: {
                model_id: modelId,
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
        queryClient.invalidateQueries(["ftBalance"]);
      },
    }
  );

  return mutation;
}
