import { useQuery } from "react-query";

import { FTNearContract } from "@/config";
import { useContext } from "react";
import { NearContext } from "@/wallets/near";

export const useGetFtBalance = () => {
  const {signedAccountId, wallet } = useContext(NearContext);

  const fetchFtBalance = async () => {
    if (!wallet || !signedAccountId) return;

    const ftBalance = await wallet.viewMethod({
      contractId: FTNearContract,
      method: "ft_balance_of",
      args: {account_id: signedAccountId}
    });
    return ftBalance;
  };

  return useQuery(["ftBalance"], fetchFtBalance);
};
