# 💧 Fluid Token (FLD)

**Fluid Token (FLD)** — A modular ERC20 token with:
- Multi-signature governance
- Built-in airdrop system
- On-chain sales logic
- Polygon mainnet deployment

---

## 🚀 Deploy via GitHub Actions

1. Go to **Settings → Secrets and Variables → Actions**
2. Add the following secrets:
   - `ALCHEMY_URL`
   - `PRIVATE_KEY`
   - `FOUNDATION_WALLET`
   - `RELAYER_WALLET`
   - `SIGNER1`
   - `SIGNER2`
   - `POLYGONSCAN_API_KEY`
3. Commit & push changes
4. Go to **Actions → Deploy Fluid Token → Run workflow**

✅ The contract will deploy automatically to **Polygon Mainnet**.

---

## 🧩 Manual Deployment

```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network polygon
