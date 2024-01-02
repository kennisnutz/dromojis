import { useEffect, useState } from "react";
import { Address, fromNano, OpenedContract, toNano } from "ton-core";
import {
  DropmojisCollection,
  MintParams,
} from "../../build/DropmojisCollection/tact_DropmojisCollection";
import { dropmojisCollectionAddress, mintParams, price } from "./config";

import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";

const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

export function useDropmojisCollectionContract() {
  const { client } = useTonClient();
  const { wallet, sender } = useTonConnect();
  const [balance, setBalance] = useState<string | null>();

  const dropmojisCollectionContract = useAsyncInitialize(async () => {
    if (!client || !wallet) return;

    try {
      const contract = DropmojisCollection.fromAddress(
        Address.parse(dropmojisCollectionAddress)
      ) as any;

      if (contract.init !== undefined) return client.open(contract);
    } catch (error) {
      console.error("Error opening contract:", error);
      return null; // Return null for the Maybe type in case of an error
    }
  }, [client, wallet]);
  const message: MintParams = {
    $$type: "MintParams",
    query_id: 0n,
    amount: 1n,
  };

  return {
    mint: async () => {
      try {
        await dropmojisCollectionContract?.send(
          sender,
          {
            value: toNano(price),
          },
          "Mint"
        );
      } catch (error) {
        console.log("error", error);
      }
    },
  };
}
