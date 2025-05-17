/*
package studiobox.jobs.hztm_patient_manager.model;


import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class PatientAnalizatorIdData implements Serializable {
    private Long patientId;
    private Long analizatorId;

    public PatientAnalizatorIdData() {
    }

    public PatientAnalizatorIdData(Long patientId, Long analizatorId) {
        this.patientId = patientId;
        this.analizatorId = analizatorId;
    }

    public Long getPatientId() {
        return patientId;
    }
    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public Long getAnalizatorId() {
        return analizatorId;
    }

    public void setAnalizatorId(Long analizatorId) {
        this.analizatorId = analizatorId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PatientAnalizatorIdData that = (PatientAnalizatorIdData) o;
        return Objects.equals(patientId, that.patientId) &&
                Objects.equals(analizatorId, that.analizatorId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(patientId, analizatorId);
    }
}
*/
