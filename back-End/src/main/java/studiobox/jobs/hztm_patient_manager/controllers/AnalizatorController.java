package studiobox.jobs.hztm_patient_manager.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studiobox.jobs.hztm_patient_manager.model.AnalizatorData;
import studiobox.jobs.hztm_patient_manager.model.ControlSampleData;
import studiobox.jobs.hztm_patient_manager.model.FilterDTO;
import studiobox.jobs.hztm_patient_manager.model.PatientData;
import studiobox.jobs.hztm_patient_manager.service.AnalizatorService;
import studiobox.jobs.hztm_patient_manager.service.PatientService;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
            List<AnalizatorData> analizators = analizatorService.findAnalizatorsByPatientId(patientId);
            return !analizators.isEmpty() ?
                    new ResponseEntity<>(analizators, HttpStatus.OK) :
                    new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/find/all/{specimenID}")
    public ResponseEntity<List<AnalizatorData>> getAnalizatorsForSpecimenID(@PathVariable String specimenID) {
        try {
            List<AnalizatorData> analizatorDataList = analizatorService.findAnalizatorsBySpecimenID(specimenID);
            if (analizatorDataList.isEmpty()) {
                // Return 404 if nothing found
                return ResponseEntity.notFound().build();
            }
            // Return 200 OK with the list
            return ResponseEntity.ok(analizatorDataList);
        } catch (Exception e) {
            // Log the exception (optional but recommended)
            e.printStackTrace();
            // Return 500 Internal Server Error with a message
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
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


            AnalizatorData updated = analizatorService.saveAnalizatorData(analizatorData);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<AnalizatorData> addAnalizatorData(@RequestBody AnalizatorData analizatorData){
        AnalizatorData newAnalizatorData = analizatorService.saveAnalizatorData(analizatorData);
        return new ResponseEntity<>(newAnalizatorData, HttpStatus.CREATED);
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

    @GetMapping("/find/archived/date/{startDate}/{endDate}")
    public ResponseEntity <List<AnalizatorData>> findArchivedWithinDate(@PathVariable String startDate, @PathVariable String endDate){
        List<AnalizatorData> list = analizatorService.findAllArchivedWithinDateRange(startDate,endDate);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/find/archived")
    public ResponseEntity <List<AnalizatorData>> findArchived(){
        List<AnalizatorData> list = analizatorService.getArchivedAnalizators();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/search")
    public ResponseEntity<List<AnalizatorData>> searchAnalizators(
            @RequestBody List<FilterDTO> filterDTOs
    ) {
        List<AnalizatorData> filteredList = analizatorService.getFilteredAnalizators(filterDTOs);

        return new ResponseEntity<>(filteredList, HttpStatus.OK);
    }
}
