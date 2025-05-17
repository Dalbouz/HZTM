package studiobox.jobs.hztm_patient_manager.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studiobox.jobs.hztm_patient_manager.model.AnalizatorData;
import studiobox.jobs.hztm_patient_manager.model.PatientAnalizatorLinkData;
import studiobox.jobs.hztm_patient_manager.model.PatientData;
import studiobox.jobs.hztm_patient_manager.service.AnalizatorService;
import studiobox.jobs.hztm_patient_manager.service.PatientAnalizatorLinkService;
import studiobox.jobs.hztm_patient_manager.service.PatientService;

import java.util.List;

@RestController
@RequestMapping("/analizatorPatientLinks")
public class PatientAnalizatorLinkController {

    private final PatientAnalizatorLinkService patientAnalizatorLinkService;
    private final PatientService patientService;
    private final AnalizatorService analizatorService;

    public PatientAnalizatorLinkController(
            PatientAnalizatorLinkService patientAnalizatorLinkService,
            PatientService patientService, AnalizatorService analizatorService) {
        this.patientAnalizatorLinkService = patientAnalizatorLinkService;
        this.patientService = patientService;
        this.analizatorService = analizatorService;
    }

    @PostMapping("/link/{patientId}/{analizatorId}")
    public ResponseEntity<PatientAnalizatorLinkData> linkAnalizatorToPatient(
            @PathVariable Long patientId,
            @PathVariable Long analizatorId) {
        try {
            PatientData patient = patientService.findPatientById(patientId);
            AnalizatorData analizator = analizatorService.findAnalizatorDataById(analizatorId);// Replace with actual service call
            PatientAnalizatorLinkData link = patientAnalizatorLinkService.saveAnalizatorToPatient(patient, analizator);
            return new ResponseEntity<>(link, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/unlink/{patientId}/{analizatorId}")
    public ResponseEntity<Void> unlinkAnalizatorFromPatient(
            @PathVariable Long patientId,
            @PathVariable Long analizatorId) {
        try {
            PatientData patient = patientService.findPatientById(patientId);
            AnalizatorData analizator = analizatorService.findAnalizatorDataById(analizatorId);
            patientAnalizatorLinkService.deleteAnalizatorFromPatient(patient, analizator);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/find/analizators/{patientId}")
    public ResponseEntity<List<AnalizatorData>> getPatientAnalizators(
            @PathVariable Long patientId) {
        try {
            PatientData patient = patientService.findPatientById(patientId);
            List<AnalizatorData> analizators = patientAnalizatorLinkService.findAllAnalizatorsInParent(patient);
            return new ResponseEntity<>(analizators, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<PatientAnalizatorLinkData> updateAnalizatorLink(
            @RequestBody PatientAnalizatorLinkData linkData) {
        try {
            PatientAnalizatorLinkData updatedLink = patientAnalizatorLinkService.updateAnalizatorInPatient(
                    linkData.getPatient(),
                    linkData.getAnalizator()
            );
            return new ResponseEntity<>(updatedLink, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

