package studiobox.jobs.hztm_patient_manager.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studiobox.jobs.hztm_patient_manager.model.PatientData;
import studiobox.jobs.hztm_patient_manager.service.PatientService;

import java.util.List;

@RestController
public class PatientController {

    private final PatientService patientService;
    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

@GetMapping("/patients/all")
public ResponseEntity<List<PatientData>> getAllPatients(){
        List<PatientData> patientDataList = patientService.findAllPatients();
    return new ResponseEntity<>(patientDataList, HttpStatus.OK);
    }

    @PutMapping("/patients/update")
    public ResponseEntity<PatientData> updatePatient(@RequestBody PatientData patientData){
    PatientData patient = patientService.savePatient(patientData);
    return new ResponseEntity<>(patient, HttpStatus.OK);
    }

    @GetMapping("/patients/find/{id}")
    public ResponseEntity<PatientData> findPatientById(@PathVariable Long id){
        PatientData patient = patientService.findPatientById(id);
        return  new ResponseEntity<>(patient, HttpStatus.OK);
    }

    @GetMapping("/patients/find/{oib}")
    public ResponseEntity<PatientData> findPatientByOIB(@PathVariable int oib){
        PatientData patient = patientService.findPatientByOIB(oib);
        return new ResponseEntity<>(patient, HttpStatus.OK);
    }
}

