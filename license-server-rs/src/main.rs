mod controller;
mod mapper;
mod model;
mod server;
mod service;
mod auth;

#[tokio::main]
async fn main() {
    let addr = std::env::var("SERVER_ADDR").unwrap_or_else(|_| "0.0.0.0:8080".to_string());
    let jwk_set_uri = std::env::var("SERVER_JWKS_URI").unwrap_or_else(|_| "http://host.docker.internal:80/auth/realms/license/protocol/openid-connect/certs".to_string());
    let expected_issuer = std::env::var("SERVER_JWT_ISSUER").unwrap_or_else(|_| "http://localhost/auth/realms/license".to_string());

    println!("Starting server on {}", addr);
    println!("JWK set URI: {}", jwk_set_uri);
    println!("expected issuer URI: {}", expected_issuer);

    server::start_server(&addr, &jwk_set_uri, expected_issuer).await;

}
