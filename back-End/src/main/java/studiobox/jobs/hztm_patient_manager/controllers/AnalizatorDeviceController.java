package studiobox.jobs.hztm_patient_manager.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studiobox.jobs.hztm_patient_manager.model.AnalizatorDeviceData;
import studiobox.jobs.hztm_patient_manager.model.AssayaData;
import studiobox.jobs.hztm_patient_manager.model.ControlSampleData;
import studiobox.jobs.hztm_patient_manager.service.AnalizatorDeviceService;
import studiobox.jobs.hztm_patient_manager.service.ControlSampleService;

import java.util.List;

@RestController
@RequestMapping("/analizatorDevice")
public class AnalizatorDeviceController {

    private final AnalizatorDeviceService analizatorDeviceService;

    public AnalizatorDeviceController(AnalizatorDeviceService analizatorDeviceService) {
        this.analizatorDeviceService = analizatorDeviceService;
    }

    @GetMapping("/find/all")
    public ResponseEntity <List<AnalizatorDeviceData>> findAll(){
        List<AnalizatorDeviceData> list = this.analizatorDeviceService.findAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity <AnalizatorDeviceData> saveDevice(@RequestBody AnalizatorDeviceData data){
        AnalizatorDeviceData newObj = this.analizatorDeviceService.save(data);
        return new ResponseEntity<>(newObj, HttpStatus.OK);
    }

    @PostMapping("/find/assayaData")
    public ResponseEntity<List<AssayaData>> getAssayaDataForDevice(@RequestBody AnalizatorDeviceData data){
        List<AssayaData> newObj = this.analizatorDeviceService.getAllAssayaDataForDevice(data);
        return new ResponseEntity<>(newObj, HttpStatus.OK);
    }

    @GetMapping("/find/id/{id}")
    public ResponseEntity <AnalizatorDeviceData> findById(@PathVariable Long id){
        AnalizatorDeviceData obj = this.analizatorDeviceService.findById(id);
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

}
