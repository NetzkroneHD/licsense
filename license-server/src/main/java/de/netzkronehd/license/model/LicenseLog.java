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
public class LicenseLog {

    @Id
    @GeneratedValue
    private int id;

    private String license;
    private String ip;
    private OffsetDateTime dateTime;

}
