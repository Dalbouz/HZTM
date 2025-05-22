package studiobox.jobs.hztm_patient_manager.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studiobox.jobs.hztm_patient_manager.exception.DataNotFound;
import studiobox.jobs.hztm_patient_manager.model.PatientData;
import studiobox.jobs.hztm_patient_manager.service.PatientService;

import java.util.List;

@RestController
@RequestMapping("/patients")
public class PatientController {

    private final PatientService patientService;
    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping("/find/all")
    public ResponseEntity<List<PatientData>> getAllPatients(){
            List<PatientData> patientDataList = patientService.findAllPatients();
        return new ResponseEntity<>(patientDataList, HttpStatus.OK);
        }

    @PutMapping("/update/{id}")
    public ResponseEntity<PatientData> updatePatient(@PathVariable Long id, @RequestBody PatientData patientData){
        try {
            PatientData updated = patientService.updatePatient(id, patientData);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (DataNotFound e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<PatientData> addPatient(@RequestBody PatientData patientData){
        PatientData existingPatient = patientService.findPatientByOib(patientData.getOib());
        if (existingPatient != null) {
            // Patient with this OIB already exists
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        }
        PatientData patient = patientService.savePatient(patientData);
        return new ResponseEntity<>(patient, HttpStatus.CREATED);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<PatientData> findPatientById(@PathVariable Long id){
        PatientData patient = patientService.findPatientById(id);
        return  new ResponseEntity<>(patient, HttpStatus.OK);
    }

    @GetMapping("/find/{oib}")
    public ResponseEntity<PatientData> findPatientByOIB(@PathVariable Long oib){
        PatientData patient = patientService.findPatientByOib(oib);
        return new ResponseEntity<>(patient, HttpStatus.OK);
    }
}

