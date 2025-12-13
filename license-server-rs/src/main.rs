mod controller;
mod model;
mod service;
mod mapper;

use license_api_server_rust_axum::apis::ErrorHandler;
use rsa::pkcs1v15::SigningKey;
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

    let signing_key = SigningKey::new(pair.0);
    let signed = key_service::sign("This is a super cool Test!".to_string(), &signing_key).unwrap();
    println!();
    println!("Signed text: {:?}", signed);


}
