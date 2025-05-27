package studiobox.jobs.hztm_patient_manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studiobox.jobs.hztm_patient_manager.model.ControlSampleData;
import studiobox.jobs.hztm_patient_manager.repositorys.ControlSampleDataRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class ControlSampleService {
    private final ControlSampleDataRepository controlSampleDataRepository;

    @Autowired
    public ControlSampleService(ControlSampleDataRepository controlSampleDataRepository) {
        this.controlSampleDataRepository = controlSampleDataRepository;
    }

    public List<ControlSampleData> findAllControlSampleData(){
        return controlSampleDataRepository.findAll();
    }

    public List<ControlSampleData> findAllControlSampleDataWithingDateRange(Integer startDate, Integer endDate) {
        List<ControlSampleData> list = controlSampleDataRepository.findAll();
        List<ControlSampleData> newList = new ArrayList<>();
        for (ControlSampleData controlSampleData : list) {
            Integer sampleDate = controlSampleData.getSampleDate();
            if (sampleDate != null && sampleDate >= startDate && sampleDate <= endDate) {
                newList.add(controlSampleData);
            }
        }
        return newList;
    }
}
