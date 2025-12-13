use base64::{engine::general_purpose, Engine as _};
use rsa::pkcs1v15::SigningKey;
use rsa::pkcs8::DecodePrivateKey;
use rsa::signature::{SignatureEncoding, Signer};
use sha2::Sha512;

use rsa::RsaPrivateKey;

pub fn encrypt(plain_text: String, private_key: RsaPrivateKey) -> Result<String, Box<dyn std::error::Error>> {
    let signing_key: SigningKey<Sha512> = SigningKey::new(private_key);
    let signature = signing_key.sign(plain_text.as_bytes());
    let encoded_signature = general_purpose::STANDARD.encode(signature.to_bytes());

    Ok(encoded_signature)
}

pub fn load_private_key(pem_str: &str) -> Result<RsaPrivateKey, Box<dyn std::error::Error>> {
    Ok(RsaPrivateKey::from_pkcs8_pem(pem_str)?)
}

pub fn generate_key_pair(bits: usize) -> Result<(RsaPrivateKey, rsa::RsaPublicKey), Box<dyn std::error::Error>> {
    let mut rng = rand::rng();
    let private_key = RsaPrivateKey::new(&mut rng, bits)?;
    let public_key = rsa::RsaPublicKey::from(&private_key);
    Ok((private_key, public_key))
}

