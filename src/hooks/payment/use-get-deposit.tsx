import { useQuery } from "react-query";
import { PaymentNearContract } from "@/config";
import { useContext } from "react";
import { NearContext } from "@/wallets/near";

export const useGetDeposit = (userDepositAccount: string) => {
  const { signedAccountId, wallet } = useContext(NearContext);

  const fetchDeposit = async () => {
    if (!wallet || !signedAccountId) return;

    const userDeposit = await wallet.viewMethod({
      contractId: PaymentNearContract,
      method: "ft_deposits_of",
      args: {
        account_id:
          userDepositAccount == "" ? signedAccountId : userDepositAccount,
      },
    });
    return userDeposit;
  };

  return useQuery(["ftDeposit"], fetchDeposit, {
    enabled: !!wallet && !!signedAccountId,
  });
};
