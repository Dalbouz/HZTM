package studiobox.jobs.hztm_patient_manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studiobox.jobs.hztm_patient_manager.SearchEngine;
import studiobox.jobs.hztm_patient_manager.exception.DataNotFound;
import studiobox.jobs.hztm_patient_manager.model.ControlSampleData;
import studiobox.jobs.hztm_patient_manager.model.FilterDTO;
import studiobox.jobs.hztm_patient_manager.repositorys.ControlSampleDataRepository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class ControlSampleService {
    private final ControlSampleDataRepository controlSampleDataRepository;
    private final SearchEngine searchEngine;

    @Autowired
    public ControlSampleService(ControlSampleDataRepository controlSampleDataRepository, SearchEngine searchEngine) {
        this.controlSampleDataRepository = controlSampleDataRepository;
        this.searchEngine = searchEngine;
    }

    public List<ControlSampleData> findAllControlSampleData(){
        return controlSampleDataRepository.findAll();
    }

    public List<ControlSampleData> findAllControlSampleDataWithinDateRange(String startDate, String endDate) {
        List<ControlSampleData> list = controlSampleDataRepository.findAll();
        List<ControlSampleData> newList = new ArrayList<>();

        // Date format (adjust if your dates use a different format)
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");//"dd.MM.yyyy"

        try {
            Date start = sdf.parse(startDate);
            Date end = sdf.parse(endDate);

            for (ControlSampleData controlSampleData : list) {
                String sampleDateStr = controlSampleData.getSampleDate();
                if (sampleDateStr != null && !sampleDateStr.isEmpty()) {
                    try {
                        Date sampleDate = sdf.parse(sampleDateStr);
                        // Check if sampleDate is between start and end (inclusive)
                        if (sampleDate.compareTo(start) >= 0 && sampleDate.compareTo(end) <= 0) {
                            newList.add(controlSampleData);
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

        return newList;
    }

    public List<ControlSampleData> findAllByLot(String lot){
        List<ControlSampleData> list = controlSampleDataRepository.findAll();
        List<ControlSampleData> newList = new ArrayList<>();
        for (ControlSampleData controlSampleData : list) {
            String lotTest = controlSampleData.getLot();
            if(lotTest != null && lotTest.equals(lot)){
                newList.add(controlSampleData);
            }
        }
        return newList;
    }

    public List<ControlSampleData> findAllByTestName(String name){
        List<ControlSampleData> list = controlSampleDataRepository.findAll();
        List<ControlSampleData> newList = new ArrayList<>();
        for (ControlSampleData controlSampleData : list) {
            String testname = controlSampleData.getAssayName();
            if(testname != null && testname.equals(name)){
                newList.add(controlSampleData);
            }
        }
        return newList;
    }

    public List<ControlSampleData> getFilteredControlsByGivenList(List<FilterDTO> filters, List<ControlSampleData> controls) {
        Map<String, String> searchCriteria = searchEngine.convertFilters(filters);
        return SearchEngine.searchByFilters(controls, searchCriteria);
    }

    public List<ControlSampleData> getFilteredControls(List<FilterDTO> filters) {
        Map<String, String> searchCriteria = searchEngine.convertFilters(filters);
        return SearchEngine.searchByFilters(controlSampleDataRepository.findAll(), searchCriteria);
    }
}
