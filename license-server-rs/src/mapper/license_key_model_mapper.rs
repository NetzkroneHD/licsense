use license_api_server_rust_axum::models;
use model::license_key_model;
use crate::model;

pub fn to_dto(key: &license_key_model::LicenseKeyModel) -> models::LicenseKey {
    models::LicenseKey {
        owner: key.owner().to_string(),
        public_key: key.public_key().to_string(),
    }
}