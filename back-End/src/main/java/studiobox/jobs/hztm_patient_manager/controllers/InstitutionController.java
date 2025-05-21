package studiobox.jobs.hztm_patient_manager.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studiobox.jobs.hztm_patient_manager.model.InstitutionLabData;
import studiobox.jobs.hztm_patient_manager.service.InstitutionService;

import java.util.List;

@RestController
@RequestMapping("/institutions")
public class InstitutionController {
    private final InstitutionService institutionService;

    public InstitutionController(InstitutionService institutionService) {
        this.institutionService = institutionService;
    }

    @PostMapping("/add")
    public ResponseEntity<InstitutionLabData> addInstitution(@RequestBody InstitutionLabData institution){
        InstitutionLabData institutionLabData = institutionService.addInstitution(institution);
        return new ResponseEntity<>(institution, HttpStatus.CREATED);
    }

    @GetMapping("/find/{name}")
    public ResponseEntity<InstitutionLabData> findInstitution(@PathVariable String name){
        InstitutionLabData institution = institutionService.findInstitutionByName(name);
        return new ResponseEntity<>(institution, HttpStatus.OK);
    }

    @GetMapping("/find/all")
    public ResponseEntity<List<InstitutionLabData>> getAllInstitutions(){
        List<InstitutionLabData> institutionLabData = institutionService.findAllInstitutions();
        return new ResponseEntity<>(institutionLabData, HttpStatus.OK);
    }
}
