package studiobox.jobs.hztm_patient_manager.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import studiobox.jobs.hztm_patient_manager.model.AssayaData;
import studiobox.jobs.hztm_patient_manager.model.ControlSampleData;

import java.util.Optional;

@Repository
public interface AssayaDataRepository extends JpaRepository<AssayaData, Long> {
    Optional<AssayaData> findByAssayaName(String assayaName);
}
