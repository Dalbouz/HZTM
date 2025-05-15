package studiobox.jobs.hztm_patient_manager.model;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class PatientData implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long Id;

    private String Name;
    private String Surname;
    private String DataOfBirth;
    private int MBO;
    private int OIB;
    private String Priority;
    private String PriorityReason;
    private String SampleNumber;
    private String DateOfSample;
    private String TimeOfSample;
    private String SampleReceipt;
    private String TestRequirements;
    @ManyToOne
    @JoinColumn(name = "analizator_id")
    private AnalizatorData Analizator;

    public PatientData() {}

    public PatientData(Long Id, String Name, String Surname, String DataOfBirth, int MBO, int OIB,
                       String Priority, String PriorityReason, String SampleNumber,
                       String DateOfSample, String TimeOfSample, String SampleReceipt,
                       String TestRequirements, AnalizatorData Analizator) {
        this.Id = Id;
        this.Name = Name;
        this.Surname = Surname;
        this.DataOfBirth = DataOfBirth;
        this.MBO = MBO;
        this.OIB = OIB;
        this.Priority = Priority;
        this.PriorityReason = PriorityReason;
        this.SampleNumber = SampleNumber;
        this.DateOfSample = DateOfSample;
        this.TimeOfSample = TimeOfSample;
        this.SampleReceipt = SampleReceipt;
        this.TestRequirements = TestRequirements;
        this.Analizator = Analizator;
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long Id) {
        this.Id = Id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String Name) {
        this.Name = Name;
    }

    public String getSurname() {
        return Surname;
    }

    public void setSurname(String Surname) {
        this.Surname = Surname;
    }

    public String getDataOfBirth() {
        return DataOfBirth;
    }

    public void setDataOfBirth(String DataOfBirth) {
        this.DataOfBirth = DataOfBirth;
    }

    public int getMBO() {
        return MBO;
    }

    public void setMBO(int MBO) {
        this.MBO = MBO;
    }

    public int getOIB() {
        return OIB;
    }

    public void setOIB(int OIB) {
        this.OIB = OIB;
    }

    public String getPriority() {
        return Priority;
    }

    public void setPriority(String Priority) {
        this.Priority = Priority;
    }

    public String getPriorityReason() {
        return PriorityReason;
    }

    public void setPriorityReason(String PriorityReason) {
        this.PriorityReason = PriorityReason;
    }

    public String getSampleNumber() {
        return SampleNumber;
    }

    public void setSampleNumber(String SampleNumber) {
        this.SampleNumber = SampleNumber;
    }

    public String getDateOfSample() {
        return DateOfSample;
    }

    public void setDateOfSample(String DateOfSample) {
        this.DateOfSample = DateOfSample;
    }

    public String getTimeOfSample() {
        return TimeOfSample;
    }

    public void setTimeOfSample(String TimeOfSample) {
        this.TimeOfSample = TimeOfSample;
    }

    public String getSampleReceipt() {
        return SampleReceipt;
    }

    public void setSampleReceipt(String SampleReceipt) {
        this.SampleReceipt = SampleReceipt;
    }

    public String getTestRequirements() {
        return TestRequirements;
    }

    public void setTestRequirements(String TestRequirements) {
        this.TestRequirements = TestRequirements;
    }

    public AnalizatorData getAnalizator() {
        return Analizator;
    }

    public void setAnalizator(AnalizatorData Analizator) {
        this.Analizator = Analizator;
    }
}
