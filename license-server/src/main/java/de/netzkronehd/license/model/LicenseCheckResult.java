package de.netzkronehd.license.model;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.OffsetDateTime;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class LicenseCheckResult {

    private String licenseKey;
    private String publisher;
    private String notes;
    private boolean valid;
    @DateTimeFormat(
            iso = DateTimeFormat.ISO.DATE_TIME
    )
    private OffsetDateTime validUntil;
    private String signature;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof LicenseCheckResult that)) return false;
        return valid == that.valid && Objects.equals(licenseKey, that.licenseKey) && Objects.equals(publisher, that.publisher) && Objects.equals(notes, that.notes) && Objects.equals(validUntil, that.validUntil) && Objects.equals(signature, that.signature);
    }

    @Override
    public int hashCode() {
        int result = Objects.hashCode(licenseKey);
        result = 31 * result + Objects.hashCode(publisher);
        result = 31 * result + Objects.hashCode(notes);
        result = 31 * result + Boolean.hashCode(valid);
        result = 31 * result + Objects.hashCode(validUntil);
        result = 31 * result + Objects.hashCode(signature);
        return result;
    }
}
