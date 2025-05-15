package studiobox.jobs.hztm_patient_manager.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import studiobox.jobs.hztm_patient_manager.model.InstitutionLabData;

import java.util.Optional;

@Repository
public interface InstitutionDataRepository extends JpaRepository<InstitutionLabData, Long> {
    Optional<InstitutionLabData> getInstitutionLabDataByName(String name);
}
