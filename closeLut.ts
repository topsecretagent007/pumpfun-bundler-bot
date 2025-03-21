import { PublicKey, Keypair, AddressLookupTableProgram, ComputeBudgetProgram, Transaction, sendAndConfirmTransaction, Connection } from "@solana/web3.js"
import base58 from 'bs58'
import { readJson, sleep } from "./utils"
import { PRIVATE_KEY, RPC_ENDPOINT, RPC_WEBSOCKET_ENDPOINT } from "./constants"

const commitment = "confirmed"

const mainKp = Keypair.fromSecretKey(base58.decode(PRIVATE_KEY))
const connection = new Connection(RPC_ENDPOINT, {
  wsEndpoint: RPC_WEBSOCKET_ENDPOINT, commitment
})

const closeLut = async () => {
  try {
    const lutData = readJson("lut.json")
    if (lutData) {
      console.log("No lut data saved as file")
      return
    }
    const lookupTableAddress = new PublicKey(lutData[0])
    try {
      const cooldownTx = new Transaction().add(
        ComputeBudgetProgram.setComputeUnitLimit({ units: 15_000_000 }),
        ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 5_000 }),
        AddressLookupTableProgram.deactivateLookupTable({
          lookupTable: lookupTableAddress, // Address of the lookup table to deactivate
          authority: mainKp.publicKey, // Authority to modify the lookup table
        })
      )
      const coolDownSig = await sendAndConfirmTransaction(connection, cooldownTx, [mainKp])
      console.log("Cool Down sig:", coolDownSig)

    } catch (error) {
      console.log("Deactivating LUT error:", error)
    }

    await sleep(250000)
    console.log("\n*******************************   You need to wait for 250 seconds until the LUT is fully deactivated, then the SOL in lut can be reclaimed  *******************************\n")

    try {
      const closeTx = new Transaction().add(
        ComputeBudgetProgram.setComputeUnitLimit({ units: 15_000_000 }),
        ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 5_000 }),
        AddressLookupTableProgram.closeLookupTable({
          lookupTable: lookupTableAddress, // Address of the lookup table to close
          authority: mainKp.publicKey, // Authority to close the LUT
          recipient: mainKp.publicKey, // Recipient of the reclaimed rent balance
        })
      )
      const closeSig = await sendAndConfirmTransaction(connection, closeTx, [mainKp])
      console.log("Close LUT Sig:", closeSig)
    } catch (error) {
      console.log("Close LUT error:", error)
    }
  } catch (error) {
    console.log("Unexpected error while closing the LUT")
  }
}


closeLut()
