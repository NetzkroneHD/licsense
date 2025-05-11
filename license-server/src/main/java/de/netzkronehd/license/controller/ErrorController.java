package de.netzkronehd.license.controller;


import de.netzkronehd.license.exception.PermissionException;
import de.netzkronehd.license.exception.RateLimitExceededException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.util.NoSuchElementException;

import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.TOO_MANY_REQUESTS;
import static org.springframework.http.ResponseEntity.notFound;
import static org.springframework.http.ResponseEntity.status;

@RestControllerAdvice
@Slf4j
public class ErrorController {

    @ExceptionHandler(PermissionException.class)
    public ResponseEntity<?> handlePermissionException(PermissionException e, WebRequest request) {
        log.debug("Permission denied for request: {}", request, e);
        return status(FORBIDDEN).build();
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<?> handleNoSuchElementException(NoSuchElementException e, WebRequest request) {
        log.debug("No such element for request: {}", request, e);
        return notFound().build();
    }

    @ExceptionHandler(RateLimitExceededException.class)
    public ResponseEntity<?> handleRateLimitExceededException(RateLimitExceededException e, WebRequest request) {
        log.debug("Rate limit exceeded for request: {}", request, e);
        return status(TOO_MANY_REQUESTS).build();
    }

}
