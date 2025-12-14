use crate::server::ServerImpl;
use http::HeaderMap;
use jsonwebtoken::{decode, decode_header, jwk, Algorithm, DecodingKey, Validation};
use license_api_server_rust_axum::apis::{ApiAuthBasic, BasicAuthKind};
use reqwest::Client;
use serde::Deserialize;

#[derive(Debug, Deserialize, Clone)]
pub struct TokenClaims {
    pub sub: String,
    pub iss: String,
    pub exp: usize,
}

#[async_trait::async_trait]
impl ApiAuthBasic for ServerImpl {
    type Claims = ();

    async fn extract_claims_from_auth_header(
        &self,
        _kind: BasicAuthKind,
        headers: &HeaderMap,
        key: &str,
    ) -> Option<Self::Claims> {
        let token_str = extract_token_str(headers, key)?;
        let kid = extract_kid(token_str)?;
        let jwk = find_jwk(&self.jwt_set, &kid)?;
        let alg = match_jwk_algorithm(jwk)?;
        let decoding_key = create_decoding_key(jwk)?;

        validate_and_decode(token_str, &decoding_key, alg, &self.expected_issuer).map(|_| { () })
    }
}

fn match_jwk_algorithm(jwk: &jwk::Jwk) -> Option<Algorithm> {
    match jwk.common.key_algorithm {
        Some(jwk::KeyAlgorithm::RS256) => Some(Algorithm::RS256),
        Some(jwk::KeyAlgorithm::RS384) => Some(Algorithm::RS384),
        Some(jwk::KeyAlgorithm::RS512) => Some(Algorithm::RS512),
        Some(jwk::KeyAlgorithm::ES256) => Some(Algorithm::ES256),
        Some(jwk::KeyAlgorithm::ES384) => Some(Algorithm::ES384),
        Some(jwk::KeyAlgorithm::PS256) => Some(Algorithm::PS256),
        _ => {
            eprintln!("Auth Error: Unsupported or missing algorithm in JWK");
            None
        }
    }
}

fn validate_and_decode(
    token: &str,
    key: &DecodingKey,
    alg: Algorithm,
    issuer: &str,
) -> Option<TokenClaims> {
    let mut validation = Validation::new(alg);
    validation.validate_aud = false;
    validation.validate_exp = true;
    validation.validate_nbf = true;
    validation.set_issuer(&[issuer]);


    match decode::<TokenClaims>(token, key, &validation) {
        Ok(data) => Some(data.claims),
        Err(e) => {
            eprintln!("Token validation for token {:?} failed: {:?}", token, e);
            None
        }
    }
}

fn extract_token_str<'a>(headers: &'a HeaderMap, key: &str) -> Option<&'a str> {
    headers.get(key)?.to_str().ok()?.strip_prefix("Bearer ")
}

fn extract_kid(token: &str) -> Option<String> {
    decode_header(token).ok()?.kid
}

pub async fn fetch_jwk_set(uri: &str) -> Result<jwk::JwkSet, Box<dyn std::error::Error>> {
    let response = Client::new()
        .get(uri)
        .send()
        .await?;

    Ok(response.json::<jwk::JwkSet>().await?)
}

fn find_jwk<'a>(jwk_set: &'a jwk::JwkSet, kid: &str) -> Option<&'a jwk::Jwk> {
    jwk_set.find(kid)
}

fn create_decoding_key(jwk: &jwk::Jwk) -> Option<DecodingKey> {
    match &jwk.algorithm {
        jwk::AlgorithmParameters::RSA(params) => {
            DecodingKey::from_rsa_components(&params.n, &params.e).ok()
        }
        _ => None,
    }
}
