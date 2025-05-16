package studiobox.jobs.hztm_patient_manager.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studiobox.jobs.hztm_patient_manager.model.AnalizatorData;
import studiobox.jobs.hztm_patient_manager.service.AnalizatorService;

@RestController
public class AnalizatorController {
    private final AnalizatorService analizatorService;

    public AnalizatorController(AnalizatorService analizatorService) {
        this.analizatorService = analizatorService;
    }

    @PutMapping("/analizator/update")
    public ResponseEntity<AnalizatorData> saveAnalizatorData(@RequestBody AnalizatorData analizatorData){
        AnalizatorData analizator = analizatorService.saveAnalizatorData(analizatorData);
        return new ResponseEntity<>(analizator, HttpStatus.OK);
    }

    @GetMapping("/analizator/find/{id}")
    public ResponseEntity<AnalizatorData> findAnalizatorDataById(@PathVariable Long id){
        AnalizatorData analizator = analizatorService.findAnalizatorDataById(id);
        return new ResponseEntity<>(analizator, HttpStatus.OK);
    }

    @GetMapping("/analizator/find/{analizatorName}/{analizatorOib}")
    public ResponseEntity<AnalizatorData> findAnalizatorDataByNameAndOib(@PathVariable String analizatorName, @PathVariable int analizatorOib){
        AnalizatorData analizator = analizatorService.findByAnalizatorOib(analizatorOib);
        if(analizator != null){
            if(analizator.getAnalizatorName().equals(analizatorName) && analizator.getAnalizatorOib() == analizatorOib){
                return new ResponseEntity<>(analizator, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(analizator, HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("analizator/delete/{id}")
    public ResponseEntity<AnalizatorData> deleteAnalizatorDataById(@PathVariable Long id){
        analizatorService.deleteAnalizatorDataById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
