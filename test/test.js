var assert = require('assert');
const {ECIES} = require('../lib/ecies');
const { isBuffer } = require('util');
let ec = new ECIES();
describe('ECIES', () => {
  
  let secKey = ec.createKeyPair();

  describe('#createKeyPair()', () => {
    it('should return a buffer', () => {
      assert.ok(Buffer.isBuffer(secKey));
    });
    it('should be lengh of 32 bytes', () => {
      assert.equal(secKey.length, 32);
    });
  });

  let pubKey = ec.getPublicKey(secKey);
  let pubKeyComp = ec.getPublicKey(secKey, true);

  describe('#getPublicKey()', () => {
    it('should be a buffer', () => {
      assert.ok(Buffer.isBuffer(pubKey));
    });
    it('should be lengh of 65 bytes', () => {
      assert.equal(pubKey.length, 65);
    });
    it('should be lengh of 33 bytes compressed', () => {
      assert.equal(pubKeyComp.length, 33);
    });
  });

  let tempKeys = ec.createKeyPair();
  let sec1 = ec.getSecret(secKey, ec.getPublicKey(tempKeys));
  let sec2 = ec.getSecret(tempKeys, ec.getPublicKey(secKey));

  describe('#getSecret()', () => {
    it('should be a buffer', () => {
      assert.ok(Buffer,isBuffer(sec1));
    });
    it('should be lengh of 32 bytes', () => {
      assert.equal(sec1.length, 32);
    });
    it('should be equal with keys interchanged', () => {
      assert.equal(sec1.toString('hex'),sec2.toString('hex'));
    });
  });

  describe('#publicJWK()', () => {
    let jwk = ec.publicJWK(pubKey);
    it('should be a object', () => {
      assert.equal(typeof(jwk), 'object');
    });
  });

  describe('#privateJWK()', () => {
    let jwk = ec.privateJWK(secKey);
    it('should be a object', () => {
      assert.equal(typeof(jwk), 'object');
    });
  });

  let encPack = ec.encryptChaCha20(pubKey,'Pass the test!');

  describe('#encryptChaCha20()', () => {
    
    it('should be a buffer', () => {
      assert.ok(Buffer.isBuffer(encPack));
    });
    it('should be greater than 61 bytes', () => {
      assert.ok(encPack.length > 61);
    });
  });

  let dec = ec.decryptChaCha20(secKey, encPack);
  
  describe('#decryptChaCha20()', () => {
    
    it('should be a buffer', () => {
      assert.ok(Buffer.isBuffer(dec));
    });
    it('should equal encrypted data', () => {
      assert.equal(dec.toString('hex'), Buffer.from('Pass the test!').toString('hex'));
    });
  });
});
