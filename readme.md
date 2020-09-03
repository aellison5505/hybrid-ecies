
[![Build Status](https://travis-ci.com/aellison5505/Hybrid-ECIES.svg?branch=master)](https://travis-ci.com/aellison5505/Hybrid-ECIES)

## Install
```
    
    Install nodejs

    npm i hybrid-ecies

    npm test

```

## Usage
```typescript
    // Typescript
    import { ECIES, JWK } from 'hybrid-ecies';
    let ecies = new ECIES();
    // use ecies to call methods

```
```javascript
    // javascript
    const { ECIES } = require('hybrid-ecies');
    let ecies = new ECIES();
    // use ecies to call methods
```

# Class: ECIES

Hybrid EC encryption scheme that EC curve secp256k1, and chacha20-poly1305 or aes-256-gcm to encrypt data.
The returned data is a packed Buffer with the public key, nonce/iv, tag, and encrypted data.

## Hierarchy

* **ECIES**

## Index

### Methods

* [JWKtoBuffer](#jwktobuffer)
* [createKeyPair](#createkeypair)
* [decryptAES256](#decryptaes256)
* [decryptChaCha20](#decryptchacha20)
* [encryptAES256](#encryptaes256)
* [encryptChaCha20](#encryptchacha20)
* [getPublicKey](#getpublickey)
* [getSecret](#getsecret)
* [privateJWK](#privatejwk)
* [publicJWK](#publicjwk)

## Methods

###  JWKtoBuffer

▸ **JWKtoBuffer**(`jwk`: [JWK](#JWK)): *Buffer*

Defined in ecies.ts:126

Return a Buffer from either a public or private JWK.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`jwk` | [JWK](#JWK) | public or private JSON Web Key |

**Returns:** *Buffer*

Buffer of either public or private key

___

###  createKeyPair

▸ **createKeyPair**(): *Buffer*

Defined in ecies.ts:24

This creates a EC secp256k1 key pair and returns the private key as a buffer.

**Returns:** *Buffer*

EC Private Key as a Buffer

___

###  decryptAES256

▸ **decryptAES256**(`privateKey`: Buffer, `encodedData`: Buffer): *Buffer*

Defined in ecies.ts:165

Takes private EC key of the public key used to encrypt the data and decrypts it.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`privateKey` | Buffer | EC Key used to encrypt the data. |
`encodedData` | Buffer | Buffer(Bytes) - ECPubKey(33) iv(12) tag(16) encData(variable) |

**Returns:** *Buffer*

Buffer of decrypted data.

___

###  decryptChaCha20

▸ **decryptChaCha20**(`privateKey`: Buffer, `encodedData`: Buffer): *Buffer*

Defined in ecies.ts:221

Takes private EC key of the public key used to encrypt the data and decrypts it.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`privateKey` | Buffer | EC Key used to encrypt the data. |
`encodedData` | Buffer | Buffer(Bytes) - ECPubKey(33) nonce(12) tag(16) encData(variable) |

**Returns:** *Buffer*

Buffer of decrypted data.

___

###  encryptAES256

▸ **encryptAES256**(`publicKey`: Buffer, `data`: Buffer): *Buffer*

Defined in ecies.ts:143

This takes an EC public key as input, creates an EC pair to encrypt the data.
Returns a packed buffer of the EC public key, nonce, tag, and encrypted data.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`publicKey` | Buffer | EC Public Key |
`data` | Buffer | Data to encrypt |

**Returns:** *Buffer*

Buffer(Bytes) - ECPubKey(33) iv(12) tag(16) encData(variable)

___

###  encryptChaCha20

▸ **encryptChaCha20**(`publicKey`: Buffer, `data`: Buffer): *Buffer*

Defined in ecies.ts:193

This takes an EC public key as input, creates an EC pair to encrypt the data.
Returns a packed buffer of the EC public key, nonce, tag, and encrypted data.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`publicKey` | Buffer | EC Public Key |
`data` | Buffer | Data to encrypt |

**Returns:** *Buffer*

Buffer(Bytes) - ECPubKey(33) nonce(12) tag(16) encData(variable)

___

###  getPublicKey

▸ **getPublicKey**(`privateKey`: Buffer, `compress?`: Boolean): *Buffer*

Defined in ecies.ts:50

Takes EC private key and returns the public key.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`privateKey` | Buffer | EC Private Key |
`compress?` | Boolean | If true return only the x value |

**Returns:** *Buffer*

publicKey X,Y buffer

___

###  getSecret

▸ **getSecret**(`privateKey`: Buffer, `publicKey`: Buffer): *Buffer*

Defined in ecies.ts:37

This returns the calculated secret from a private and public key.

**Parameters:**

Name | Type |
------ | ------ |
`privateKey` | Buffer |
`publicKey` | Buffer |

**Returns:** *Buffer*

secret

___

###  privateJWK

▸ **privateJWK**(`privateKey`: Buffer): *[JWK](#JWK)*

Defined in ecies.ts:64

This takes an EC private key and returns the JWK.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`privateKey` | Buffer | EC private key |

**Returns:** *[JWK](#JWK)*

Json Web Token

___

###  publicJWK

▸ **publicJWK**(`publicKey`: Buffer): *[JWK](#JWK)*

Defined in ecies.ts:78

This takes an EC public key and returns the JWK.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`publicKey` | Buffer | EC Public Key |

**Returns:** *[JWK](#JWK)*

Json Web Token

___


### JWK

### Interface: JWK

JSON Wek Token

## Hierarchy

* **JWK**

## Index

### Properties

* [crv](#crv)
* [d](#optional-d)
* [kid](#kid)
* [kty](#kty)
* [x](#x)
* [y](#optional-y)

## Properties

###  crv

• **crv**: *string*

Defined in ecies.ts:9

___

### `Optional` d

• **d**? : *undefined | string*

Defined in ecies.ts:8

___

###  kid

• **kid**: *string*

Defined in ecies.ts:10

___

###  kty

• **kty**: *string*

Defined in ecies.ts:7

___

###  x

• **x**: *string*

Defined in ecies.ts:11

___

### `Optional` y

• **y**? : *undefined | string*

Defined in ecies.ts:12

