import { PaymentNearContract } from "@/config";
import { useGetFtBalance } from "@/hooks/ft/use-get-ft-balance";
import { useTransferTokenCall } from "@/hooks/ft/use-transfer-token-call";
import { useGetDeposit } from "@/hooks/payment/use-get-deposit";
import { NearContext } from "@/wallets/near";
import BigNumber from "bignumber.js";
import { useContext, useState } from "react";

export const Balance = () => {
  const { signedAccountId } = useContext(NearContext);
  const { data: ftBalance } = useGetFtBalance();
  const { data: userDepositAmount } = useGetDeposit("");
  const [transferTokenAmount, setTransferTokenAmount] = useState(0);
  const { mutateAsync: transferTokenCall } = useTransferTokenCall();

  const handleDeposit = async () => {
    await transferTokenCall({
      contractReceiver: PaymentNearContract,
      amount: new BigNumber(transferTokenAmount).shiftedBy(8).toString(),
      msg: "Deposit from " + signedAccountId,
    });
  };

  return (
    <>
      {signedAccountId && (
        <>
          <div>
            Balance:{" "}
            {ftBalance
              ? new BigNumber(ftBalance).shiftedBy(-8).toNumber()
              : "Loading ..."}{" "}
            OpenAgents Token
          </div>
          <div>
            Deposited Amount:{" "}
            {userDepositAmount
              ? new BigNumber(userDepositAmount).shiftedBy(-8).toNumber()
              : "Loading ..."}{" "}
            OpenAgents Token
          </div>
        </>
      )}
      <span>(dev TODO: Use modal for better UX)</span>
      <input
        type="text"
        className="border-black border-2 rounded-md m-2"
        placeholder="Deposit amount"
        onChange={(t) => setTransferTokenAmount(Number(t.target.value))}
      />
      <button className="bg-purple-300 rounded-md p-1" onClick={handleDeposit}>
        Deposit
      </button>
    </>
  );
};
