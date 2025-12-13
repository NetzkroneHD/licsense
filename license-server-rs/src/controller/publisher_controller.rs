use axum_extra::extract::{CookieJar, Host};
use http::Method;
use license_api_server_rust_axum::apis::publisher::{GetLicensesFromPublisherResponse, GetPublishersResponse};
use license_api_server_rust_axum::models::GetLicensesFromPublisherPathParams;
use crate::ServerImpl;

#[allow(unused_variables)]
#[async_trait::async_trait]
impl license_api_server_rust_axum::apis::publisher::Publisher for ServerImpl {
    type Claims = ();

    async fn get_licenses_from_publisher(&self, method: &Method, host: &Host, cookies: &CookieJar, claims: &Self::Claims, path_params: &GetLicensesFromPublisherPathParams) -> Result<GetLicensesFromPublisherResponse, ()> {
        todo!()
    }

    async fn get_publishers(&self, method: &Method, host: &Host, cookies: &CookieJar, claims: &Self::Claims) -> Result<GetPublishersResponse, ()> {
        todo!()
    }
}