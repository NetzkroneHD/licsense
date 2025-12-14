use crate::server::ServerImpl;
use http::HeaderMap;
use jsonwebtoken::{Algorithm, DecodingKey, Validation, decode, decode_header, jwk};
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
        let jwk_set_uri = "http://host.docker.internal:80/auth/realms/license/protocol/openid-connect/certs";
        let expected_issuer = "http://localhost/auth/realms/license";

        let token_str = extract_token_str(headers, key)?;
        let kid = extract_kid(token_str)?;
        let jwk_set = fetch_jwk_set(jwk_set_uri).await?;
        let jwk = find_jwk(&jwk_set, &kid)?;
        let alg = match_jwk_algorithm(jwk)?;
        let decoding_key = create_decoding_key(jwk)?;

        validate_and_decode(token_str, &decoding_key, alg, expected_issuer).map(|_| { () })
    }
}

// --- Helper Functions ---

fn match_jwk_algorithm(jwk: &jwk::Jwk) -> Option<Algorithm> {
    // The `common` field contains the "alg" parameter from the JSON
    match jwk.common.key_algorithm {
        Some(jwk::KeyAlgorithm::RS256) => Some(Algorithm::RS256),
        Some(jwk::KeyAlgorithm::RS384) => Some(Algorithm::RS384),
        Some(jwk::KeyAlgorithm::RS512) => Some(Algorithm::RS512),
        Some(jwk::KeyAlgorithm::ES256) => Some(Algorithm::ES256),
        Some(jwk::KeyAlgorithm::ES384) => Some(Algorithm::ES384),
        Some(jwk::KeyAlgorithm::PS256) => Some(Algorithm::PS256),
        // Add others as needed.
        // Note: We return None for "RSA-OAEP" because that is for encryption, not signing.
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
    validation.set_issuer(&[issuer]);

    match decode::<TokenClaims>(token, key, &validation) {
        Ok(data) => Some(data.claims),
        Err(e) => {
            eprintln!("Token validation failed: {:?}", e);
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

pub async fn fetch_jwk_set(uri: &str) -> Option<jwk::JwkSet> {
    Client::new()
        .get(uri)
        .send()
        .await
        .ok()?
        .json::<jwk::JwkSet>()
        .await
        .ok()
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
