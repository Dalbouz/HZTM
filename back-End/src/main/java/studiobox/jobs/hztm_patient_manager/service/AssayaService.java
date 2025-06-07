package studiobox.jobs.hztm_patient_manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studiobox.jobs.hztm_patient_manager.model.AnalizatorDeviceData;
import studiobox.jobs.hztm_patient_manager.model.AssayaData;
import studiobox.jobs.hztm_patient_manager.repositorys.AnalizatorDeviceDataRepository;
import studiobox.jobs.hztm_patient_manager.repositorys.AssayaDataRepository;

import java.util.List;

@Service
public class AssayaService {
    private final AssayaDataRepository assayaDataRepository;

    @Autowired
    public AssayaService(AssayaDataRepository assayaDataRepository) {
        this.assayaDataRepository = assayaDataRepository;
    }

    public List<AssayaData> findAll() {
        return assayaDataRepository.findAll();
    }

    public AssayaData save(AssayaData data) {
        List<AssayaData> tempList = this.assayaDataRepository.findAll();
        for (AssayaData assayaData : tempList) {
            if(assayaData.getAssayaName().equals(data.getAssayaName())) {
                return null;
            }
        }
        return assayaDataRepository.save(data);
    }

    public AssayaData findById(Long id) {
        return assayaDataRepository.findById(id).get();
    }
}
