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

#[cfg(test)]
mod tests {
    use super::*;
    static BASE_64_PRIVATE_KEY: &str = "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDJfGrBtfIszBQuj4tL9mhRwuBswSporiaAPR2OWUOgQ62m5uV6Xu7lHJnu09Exn+XH5KavHbqw85nqm/cF96GyUR6BJ3WsgZfOZ0bo+JEb1fdaaxMnLMRBD3VrNQ+5cKB1bB44u1rSV9ylM0YmpkTT4H672Dj5oNzmAmEssY5VVGjbyS5yAftH/a8hZfaiSZVCHJnY+nNC4f9ldkWyAun33/cwTP/pGfTIrT4x0UyWv1a75QB9oOU+wrOu8/yH68+SE9j8lr/1whbVqiTArXguC0DHJzSx33wCPM8wTGNmPdoDAuYNg5qGngRfRGwKpJD6TV4os8eMvE6t09Q0rAzHAgMBAAECggEAN9ZE953mmUeNKEIbhlepHU92Rm1ZxVzNyqglMrfGJ/nZe/FtEvaQGepNNoR46tm3IihZkRoaDMPVmdDTKlIv+2zDmWNIFyBq44Z3fkS0YhRv0hzuV+LuGGGiVq2DyA5QSXpG/c3eI4C54wZMoJVfaaBDPudzEqrjzNJH/8zM9xRJG5G33Ve1DpoXGyWIBcqIw5M1hGdeNmwLsIx351naA6YWfA3v1casG+1GUDqni1xjCNPxknYfn+XAYAxSN94rJjZhbvi5G82OuBBGeZy6feFf7YC6yjMwoChZGoVTqwv8ro5QXiEdLZ2hllCBOY7DFYTju10qREwprtniNhL6kQKBgQD17cjmTegVIQXM+fOwhpkMJCkWuh6yfb6w/Goz4MSWAftUCmvvw5/sTXINpCKZ98neBkH8R1SZirLQqncFZxdGkH+5/7WgOlrD1FOESrG716ATALRDw4ExYQycOn2Pmpql8gTqRIkwtheHEcU5IhqQcUpgfHISf7oaRrOt56LndQKBgQDRvLZKA8z1/bWGzHdGe/P8+raTnhlQGD2UFuWq3gumZbIzw69WED3unz1M8tEtneqydIfVv4GwD+NXcrQ+XRF/VNUbDNx/4hmfjGOksOnG2BkP2jrH9PcaEPNm7oAdvAZTaCTRPTAKt4l18hnqg4DxnkvKOKJEA3ld/4Co4YcXywKBgQC45dsq1B4ObLKIxtAhw0CkMTe3P52+wu2w8UYD1RTYV4sXR3KZZHIDXsLGYMYnDnZ2eCv6OcLwYahJXDB6HmUQh6mQNSHf4p/FJgjYqLPyL47JWrktTXr/niC2AP/QDQQCifCKFZczyWPtCD5I00w3lwW9fzLgl6lbAhcrQ8Fl1QKBgE9QDKMaotRXN+EcyvIVh6Of75ENFUdrk0XADuO5ijBHfscCdfiWtcTZ5OWHYUDd2dXYKVHUVKeOqor0LmLy8N30542OJIgbqVLjVP7/g7gVGg0bmmTpJtRtmo3PHRWhd8bsuBeECvnShCHdBp3fUtCL6t8y4XHU2n2IVFAI0PxXAoGBAPEcaiTnkBqAFqhcCDRYo5tXQ1rFdwGLc7P8GgW/YHGXuB+nx19D8IHJ11SB5tTyRAPALU6G1HdZZlpVunSYkD3GhM86pisuO5ce+eNn4zWl7JHboNTh/RkdZExl0nGjwUw57FJQ8lqrEF1ibogHRJWLWrHIUxFH75OG4+K03AAu";
    static BASE_64_PUBLIC_KEY: &str = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyXxqwbXyLMwULo+LS/ZoUcLgbMEqaK4mgD0djllDoEOtpublel7u5RyZ7tPRMZ/lx+Smrx26sPOZ6pv3BfehslEegSd1rIGXzmdG6PiRG9X3WmsTJyzEQQ91azUPuXCgdWweOLta0lfcpTNGJqZE0+B+u9g4+aDc5gJhLLGOVVRo28kucgH7R/2vIWX2okmVQhyZ2PpzQuH/ZXZFsgLp99/3MEz/6Rn0yK0+MdFMlr9Wu+UAfaDlPsKzrvP8h+vPkhPY/Ja/9cIW1aokwK14LgtAxyc0sd98AjzPMExjZj3aAwLmDYOahp4EX0RsCqSQ+k1eKLPHjLxOrdPUNKwMxwIDAQAB";

    fn rsa_public_key() -> RsaPublicKey {
        let der_bytes = general_purpose::STANDARD.decode(BASE_64_PUBLIC_KEY).unwrap();
        RsaPublicKey::from_public_key_der(&der_bytes).unwrap()
    }

    fn rsa_private_key() -> RsaPrivateKey {
        let der_bytes = general_purpose::STANDARD.decode(BASE_64_PRIVATE_KEY).unwrap();
        RsaPrivateKey::from_pkcs8_der(&der_bytes).unwrap()
    }

    #[test]
    fn test_public_key_to_base64() {
        // Arrange
        let public_key = rsa_public_key();

        // Act
        let result = public_key_to_base64(&public_key);

        // Assert
        assert!(result.is_ok());
        assert_eq!(BASE_64_PUBLIC_KEY, &result.unwrap());
    }

    #[test]
    fn test_private_key_to_base64() {
        // Arrange
        let private_key = rsa_private_key();

        // Act
        let result = private_key_to_base64(&private_key);

        // Assert
        assert!(result.is_ok());
        assert_eq!(BASE_64_PRIVATE_KEY, &result.unwrap());
    }

    #[test]
    fn test_load_private_key() {
        let expected = rsa_private_key();
        let result = load_private_key(BASE_64_PRIVATE_KEY).expect("load_private_key");
        assert_eq!(expected, result);
    }
    
}