use axum_extra::extract::{CookieJar, Host};
use http::Method;
use license_api_server_rust_axum::apis::key::{DeleteKeyResponse, GenerateKeyResponse, GeneratePublisherKeyResponse, GetKeyResponse};
use license_api_server_rust_axum::models::{DeleteKeyPathParams, GenerateKeyRequest, GeneratePublisherKeyPathParams, GetKeyPathParams};
use crate::ServerImpl;

#[allow(unused_variables)]
#[async_trait::async_trait]
impl license_api_server_rust_axum::apis::key::Key for ServerImpl {
    type Claims = ();

    async fn delete_key(&self, method: &Method, host: &Host, cookies: &CookieJar, claims: &Self::Claims, path_params: &DeleteKeyPathParams) -> Result<DeleteKeyResponse, ()> {
        todo!()
    }

    async fn generate_key(&self, method: &Method, host: &Host, cookies: &CookieJar, claims: &Self::Claims, body: &GenerateKeyRequest) -> Result<GenerateKeyResponse, ()> {
        todo!()
    }

    async fn generate_publisher_key(&self, method: &Method, host: &Host, cookies: &CookieJar, claims: &Self::Claims, path_params: &GeneratePublisherKeyPathParams, body: &GenerateKeyRequest) -> Result<GeneratePublisherKeyResponse, ()> {
        todo!()
    }

    async fn get_key(&self, method: &Method, host: &Host, cookies: &CookieJar, claims: &Self::Claims, path_params: &GetKeyPathParams) -> Result<GetKeyResponse, ()> {
        todo!()
    }
}