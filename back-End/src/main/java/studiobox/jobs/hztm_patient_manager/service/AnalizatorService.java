package studiobox.jobs.hztm_patient_manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studiobox.jobs.hztm_patient_manager.SearchEngine;
import studiobox.jobs.hztm_patient_manager.exception.DataNotFound;
import studiobox.jobs.hztm_patient_manager.model.AnalizatorData;
import studiobox.jobs.hztm_patient_manager.model.FilterDTO;
import studiobox.jobs.hztm_patient_manager.model.PatientData;
import studiobox.jobs.hztm_patient_manager.repositorys.AnalizatorDataRepository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AnalizatorService {
    private final AnalizatorDataRepository analizatorDataRepository;
    private final PatientService patientService;
    public final SearchEngine searchEngine;

    @Autowired
    public AnalizatorService(AnalizatorDataRepository analizatorDataRepository, PatientService patientService, SearchEngine searchEngine) {
        this.analizatorDataRepository = analizatorDataRepository;
        this.patientService = patientService;
        this.searchEngine = searchEngine;
    }

    public List<AnalizatorData> findAllAnalizators(){
        return analizatorDataRepository.findAll();
    }

    public AnalizatorData saveAnalizatorData(AnalizatorData analizatorData){
        return analizatorDataRepository.save(analizatorData);
    }

    public AnalizatorData findAnalizatorDataById(Long id){
        return analizatorDataRepository.findById(id).orElseThrow(()->new DataNotFound("Analizator data not found"));
    }

    public void deleteAnalizatorDataById(Long id){
        analizatorDataRepository.deleteById(id);
    }

    public AnalizatorData findByAnalizatorOib(Long analizatorOib){
        return analizatorDataRepository.findByAnalizatorOib(analizatorOib).orElseThrow(()->new DataNotFound("Analizator data not found"));
    }

    public AnalizatorData linkAnalizatorToPatient(Long analizatorId, Long patientId){
        AnalizatorData analizator = analizatorDataRepository.findById(analizatorId).orElseThrow(()->new DataNotFound("Analizator data not found"));
        PatientData patientData = patientService.findPatientById(patientId);
        analizator.setPatient(patientData);
        return analizatorDataRepository.save(analizator);
    }

    public void unlinkAnalizatorFromParent(Long analizatorId){
        AnalizatorData analizator = analizatorDataRepository.findById(analizatorId).orElseThrow(() -> new DataNotFound("Analizator not found"));;
        analizator.setPatient(null);
        analizatorDataRepository.save(analizator);
    }

    public List<AnalizatorData> findAnalizatorsByPatientId(Long patientId){
        return analizatorDataRepository.findByPatientId(patientId);
    }

    public List<AnalizatorData> findAnalizatorsBySpecimenID(String specimenID){
        return analizatorDataRepository.findBySpecimenID(specimenID);
    }

    public List<AnalizatorData> findAllArchivedWithinDateRange(String startStr, String endStr) {
        // Validate input dates
        if (startStr == null || endStr == null || startStr.isEmpty() || endStr.isEmpty()) {
            throw new IllegalArgumentException("Start and end dates must be provided");
        }

        try {
            // 2. Use modern DateTime API
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");//"dd.MM.yyyy"
            LocalDate startDate = LocalDate.parse(startStr, formatter);
            LocalDate endDate = LocalDate.parse(endStr, formatter);

            // 3. Use stream API for cleaner code
            return analizatorDataRepository.findAll().stream()
                    .filter(a -> "ARCHIVED".equals(a.getTestStatus()))
                    .filter(a -> isValidDateWithinRange(a.getDateOfReading(), startDate, endDate, formatter))
                    .collect(Collectors.toList());

        } catch (DataNotFound e) {
            throw new IllegalArgumentException("Invalid date format. Use yyyy-MM-dd", e);
        }
    }

    private boolean isValidDateWithinRange(String dateStr, LocalDate start, LocalDate end, DateTimeFormatter formatter) {
        if (dateStr == null || dateStr.isEmpty()) return false;

        try {
            LocalDate date = LocalDate.parse(dateStr, formatter);
            return !date.isBefore(start) && !date.isAfter(end);
        } catch (DataNotFound e) {
            return false;
        }
    }

    public List<AnalizatorData> getArchivedAnalizators(){
        return analizatorDataRepository.findAll().stream()
                .filter(a -> "ARCHIVED".equals(a.getTestStatus()))
                .collect(Collectors.toList());
    }

    public List<AnalizatorData> getFilteredAnalizators(List<FilterDTO> filters) {
        Map<String, String> searchCriteria = searchEngine.convertFilters(filters);
        return SearchEngine.searchByFilters(analizatorDataRepository.findAll(), searchCriteria);
    }
}
