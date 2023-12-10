package de.netzkronehd.license.repository;

import de.netzkronehd.license.model.LicenseLogModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LicenseLogRepository extends JpaRepository<LicenseLogModel, Integer> {

    List<LicenseLogModel> findAllByLicense(String license);

}
