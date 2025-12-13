mod controller;
mod model;
mod service;

use license_api_server_rust_axum::apis::ErrorHandler;
use service::key_service;

struct ServerImpl {
   // database: sea_orm::DbConn,
}

impl ErrorHandler<()> for ServerImpl {}


fn main() {
    let pair = key_service::generate_key_pair(2048).unwrap();
    println!("private key: {:?}", key_service::private_key_to_base64(&pair.0).unwrap());
    println!();
    println!("public key: {:?}", key_service::public_key_to_base64(&pair.1).unwrap());
}
