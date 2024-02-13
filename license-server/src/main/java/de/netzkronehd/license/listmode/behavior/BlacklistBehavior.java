package de.netzkronehd.license.listmode.behavior;

import java.util.List;

public class BlacklistBehavior extends ListBehavior {

    @Override
    public ListBehaviorResult checkState(List<String> list, String toCheck) {
        if(list.stream().anyMatch(toCheck::matches)) {
            return ListBehaviorResult.DISALLOW;
        }
        return ListBehaviorResult.ALLOW;
    }
}
