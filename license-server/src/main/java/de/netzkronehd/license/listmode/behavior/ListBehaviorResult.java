package de.netzkronehd.license.listmode.behavior;

public enum ListBehaviorResult {
    ALLOW,
    DISALLOW;

    boolean isAllowed() {
        return this.equals(DISALLOW);
    }

}
