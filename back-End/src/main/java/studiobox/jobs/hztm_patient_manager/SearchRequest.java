package studiobox.jobs.hztm_patient_manager;

import org.springframework.stereotype.Component;
import studiobox.jobs.hztm_patient_manager.model.AnalizatorData;
import studiobox.jobs.hztm_patient_manager.model.FilterDTO;

import java.util.List;

@Component
public class SearchRequest {
    private List<FilterDTO> filters;
    private List<AnalizatorData> analizators;

    // Getters and setters
    public List<FilterDTO> getFilters() { return filters; }
    public void setFilters(List<FilterDTO> filters) { this.filters = filters; }

    public List<AnalizatorData> getAnalizators() { return analizators; }
    public void setAnalizators(List<AnalizatorData> analizators) { this.analizators = analizators; }

}
