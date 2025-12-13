use crate::model::list_mode;
use std::fmt::{Display, Formatter};

pub struct LicenseModel {
    pub license: String,
    pub publisher: String,
    pub notes: String,
    pub valid: bool,
    pub valid_until: chrono::DateTime<chrono::FixedOffset>,
    pub list_mode: list_mode::ListMode,
    pub ip_addresses: Vec<String>,
}

impl Display for LicenseModel {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "LicenseModel {{ license: {:?}, publisher: {:?}, notes: {:?}, valid: {:?}, valid_until: {:?}, list_mode: {:?}, ip_addresses: {:?} }}",
            self.license,
            self.publisher,
            self.notes,
            self.valid,
            self.valid_until,
            self.list_mode,
            self.ip_addresses
        )
    }
}

impl PartialEq for LicenseModel {
    fn eq(&self, other: &Self) -> bool {
        self.license == other.license
            && self.publisher == other.publisher
            && self.notes == other.notes
            && self.valid == other.valid
            && self.valid_until == other.valid_until
            && self.list_mode == other.list_mode
            && self.ip_addresses == other.ip_addresses
    }
}
