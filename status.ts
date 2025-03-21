import {  Connection, Keypair, PublicKey,} from "@solana/web3.js"
import { getAssociatedTokenAddressSync, getMint } from "@solana/spl-token";
import { BN } from "bn.js";
import base58 from "bs58"

import { readJson, retrieveEnvVariable, sleep } from "./utils"
import { RPC_ENDPOINT, RPC_WEBSOCKET_ENDPOINT } from "./constants";

const connection = new Connection(RPC_ENDPOINT, {wsEndpoint: RPC_WEBSOCKET_ENDPOINT, commitment: "confirmed" });

export const displayStatus = async () => {
  try {
    const walletsData = readJson()
    const mintStr = readJson("mint.json")[0]
    const mint = new PublicKey(mintStr)

    const wallets = walletsData.map((kp) => Keypair.fromSecretKey(base58.decode(kp)))

    const mintInfo = await getMint(connection, mint)
    wallets.map(async (kp, i) => {
      const ata = getAssociatedTokenAddressSync(mint, kp.publicKey)
      const tokenBalance = (await connection.getTokenAccountBalance(ata)).value.uiAmount
      if (!tokenBalance) {
        console.log("Token balance not retrieved, Error...")
        return
      }
      const percent = new BN(tokenBalance).div(new BN((mintInfo.supply).toString()).div(new BN(10 ** mintInfo.decimals))).mul(new BN(100)).toString()
      console.log("Wallet ", i, " : ", kp.publicKey.toBase58(), ", Holding Percent -> ", percent, "%, Token Balance -> ", tokenBalance.toFixed(2))
    })
  } catch (error) {
    console.log("Error in displaying wallets status")
    return
  }
}

displayStatus()