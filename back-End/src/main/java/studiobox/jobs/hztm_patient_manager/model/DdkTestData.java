package studiobox.jobs.hztm_patient_manager.model;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name="ddkTests")
public class DdkTestData implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String dose;
    private Integer sample;
    private String test;
    private String method;
    private String readingValue;
    private String dateOfReading;
    private String code;
    private Long patientId;

    public DdkTestData (){}

    public DdkTestData(String dose, Integer sample, String test, String method, String readingValue, String code, Long patientId) {
        this.dose = dose;
        this.sample = sample;
        this.test = test;
        this.method = method;
        this.readingValue = readingValue;
        this.code = code;
        this.patientId = patientId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDose() {
        return dose;
    }

    public void setDose(String dose) {
        this.dose = dose;
    }

    public Integer getSample() {
        return sample;
    }

    public void setSample(Integer sample) {
        this.sample = sample;
    }

    public String getTest() {
        return test;
    }

    public void setTest(String test) {
        this.test = test;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getReadingValue() {
        return readingValue;
    }

    public void setReadingValue(String readingValue) {
        this.readingValue = readingValue;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;

    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }
}

