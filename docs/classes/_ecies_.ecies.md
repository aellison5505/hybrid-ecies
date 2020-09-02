[ec_hydrid_ies](../README.md) › [Globals](../globals.md) › ["ecies"](../modules/_ecies_.md) › [ECIES](_ecies_.ecies.md)

# Class: ECIES

Hybred EC encrytion scheme that EC curve secp256k1, and chacha20-poly1305 to encrypt data.
The returned data is a packed Buffer with the public key, nonce, tag, and encrypted data.

## Hierarchy

* **ECIES**

## Index

### Methods

* [JWKtoBuffer](_ecies_.ecies.md#jwktobuffer)
* [createKeyPair](_ecies_.ecies.md#createkeypair)
* [decryptChaCha20](_ecies_.ecies.md#decryptchacha20)
* [encryptChaCha20](_ecies_.ecies.md#encryptchacha20)
* [getPublicKey](_ecies_.ecies.md#getpublickey)
* [getSecret](_ecies_.ecies.md#getsecret)
* [privateJWK](_ecies_.ecies.md#privatejwk)
* [publicJWK](_ecies_.ecies.md#publicjwk)

## Methods

###  JWKtoBuffer

▸ **JWKtoBuffer**(`jwk`: [JWK](../interfaces/_ecies_.jwk.md)): *Buffer*

Defined in ecies.ts:128

Return a Buffer from either a public or private JWK.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`jwk` | [JWK](../interfaces/_ecies_.jwk.md) | public or private JSON Web Key |

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

###  decryptChaCha20

▸ **decryptChaCha20**(`privateKey`: Buffer, `encodedData`: Buffer): *Buffer*

Defined in ecies.ts:174

Takes private EC key of the public key used to encrypt the data and decrypts it.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`privateKey` | Buffer | EC Key used to encrypt the data. |
`encodedData` | Buffer | Buffer(Bytes) - ECPubKey(32) nonce(12) tag(16) encData(variable) |

**Returns:** *Buffer*

Buffer of decrypted data.

___

###  encryptChaCha20

▸ **encryptChaCha20**(`publicKey`: Buffer, `data`: Buffer): *Buffer*

Defined in ecies.ts:146

This takes an EC public key as input, creates an EC pair to encrypt the data.
Returns a packed buffer of the EC public key, nonce, tag, and encrypted data.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`publicKey` | Buffer | EC Public Key |
`data` | Buffer | Data to encrypt |

**Returns:** *Buffer*

Buffer(Bytes) - ECPubKey(32) nonce(12) tag(16) encData(variable)

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

▸ **privateJWK**(`privateKey`: Buffer): *[JWK](../interfaces/_ecies_.jwk.md)*

Defined in ecies.ts:66

This takes an EC private key and returns the JWK.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`privateKey` | Buffer | EC private key |

**Returns:** *[JWK](../interfaces/_ecies_.jwk.md)*

Json Web Token

___

###  publicJWK

▸ **publicJWK**(`publicKey`: Buffer): *[JWK](../interfaces/_ecies_.jwk.md)*

Defined in ecies.ts:80

This takes an EC public key and returns the JWK.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`publicKey` | Buffer | EC Public Key |

**Returns:** *[JWK](../interfaces/_ecies_.jwk.md)*

Json Web Token
