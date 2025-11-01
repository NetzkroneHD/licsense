package de.netzkronehd.license.exception;

import de.netzkronehd.license.listmode.ListMode;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ListModeException extends Exception {

    private final ListMode listMode;
    private final String address;

    public ListModeException(ListMode listMode, String address) {
        super("The address '" + address + "' does not meet the requirement of the list-mode '" + listMode + "'.");
        this.listMode = listMode;
        this.address = address;
    }
}
