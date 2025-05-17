/*
package studiobox.jobs.hztm_patient_manager.model;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "patient_analizator")
public class PatientAnalizatorLinkData implements Serializable {

    @EmbeddedId
    private PatientAnalizatorIdData id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("patientId")
    private PatientData patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("analizatorId")
    private AnalizatorData analizator;

    public PatientAnalizatorLinkData() {
        // No-arg constructor required by JPA
    }

    public PatientAnalizatorLinkData(PatientAnalizatorIdData id, PatientData patient, AnalizatorData analizator) {
        this.id = id;
        this.patient = patient;
        this.analizator = analizator;
    }

    public AnalizatorData getAnalizator() {
        return analizator;
    }

    public void setAnalizator(AnalizatorData analizator) {
        this.analizator = analizator;
    }

    public PatientData getPatient() {
        return patient;
    }

    public void setPatient(PatientData patient) {
        this.patient = patient;
    }

    public PatientAnalizatorIdData getId() {
        return id;
    }

    public void setId(PatientAnalizatorIdData id) {
        this.id = id;
    }
}
*/