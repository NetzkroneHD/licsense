use crate::{mapper, model};
use license_api_server_rust_axum::models;
use mapper::list_behavior_model_mapper;
use model::license_log_model;

pub fn to_dto(model: &license_log_model::LicenseLogModel) -> models::LicenseLog {
    models::LicenseLog {
        id: model.id(),
        license: model.license().to_string(),
        ip: model.ip_address().to_string(),
        date_time: Default::default(),
        list_behavior_result: list_behavior_model_mapper::to_dto(&model.list_behavior_result()),
    }
}
