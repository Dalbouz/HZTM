package studiobox.jobs.hztm_patient_manager.service;

import org.hibernate.query.NativeQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studiobox.jobs.hztm_patient_manager.model.AnalizatorData;
import studiobox.jobs.hztm_patient_manager.model.AnalizatorDeviceData;
import studiobox.jobs.hztm_patient_manager.model.AssayaData;
import studiobox.jobs.hztm_patient_manager.model.DdkTestData;
import studiobox.jobs.hztm_patient_manager.repositorys.AnalizatorDeviceDataRepository;
import studiobox.jobs.hztm_patient_manager.repositorys.AssayaDataRepository;
import studiobox.jobs.hztm_patient_manager.repositorys.DdkTestDataRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AnalizatorDeviceService {
    private final AnalizatorDeviceDataRepository analizatorDeviceDataRepository;
    private final AssayaDataRepository assayaDataRepository;

    @Autowired
    public AnalizatorDeviceService(AnalizatorDeviceDataRepository analizatorDeviceDataRepository, AssayaDataRepository assayaDataRepository) {
        this.analizatorDeviceDataRepository = analizatorDeviceDataRepository;
        this.assayaDataRepository = assayaDataRepository;
    }

    public List<AnalizatorDeviceData> findAll() {
        return analizatorDeviceDataRepository.findAll();
    }

    public AnalizatorDeviceData save(AnalizatorDeviceData data) {
        List<AnalizatorDeviceData> tempList = analizatorDeviceDataRepository.findAll();
        for (AnalizatorDeviceData data1 : tempList) {
            data1.getAnalizatorName().equals(data.getAnalizatorName());
            return null;
        }
        return analizatorDeviceDataRepository.save(data);
    }

    public AnalizatorDeviceData findById(Long id) {
        return analizatorDeviceDataRepository.findById(id).get();
    }

    public List<AssayaData> getAllAssayaDataForDevice(AnalizatorDeviceData data) {
        List<AssayaData> assayaList = this.assayaDataRepository.findAll();
        List<AssayaData> filteredList = assayaList.stream()
                .filter(a -> data.getId().equals(a.getAnalizatorID()))
                .collect(Collectors.toList());
        return filteredList;
    }
}
