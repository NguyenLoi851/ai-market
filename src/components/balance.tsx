import { PaymentNearContract } from "@/config";
import { useGetFtBalance } from "@/hooks/ft/use-get-ft-balance";
import { useTransferTokenCall } from "@/hooks/ft/use-transfer-token-call";
import { useGetDeposit } from "@/hooks/payment/use-get-deposit";
import { NearContext } from "@/wallets/near";
import BigNumber from "bignumber.js";
import { useContext, useState } from "react";
import { TextField, Button as MuiButton } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";

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
    <div className="p-4">
      {signedAccountId && (
        <>
          <div className="text-lg font-semibold mb-2">
            Balance:{" "}
            <span className="font-normal">
              {ftBalance
                ? new BigNumber(ftBalance).shiftedBy(-8).toNumber()
                : "Loading ..."}{" "}
              OpenAgents
            </span>
          </div>
          <div className="text-lg font-semibold mb-2">
            Deposited:{" "}
            <span className="font-normal">
              {userDepositAmount
                ? new BigNumber(userDepositAmount).shiftedBy(-8).toNumber()
                : "Loading ..."}{" "}
              OpenAgents
            </span>
          </div>
        </>
      )}
      <div className="flex items-center mb-2">
        <TextField
          type="number"
          label="Deposit Amount"
          variant="outlined"
          className="mr-2 flex-1" // added flex-1 for better width handling
          onChange={(e) => setTransferTokenAmount(Number(e.target.value))}
        />
        <MuiButton
          variant="contained"
          color="primary"
          onClick={handleDeposit}
          startIcon={<AddCircleOutline />}
          style={{
            background: "linear-gradient(45deg, #3f51b5 30%, #ff4081 90%)",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "8px",
            fontWeight: "bold",
            textTransform: "none",
            boxShadow: "0 3px 5px 2px rgba(63, 81, 181, .3)",
          }}
          disabled={!transferTokenAmount || transferTokenAmount <= 0}
        >
          Deposit
        </MuiButton>
      </div>
    </div>
  );
};