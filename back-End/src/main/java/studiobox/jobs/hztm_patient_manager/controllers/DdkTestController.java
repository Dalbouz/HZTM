package studiobox.jobs.hztm_patient_manager.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studiobox.jobs.hztm_patient_manager.model.DdkTestData;
import studiobox.jobs.hztm_patient_manager.service.DdkTestDataService;

import java.util.List;

@RestController
@RequestMapping("/ddkTests")
public class DdkTestController {
    private final DdkTestDataService ddkTestDataService;

    public  DdkTestController(DdkTestDataService ddkTestDataService) {
        this.ddkTestDataService = ddkTestDataService;
    }

    @GetMapping("/find/all")
    public ResponseEntity<List<DdkTestData>> getAllDDKTests(){
        List<DdkTestData> ddkTestDataList = ddkTestDataService.findAll();
        return new ResponseEntity<>(ddkTestDataList, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<DdkTestData> saveDdkTest(@RequestBody DdkTestData ddkTestData){
        DdkTestData ddkTestData1 = ddkTestDataService.saveDdkTest(ddkTestData);
        return new ResponseEntity<>(ddkTestData1, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<DdkTestData> updateDdkTest(
            @PathVariable Long id,
            @RequestBody DdkTestData ddkTestData) {
        try {
            DdkTestData existing = ddkTestDataService.findById(id);
            if (existing == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            // ... update all other fields ...


            DdkTestData updated = ddkTestDataService.saveDdkTest(ddkTestData);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

