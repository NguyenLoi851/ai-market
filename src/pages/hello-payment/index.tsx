import { NearContext } from "@/wallets/near";
import { useContext, useState } from "react";
import { FTNearContract, PaymentNearContract } from "../../config";
import { useGetFtBalance } from "@/hooks/ft/use-get-ft-balance";
import BigNumber from "bignumber.js";
import { useTransferToken } from "@/hooks/ft/use-transfer-token";
import { useRegisterStorage } from "@/hooks/ft/use-register-storage";
import { useTransferTokenCall } from "@/hooks/ft/use-transfer-token-call";
import { useCountModels } from "@/hooks/payment/use-count-models";
import { useGetModelInfo } from "@/hooks/payment/use-get-model-info";
import { useRegisterModel } from "@/hooks/payment/use-register-model";
import { useUpdateModel } from "@/hooks/payment/use-update-model";
import { useGetDeposit } from "@/hooks/payment/use-get-deposit";
import { usePayModel } from "@/hooks/payment/use-pay-model";
import { useBatchTransferToken } from "@/hooks/batch/use-batch-transfer-token";
import { useBatchRegisterModel } from "@/hooks/batch/use-batch-register-model";
import { useBatchPayModel } from "@/hooks/batch/use-batch-pay-model";
import { useWithdraw } from "@/hooks/payment/use-withdraw";
import { useGetModalByMetadataId } from "@/hooks/payment/use-get-model-by-metadata-id";
import { useGetModelsByCreator } from "@/hooks/payment/use-get-models-by-creator";
import { useGetAllModels } from "@/hooks/payment/use-get-all-models";

