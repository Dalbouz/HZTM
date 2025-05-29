package studiobox.jobs.hztm_patient_manager.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studiobox.jobs.hztm_patient_manager.model.DdkTestData;
import studiobox.jobs.hztm_patient_manager.model.RegistryDDKData;
import studiobox.jobs.hztm_patient_manager.service.RegistryDDKService;

import java.util.List;

@RestController
@RequestMapping("/ddkRegistry")
public class RegistryDDKController {
    private final RegistryDDKService registryDDKService;

    public  RegistryDDKController(RegistryDDKService registryDDKService) {
        this.registryDDKService = registryDDKService;
    }

    @GetMapping("/find/all")
    public ResponseEntity<List<RegistryDDKData>> getAllDDK(){
        List<RegistryDDKData> registryDDKDataList = registryDDKService.findAll();
        return new ResponseEntity<>(registryDDKDataList, HttpStatus.OK);
    }

    @PostMapping("/get/patientsWithTests")
    public ResponseEntity<List<RegistryDDKData>> getPatientsWithTests(@RequestBody List<DdkTestData> ddkTestDataList) {
        List<RegistryDDKData> registryDDKDataList = registryDDKService.fillRegistryDDKDataWithTests(ddkTestDataList);
        return new ResponseEntity<>(registryDDKDataList, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<RegistryDDKData> saveDDK(@RequestBody RegistryDDKData registryDDKData){
        RegistryDDKData registryDDKData1 = registryDDKService.saveDDKData(registryDDKData);
        return new ResponseEntity<>(registryDDKData1, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<RegistryDDKData> updateDDK(
            @PathVariable Long id,
            @RequestBody RegistryDDKData registryDDKData) {
        try {
            RegistryDDKData existing = registryDDKService.findById(id);
            if (existing == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            // ... update all other fields ...


            RegistryDDKData updated = registryDDKService.saveDDKData(registryDDKData);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
