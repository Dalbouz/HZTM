package studiobox.jobs.hztm_patient_manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studiobox.jobs.hztm_patient_manager.exception.DataNotFound;
import studiobox.jobs.hztm_patient_manager.model.ControlSampleData;
import studiobox.jobs.hztm_patient_manager.model.PatientData;
import studiobox.jobs.hztm_patient_manager.model.PositiveSpecimenData;
import studiobox.jobs.hztm_patient_manager.repositorys.ControlSampleDataRepository;
import studiobox.jobs.hztm_patient_manager.repositorys.PositiveSpecimenDataRepository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PositiveSpecimenService {
    private final PositiveSpecimenDataRepository positiveSpecimenDataRepositry;
    private final PatientService patientService;

    @Autowired
    public PositiveSpecimenService(PositiveSpecimenDataRepository positiveSpecimenDataRepositry,  PatientService patientService) {
        this.positiveSpecimenDataRepositry = positiveSpecimenDataRepositry;
        this.patientService = patientService;
    }

    public List<PositiveSpecimenData> findAllPositiveSpecimenDatas(){
        return positiveSpecimenDataRepositry.findAll();
    }

    public List<PatientData> findAllPositivePatientDataWithinDateRange(String startDate, String endDate) {
        List<PositiveSpecimenData> list = this.findAllPositiveSpecimenDatas();
        List<PositiveSpecimenData> newList = new ArrayList<>();
        List<PatientData> newPatientDataList = new ArrayList<>();

        // Date format (adjust if your dates use a different format)
        SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yyyy");

        try {
            Date start = sdf.parse(startDate);
            Date end = sdf.parse(endDate);

            for (PositiveSpecimenData positiveSpecimenData : list) {
                String sampleDateStr = positiveSpecimenData.getDateOfFirstPositiveTest();
                if (sampleDateStr != null && !sampleDateStr.isEmpty()) {
                    try {
                        Date sampleDate = sdf.parse(sampleDateStr);
                        // Check if sampleDate is between start and end (inclusive)
                        if (sampleDate.compareTo(start) >= 0 && sampleDate.compareTo(end) <= 0) {
                            newList.add(positiveSpecimenData);
                        }
                    } catch (DataNotFound e) {
                        // Handle invalid sampleDate format
                        System.err.println("Invalid sampleDate format: " + sampleDateStr);
                    }
                }
            }
        } catch (DataNotFound | ParseException e) {
            // Handle invalid start/end date format
            System.err.println("Invalid start/end date format");
            return Collections.emptyList();
        }

        Set<String> targetIDs = newList.stream().map(PositiveSpecimenData::getSpecimenID).collect(Collectors.toSet());

        newPatientDataList = patientService.findAllPatients();

        List<PatientData> matching = newPatientDataList.stream().filter(y -> targetIDs.contains(y.getSpecimentID())).collect(Collectors.toList());

        return matching;
    }
}
