use std::fmt::{Display, Formatter};
use std::str::FromStr;

#[derive(Debug)]
pub enum ListMode {
    Blacklist,
    Whitelist,
}

impl FromStr for ListMode {
    type Err = String;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s.to_lowercase().as_str() {
            "blacklist" => Ok(Self::Blacklist),
            "whitelist" => Ok(Self::Whitelist),
            _ => Err(format!("Invalid list mode: {}", s)),
        }
    }
}

impl PartialEq for ListMode {
    fn eq(&self, other: &Self) -> bool {
        matches!(
            (self, other),
            (ListMode::Blacklist, ListMode::Blacklist) | (ListMode::Whitelist, ListMode::Whitelist)
        )
    }
}

impl Display for ListMode {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        write!(f, "{:?}", self)
    }
}