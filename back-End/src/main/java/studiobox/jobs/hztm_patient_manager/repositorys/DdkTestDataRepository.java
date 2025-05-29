package studiobox.jobs.hztm_patient_manager.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import studiobox.jobs.hztm_patient_manager.model.DdkTestData;

@Repository
public interface DdkTestDataRepository extends JpaRepository<DdkTestData, Long> {
}
