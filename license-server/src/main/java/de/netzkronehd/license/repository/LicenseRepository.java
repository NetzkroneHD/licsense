package de.netzkronehd.license.repository;

import de.netzkronehd.license.model.LicenseModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LicenseRepository extends JpaRepository<LicenseModel, String> {

    List<LicenseModel> findAllByPublisher(String publisher);

}
