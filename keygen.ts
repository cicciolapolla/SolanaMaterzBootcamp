import { Keypair } from "@solana/web3.js";
import * as fs from 'fs';

const keypair = Keypair.generate();

console.log(`Your new wallet Public Key: ${keypair.publicKey.toBase58()}`);

const secret_array = keypair.secretKey    
    .toString() 
    .split(',') 
    .map(value=>Number(value)); 

const secret = JSON.stringify(secret_array); 

fs.writeFile('secret.json', secret, 'utf8', function(err) {
    if (err) throw err;
    console.log('Wrote secret key to secret.json.');
});