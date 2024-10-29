import { useMutation } from "react-query";

import { useContext } from "react";
import { NearContext } from "@/wallets/near";
import { FTNearContract } from "@/config";
import { utils } from "near-api-js";

export function useRegisterStorage() {
  const { signedAccountId, wallet } = useContext(NearContext);

  const mutation = useMutation(async (accountId: string) => {
    if (!wallet) return;

    const result = await wallet.callMethod({
      contractId: FTNearContract,
      method: "storage_deposit",
      args: { account_id: accountId == "" ? signedAccountId : accountId },
      deposit: utils.format.parseNearAmount("0.01") || "0",
    });

    return result;
  });

  return mutation;
}
