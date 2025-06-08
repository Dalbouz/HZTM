package studiobox.jobs.hztm_patient_manager.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studiobox.jobs.hztm_patient_manager.model.AnalizatorDeviceData;
import studiobox.jobs.hztm_patient_manager.model.AssayaData;
import studiobox.jobs.hztm_patient_manager.service.AnalizatorDeviceService;
import studiobox.jobs.hztm_patient_manager.service.AssayaService;

import java.util.List;

@RestController
@RequestMapping("/assayaData")
public class AssayaDataController {

    private final AssayaService assayaService;

    public AssayaDataController(AssayaService assayaService) {
        this.assayaService = assayaService;
    }

    @GetMapping("/find/all")
    public ResponseEntity <List<AssayaData>> findAll(){
        List<AssayaData> list = this.assayaService.findAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity <AssayaData> saveDevice(@RequestBody AssayaData data){
        AssayaData newObj = this.assayaService.save(data);
        return new ResponseEntity<>(newObj, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<AssayaData> getById(@PathVariable Long id){
        AssayaData obj = this.assayaService.findById(id);
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @GetMapping("/find/name/{assayName}")
    public ResponseEntity<AssayaData> getById(@PathVariable String assayName){
        AssayaData obj = this.assayaService.findByName(assayName);
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @GetMapping("/find/all/uniqueByName")
    public ResponseEntity<List<AssayaData>> getAllUniqueByName(){
        List<AssayaData> obj = this.assayaService.findAllButDontDuplicate();
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
}
