mod controller;
mod mapper;
mod model;
mod server;
mod service;
mod auth;

#[tokio::main]
async fn main() {
    let result = auth::fetch_jwk_set(
        "http://localhost:80/auth/realms/license/protocol/openid-connect/certs",
    );
    let jwk = result.await.unwrap();
    println!("{:?}", jwk);
}
