package de.netzkronehd.license.exception;

public class RateLimitExceededException extends Exception {

    public RateLimitExceededException(String message) {
        super(message);
    }
}
