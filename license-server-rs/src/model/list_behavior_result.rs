use std::fmt::{Display, Formatter};
use std::str::FromStr;
use crate::model::list_mode_model::ListMode;

#[derive(Debug)]
pub enum ListBehaviorResult {
    Allow,
    Deny,
}
pub struct ListBehaviorModel {
    pub mode: ListMode,
}

impl ListBehaviorModel {
    pub fn new(mode: ListMode) -> Self {
        ListBehaviorModel { mode }
    }
}

impl FromStr for ListBehaviorResult {
    type Err = String;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s.to_lowercase().as_str() {
            "allow" => Ok(Self::Allow),
            "deny" => Ok(Self::Deny),
            _ => Err(format!("Invalid behavior mode: {}", s)),
        }
    }
}


pub trait Behavior {
    fn check_state(
        &self,
        ip_addresses: &Vec<String>,
        to_check: String,
    ) -> Result<ListBehaviorResult, regex::Error>;
}

impl Behavior for ListBehaviorModel {
    fn check_state(
        &self,
        ip_addresses: &Vec<String>,
        to_check: String,
    ) -> Result<ListBehaviorResult, regex::Error> {
        let ip_regex = regex::Regex::new(&to_check)?;
        let found = ip_addresses.iter().any(|ip| ip_regex.is_match(ip));
        match self.mode {
            ListMode::Whitelist => {
                if found {
                    Ok(ListBehaviorResult::Allow)
                } else {
                    Ok(ListBehaviorResult::Deny)
                }
            }
            ListMode::Blacklist => {
                if found {
                    Ok(ListBehaviorResult::Deny)
                } else {
                    Ok(ListBehaviorResult::Allow)
                }
            }
        }
    }
}

impl PartialEq for ListBehaviorModel {
    fn eq(&self, other: &Self) -> bool {
        self.mode == other.mode
    }
}

impl PartialEq for ListBehaviorResult {
    fn eq(&self, other: &Self) -> bool {
        matches!(
            (self, other),
            (ListBehaviorResult::Allow, ListBehaviorResult::Allow)
                | (ListBehaviorResult::Deny, ListBehaviorResult::Deny)
        )
    }
}

impl Display for ListBehaviorModel {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        write!(f, "ListBehavior {{ mode: {} }}", self.mode)
    }
}

impl Display for ListBehaviorResult {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        write!(f, "{:?}", self)
    }
}
