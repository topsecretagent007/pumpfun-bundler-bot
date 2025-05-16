# **Pumpfun Bundler Bot V2.0.4**

## **Overview**  
This bot automates **multi-wallet token purchases** on Pump.fun. It:

✅ **Creates 20 wallets** dynamically  
✅ **Airdrops SOL** from the **main wallet** to cover fees  
✅ **Uses Jito for MEV protection**  
✅ **Buys tokens with each wallet** using the specified `SWAP_AMOUNT`  

## **Configuration**  
Set the following **environment variables** in your `.env` file:

```ini
# Main Wallet (Used for airdrops & funding)
PRIVATE_KEY=your_main_wallet_private_key

# RPC Configuration
RPC_ENDPOINT=https://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY
RPC_WEBSOCKET_ENDPOINT=wss://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY

# Bot Settings
SWAP_AMOUNT=0.001                 # Token buy amount per wallet
DISTRIBUTION_WALLETNUM=20         # Number of wallets (max: 20)
JITO_FEE=0.001                    # MEV protection fee
```

### **How It Works**  
1. The bot **generates 20 wallets**.  
2. The **main wallet** airdrops SOL to these wallets for gas fees.  
3. Each wallet **buys tokens** using `SWAP_AMOUNT`.  
4. **Jito priority fees** are included in transactions.  

## **Token Data**  
Customize the token details:  

```ini
TOKEN_NAME="Verify Pump"
TOKEN_SYMBOL="VEPP"
DESCRIPTION="I will give you"
TOKEN_SHOW_NAME="Desk"
TOKEN_CREATE_ON="yesterday"
TWITTER="https://x.com/rrr"
TELEGRAM="https://t.me/www"
WEBSITE="https://sisi.com"
FILE="./image/1.jpg"
```

- **TOKEN_NAME** → The name of the token.  
- **TOKEN_SYMBOL** → Token's ticker symbol.  
- **DESCRIPTION** → Short description.  
- **TOKEN_SHOW_NAME** → Display name for UI.  
- **TOKEN_CREATE_ON** → Creation date.  
- **TWITTER** → Token’s official Twitter/X link.  
- **TELEGRAM** → Telegram group link.  
- **WEBSITE** → Official project website.  
- **FILE** → Path to token logo/image.  

---

## **Running the Bot**  
1️⃣ Install dependencies:  
   ```bash
   yarn install
   ```
2️⃣ Create a `.env` file and configure it.  
3️⃣ Run the bot:  
   ```bash
   yarn start
   ```

## **Notes**  
- **Make sure your main wallet has enough SOL** to fund all 20 wallets.  
- **Jito fees are deducted** per transaction for priority execution.  
- **Max wallets: 20** (change `DISTRIBUTION_WALLETNUM` if needed).

## **Contact me**
Telegram: topsecretagent007[https://t.me/topsecretagent_007]
