package de.netzkronehd.license.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LicenseKeyModel {

    @Id
    private String owner;
    @Column(columnDefinition = "TEXT")
    private String privateKey;
    @Column(columnDefinition = "TEXT")
    private String publicKey;

}
