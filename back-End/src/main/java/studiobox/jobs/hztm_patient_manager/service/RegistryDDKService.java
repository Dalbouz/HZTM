package studiobox.jobs.hztm_patient_manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studiobox.jobs.hztm_patient_manager.model.DdkTestData;
import studiobox.jobs.hztm_patient_manager.model.RegistryDDKData;
import studiobox.jobs.hztm_patient_manager.repositorys.RegistryDDKDataRepository;

import java.util.List;

@Service
public class RegistryDDKService {
    private final RegistryDDKDataRepository registryDDKDataRepository;

    @Autowired
    public RegistryDDKService(RegistryDDKDataRepository registryDDKDataRepository) {
        this.registryDDKDataRepository = registryDDKDataRepository;
    }

    public List<RegistryDDKData> findAll() {
        return registryDDKDataRepository.findAll();
    }

    public RegistryDDKData saveDDKData(RegistryDDKData registryDDKData) {
        return registryDDKDataRepository.save(registryDDKData);
    }

    public RegistryDDKData findById(Long id) {
        return registryDDKDataRepository.findById(id).get();
    }

    public List<RegistryDDKData> fillRegistryDDKDataWithTests(List<DdkTestData> ddkTestDataList) {
        List<RegistryDDKData> registryDDKDataList = registryDDKDataRepository.findAll();
        for (RegistryDDKData registryDDKData : registryDDKDataList) {
            for(DdkTestData ddkTestData : ddkTestDataList) {
                if(ddkTestData.getId().equals(registryDDKData.getId())) {
                    registryDDKData.getDdkTestDataList().add(ddkTestData);
                }
            }
        }
        return registryDDKDataList;
    }
}
