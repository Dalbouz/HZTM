package studiobox.jobs.hztm_patient_manager.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import studiobox.jobs.hztm_patient_manager.model.PatientAnalizatorIdData;
import studiobox.jobs.hztm_patient_manager.model.PatientAnalizatorLinkData;

import java.util.List;

@Repository
public interface PatientAnalizatorLinkRepository extends JpaRepository<PatientAnalizatorLinkData, PatientAnalizatorIdData> {
    @Query("SELECT l FROM PatientAnalizatorLinkData l WHERE l.id.patientId = :patientId")
    List<PatientAnalizatorLinkData> findByPatientId(@Param("patientId") Long patientId);
}