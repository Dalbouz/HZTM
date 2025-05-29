package studiobox.jobs.hztm_patient_manager.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import studiobox.jobs.hztm_patient_manager.model.RegistryDDKData;

@Repository
public interface RegistryDDKDataRepository extends JpaRepository<RegistryDDKData, Long> {
}
