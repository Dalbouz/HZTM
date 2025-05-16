package studiobox.jobs.hztm_patient_manager.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import studiobox.jobs.hztm_patient_manager.model.AnalizatorData;

import javax.swing.text.html.Option;
import java.util.Optional;

@Repository
public interface AnalizatorDataRepository extends JpaRepository<AnalizatorData, Long> {
    Optional<AnalizatorData> getAnalizatorDataById(Long id);

    void deleteAnalizatorDataBy(Long id);

    Optional<AnalizatorData> getAnalizatorDataByOib(int analizatorOib);
}
