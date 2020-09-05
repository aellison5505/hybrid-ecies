
<a name="readmemd"></a>

[hybrid-ecies](#readmemd) › [Globals](#globalsmd)

# hybrid-ecies

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


<a name="classes_ecies_eciesmd"></a>

[hybrid-ecies](#readmemd) › [Globals](#globalsmd) › ["ecies"](#modules_ecies_md) › [ECIES](#classes_ecies_eciesmd)

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
* [getDER](#getder)
* [getPEM](#getpem)
* [getPublicKey](#getpublickey)
* [getSecret](#getsecret)
* [privateJWK](#privatejwk)
* [publicJWK](#publicjwk)

## Methods

###  JWKtoBuffer

▸ **JWKtoBuffer**(`jwk`: [JWK](#Interface:-JWK)): *Buffer*

Return a Buffer from either a public or private JWK.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`jwk` | [JWK](#interfaces_ecies_jwkmd) | public or private JSON Web Key |

**Returns:** *Buffer*

Buffer of either public or private key

___

###  createKeyPair

▸ **createKeyPair**(): *Buffer*

This creates a EC secp256k1 key pair and returns the private key as a buffer.

**Returns:** *Buffer*

EC Private Key as a Buffer

___

###  decryptAES256

▸ **decryptAES256**(`privateKey`: Buffer, `encodedData`: Buffer): *Buffer*

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

###  getDER

▸ **getDER**(`ecKey`: Buffer, `type`: "Private" | "Public"): *Buffer*

**Parameters:**

Name | Type |
------ | ------ |
`ecKey` | Buffer |
`type` | "Private" &#124; "Public" |

**Returns:** *Buffer*

___

###  getPEM

▸ **getPEM**(`ecKey`: Buffer, `encoding`: "RAW" | "DER", `type`: "Private" | "Public"): *string*

**Parameters:**

Name | Type |
------ | ------ |
`ecKey` | Buffer |
`encoding` | "RAW" &#124; "DER" |
`type` | "Private" &#124; "Public" |

**Returns:** *string*

___

###  getPublicKey

▸ **getPublicKey**(`privateKey`: Buffer, `compress?`: Boolean): *Buffer*

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

▸ **privateJWK**(`privateKey`: Buffer): *[JWK](#interfaces_ecies_jwkmd)*

This takes an EC private key and returns the JWK.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`privateKey` | Buffer | EC private key |

**Returns:** *[JWK](#interfaces_ecies_jwkmd)*

Json Web Token

___

###  publicJWK

▸ **publicJWK**(`publicKey`: Buffer): *[JWK](#interfaces_ecies_jwkmd)*

This takes an EC public key and returns the JWK.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`publicKey` | Buffer | EC Public Key |

**Returns:** *[JWK](#interfaces_ecies_jwkmd)*

Json Web Token


<a name="globalsmd"></a>

[hybrid-ecies](#readmemd) › [Globals](#globalsmd)

# hybrid-ecies

## Index

### Modules

* ["ecies"](#modules_ecies_md)


<a name="interfaces_ecies_jwkmd"></a>

[hybrid-ecies](#readmemd) › [Globals](#globalsmd) › ["ecies"](#modules_ecies_md) › [JWK](#interfaces_ecies_jwkmd)

# Interface: JWK

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

___

### `Optional` d

• **d**? : *undefined | string*

___

###  kid

• **kid**: *string*

___

###  kty

• **kty**: *string*

___

###  x

• **x**: *string*

___

### `Optional` y

• **y**? : *undefined | string*


<a name="modules_ecies_md"></a>

[hybrid-ecies](#readmemd) › [Globals](#globalsmd) › ["ecies"](#modules_ecies_md)

# Module: "ecies"

## Index

### Classes

* [ECIES](#classes_ecies_eciesmd)

### Interfaces

* [JWK](#interfaces_ecies_jwkmd)
