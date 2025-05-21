package studiobox.jobs.hztm_patient_manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studiobox.jobs.hztm_patient_manager.exception.DataNotFound;
import studiobox.jobs.hztm_patient_manager.model.AnalizatorData;
import studiobox.jobs.hztm_patient_manager.model.InstitutionLabData;
import studiobox.jobs.hztm_patient_manager.model.UserData;
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
        try {
            // Check if user exists (may throw DataNotFound)
            InstitutionLabData insitutionData = findInstitutionByName(institution.getName());
            // If user exists, return null or throw a conflict exception
            return null;
        } catch (DataNotFound ex) {
            // User doesn't exist; proceed to save
            return institutionDataRepository.save(institution);
        }
    }

    public InstitutionLabData findInstitutionByName(String name){
        return institutionDataRepository.findInstitutionByName(name).orElseThrow(()->new DataNotFound("Institution data not found"));
    }

    public List<InstitutionLabData> findAllInstitutions(){
        return institutionDataRepository.findAll();
    }
}
