package de.netzkronehd.license.repository;

import de.netzkronehd.license.model.LicenseModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LicenseRepository extends JpaRepository<LicenseModel, String> {

    List<LicenseModel> findAllByPublisher(String publisher);

    @Query("SELECT DISTINCT l.publisher FROM LicenseModel l")
    List<String> findAllDistinctPublisher();

}
