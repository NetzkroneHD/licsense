package de.netzkronehd.license.repository;

import de.netzkronehd.license.model.LicenseLogModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;

@Repository
public interface LicenseLogRepository extends JpaRepository<LicenseLogModel, Integer> {

    List<LicenseLogModel> findAllByLicense(String license);

    void deleteAllByLicense(String license);

    List<LicenseLogModel> findAllByLicenseAndDateTimeBetween(String license, OffsetDateTime start, OffsetDateTime end);

}
