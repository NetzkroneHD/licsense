use crate::model;
use license_api_server_rust_axum::models;
use model::list_behavior_result;

pub fn to_dto(model: &list_behavior_result::ListBehaviorResult) -> models::ListBehaviorResult {
    match model {
        list_behavior_result::ListBehaviorResult::Allow => models::ListBehaviorResult::Allow,
        list_behavior_result::ListBehaviorResult::Deny => models::ListBehaviorResult::Disallow,
    }
}
