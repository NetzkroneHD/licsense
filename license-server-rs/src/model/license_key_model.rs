use std::fmt::{Display, Formatter};

pub struct LicenseKeyModel {
    owner: String,
    private_key: String,
    public_key: String,
}

impl LicenseKeyModel {
    pub fn owner(&self) -> &str {
        &self.owner
    }

    pub fn private_key(&self) -> &str {
        &self.private_key
    }

    pub fn public_key(&self) -> &str {
        &self.public_key
    }

}

impl PartialEq for LicenseKeyModel {
    fn eq(&self, other: &Self) -> bool {
        self.owner == other.owner
            && self.private_key == other.private_key
            && self.public_key == other.public_key
    }
}

impl Display for LicenseKeyModel {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "LicenseKeyModel {{ owner: {:?}, public_key: {:?} }}",
            self.owner, self.public_key
        )
    }
}
