package studiobox.jobs.hztm_patient_manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studiobox.jobs.hztm_patient_manager.exception.DataNotFound;
import studiobox.jobs.hztm_patient_manager.model.InstitutionLabData;
import studiobox.jobs.hztm_patient_manager.repositorys.InstitutionDataRepository;

import java.util.List;

@Service
public class InstitutionService {
    private final InstitutionDataRepository institutionDataRepository;

    @Autowired
    public InstitutionService(InstitutionDataRepository institutionDataRepository) {
        this.institutionDataRepository = institutionDataRepository;
    }

    public InstitutionLabData addInstitution(InstitutionLabData institution){
        return institutionDataRepository.save(institution);
    }

    public InstitutionLabData getInstitutionByName(String name){
        return institutionDataRepository.getInstitutionLabDataByName(name).orElseThrow(()->new DataNotFound("Institution data not found"));
    }
}
