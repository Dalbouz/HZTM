package studiobox.jobs.hztm_patient_manager.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studiobox.jobs.hztm_patient_manager.model.AnalizatorData;
import studiobox.jobs.hztm_patient_manager.model.PatientAnalizatorIdData;
import studiobox.jobs.hztm_patient_manager.model.PatientAnalizatorLinkData;
import studiobox.jobs.hztm_patient_manager.model.PatientData;
import studiobox.jobs.hztm_patient_manager.repositorys.PatientAnalizatorLinkRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PatientAnalizatorLinkService {
    private final PatientAnalizatorLinkRepository patientAnalizatorLinkRepository;

    @Autowired
    public PatientAnalizatorLinkService(PatientAnalizatorLinkRepository patientAnalizatorLinkRepository) {
        this.patientAnalizatorLinkRepository = patientAnalizatorLinkRepository;
    }

    public PatientAnalizatorLinkData saveAnalizatorToPatient(PatientData patientData,AnalizatorData analizatorData) {
        PatientAnalizatorIdData id= new PatientAnalizatorIdData(patientData.getId(), analizatorData.getId());

        PatientAnalizatorLinkData link = new PatientAnalizatorLinkData();
        link.setId(id);
        link.setPatient(patientData);
        link.setAnalizator(analizatorData);
        return patientAnalizatorLinkRepository.save(link);
    }

    public PatientAnalizatorLinkData deleteAnalizatorFromPatient(PatientData patientData,AnalizatorData analizatorData) {
        PatientAnalizatorIdData id = new  PatientAnalizatorIdData(patientData.getId(), analizatorData.getId());

        Optional<PatientAnalizatorLinkData> link = patientAnalizatorLinkRepository.findById(id);
        if(link.isPresent()){
            patientAnalizatorLinkRepository.deleteById(id);
            return link.get();
        }
        return null;
    }

    public PatientAnalizatorLinkData updateAnalizatorInPatient(PatientData patientData,AnalizatorData analizatorData) {
        PatientAnalizatorIdData id = new PatientAnalizatorIdData(patientData.getId(), analizatorData.getId());

        Optional<PatientAnalizatorLinkData> existingLink = patientAnalizatorLinkRepository.findById(id);
        if(existingLink.isPresent()){
            PatientAnalizatorLinkData link = existingLink.get();
            link.setAnalizator(analizatorData);
            return patientAnalizatorLinkRepository.save(link);
        }
        return null;
    }

    public List<AnalizatorData> findAllAnalizatorsInParent(PatientData patientData){
        List<PatientAnalizatorLinkData> links = patientAnalizatorLinkRepository.findByPatientId(patientData.getId());
        return links.stream()
                .map(PatientAnalizatorLinkData::getAnalizator)
                .toList();
    }
}
