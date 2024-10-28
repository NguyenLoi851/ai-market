import { useContext, useEffect, useState } from "react";

import { Cards } from "@/components/cards";
import styles from "@/styles/app.module.css";
import { NearContext } from "@/wallets/near";

import { HelloNearContract } from "../../config";
import { useViewGreeting } from "@/hooks/use-view-greeting";
import { useSetGreeting } from "@/hooks/use-set-greeting";

// Contract that the app will interact with
const CONTRACT = HelloNearContract;

export default function HelloNear() {
  const { signedAccountId } = useContext(NearContext);

  const [newGreeting, setNewGreeting] = useState("loading...");
  const [loggedIn, setLoggedIn] = useState(false);

  const { data: greeting } = useViewGreeting();
  const { mutateAsync: setGreeting, isLoading: greetingLoading } =
    useSetGreeting();

  useEffect(() => {
    setLoggedIn(!!signedAccountId);
  }, [signedAccountId]);

  const saveGreeting = async () => {
    await setGreeting(newGreeting);
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Interacting with the contract: &nbsp;
          <code className={styles.code}>{CONTRACT}</code>
        </p>
      </div>

      <div className={styles.center}>
        <h1 className="w-100">
          The contract says - fetch from hook: <code>{greeting}</code>
        </h1>
        <div className="input-group" hidden={!loggedIn}>
          <input
            type="text"
            className="border-black border-2"
            placeholder="Store a new greeting"
            onChange={(t) => setNewGreeting(t.target.value)}
          />
          <div className="input-group-append">
            <button className="bg-green-300" onClick={saveGreeting}>
              <span hidden={greetingLoading}> Save </span>
              <i
                className="spinner-border spinner-border-sm"
                hidden={!greetingLoading}
              ></i>
            </button>
          </div>
        </div>
        <div className="" hidden={loggedIn}>
          <p className=""> Please login to change the greeting </p>
        </div>
      </div>
    </main>
  );
}
