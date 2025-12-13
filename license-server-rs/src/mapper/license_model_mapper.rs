use model::license_model;
use crate::mapper::license_mode_model_mapper;
use crate::model;

pub fn to_dto(model: &license_model::LicenseModel) -> license_api_server_rust_axum::models::License {
    license_api_server_rust_axum::models::License {
        license_key: model.license.clone(),
        publisher: model.publisher.clone(),
        notes: model.notes.clone(),
        valid: model.valid,
        valid_until: model.valid_until,
        list_mode: license_mode_model_mapper::to_dto(&model.list_mode),
        ip_addresses: vec![],
    }
}