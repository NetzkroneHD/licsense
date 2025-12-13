use license_api_server_rust_axum::models;
use model::license_check_result_model;
use crate::model;

pub fn to_dto(model: &license_check_result_model::LicenseCheckResultModel) -> models::LicenseCheckResult {
    models::LicenseCheckResult {
        license_key: model.license_key().to_string(),
        publisher: model.publisher().to_string(),
        notes: model.notes().to_string(),
        valid: model.valid(),
        valid_until: model.valid_until().clone(),
        signature: model.signature().to_string(),
    }
}