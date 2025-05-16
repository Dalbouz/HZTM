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

    public AnalizatorData saveAnalizatorData(AnalizatorData analizatorData){
        return analizatorDataRepository.save(analizatorData);
    }

    public AnalizatorData findAnalizatorDataById(Long id){
        return analizatorDataRepository.findAnalizatorDataById(id).orElseThrow(()->new DataNotFound("Analizator data not found"));
    }

    public void deleteAnalizatorDataById(Long id){
        analizatorDataRepository.deleteById(id);
    }

    public AnalizatorData findByAnalizatorOib(int analizatorOib){
        return analizatorDataRepository.findByAnalizatorOib(analizatorOib).orElseThrow(()->new DataNotFound("Analizator data not found"));
    }
}
