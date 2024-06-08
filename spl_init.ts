import { 
    Keypair, 
    Connection, 
} from "@solana/web3.js";

import { createMint } from "@solana/spl-token";

import * as fs from 'fs';

import wallet from "./secret.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

(async () => {

    const mint = await createMint(
        connection,
        keypair,
        keypair.publicKey,
        null,
        6,
    );
    
    const mintAddress = mint.toBase58();

    console.log("Mint Address:", mintAddress);

    fs.writeFile('mint.json', JSON.stringify(mintAddress), 'utf8', function(err) {
        if (err) throw err;
        console.log('Wrote mint address into mint.json');
    });
})()