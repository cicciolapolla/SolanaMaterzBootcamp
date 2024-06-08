import { 
    Keypair, 
    Connection,
    PublicKey, 
} from "@solana/web3.js";

import { 
    mintTo,
    getOrCreateAssociatedTokenAccount,
 } from "@solana/spl-token";

import * as fs from 'fs';

import wallet from "./secret.json";
import mintAddress from "./mint.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const mint = new PublicKey(mintAddress);

(async () => {

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        mint,
        keypair.publicKey,
    );

    const ata = tokenAccount.address;
    
    const ataAddress = ata.toBase58();
    
    console.log("Associated Token Account: ", ataAddress);

    const amount = 10e6;

    await mintTo(
        connection,
        keypair,
        mint,
        ata,
        keypair.publicKey,
        amount
    );
   
    console.log("Minted", amount, "to", ataAddress);
    
    fs.writeFile('ata.json', JSON.stringify(ataAddress), 'utf8', function(err) {
        if (err) throw err;
        console.log('Wrote associated token account address into ata.json');
    });
})()