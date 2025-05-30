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
    private String testResult;
    private String dateOfReading;
    private String code = generateCode();
    private Long patientId;

    public DdkTestData (){}

    public DdkTestData(String dose, Integer sample, String test, String method, String readingValue,
                        Long patientId,String dateofReading, String testResult) {
        this.dose = dose;
        this.sample = sample;
        this.test = test;
        this.method = method;
        this.readingValue = readingValue;
        this.patientId = patientId;
        this.dateOfReading = dateofReading;
        this.testResult = testResult;
    }

    public String getTestResult() {
        return testResult;
    }

    public void setTestResult(String testResult) {
        this.testResult = testResult;
    }

    public String getDateOfReading() {
        return dateOfReading;
    }

    public void setDateOfReading(String dateOfReading) {
        this.dateOfReading = dateOfReading;
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

    private String generateCode() {
        // Random number between 0 and 99 (2 digits)
        int number = (int) (Math.random() * 100);
        // Random lowercase letter
        char letter = (char) ('a' + (int)(Math.random() * 26));
        return number + String.valueOf(letter);
    }
}

