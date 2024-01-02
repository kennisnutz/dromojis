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
import { Contract, beginCell } from "@ton/core";

const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

export function useDropmojisCollectionContract() {
  const { client } = useTonClient();
  const { wallet, sender } = useTonConnect();
  const [balance, setBalance] = useState<string | null>();

  const dropmojisCollectionContract = useAsyncInitialize(async () => {
    if (!client || !wallet) return;

    const contract = DropmojisCollection.fromAddress(
      Address.parse(dropmojisCollectionAddress)
    );

    return client.open(contract) as OpenedContract<DropmojisCollection>;
  }, [client, wallet]);
  const message: MintParams = {
    $$type: "MintParams",
    query_id: 0n,
    amount: 1n,
  };

  return {
    mint: async () => {
      await dropmojisCollectionContract?.send(
        sender,
        {
          value: toNano(price),
        },
        "Mint"
      );
    },
  };
}
