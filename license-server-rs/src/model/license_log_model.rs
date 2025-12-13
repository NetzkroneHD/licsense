use crate::model::list_behavior_result::ListBehaviorResult;
use std::fmt::{Display, Formatter};

pub struct LicenseLogModel {
    id: i32,
    license: String,
    ip_address: String,
    timestamp: chrono::DateTime<chrono::FixedOffset>,
    list_behavior_result: ListBehaviorResult,
}

impl LicenseLogModel {
    pub fn new(
        id: i32,
        license: String,
        ip_address: String,
        timestamp: chrono::DateTime<chrono::FixedOffset>,
        list_behavior_result: ListBehaviorResult,
    ) -> Self {
        LicenseLogModel {
            id,
            license,
            ip_address,
            timestamp,
            list_behavior_result,
        }
    }

    pub fn id(&self) -> i32 {
        self.id
    }

    pub fn license(&self) -> &str {
        &self.license
    }

    pub fn ip_address(&self) -> &str {
        &self.ip_address
    }

    pub fn timestamp(&self) -> &chrono::DateTime<chrono::FixedOffset> {
        &self.timestamp
    }

    pub fn list_behavior_result(&self) -> &ListBehaviorResult {
        &self.list_behavior_result
    }
}

impl PartialEq for LicenseLogModel {
    fn eq(&self, other: &Self) -> bool {
        self.id == other.id
            && self.license == other.license
            && self.ip_address == other.ip_address
            && self.timestamp == other.timestamp
            && self.list_behavior_result == other.list_behavior_result
    }
}

impl Display for LicenseLogModel {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "LicenseLogModel {{ id: {:?}, license: {:?}, ip_address: {:?}, timestamp: {:?}, list_behavior_result: {:?} }}",
            self.id, self.license, self.ip_address, self.timestamp, self.list_behavior_result
        )
    }
}
