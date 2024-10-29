import { useQuery } from "react-query";

import { PaymentNearContract } from "@/config";
import { useContext } from "react";
import { NearContext } from "@/wallets/near";

export const useCountModels = () => {
  const { signedAccountId, wallet } = useContext(NearContext);

  const fetchModels = async () => {
    if (!wallet || !signedAccountId) return;

    const cntNumber = await wallet.viewMethod({
      contractId: PaymentNearContract,
      method: "get_model_count",
    });
    return cntNumber;
  };

  return useQuery(["ftCountModels"], fetchModels, {
    enabled: !!wallet && !!signedAccountId,
  });
};
