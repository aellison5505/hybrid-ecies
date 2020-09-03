import { createECDH, ECDH, createCipheriv, createDecipheriv, randomFillSync, createHash } from 'crypto';
import { strict } from 'assert';
import { stringify } from 'querystring';

/**
 * JSON Wek Token
 */
export interface JWK {
    "kty": string;
    "d"?: string;
    "crv": string;
    "kid": string;
    "x": string;
    "y"?: string;
}

/**
 * Hybrid EC encryption scheme that EC curve secp256k1, and chacha20-poly1305 or aes-256-gcm to encrypt data.
 * The returned data is a packed Buffer with the public key, nonce/iv, tag, and encrypted data.
 */
export class ECIES {
    /**
     * This creates a EC secp256k1 key pair and returns the private key as a buffer.
     * @returns EC Private Key as a Buffer
     */
    createKeyPair(): Buffer {
        let ec: ECDH = createECDH('secp256k1');
        ec.generateKeys();
        return ec.getPrivateKey();
    }

    /**
     * This returns the calculated secret from a private and public key.
     * 
     * @param privateKey: Buffer
     * @param publicKey: Buffer
     * @returns secret
     */
    getSecret(privateKey: Buffer, publicKey: Buffer): Buffer {
        let ec: ECDH = createECDH('secp256k1');
        ec.setPrivateKey(privateKey);
        return ec.computeSecret(publicKey);
    }

    /**
     * Takes EC private key and returns the public key.
     * 
     * @param privateKey EC Private Key
     * @param compress If true return only the x value
     * @returns publicKey X,Y buffer
     */
    getPublicKey(privateKey: Buffer, compress?: Boolean): Buffer {
        let ec: ECDH = createECDH('secp256k1');
        ec.setPrivateKey(privateKey);
       // console.log('pub', ec.getPublicKey('hex'));
       // console.log('pub',Buffer.from(ec.getPublicKey('latin1'), 'latin1').toString('hex'));
        return (compress === true ?  Buffer.from(ec.getPublicKey('hex','compressed'), 'hex') : ec.getPublicKey());
    }

    /**
     * This takes an EC private key and returns the JWK.
     * 
     * @param privateKey EC private key
     * @returns Json Web Token
     */
    privateJWK(privateKey: Buffer): JWK {
        let ec: ECDH = createECDH('secp256k1');
        ec.setPrivateKey(privateKey);
        let jwk = this.publicJWK(ec.getPublicKey());
        jwk.d = privateKey.toString('base64');
        return jwk;
    }

    /**
     * This takes an EC public key and returns the JWK.
     * 
     * @param publicKey EC Public Key
     * @returns Json Web Token
     */
    publicJWK(publicKey: Buffer): JWK {
        let x:string;
        let y:string;

        let jwk: JWK = {
            "kty": "EC",
            "crv": "secp256k1",
            "kid": "1",
            "x": ""
        }

        switch (publicKey.length) {
            case 33: 
                jwk.x = publicKey.toString('base64');
                break;
            case 65:
                var bufX = Buffer.alloc(32);
                var bufY = Buffer.alloc(32);
                publicKey.copy(bufX,0,1,33);
                publicKey.copy(bufY,0,33);
                jwk.x = bufX.toString('base64');
                jwk.y = bufY.toString('base64');
                break;
            case 64:
                bufX = Buffer.alloc(32);
                bufY = Buffer.alloc(32);
                publicKey.copy(bufX,0,0,32);
                publicKey.copy(bufY,0,32);
                jwk.x = bufX.toString('base64');
                jwk.y = bufY.toString('base64');
                break;
            default:
                let err = new Error('Invalid Key');
                err.name = 'Invalid_Key';
                throw err;
        }
        jwk.kid = createHash('sha256').update(publicKey).digest().toString('base64');

        return jwk;

    }

    /**
     * Return a Buffer from either a public or private JWK.
     *  
     * @param jwk  public or private JSON Web Key
     * @returns Buffer of either public or private key
     */
    JWKtoBuffer(jwk: JWK ): Buffer {

        if(jwk.d) {
            return Buffer.from(jwk.d, 'base64');
        } else if (jwk.y) {
            return Buffer.concat([Buffer.alloc(1, 0x04),Buffer.from(jwk.x,'base64'),Buffer.from(jwk.y,'base64')]);
        } else {
            return Buffer.from(jwk.x,'base64');
        }
    }

    getPEM(ecKey: Buffer, encoding: 'RAW' | 'DER' ,type: 'Private' | 'Public'): string {
        let PEM: string = '';
        let pemStr = '';

        (encoding === 'RAW' ? pemStr = this.getDER(ecKey,type).toString('base64') : pemStr = ecKey.toString('base64'));

       // console.log(pemStr);
        let pemForm:string = '';
        let i = 0;
        let c = 64;
        do {
            var j = i + 64;
            (j >= pemStr.length ? c = pemStr.length - i : c = 64);
            pemForm = `${pemForm}${pemStr.substr(i,c)}\n`;
            i = j;
        //    console.log(i);
        } while (i < pemStr.length);

    

        if(type === "Private") {
           
            PEM = `-----BEGIN EC PRIVATE KEY-----\n${pemForm}----END EC PRIVATE KEY-----`
        } else {
            PEM = `-----BEGIN PUBLIC KEY-----\n${pemForm}-----END PUBLIC KEY-----`
        }
        console.log(PEM);
        return PEM;
    }

