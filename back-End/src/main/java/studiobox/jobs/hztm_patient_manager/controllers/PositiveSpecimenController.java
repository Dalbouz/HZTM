package studiobox.jobs.hztm_patient_manager.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import studiobox.jobs.hztm_patient_manager.model.ControlSampleData;
import studiobox.jobs.hztm_patient_manager.model.PatientData;
import studiobox.jobs.hztm_patient_manager.model.PositiveSpecimenData;
import studiobox.jobs.hztm_patient_manager.service.ControlSampleService;
import studiobox.jobs.hztm_patient_manager.service.PositiveSpecimenService;

import java.util.List;

@RestController
@RequestMapping("/positivespecimen")
public class PositiveSpecimenController {

    private final PositiveSpecimenService positiveSpecimenService;

    public PositiveSpecimenController(PositiveSpecimenService positiveSpecimenService) {
        this.positiveSpecimenService = positiveSpecimenService;
    }

    @GetMapping("/find/all")
    public ResponseEntity <List<PositiveSpecimenData>> findAllPositiveSpecimens(){
        List<PositiveSpecimenData> list = positiveSpecimenService.findAllPositiveSpecimenDatas();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    @GetMapping("/find/date/{startDate}/{endDate}")
    public ResponseEntity <List<PatientData>> findWithingGivenDates(@PathVariable String startDate, @PathVariable String endDate){
        List<PatientData> list = positiveSpecimenService.findAllPositivePatientDataWithinDateRange(startDate,endDate);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
