import { useMutation, useQueryClient } from "react-query";

import { useContext } from "react";
import { NearContext, THIRTY_TGAS } from "@/wallets/near";
import { FTNearContract } from "@/config";
import { utils } from "near-api-js";

export function useBatchTransferToken() {
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

      const ftTx = {
        receiverId: FTNearContract,
        actions: [
          {
            type: 'FunctionCall',
            params: {
              methodName: 'storage_deposit',
              args: { account_id: receiver },
              gas: THIRTY_TGAS, deposit: utils.format.parseNearAmount("0.01") || "0"
            }
          },
          {
            type: 'FunctionCall',
            params: {
              methodName: 'ft_transfer',
              args: { receiver_id: receiver, amount, memo },
              gas: THIRTY_TGAS, deposit: 1 }
          }
        ]
      }

      const result = await wallet.signAndSendTransactions({
        transactions: [
          ftTx
        ]
      })

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
