package de.netzkronehd.license.model;

import de.netzkronehd.license.listmode.ListMode;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
public class LicenseModel {

    @Id
    private String license;

    private String publisher;
    @Column(columnDefinition = "TEXT")
    private String notes;
    private boolean valid;
    private OffsetDateTime validUntil;
    private ListMode listMode;

    @ElementCollection
    private List<String> ipAddresses;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof LicenseModel that)) return false;
        return valid == that.valid && Objects.equals(license, that.license) && Objects.equals(publisher, that.publisher) && Objects.equals(notes, that.notes) && Objects.equals(validUntil, that.validUntil) && listMode == that.listMode && Objects.equals(ipAddresses, that.ipAddresses);
    }

    @Override
    public int hashCode() {
        int result = Objects.hashCode(license);
        result = 31 * result + Objects.hashCode(publisher);
        result = 31 * result + Objects.hashCode(notes);
        result = 31 * result + Boolean.hashCode(valid);
        result = 31 * result + Objects.hashCode(validUntil);
        result = 31 * result + Objects.hashCode(listMode);
        result = 31 * result + Objects.hashCode(ipAddresses);
        return result;
    }
}
