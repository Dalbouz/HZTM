package studiobox.jobs.hztm_patient_manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studiobox.jobs.hztm_patient_manager.exception.DataNotFound;
import studiobox.jobs.hztm_patient_manager.model.AnalizatorDeviceData;
import studiobox.jobs.hztm_patient_manager.model.AssayaData;
import studiobox.jobs.hztm_patient_manager.repositorys.AnalizatorDeviceDataRepository;
import studiobox.jobs.hztm_patient_manager.repositorys.AssayaDataRepository;

import java.util.List;
import java.util.stream.Collectors;

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

    public List<AssayaData> findAllButDontDuplicate(){
        List<AssayaData> all = assayaDataRepository.findAll();

        List<AssayaData> uniqueByName = all.stream()
                .collect(Collectors.toMap(
                        AssayaData::getAssayaName,   // key: name
                        obj -> obj,          // value: the object itself
                        (existing, replacement) -> existing // keep the first occurrence
                ))
                .values()
                .stream()
                .collect(Collectors.toList());

        return uniqueByName;
    }

    public AssayaData save(AssayaData data) {
       /*List<AssayaData> tempList = this.assayaDataRepository.findAll();
        for (AssayaData assayaData : tempList) {
            if(assayaData.getAnalizatorID().equals(data.getAnalizatorID())) {
                return null;
            }
        }*/
        return assayaDataRepository.save(data);
    }

    public AssayaData findById(Long id) {
        return assayaDataRepository.findById(id).get();
    }

    public AssayaData findByName(String assayaName) {
        List<AssayaData> list = assayaDataRepository.findAll();

        for (AssayaData assayaData : list) {
            if (assayaData.getAssayaName().equals(assayaName)) {
                return assayaData;
            }
        }
        return null;
    }
}
