package studiobox.jobs.hztm_patient_manager.model;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class AssayaData implements Serializable {

    private String assayaName;
    private String analizatorID;
    private Integer minimalValue;
    private Integer maximalValue;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public AssayaData() {}

    public AssayaData(
            String assayaName,
            String AnalizatorID,
            Integer minimalValue,
            Integer maximalValue
    ) {
        this.analizatorID = AnalizatorID;
        this.assayaName = assayaName;
        this.minimalValue = minimalValue;
        this.maximalValue = maximalValue;
    }



    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return this.id;
    }

    public void setAssayaName(String assayaName) {
        this.assayaName = assayaName;
    }

    public String getAssayaName() {
        return this.assayaName;
    }

    public void setMinimalValue(Integer minValue) {
        this.minimalValue = minValue;
    }

    public Integer getMinimalValue() {
        return this.minimalValue;
    }

    public void setMaximalValue(Integer maxValue) {
        this.maximalValue = maxValue;
    }

    public Integer getMaximalValue() {
        return this.maximalValue;
    }

    public void setAnalizatorID(String analizatorID) {
        this.analizatorID = analizatorID;
    }

    public String getAnalizatorID() {
        return this.analizatorID;
    }
}
