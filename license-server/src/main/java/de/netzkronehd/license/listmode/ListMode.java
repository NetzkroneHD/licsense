package de.netzkronehd.license.listmode;

import de.netzkronehd.license.listmode.behavior.BlacklistBehavior;
import de.netzkronehd.license.listmode.behavior.ListBehavior;
import de.netzkronehd.license.listmode.behavior.ListBehaviorResult;
import de.netzkronehd.license.listmode.behavior.WhitelistBehavior;

import java.util.List;

public enum ListMode {

    BLACKLIST(new BlacklistBehavior()),
    WHITELIST(new WhitelistBehavior());

    private final ListBehavior behavior;

    ListMode(ListBehavior behavior) {
        this.behavior = behavior;
    }

    public ListBehaviorResult checkState(List<String> ipAddresses, String toCheck) {
        return this.behavior.checkState(ipAddresses, toCheck);
    }


}
