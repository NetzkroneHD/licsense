package de.netzkronehd.license.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LicenseLogModel {

    @Id
    @SequenceGenerator(
            name = "license_log_sequence",
            sequenceName = "license_log_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "license_log_sequence"
    )
    private int id;

    private String license;
    private String ip;
    private OffsetDateTime dateTime;

}
