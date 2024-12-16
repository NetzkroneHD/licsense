package de.netzkronehd.license.repository;

import de.netzkronehd.license.model.LicenseKeyModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LicenseKeyRepository extends JpaRepository<LicenseKeyModel, String> {

}
