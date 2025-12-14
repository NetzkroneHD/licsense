use jsonwebtoken::jwk;
use license_api_server_rust_axum::apis::ErrorHandler;
use license_api_server_rust_axum::server;
use std::sync::Arc;
use tokio::net::TcpListener;
use tokio::signal;
use crate::auth;

pub struct ServerImpl {
    // database: sea_orm::DbConn,
    pub jwt_set: jwk::JwkSet,
    pub expected_issuer: String
}

impl ErrorHandler<()> for ServerImpl {}

pub async fn start_server(addr: &str, jwk_set_uri: &str, expected_issuer: String) {
    tracing_subscriber::fmt::init();
    println!("Trying to fetch jwk set URI...");
    let jwk = auth::fetch_jwk_set(jwk_set_uri).await.unwrap_or_else(|err| {
        panic!("Failed to fetch jwk: {:?}", err);
    });

    println!("Successfully fetched jwk set URI");

    let app = server::new(Arc::new(ServerImpl {
        jwt_set: jwk,
        expected_issuer
    }));

    let listener = TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app)
        .with_graceful_shutdown(shutdown_signal())
        .await
        .unwrap();
}

async fn shutdown_signal() {
    let ctrl_c = async {
        signal::ctrl_c()
            .await
            .expect("failed to install Ctrl+C handler");
    };

    #[cfg(unix)]
    let terminate = async {
        signal::unix::signal(signal::unix::SignalKind::terminate())
            .expect("failed to install signal handler")
            .recv()
            .await;
    };

    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();

    tokio::select! {
        _ = ctrl_c => {},
        _ = terminate => {},
    }
}
