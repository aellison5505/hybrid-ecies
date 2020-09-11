import { createECDH, ECDH, createCipheriv, randomBytes, createDecipheriv } from 'crypto';
import {promisify} from 'util';
import {ECIES} from './ecies';

let maintest = async () => {
    let ec = createECDH('secp256k1');
    //let key = ec.generateKeys('hex','uncompressed');
    

    /*
    console.log(key);
    let cKey = ec.getPublicKey('hex','compressed');
    console.log(cKey);
    let pri = ec.getPrivateKey();
    console.log(pri.toString('hex'));
    let xy = Buffer.from(key, 'hex');
    let x = Buffer.alloc(32);
    let y = Buffer.alloc(32);
    xy.copy(x,0,1);
    xy.copy(y,0,33);
    console.log(x.toString('hex'));
    console.log(y.toString('hex'));
    let hy = createECDH('secp256k1');
    hy.generateKeys();
    let cxy = Buffer.concat([Buffer.alloc(1,0x04),x,y]);
    let sec = hy.computeSecret(Buffer.concat([Buffer.alloc(1,0x04),x,y]));
    console.log(cxy.toString('hex'));
    console.log(sec.toString('hex'));
    let sec1 = hy.computeSecret(xy);
    console.log(sec1.toString('hex'));
    */

}

let main = async () => {
    let ec = new ECIES();
    let privateKey = ec.createKeyPair();
    console.log(privateKey.toString('hex'))
    let pubJWK = ec.publicJWK(ec.getPublicKey(privateKey));
    console.log(pubJWK);
    let pubKey = ec.JWKtoBuffer(pubJWK);
    console.log(pubKey.toString('hex'));
    console.log(ec.privateJWK(privateKey));
    console.log(ec.getPublicKey(privateKey).toString('hex'));
    let encData = ec.encryptChaCha20(pubKey,Buffer.from('Enc this!'));
    console.log(encData.toString('base64'));
    let ret = ec.decryptChaCha20(privateKey,encData);
    console.log(ret.toString());

}
main();
