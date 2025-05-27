package studiobox.jobs.hztm_patient_manager.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studiobox.jobs.hztm_patient_manager.model.ControlSampleData;
import studiobox.jobs.hztm_patient_manager.service.ControlSampleService;

import java.util.List;

@RestController
@RequestMapping("/controlSamples")
public class ControlSampleController {

    private final ControlSampleService controlSampleService;

    public ControlSampleController(ControlSampleService controlSampleService) {
        this.controlSampleService = controlSampleService;
    }

    @GetMapping("/find/all")
    public ResponseEntity <List<ControlSampleData>> findAllControlSamples(){
        List<ControlSampleData> controlSampleDataList = controlSampleService.findAllControlSampleData();
        return new ResponseEntity<>(controlSampleDataList, HttpStatus.OK);
    }
    @GetMapping("/find/{startDate}/{endDate}")
    public ResponseEntity <List<ControlSampleData>> findWithingGivenDates(@PathVariable Integer startDate, @PathVariable Integer endDate){
        List<ControlSampleData> controlSampleDataList = controlSampleService.findAllControlSampleDataWithingDateRange(startDate,endDate);
        return new ResponseEntity<>(controlSampleDataList, HttpStatus.OK);
    }
}
