const { 
  Connection, 
  LAMPORTS_PER_SOL, 
  clusterApiUrl, 
  Keypair
} = require("@solana/web3.js");//library by solana to interact with blockchain

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");//connecting to url

(async ()=> {

  const keypair = Keypair.generate();

  const airdropSignature = await connection.requestAirdrop(
    keypair.publicKey,
    LAMPORTS_PER_SOL
  );
  
  const latestBlockHash = await connection.getLatestBlockhash();
  
  const txn = await connection.confirmTransaction({
    blockhash: latestBlockHash.blockhash,
    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    signature: airdropSignature,
  });

  console.log({
    publicKey: keypair.publicKey,
    privateKey: keypair.secretKey,
    signature: airdropSignature,
    txn
  })
})()