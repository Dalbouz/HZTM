package studiobox.jobs.hztm_patient_manager.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import studiobox.jobs.hztm_patient_manager.model.AnalizatorDeviceData;
import studiobox.jobs.hztm_patient_manager.model.ControlSampleData;

@Repository
public interface AnalizatorDeviceDataRepository extends JpaRepository<AnalizatorDeviceData, Long> {
}
