use std::fmt::{Display, Formatter};

pub struct LicenseCheckResult {
    license_key: String,
    publisher: String,
    notes: String,
    valid: bool,
    valid_until: chrono::DateTime<chrono::FixedOffset>,
    signature: String,
}

impl LicenseCheckResult {
    pub fn new(
        license_key: String,
        publisher: String,
        notes: String,
        valid: bool,
        valid_until: chrono::DateTime<chrono::FixedOffset>,
        signature: String,
    ) -> Self {
        LicenseCheckResult {
            license_key,
            publisher,
            notes,
            valid,
            valid_until,
            signature,
        }
    }

    pub fn license_key(&self) -> &str {
        &self.license_key
    }

    pub fn publisher(&self) -> &str {
        &self.publisher
    }

    pub fn notes(&self) -> &str {
        &self.notes
    }

    pub fn valid(&self) -> bool {
        self.valid
    }

    pub fn valid_until(&self) -> &chrono::DateTime<chrono::FixedOffset> {
        &self.valid_until
    }

    pub fn signature(&self) -> &str {
        &self.signature
    }
}

impl PartialEq for LicenseCheckResult {
    fn eq(&self, other: &Self) -> bool {
        self.license_key == other.license_key
            && self.publisher == other.publisher
            && self.notes == other.notes
            && self.valid == other.valid
            && self.valid_until == other.valid_until
            && self.signature == other.signature
    }
}

impl Display for LicenseCheckResult {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "LicenseCheckResult {{ license_key: {:?}, publisher: {:?}, notes: {:?}, valid: {:?}, valid_until: {:?}, signature: {:?} }}",
            self.license_key,
            self.publisher,
            self.notes,
            self.valid,
            self.valid_until,
            self.signature
        )
    }
}
