package studiobox.jobs.hztm_patient_manager.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import studiobox.jobs.hztm_patient_manager.model.AnalizatorData;

import java.util.Optional;

@Repository
public interface AnalizatorDataRepository extends JpaRepository<AnalizatorData, Long> {
    Optional<AnalizatorData> findAnalizatorDataById(Long id);

    void deleteById(Long id);

    Optional<AnalizatorData> findByAnalizatorOib(int analizatorOib);
}
