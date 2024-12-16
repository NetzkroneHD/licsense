package de.netzkronehd.license.listmode.behavior;

import java.util.List;

public class WhitelistBehavior extends ListBehavior {

    @Override
    public ListBehaviorResult checkState(List<String> ipAddresses, String toCheck) {
        if (ipAddresses.stream().anyMatch(toCheck::matches)) {
            return ListBehaviorResult.ALLOW;
        }
        return ListBehaviorResult.DISALLOW;
    }
}
