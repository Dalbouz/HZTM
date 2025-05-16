package studiobox.jobs.hztm_patient_manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studiobox.jobs.hztm_patient_manager.exception.DataNotFound;
import studiobox.jobs.hztm_patient_manager.model.AnalizatorData;
import studiobox.jobs.hztm_patient_manager.repositorys.AnalizatorDataRepository;

@Service
public class AnalizatorService {
    private final AnalizatorDataRepository analizatorDataRepository;

    @Autowired
    public AnalizatorService(AnalizatorDataRepository analizatorDataRepository) {
        this.analizatorDataRepository = analizatorDataRepository;
    }

    public AnalizatorData saveAnalizationData(AnalizatorData anlizedData){
        return analizatorDataRepository.save(anlizedData);
    }

    public AnalizatorData getAnalizedDataById(Long id){
        return analizatorDataRepository.getAnalizatorDataById(id).orElseThrow(()->new DataNotFound("Analizator data not found"));
    }

    public void deleteAnalizatorData(Long id){
        analizatorDataRepository.deleteAnalizatorDataBy(id);
    }
}
