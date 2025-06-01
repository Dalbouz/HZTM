package studiobox.jobs.hztm_patient_manager.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import studiobox.jobs.hztm_patient_manager.model.AnalizatorData;
import studiobox.jobs.hztm_patient_manager.model.PositiveSpecimenData;

import java.util.List;
import java.util.Optional;

@Repository
public interface PositiveSpecimenDataRepository extends JpaRepository<PositiveSpecimenData, Long> {
}
