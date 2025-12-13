use crate::server::ServerImpl;
use axum_extra::extract::{CookieJar, Host};
use http::Method;
use license_api_server_rust_axum::apis::license_check::CheckLicenseResponse;
use license_api_server_rust_axum::models::CheckLicensePathParams;

#[allow(unused_variables)]
#[async_trait::async_trait]
impl license_api_server_rust_axum::apis::license_check::LicenseCheck for ServerImpl {
    type Claims = ();

    async fn check_license(&self, method: &Method, host: &Host, cookies: &CookieJar, claims: &Self::Claims, path_params: &CheckLicensePathParams) -> Result<CheckLicenseResponse, ()> {
        todo!()
    }
}