package studiobox.jobs.hztm_patient_manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studiobox.jobs.hztm_patient_manager.exception.DataNotFound;
import studiobox.jobs.hztm_patient_manager.model.AnalizatorData;
import studiobox.jobs.hztm_patient_manager.model.PatientData;
import studiobox.jobs.hztm_patient_manager.repositorys.AnalizatorDataRepository;

import java.util.List;

@Service
public class AnalizatorService {
    private final AnalizatorDataRepository analizatorDataRepository;
    private final PatientService patientService;

    @Autowired
    public AnalizatorService(AnalizatorDataRepository analizatorDataRepository, PatientService patientService) {
        this.analizatorDataRepository = analizatorDataRepository;
        this.patientService = patientService;
    }

    public List<AnalizatorData> findAllAnalizators(){
        return analizatorDataRepository.findAll();
    }

    public AnalizatorData saveAnalizatorData(AnalizatorData analizatorData){
        return analizatorDataRepository.save(analizatorData);
    }

    public AnalizatorData findAnalizatorDataById(Long id){
        return analizatorDataRepository.findById(id).orElseThrow(()->new DataNotFound("Analizator data not found"));
    }

    public void deleteAnalizatorDataById(Long id){
        analizatorDataRepository.deleteById(id);
    }

    public AnalizatorData findByAnalizatorOib(Long analizatorOib){
        return analizatorDataRepository.findByAnalizatorOib(analizatorOib).orElseThrow(()->new DataNotFound("Analizator data not found"));
    }

    public AnalizatorData linkAnalizatorToPatient(Long analizatorId, Long patientId){
        AnalizatorData analizator = analizatorDataRepository.findById(analizatorId).orElseThrow(()->new DataNotFound("Analizator data not found"));
        PatientData patientData = patientService.findPatientById(patientId);
        analizator.setPatient(patientData);
        return analizatorDataRepository.save(analizator);
    }

    public void unlinkAnalizatorFromParent(Long analizatorId){
        AnalizatorData analizator = analizatorDataRepository.findById(analizatorId).orElseThrow(() -> new DataNotFound("Analizator not found"));;
        analizator.setPatient(null);
        analizatorDataRepository.save(analizator);
    }

    public List<AnalizatorData> findAnalizatorsByPatientId(Long patientId){
        return analizatorDataRepository.findByPatientId(patientId);
    }

    public List<AnalizatorData>findAnalizatorsBySpecimentID(String specimentID){
        return analizatorDataRepository.findBySpecimentID(specimentID);
    }
}
