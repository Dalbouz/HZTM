package studiobox.jobs.hztm_patient_manager.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studiobox.jobs.hztm_patient_manager.SearchRequest;
import studiobox.jobs.hztm_patient_manager.model.AnalizatorData;
import studiobox.jobs.hztm_patient_manager.model.ControlSampleData;
import studiobox.jobs.hztm_patient_manager.model.FilterDTO;
import studiobox.jobs.hztm_patient_manager.service.ControlSampleService;

import java.util.List;

@RestController
@RequestMapping("/controlsamples")
public class ControlSampleController {

    private final ControlSampleService controlSampleService;

    public ControlSampleController(ControlSampleService controlSampleService) {
        this.controlSampleService = controlSampleService;
    }

    @GetMapping("/find/all")
    public ResponseEntity<List<ControlSampleData>> findAllControlSamples() {
        List<ControlSampleData> controlSampleDataList = controlSampleService.findAllControlSampleData();
        return new ResponseEntity<>(controlSampleDataList, HttpStatus.OK);
    }

    @GetMapping("/find/date/{startDate}/{endDate}")
    public ResponseEntity<List<ControlSampleData>> findWithingGivenDates(@PathVariable String startDate, @PathVariable String endDate) {
        List<ControlSampleData> controlSampleDataList = controlSampleService.findAllControlSampleDataWithinDateRange(startDate, endDate);
        return new ResponseEntity<>(controlSampleDataList, HttpStatus.OK);
    }

    @GetMapping("/find/lot/{lot}")
    public ResponseEntity<List<ControlSampleData>> findByLot(@PathVariable String lot) {
        List<ControlSampleData> controlSampleDataList = controlSampleService.findAllByLot(lot);
        return new ResponseEntity<>(controlSampleDataList, HttpStatus.OK);
    }

    @GetMapping("/find/testName/{testName}")
    public ResponseEntity<List<ControlSampleData>> findByTestName(@PathVariable String testName) {
        List<ControlSampleData> controlSampleDataList = controlSampleService.findAllByTestName(testName);
        return new ResponseEntity<>(controlSampleDataList, HttpStatus.OK);
    }

    @PostMapping("/find/byFiltersAndGivenList")
    public ResponseEntity<List<ControlSampleData>> findByFilters(
            @RequestBody SearchRequest request
    ) {

        List<FilterDTO> filterDTOs = request.getFilters();
        List<ControlSampleData> samples = request.getControlSamples();
        List<ControlSampleData> filteredList = controlSampleService.getFilteredControlsByGivenList(filterDTOs, samples);

        return new ResponseEntity<>(filteredList, HttpStatus.OK);
    }

    @PostMapping("/find/byFilters")
    public ResponseEntity<List<ControlSampleData>> searchControls(
            @RequestBody List<FilterDTO> filterDTOs
    ) {
        List<ControlSampleData> filteredList = controlSampleService.getFilteredControls(filterDTOs);

        return new ResponseEntity<>(filteredList, HttpStatus.OK);
    }
}
