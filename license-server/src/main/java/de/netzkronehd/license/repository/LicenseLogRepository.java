package de.netzkronehd.license.repository;

import de.netzkronehd.license.model.LicenseLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LicenseLogRepository extends JpaRepository<LicenseLog, Integer> {

    List<LicenseLog> findAllByLicense(String license);

}
