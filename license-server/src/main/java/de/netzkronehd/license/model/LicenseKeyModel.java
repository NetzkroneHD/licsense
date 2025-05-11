package de.netzkronehd.license.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.util.Objects;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class LicenseKeyModel {

    @Id
    private String owner;
    @Column(columnDefinition = "TEXT")
    private String privateKey;
    @Column(columnDefinition = "TEXT")
    private String publicKey;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof LicenseKeyModel that)) return false;
        return Objects.equals(owner, that.owner) && Objects.equals(privateKey, that.privateKey) && Objects.equals(publicKey, that.publicKey);
    }

    @Override
    public int hashCode() {
        int result = Objects.hashCode(owner);
        result = 31 * result + Objects.hashCode(privateKey);
        result = 31 * result + Objects.hashCode(publicKey);
        return result;
    }
}
