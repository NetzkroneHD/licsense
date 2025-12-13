use crate::model;
use license_api_server_rust_axum::models;
use model::list_mode_model;

pub fn to_dto(model: &list_mode_model::ListMode) -> models::ListMode {
    match model {
        list_mode_model::ListMode::Blacklist => models::ListMode::Blacklist,
        list_mode_model::ListMode::Whitelist => models::ListMode::Whitelist,
    }
}
