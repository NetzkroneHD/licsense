use std::fmt::{Display, Formatter};

#[derive(Debug)]
pub enum ListMode {
    Blacklist,
    Whitelist,
}

#[derive(Debug)]
pub enum ListBehaviorResult {
    Allow,
    Deny,
}

pub struct ListBehavior {
    pub mode: ListMode,
}

impl ListBehavior {
    pub fn new(mode: ListMode) -> Self {
        ListBehavior { mode }
    }
}

pub trait Behavior {
    fn check_state(
        &self,
        ip_addresses: &Vec<String>,
        to_check: String,
    ) -> Result<ListBehaviorResult, regex::Error>;
}

impl Behavior for ListBehavior {
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

impl PartialEq for ListBehavior {
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

impl Display for ListBehavior {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        write!(f, "ListBehavior {{ mode: {} }}", self.mode)
    }
}

impl Display for ListBehaviorResult {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        write!(f, "{:?}", self)
    }
}