    getDER(ecKey: Buffer, type: 'Private' | 'Public'): Buffer {
        let packDER: Buffer;
        if(type === 'Private') {
            packDER = Buffer.concat([Buffer.from('30740201010420','hex'),ecKey,Buffer.from('a00706052b8104000aa144034200','hex'),this.getPublicKey(ecKey)]);
         
        } else {
            let pre: string;
            
            (ecKey.length === 33 ? (pre = '3036301006072a8648ce3d020106052b8104000a032200') : (pre = '3056301006072a8648ce3d020106052b8104000a034200'));

            if(ecKey.length > 65)
                throw new Error('Invalid key');    
            packDER = Buffer.concat([Buffer.from(pre,'hex'),ecKey]);
        }
       
        return packDER;
    }


   /**
     * This takes an EC public key as input, creates an EC pair to encrypt the data.
     * Returns a packed buffer of the EC public key, nonce, tag, and encrypted data. 
     * @param publicKey EC Public Key
     * @param data Data to encrypt
     * @returns Buffer(Bytes) - ECPubKey(33) iv(12) tag(16) encData(variable)
     */
    encryptAES256(publicKey: Buffer, data: Buffer): Buffer {
        let iv = Buffer.alloc(12);
        randomFillSync(iv);
        // console.log('nonce', nonce.toString('hex'));
        let tempKey = this.createKeyPair();
        let key = this.getSecret(tempKey,publicKey);
        // console.log('key', key.toString('hex'));
        let aes = createCipheriv('aes-256-gcm',key,iv);
        let encData = aes.update(data);
        aes.final();
        let tag = aes.getAuthTag();
        let pack = Buffer.concat([this.getPublicKey(tempKey,true),iv,tag,encData]);
        return pack;
    }

     /**
     * Takes private EC key of the public key used to encrypt the data and decrypts it.
     * 
     * @param privateKey EC Key used to encrypt the data.
     * @param encodedData Buffer(Bytes) - ECPubKey(33) iv(12) tag(16) encData(variable)
     * @returns Buffer of decrypted data. 
     */
    decryptAES256(privateKey: Buffer, encodedData: Buffer): Buffer {
        let pubKey = Buffer.alloc(33);
        encodedData.copy(pubKey,0,0,33);
        let iv = Buffer.alloc(12);
        encodedData.copy(iv,0,33,(33+12));
        let tag = Buffer.alloc(16);
        encodedData.copy(tag,0,(33+12),(33+12+16));
        let encData = Buffer.alloc(encodedData.length-(33+12+16));
        encodedData.copy(encData,0,(33+12+16));
        let key = this.getSecret(privateKey,pubKey);
        
        // console.log('key', key.toString('hex'));
        let aes = createDecipheriv('aes-256-gcm',key,iv);
        aes.setAuthTag(tag);
        let data = aes.update(encData);
        aes.final();

        return data;
    }


    /**
     * This takes an EC public key as input, creates an EC pair to encrypt the data.
     * Returns a packed buffer of the EC public key, nonce, tag, and encrypted data. 
     * @param publicKey EC Public Key
     * @param data Data to encrypt
     * @returns Buffer(Bytes) - ECPubKey(33) nonce(12) tag(16) encData(variable)
     */
    encryptChaCha20(publicKey: Buffer, data: Buffer): Buffer {

        let nonce = Buffer.alloc(12);
        randomFillSync(nonce);
        // console.log('nonce', nonce.toString('hex'));
        let tempKey = this.createKeyPair();
        let key = this.getSecret(tempKey,publicKey);
        // console.log('key', key.toString('hex'));
        let cipher = createCipheriv('chacha20-poly1305', key, nonce, { authTagLength: 16 });
        let encData = cipher.update(data);
        cipher.final();
        let tag = cipher.getAuthTag();
        // console.log('data enc ', encData.toString('hex'));
        // console.log('tag', tag.toString('hex'));
        // console.log('enc pub', this.getPublicKey(tempKey, true).toString('hex'));
        let pack = Buffer.concat([this.getPublicKey(tempKey,true),nonce,tag,encData]);
        // console.log(pack.toString('hex'));
        // console.log(pack.toString('base64'));
        return pack;
    }

    /**
     * Takes private EC key of the public key used to encrypt the data and decrypts it.
     * 
     * @param privateKey EC Key used to encrypt the data.
     * @param encodedData Buffer(Bytes) - ECPubKey(33) nonce(12) tag(16) encData(variable)
     * @returns Buffer of decrypted data. 
     */
    decryptChaCha20(privateKey: Buffer, encodedData: Buffer): Buffer {
        let pubKey = Buffer.alloc(33);
        encodedData.copy(pubKey,0,0,33);
        let nonce = Buffer.alloc(12);
        encodedData.copy(nonce,0,33,(33+12));
        let tag = Buffer.alloc(16);
        encodedData.copy(tag,0,(33+12),(33+12+16));
        let data = Buffer.alloc(encodedData.length-(33+12+16));
        encodedData.copy(data,0,(33+12+16));
        let key = this.getSecret(privateKey,pubKey);
        // console.log('key', key.toString('hex'));
        // console.log('pubKey', pubKey.toString('hex'));
        // console.log('nonce', nonce.toString('hex'));
        // console.log('tag', tag.toString('hex'));

        let dec = createDecipheriv('chacha20-poly1305', key, nonce, { authTagLength: 16 });
        dec.setAuthTag(tag);
        let decData = dec.update(data);
        dec.final();
        // console.log('mdg', decData.toString());
        return decData;
        
    }
}