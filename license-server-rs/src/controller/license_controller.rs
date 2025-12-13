use crate::ServerImpl;
use license_api_server_rust_axum::apis::license::{CreateLicenseResponse, DeleteLicenseLogsResponse, DeleteLicenseResponse, GetLicenseLogsResponse, GetLicenseResponse, UpdateLicenseResponse};
use license_api_server_rust_axum::models::{DeleteLicenseLogsPathParams, DeleteLicensePathParams, GetLicenseLogsPathParams, GetLicenseLogsQueryParams, GetLicensePathParams, License, UpdateLicensePathParams};

#[allow(unused_variables)]
#[async_trait::async_trait]
impl license_api_server_rust_axum::apis::license::License for ServerImpl {
    type Claims = ();

    async fn create_license(&self, method: &http::method::Method, host: &axum_extra::extract::Host, cookies: &axum_extra::extract::cookie::CookieJar, claims: &Self::Claims, body: &License) -> Result<CreateLicenseResponse, ()> {
        todo!()
    }

    async fn delete_license(&self, method: &http::method::Method, host: &axum_extra::extract::Host, cookies: &axum_extra::extract::cookie::CookieJar, claims: &Self::Claims, path_params: &DeleteLicensePathParams) -> Result<DeleteLicenseResponse, ()> {
        todo!()
    }

    async fn delete_license_logs(&self, method: &http::method::Method, host: &axum_extra::extract::Host, cookies: &axum_extra::extract::cookie::CookieJar, claims: &Self::Claims, path_params: &DeleteLicenseLogsPathParams) -> Result<DeleteLicenseLogsResponse, ()> {
        todo!()
    }

    async fn get_license(&self, method: &http::method::Method, host: &axum_extra::extract::Host, cookies: &axum_extra::extract::cookie::CookieJar, claims: &Self::Claims, path_params: &GetLicensePathParams) -> Result<GetLicenseResponse, ()> {
        todo!()
    }

    async fn get_license_logs(&self, method: &http::method::Method, host: &axum_extra::extract::Host, cookies: &axum_extra::extract::cookie::CookieJar, claims: &Self::Claims, path_params: &GetLicenseLogsPathParams, query_params: &GetLicenseLogsQueryParams) -> Result<GetLicenseLogsResponse, ()> {
        todo!()
    }

    async fn update_license(&self, method: &http::method::Method, host: &axum_extra::extract::Host, cookies: &axum_extra::extract::cookie::CookieJar, claims: &Self::Claims, path_params: &UpdateLicensePathParams, body: &License) -> Result<UpdateLicenseResponse, ()> {
        todo!()
    }
}