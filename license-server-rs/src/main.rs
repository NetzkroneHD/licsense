mod controller;

use license_api_server_rust_axum::apis::ErrorHandler;

struct ServerImpl {
   // database: sea_orm::DbConn,
}

impl ErrorHandler<()> for ServerImpl {}


fn main() {
    println!("Hello, world!");
    
}
