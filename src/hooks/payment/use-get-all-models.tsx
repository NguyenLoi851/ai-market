import { useQuery } from "react-query";
import { PaymentNearContract } from "@/config";
import { useContext } from "react";
import { NearContext } from "@/wallets/near";

export const useGetAllModels = () => {
  const { signedAccountId, wallet } = useContext(NearContext);

  const fetchModel = async () => {
    if (!wallet || !signedAccountId) return;

    const modelInfo = await wallet.viewMethod({
      contractId: PaymentNearContract,
      method: "get_all_models",
    });
    return modelInfo;
  };

  return useQuery(["ftAllModels"], fetchModel);
};