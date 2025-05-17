package studiobox.jobs.hztm_patient_manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studiobox.jobs.hztm_patient_manager.exception.DataNotFound;
import studiobox.jobs.hztm_patient_manager.model.PatientData;
import studiobox.jobs.hztm_patient_manager.repositorys.PatientDataRepository;

import java.util.List;

@Service
public class PatientService {
    private final PatientDataRepository patientDataRepository;

    @Autowired
    public PatientService(PatientDataRepository patientDataRepository) {
        this.patientDataRepository = patientDataRepository;
    }

    public PatientData savePatient(PatientData patient){
        return patientDataRepository.save(patient);
    }

    public List<PatientData> findAllPatients(){
        return patientDataRepository.findAll();
    }

    public PatientData findPatientById(Long id){
        return patientDataRepository.findById(id).get();
    }

    public PatientData findPatientByOib(Long oib){
        return patientDataRepository.findByOib(oib).orElseThrow(()->new DataNotFound("Patient with the OIB:" + oib + "not Found!"));
    }
}
