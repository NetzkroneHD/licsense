package de.netzkronehd.license.listmode.behavior;

import java.util.List;

public abstract class ListBehavior {

    public abstract ListBehaviorResult checkState(List<String> list, String toCheck);

}
