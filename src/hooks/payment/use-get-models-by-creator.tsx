import { useQuery } from "react-query";
import { PaymentNearContract } from "@/config";
import { useContext } from "react";
import { NearContext } from "@/wallets/near";

export const useGetModelsByCreator = (creator: string) => {
  const { signedAccountId, wallet } = useContext(NearContext);

  const fetchModel = async () => {
    if (!wallet || !creator) return;

    const modelInfo = await wallet.viewMethod({
      contractId: PaymentNearContract,
      method: "get_models_by_creator",
      args: { creator: creator == "" ? signedAccountId : creator },
    });
    return modelInfo;
  };

  return useQuery(["ftModelByCreator"], fetchModel, {
    enabled: !!wallet && !!creator, // Fetch only if creator is provided
  });
};
