use base64::{engine::general_purpose, Engine as _};
use rsa::pkcs1v15::SigningKey;
use rsa::pkcs8::{DecodePrivateKey, DecodePublicKey, EncodePrivateKey, EncodePublicKey};
use rsa::signature::{SignatureEncoding, Signer};
use sha2::Sha512;

use rsa::{RsaPrivateKey, RsaPublicKey};

pub fn sign(plain_text: String, private_key: RsaPrivateKey) -> Result<String, Box<dyn std::error::Error>> {
    let signing_key: SigningKey<Sha512> = SigningKey::new(private_key);
    let signature = signing_key.sign(plain_text.as_bytes());
    let encoded_signature = general_purpose::STANDARD.encode(signature.to_bytes());

    Ok(encoded_signature)
}

pub fn load_private_key(private_key_base64_der: &str) -> Result<RsaPrivateKey, Box<dyn std::error::Error>> {
    let der_bytes = general_purpose::STANDARD.decode(private_key_base64_der)?;
    Ok(RsaPrivateKey::from_pkcs8_der(&der_bytes)?)
}

pub fn load_public_key(public_key_base64_der: &str) -> Result<RsaPublicKey, Box<dyn std::error::Error>> {
    let der_bytes = general_purpose::STANDARD.decode(public_key_base64_der)?;
    Ok(RsaPublicKey::from_public_key_der(&der_bytes)?)
}

pub fn generate_key_pair(bits: usize) -> Result<(RsaPrivateKey, RsaPublicKey), Box<dyn std::error::Error>> {
    let mut rn = rand::rngs::OsRng;
    let private_key = RsaPrivateKey::new(&mut rn, bits)?;
    let public_key = RsaPublicKey::from(&private_key);
    Ok((private_key, public_key))
}

pub fn public_key_to_base64(public_key: &RsaPublicKey) -> Result<String, Box<dyn std::error::Error>> {
    let der_bytes = public_key.to_public_key_der()?;
    Ok(general_purpose::STANDARD.encode(der_bytes.as_bytes()))
}

pub fn private_key_to_base64(private_key: &RsaPrivateKey) -> Result<String, Box<dyn std::error::Error>> {
    let der_bytes = private_key.to_pkcs8_der()?;
    Ok(general_purpose::STANDARD.encode(der_bytes.as_bytes()))
}