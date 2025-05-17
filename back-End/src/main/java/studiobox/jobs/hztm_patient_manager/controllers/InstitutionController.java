package studiobox.jobs.hztm_patient_manager.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studiobox.jobs.hztm_patient_manager.model.InstitutionLabData;
import studiobox.jobs.hztm_patient_manager.service.InstitutionService;

@RestController
@RequestMapping("/institutions")
public class InstitutionController {
    private final InstitutionService institutionService;

    public InstitutionController(InstitutionService institutionService) {
        this.institutionService = institutionService;
    }

    @PostMapping("/add")
    public ResponseEntity<InstitutionLabData> addInstitution(@RequestBody InstitutionLabData institutionLabData){
        InstitutionLabData newInstitutionLabData = institutionService.addInstitution(institutionLabData);
        return new ResponseEntity<>(newInstitutionLabData, HttpStatus.CREATED);
    }

    @GetMapping("/find/{name}")
    public ResponseEntity<InstitutionLabData> findInstitution(@PathVariable String name){
        InstitutionLabData institution = institutionService.findInstitutionByName(name);
        return new ResponseEntity<>(institution, HttpStatus.OK);
    }
}
