package de.netzkronehd.license.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LicenseModel {

    @Id
    private String license;

    private String publisher;
    private String notes;
    private boolean valid;
    private OffsetDateTime validUntil;

}
