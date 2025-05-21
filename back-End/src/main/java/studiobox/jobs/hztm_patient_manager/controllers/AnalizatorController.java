package studiobox.jobs.hztm_patient_manager.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studiobox.jobs.hztm_patient_manager.model.AnalizatorData;
import studiobox.jobs.hztm_patient_manager.model.PatientData;
import studiobox.jobs.hztm_patient_manager.service.AnalizatorService;
import studiobox.jobs.hztm_patient_manager.service.PatientService;

import java.util.List;

@RestController
@RequestMapping("/analizators")
public class AnalizatorController {
    private final AnalizatorService analizatorService;
    private final PatientService patientService;

    public AnalizatorController(AnalizatorService analizatorService, PatientService patientService) {
        this.analizatorService = analizatorService;
        this.patientService = patientService;
    }


    @GetMapping("/find/all")
    public ResponseEntity<List<AnalizatorData>> getAllAnalizators(){
        List<AnalizatorData> analizatorDataList = analizatorService.findAllAnalizators();
        return new ResponseEntity<>(analizatorDataList, HttpStatus.OK);
    }

    // 2. Get analizator data by ID
    @GetMapping("/find/{id}")
    public ResponseEntity<AnalizatorData> findAnalizatorDataById(@PathVariable Long id) {
        AnalizatorData analizator = analizatorService.findAnalizatorDataById(id);
        return analizator != null ?
                new ResponseEntity<>(analizator, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    //find Analizator by patient ID
    @GetMapping("/find/patient/{patientId}")
    public ResponseEntity<List<AnalizatorData>> getAnalizatorsForPatient(@PathVariable Long patientId) {
        try {
            PatientData patient = patientService.findPatientById(patientId); // Check if patient exists
            if (patient == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            List<AnalizatorData> analizators = analizatorService.findAnalizatorsByPatient(patientId);
            return !analizators.isEmpty() ?
                    new ResponseEntity<>(analizators, HttpStatus.OK) :
                    new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<AnalizatorData> updateAnalizatorData(
            @PathVariable Long id,
            @RequestBody AnalizatorData analizatorData) {
        try {
            AnalizatorData existing = analizatorService.findAnalizatorDataById(id);
            if (existing == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            // ... update all other fields ...
            AnalizatorData updated = analizatorService.saveAnalizatorData(existing); //
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Link existing analizator data to a patient
    @PutMapping("/link/{analizatorId}/{patientId}")
    public ResponseEntity<AnalizatorData> linkAnalizatorToPatient(
            @PathVariable Long analizatorId,
            @PathVariable Long patientId) {
        try {
            AnalizatorData analizator = analizatorService.findByAnalizatorOib(analizatorId);
            PatientData patient = patientService.findPatientById(patientId);
            if (analizator == null || patient == null) { // ✅ Explicit check
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            analizator.setPatient(patient);
            AnalizatorData saved = analizatorService.saveAnalizatorData(analizator);
            return new ResponseEntity<>(saved, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // 1. Add analizator data and link to a patient
    @PostMapping("/add/patient/{patientId}")
    public ResponseEntity<AnalizatorData> addAnalizatorToPatient(
            @PathVariable Long patientId,
            @RequestBody AnalizatorData analizatorData) {
        try {
            PatientData patient = patientService.findPatientById(patientId);
            analizatorData.setPatient(patient);
            AnalizatorData saved = analizatorService.saveAnalizatorData(analizatorData);
            return new ResponseEntity<>(saved, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /*



    @PostMapping("/add")
    public ResponseEntity<AnalizatorData> addAnalizator(@RequestBody AnalizatorData analizatorData) {
        AnalizatorData analizator =  analizatorService.saveAnalizatorData(analizatorData);
        return new ResponseEntity<>(analizator, HttpStatus.CREATED);
    }

    // 5. Delete analizator data (permanently)
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteAnalizatorDataById(@PathVariable Long id) {
        try {
            analizatorService.deleteAnalizatorDataById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // 6. Unlink analizator from patient (keep analizator data, just remove patient association)
    @PutMapping("/unlink/{analizatorId}")
    public ResponseEntity<AnalizatorData> unlinkAnalizatorFromPatient(@PathVariable Long analizatorId) {
        try {
            AnalizatorData analizator = analizatorService.findAnalizatorDataById(analizatorId);
            analizator.setPatient(null);
            AnalizatorData saved = analizatorService.saveAnalizatorData(analizator);
            return new ResponseEntity<>(saved, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
 */


}
