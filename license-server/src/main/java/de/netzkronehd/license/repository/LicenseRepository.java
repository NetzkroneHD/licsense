package de.netzkronehd.license.repository;

import de.netzkronehd.license.model.LicenseModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LicenseRepository extends JpaRepository<LicenseModel, String> {


}
