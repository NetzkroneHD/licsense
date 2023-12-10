package de.netzkronehd.license.exception;

public class PermissionException extends IllegalStateException {

    public PermissionException() {

    }

    public PermissionException(String s) {
        super(s);
    }
}
