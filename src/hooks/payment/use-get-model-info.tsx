import { useQuery } from "react-query";
import { PaymentNearContract } from "@/config";
import { useContext } from "react";
import { NearContext } from "@/wallets/near";

export const useGetModelInfo = (modelId: number) => {
  const { signedAccountId, wallet } = useContext(NearContext);

  const fetchModel = async () => {
    if (!wallet || !signedAccountId || !modelId) return;

    const modelInfo = await wallet.viewMethod({
      contractId: PaymentNearContract,
      method: "get_model_info",
      args: { model_id: modelId },
    });
    return modelInfo;
  };

  return useQuery(["ftModel"], fetchModel, {
    enabled: !!modelId, // Fetch only if modelId is provided
  });
};
