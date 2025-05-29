package studiobox.jobs.hztm_patient_manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studiobox.jobs.hztm_patient_manager.model.DdkTestData;
import studiobox.jobs.hztm_patient_manager.repositorys.DdkTestDataRepository;

import java.util.List;

@Service
public class DdkTestDataService {
    private final DdkTestDataRepository ddkTestDataRepository;

    @Autowired
    public DdkTestDataService(DdkTestDataRepository ddkTestDataRepository) {
        this.ddkTestDataRepository = ddkTestDataRepository;
    }

    public List<DdkTestData> findAll() {
        return ddkTestDataRepository.findAll();
    }

    public DdkTestData saveDdkTest(DdkTestData ddkTestData) {
        return ddkTestDataRepository.save(ddkTestData);
    }

    public DdkTestData findById(Long id) {
        return ddkTestDataRepository.findById(id).get();
    }
}
