package de.netzkronehd.license.checker.siganture;

import java.security.GeneralSecurityException;

/**
 * This exception is thrown when the signature check has failed or the signature is invalid.
 * Therefore, the API calls can not be trusted.
 */
public class InvalidSignatureException extends Exception {

    private final GeneralSecurityException generalSecurityException;

    public InvalidSignatureException(GeneralSecurityException generalSecurityException) {
        super(generalSecurityException);
        this.generalSecurityException = generalSecurityException;
    }


    public GeneralSecurityException getGeneralSecurityException() {
        return generalSecurityException;
    }
}
