package de.netzkronehd.license.model;

import de.netzkronehd.license.listmode.behavior.ListBehaviorResult;
import jakarta.persistence.*;
import lombok.*;

import java.time.OffsetDateTime;
import java.util.Objects;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
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

    @ManyToOne
    private LicenseModel license;
    private String ip;
    private OffsetDateTime dateTime;
    private ListBehaviorResult listBehaviorResult;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof LicenseLogModel that)) return false;
        return id == that.id && Objects.equals(license, that.license) && Objects.equals(ip, that.ip) && Objects.equals(dateTime, that.dateTime) && listBehaviorResult == that.listBehaviorResult;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + Objects.hashCode(license);
        result = 31 * result + Objects.hashCode(ip);
        result = 31 * result + Objects.hashCode(dateTime);
        result = 31 * result + Objects.hashCode(listBehaviorResult);
        return result;
    }
}
