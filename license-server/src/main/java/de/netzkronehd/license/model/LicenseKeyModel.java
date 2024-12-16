package de.netzkronehd.license.model;

import jakarta.persistence.*;
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
    private String privateKey;
    private String publicKey;

}
