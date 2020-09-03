/// <reference types="node" />
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
export declare class ECIES {
    /**
     * This creates a EC secp256k1 key pair and returns the private key as a buffer.
     * @returns EC Private Key as a Buffer
     */
    createKeyPair(): Buffer;
    /**
     * This returns the calculated secret from a private and public key.
     *
     * @param privateKey: Buffer
     * @param publicKey: Buffer
     * @returns secret
     */
    getSecret(privateKey: Buffer, publicKey: Buffer): Buffer;
    /**
     * Takes EC private key and returns the public key.
     *
     * @param privateKey EC Private Key
     * @param compress If true return only the x value
     * @returns publicKey X,Y buffer
     */
    getPublicKey(privateKey: Buffer, compress?: Boolean): Buffer;
    /**
     * This takes an EC private key and returns the JWK.
     *
     * @param privateKey EC private key
     * @returns Json Web Token
     */
    privateJWK(privateKey: Buffer): JWK;
    /**
     * This takes an EC public key and returns the JWK.
     *
     * @param publicKey EC Public Key
     * @returns Json Web Token
     */
    publicJWK(publicKey: Buffer): JWK;
    /**
     * Return a Buffer from either a public or private JWK.
     *
     * @param jwk  public or private JSON Web Key
     * @returns Buffer of either public or private key
     */
    JWKtoBuffer(jwk: JWK): Buffer;
    getPEM(ecKey: Buffer, encoding: 'RAW' | 'DER', type: 'Private' | 'Public'): string;
    getDER(ecKey: Buffer, type: 'Private' | 'Public'): Buffer;
    /**
      * This takes an EC public key as input, creates an EC pair to encrypt the data.
      * Returns a packed buffer of the EC public key, nonce, tag, and encrypted data.
      * @param publicKey EC Public Key
      * @param data Data to encrypt
      * @returns Buffer(Bytes) - ECPubKey(33) iv(12) tag(16) encData(variable)
      */
    encryptAES256(publicKey: Buffer, data: Buffer): Buffer;
    /**
    * Takes private EC key of the public key used to encrypt the data and decrypts it.
    *
    * @param privateKey EC Key used to encrypt the data.
    * @param encodedData Buffer(Bytes) - ECPubKey(33) iv(12) tag(16) encData(variable)
    * @returns Buffer of decrypted data.
    */
    decryptAES256(privateKey: Buffer, encodedData: Buffer): Buffer;
    /**
     * This takes an EC public key as input, creates an EC pair to encrypt the data.
     * Returns a packed buffer of the EC public key, nonce, tag, and encrypted data.
     * @param publicKey EC Public Key
     * @param data Data to encrypt
     * @returns Buffer(Bytes) - ECPubKey(33) nonce(12) tag(16) encData(variable)
     */
    encryptChaCha20(publicKey: Buffer, data: Buffer): Buffer;
    /**
     * Takes private EC key of the public key used to encrypt the data and decrypts it.
     *
     * @param privateKey EC Key used to encrypt the data.
     * @param encodedData Buffer(Bytes) - ECPubKey(33) nonce(12) tag(16) encData(variable)
     * @returns Buffer of decrypted data.
     */
    decryptChaCha20(privateKey: Buffer, encodedData: Buffer): Buffer;
}