export default function HelloPayment() {
  const { signedAccountId } = useContext(NearContext);

  /* ========================== FT contract ========================== */

  const [transferTokenAmount, setTransferTokenAmount] = useState(0);
  const [registerAccount, setRegisterAccount] = useState("");
  const [receiver, setReceiver] = useState("");
  const [memo, setMemo] = useState("");
  const [contractReceiver, setContractReceiver] = useState(PaymentNearContract);
  const [msg, setMsg] = useState("");

  const { data: ftBalance } = useGetFtBalance();
  const { mutateAsync: registerStorage } = useRegisterStorage();
  const { mutateAsync: transferToken } = useTransferToken();
  const { mutateAsync: transferTokenCall } = useTransferTokenCall();

  const handleRegisterStorage = async () => {
    await registerStorage(registerAccount);
  };

  const handleTransferToken = async () => {
    await transferToken({
      receiver,
      amount: new BigNumber(transferTokenAmount).shiftedBy(8).toString(),
      memo,
    });
  };

  const handleTransferTokenCall = async () => {
    await transferTokenCall({
      contractReceiver,
      amount: new BigNumber(transferTokenAmount).shiftedBy(8).toString(),
      msg,
    });
  };

  /* ========================== Payment contract ========================== */
  const [modelId, setModelId] = useState(1);
  const [feePerPrompt, setFeePerPrompt] = useState("");
  const [metadataId, setMetadataId] = useState(0);
  const [creator, setCreator] = useState("");
  const [updateModelId, setUpdateModelId] = useState(1);
  const [newFeePerPrompt, setNewFeePerPrompt] = useState("");
  const [newCreator, setNewCreator] = useState("");
  const [userDepositAccount, setUserDepositAccount] = useState("");
  const [payModelId, setPayModelId] = useState(1);
  const [withdrawAmount, setWithdrawAmount] = useState("0");

  const { data: cntModels } = useCountModels();
  const { data: modelInfo } = useGetModelInfo(modelId);
  const { data: modelInfoByMetadataId } = useGetModalByMetadataId(metadataId);
  const { data: modelInfoByCreator } = useGetModelsByCreator(creator);
  const { data: allModels } = useGetAllModels();
  const { mutateAsync: registerModel } = useRegisterModel();
  const { mutateAsync: updateModel } = useUpdateModel();
  const { data: userDepositAmount } = useGetDeposit(userDepositAccount);
  const { mutateAsync: payModel } = usePayModel();
  const { mutateAsync: batchRegisterModel } = useBatchRegisterModel();
  const { mutateAsync: withdraw } = useWithdraw();

  const handleRegisterModel = async () => {
    await registerModel({
      feePerPrompt,
      metadataId,
    });
  };

  const handleUpdateModel = async () => {
    await updateModel({
      modelId: updateModelId,
      newFeePerPrompt,
      newCreator,
    });
  };

  const handlePayModel = async () => {
    await payModel(payModelId);
  };

  const handleWithdraw = async () => {
    await withdraw(new BigNumber(withdrawAmount).shiftedBy(8).toString());
  };

  /* ========================== Integrate contract ========================== */
  const { mutateAsync: batchTransferToken } = useBatchTransferToken();
  const { mutateAsync: batchPayModel } = useBatchPayModel();

  const handleBatchTransferToken = async () => {
    await batchTransferToken({
      receiver,
      amount: new BigNumber(transferTokenAmount).shiftedBy(8).toString(),
      memo,
    });
  };

  const handleBatchRegisterModel = async () => {
    await batchRegisterModel({
      feePerPrompt,
      metadataId,
    });
  };

  const handleBatchPayModel = async () => {
    await batchPayModel(payModelId);
  };

  return (
    <>
      <div>
        =======================================================================
      </div>
      <div>
        ============================== FT Contract
        ==============================
      </div>
      <div>
        =======================================================================
      </div>
      <div>Contract address: {FTNearContract}</div>
      <div>
        User balance: {new BigNumber(ftBalance).shiftedBy(-8).toNumber()}
      </div>
      {/* ========================== */}
      <span>Register storage</span>
      <input
        type="text"
        className="border-black border-2 rounded-md m-2"
        placeholder="Receiver"
        onChange={(t) => setRegisterAccount(t.target.value)}
      />
      <button
        className="bg-purple-300 rounded-md p-1"
        onClick={handleRegisterStorage}
      >
        Register
      </button>
      {/* ========================== */}
      <br />
      <span>Transfer token</span>
      <input
        type="text"
        className="border-black border-2 rounded-md m-2"
        placeholder="Transfer token amount"
        onChange={(t) => setTransferTokenAmount(Number(t.target.value))}
      />
      <input
        type="text"
        className="border-black border-2 rounded-md m-2"
        placeholder="Receiver"
        onChange={(t) => setReceiver(t.target.value)}
      />
      <input
        type="text"
        className="border-black border-2 rounded-md m-2"
        placeholder="Memo"
        onChange={(t) => setMemo(t.target.value)}
      />
      <button
        className="bg-purple-300 rounded-md p-1"
        onClick={handleTransferToken}
      >
        Transfer
      </button>
      {/* ========================== */}
      <br />
      <span>Transfer token to Payment contract</span>
      <input
        type="text"
        className="border-black border-2 rounded-md m-2"
        placeholder="Transfer token amount"
        onChange={(t) => setTransferTokenAmount(Number(t.target.value))}
      />
      <input
        type="text"
        defaultValue={PaymentNearContract}
        className="border-black border-2 rounded-md m-2"
        placeholder="Contract receiver"
        onChange={(t) => setContractReceiver(t.target.value)}
      />
      <input
        type="text"
        className="border-black border-2 rounded-md m-2"
        placeholder="Msg"
        onChange={(t) => setMsg(t.target.value)}
      />
      <button
        className="bg-purple-300 rounded-md p-1"
        onClick={handleTransferTokenCall}
      >
        Transfer Call
      </button>

      <br />
      <br />
      <br />
      <div>
        =======================================================================
      </div>
      <div>
        ============================ Payment Contract
        ============================
      </div>
      <div>
        =======================================================================
      </div>
      <div>Contract address: {PaymentNearContract}</div>
      <div>Number of model: {cntModels}</div>
      {/* ========================== */}
      <span>Model info</span>
      <input
        type="text"
        defaultValue={1}
        className="border-black border-2 rounded-md m-2"
        placeholder="Model Id"
        onChange={(t) => setModelId(Number(t.target.value))}
      />
      <span>{JSON.stringify(modelInfo)}</span>
      {/* ========================== */}
      <br />
      <span>Model info by metadata id</span>
      <input
        type="text"
        defaultValue={1}
        className="border-black border-2 rounded-md m-2"
        placeholder="Metadata Id"
        onChange={(t) => setMetadataId(Number(t.target.value))}
      />
      <span>{JSON.stringify(modelInfoByMetadataId)}</span>
      {/* ========================== */}
      <br />
      <span>Models info by creator</span>
      <input
        type="text"
        className="border-black border-2 rounded-md m-2"
        placeholder="Metadata Id"
        onChange={(t) => setCreator(t.target.value)}
      />
      <span>{JSON.stringify(modelInfoByCreator)}</span>
      {/* ========================== */}
      <br />
      <br />
      <span>All models: {JSON.stringify(allModels)}</span>
      <br />
      {/* ========================== */}
      <br />
      <span>Register new model</span>
      <input
        type="text"
        className="border-black border-2 rounded-md m-2"
        placeholder="Fee per prompt"
        onChange={(t) => setFeePerPrompt(t.target.value)}
      />
      <input
        type="text"
        className="border-black border-2 rounded-md m-2"
        placeholder="Metadata id"
        onChange={(t) => setMetadataId(Number(t.target.value))}
      />
      <button
        className="bg-purple-300 rounded-md p-1"
        onClick={handleRegisterModel}
      >
        Register
      </button>
      {/* ========================== */}
      <br />
      <span>Update model info</span>
      <input
        type="text"
        className="border-black border-2 rounded-md m-2"
        placeholder="Model id"
        onChange={(t) => setUpdateModelId(Number(t.target.value))}
      />
      <input
        type="text"
        className="border-black border-2 rounded-md m-2"
        placeholder="New fee per prompt"
        onChange={(t) => setNewFeePerPrompt(t.target.value)}
      />
      <input
        type="text"
        className="border-black border-2 rounded-md m-2"
        placeholder="New creator"
        onChange={(t) => setNewCreator(t.target.value)}
      />
      <button
        className="bg-purple-300 rounded-md p-1"
        onClick={handleUpdateModel}
      >
        Update
      </button>
      {/* ========================== */}
      <br />
      <span>User deposit amount</span>
      <input
        type="text"
        className="border-black border-2 rounded-md m-2"
        placeholder="User Deposit Account"
        onChange={(t) => setUserDepositAccount(t.target.value)}
      />
      <span>{new BigNumber(userDepositAmount).shiftedBy(-8).toString()}</span>

      {/* ========================== */}
      <br />
      <span>User withdraw</span>
      <input
        type="text"
        className="border-black border-2 rounded-md m-2"
        placeholder="Withdraw amount"
        onChange={(t) => setWithdrawAmount(t.target.value)}
      />
      <button className="bg-purple-300 rounded-md p-1" onClick={handleWithdraw}>
        Withdraw
      </button>

      {/* ========================== */}
      <br />
      <span>Pay for model separately with transfer</span>
      <input
        type="text"
        className="border-black border-2 rounded-md m-2"
        placeholder="Pay model id"
        onChange={(t) => setPayModelId(Number(t.target.value))}
      />
      <button className="bg-purple-300 rounded-md p-1" onClick={handlePayModel}>
        Pay
      </button>

      <br />
      <br />
      <br />
      <div>
        =======================================================================
      </div>
      <div>
        ============================= Integrate Action
        =============================
      </div>
      <div>
        =======================================================================
      </div>

      <br />
      <span>Creator register new model</span>
      <p>
        Include actions: Register storage in FT contract, register model in
        Payment contract
      </p>
      <input
        type="text"
        className="border-black border-2 rounded-md m-2"
        placeholder="Fee per prompt"
        onChange={(t) => setFeePerPrompt(t.target.value)}
      />
      <button
        className="bg-purple-300 rounded-md p-1"
        onClick={handleBatchRegisterModel}
      >
        Register
      </button>

      {/* ========================== */}
      <br />
      <span>User pay for using model</span>
      <p>
        Include actions: User deposit to Payment contract through FT contract,
        then pay in Payment contract
      </p>
      <input
        type="text"
        className="border-black border-2 rounded-md m-2"
        placeholder="Pay model id"
        onChange={(t) => setPayModelId(Number(t.target.value))}
      />
      <button
        className="bg-purple-300 rounded-md p-1"
        onClick={handleBatchPayModel}
      >
        Pay
      </button>

      {/* ========================== */}
      <br />
      <span>Transfer token to other receiver</span>
      <p>
        Include actions: User register storage for receiver in FT contract,
        transfer to receiver in FT contract
      </p>
      <input
        type="text"
        className="border-black border-2 rounded-md m-2"
        placeholder="Transfer token amount"
        onChange={(t) => setTransferTokenAmount(Number(t.target.value))}
      />
      <input
        type="text"
        className="border-black border-2 rounded-md m-2"
        placeholder="Receiver"
        onChange={(t) => setReceiver(t.target.value)}
      />
      <input
        type="text"
        className="border-black border-2 rounded-md m-2"
        placeholder="Memo"
        onChange={(t) => setMemo(t.target.value)}
      />
      <button
        className="bg-purple-300 rounded-md p-1"
        onClick={handleBatchTransferToken}
      >
        Transfer
      </button>
    </>
  );
}
