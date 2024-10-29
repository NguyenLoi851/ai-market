import { useQuery } from "react-query";
import { PaymentNearContract } from "@/config";
import { useContext } from "react";
import { NearContext } from "@/wallets/near";

export const useGetModalByMetadataId = (metadataId: number) => {
  const { signedAccountId, wallet } = useContext(NearContext);

  const fetchModel = async () => {
    if (!wallet || !signedAccountId || !metadataId) return;

    const modelInfo = await wallet.viewMethod({
      contractId: PaymentNearContract,
      method: "get_model_by_metadata_id",
      args: { metadata_id: metadataId },
    });
    return modelInfo;
  };

  return useQuery(["ftModelByMetadata"], fetchModel, {
    enabled: !!wallet && !!signedAccountId && !!metadataId, // Fetch only if metadataId is provided
  });
};
