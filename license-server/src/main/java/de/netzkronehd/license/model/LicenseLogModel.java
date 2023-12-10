package de.netzkronehd.license.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
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
    @GeneratedValue
    private int id;

    private String license;
    private String ip;
    private OffsetDateTime dateTime;

}
