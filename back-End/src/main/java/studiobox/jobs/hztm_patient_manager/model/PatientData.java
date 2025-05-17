package studiobox.jobs.hztm_patient_manager.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "patients")
public class PatientData implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    private String name;
    private String surname;
    private String dateOfBirth;
    private int mbo;
    private Long oib;
    private String priority;
    private String priorityReason;
    private String sampleNumber;
    private String dateOfSample;
    private String timeOfSample;
    private String sampleReceipt;
    private String testRequirements;

    @OneToMany(mappedBy ="patient", cascade=CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<AnalizatorData> analizatorDataList = new ArrayList<>();

    public PatientData() {}

    public PatientData(Long Id, String Name, String Surname, String dateOfBirth, int mbo, Long oib,
                       String Priority, String PriorityReason, String SampleNumber,
                       String DateOfSample, String TimeOfSample, String SampleReceipt,
                       String TestRequirements, List<AnalizatorData> analizatorDataList) {
        this.id = Id;
        this.name = Name;
        this.surname = Surname;
        this.dateOfBirth = dateOfBirth;
        this.mbo = mbo;
        this.oib = oib;
        this.priority = Priority;
        this.priorityReason = PriorityReason;
        this.sampleNumber = SampleNumber;
        this.dateOfSample = DateOfSample;
        this.timeOfSample = TimeOfSample;
        this.sampleReceipt = SampleReceipt;
        this.testRequirements = TestRequirements;
        this.analizatorDataList = analizatorDataList;
    }

    public List<AnalizatorData> getAnalizatorDataList() {
        return analizatorDataList;
    }

    public void setAnalizatorDataList(List<AnalizatorData> analizatorLinks) {
        this.analizatorDataList = analizatorLinks;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long Id) {
        this.id = Id;
    }

    public String getName() {
        return name;
    }

    public void setName(String Name) {
        this.name = Name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String Surname) {
        this.surname = Surname;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String DataOfBirth) {
        this.dateOfBirth = DataOfBirth;
    }

    public int getMbo() {
        return mbo;
    }

    public void setMbo(int MBO) {
        this.mbo = MBO;
    }

    public Long getOib() {
        return oib;
    }

    public void setOib(Long OIB) {
        this.oib = OIB;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String Priority) {
        this.priority = Priority;
    }

    public String getPriorityReason() {
        return priorityReason;
    }

    public void setPriorityReason(String PriorityReason) {
        this.priorityReason = PriorityReason;
    }

    public String getSampleNumber() {
        return sampleNumber;
    }

    public void setSampleNumber(String SampleNumber) {
        this.sampleNumber = SampleNumber;
    }

    public String getDateOfSample() {
        return dateOfSample;
    }

    public void setDateOfSample(String DateOfSample) {
        this.dateOfSample = DateOfSample;
    }

    public String getTimeOfSample() {
        return timeOfSample;
    }

    public void setTimeOfSample(String TimeOfSample) {
        this.timeOfSample = TimeOfSample;
    }

    public String getSampleReceipt() {
        return sampleReceipt;
    }

    public void setSampleReceipt(String SampleReceipt) {
        this.sampleReceipt = SampleReceipt;
    }

    public String getTestRequirements() {
        return testRequirements;
    }

    public void setTestRequirements(String TestRequirements) {
        this.testRequirements = TestRequirements;
    }
}
