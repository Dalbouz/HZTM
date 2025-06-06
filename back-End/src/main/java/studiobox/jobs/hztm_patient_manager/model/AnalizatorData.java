package studiobox.jobs.hztm_patient_manager.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "analizators")
public class AnalizatorData implements Serializable {
    private String sampleNumber;
    private String analizatorName;
    private Long analizatorOib;
    private String testMark;
    private String lot;
    private String expirationDateReagens;
    private String interpretedResult;
    private String numericValueFromAnalizator;
    private String dateOfReading;
    private String timeOfReading;
    private String interpretationForEDelphyn;
    private String testMarkForEdelphyn;
    private String notes;
    private String validated;
    private String testStatus;
    @Column(name="SpecimenID")
    private String specimenID;
    @Column(name="AssayName")
    private String assayName;
    private String TestWasValidatedBy;
    private String units;
    private String finalResult;
    private String dataValue;
    private String minDataValue;
    private String maxDataValue;
    private Number numberOfTestsDone;
    private Number numberOfPositiveTests;
    private Number numberOfNegativeTests;
    @Column(name="RLU")
    private String RLU;
    private String idOcitanjaAnalizatora;
    private String dateOfValidation;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    @JsonBackReference
    private PatientData patient;

    public AnalizatorData() {}

    public AnalizatorData(
            String SampleNumber,
            String AnalizatorName,
            String TestMark,
            String Lot,
            String expirationDateReagens,
            String InterpretedResult,
            String NumericValueFromAnalizator,
            String DateOfReading,
            String TimeOfReading,
            String InterpretationForEDelphyn,
            String TestMarkForEdelphyn,
            String Notes,
            Long AnalizatorOib,
            PatientData patient,
            String validated,
            String testStatus,
            String specimenID,
            String assayName,
            String TestWasValidatedBy,
            String units,
            String finalResult,
            String DataValue,
            String MaxDataValue,
            String MinDataValue,
            Number numberOfTestsDone,
            Number numberOfNegativeTests,
            Number numberOfPositiveTests,
            String RLU,
            String idOcitanjaAnalizatora,
            String dateOfValidation
    ) {
        this.sampleNumber = SampleNumber;
        this.analizatorName = AnalizatorName;
        this.testMark = TestMark;
        this.lot = Lot;
        this.expirationDateReagens = expirationDateReagens;
        this.interpretedResult = InterpretedResult;
        this.numericValueFromAnalizator = NumericValueFromAnalizator;
        this.dateOfReading = DateOfReading;
        this.timeOfReading = TimeOfReading;
        this.interpretationForEDelphyn = InterpretationForEDelphyn;
        this.testMarkForEdelphyn = TestMarkForEdelphyn;
        this.notes = Notes;
        this.analizatorOib = AnalizatorOib;
        this.patient = patient;
        this.validated = validated;
        this.testStatus = testStatus;
        this.specimenID = specimenID;
        this.assayName = assayName;
        this.TestWasValidatedBy = TestWasValidatedBy;
        this. units = units;
        this.finalResult = finalResult;
        this.dataValue = DataValue;
        this.maxDataValue = MaxDataValue;
        this.minDataValue = MinDataValue;
        this.numberOfTestsDone = numberOfTestsDone;
        this.numberOfPositiveTests = numberOfPositiveTests;
        this.numberOfNegativeTests = numberOfNegativeTests;
        this.RLU = RLU;
        this.idOcitanjaAnalizatora = idOcitanjaAnalizatora;
        this.dateOfValidation = dateOfValidation;
    }

    public String getDateOfValidation() {
        return dateOfValidation;
    }

    public void setDateOfValidation(String dateOfValidation) {
        this.dateOfValidation = dateOfValidation;
    }

    public String getRLU(){
        return this.RLU;
    }

    public void setRLU(String RLU){
        this.RLU = RLU;
    }

    public String getIdOcitanjaAnalizatora(){
        return this.idOcitanjaAnalizatora;
    }

    public void setIdOcitanjaAnalizatora(String idOcitanjaAnalizatora){
        this.idOcitanjaAnalizatora = idOcitanjaAnalizatora;
    }

    public Number getNumberOfTestsDone() {
        return numberOfTestsDone;
    }

    public void setNumberOfTestsDone(Number numberOfTestsDone) {
        this.numberOfTestsDone = numberOfTestsDone;
    }

    public Number getNumberOfPositiveTests() {
        return numberOfPositiveTests;
    }

    public void setNumberOfPositiveTests(Number numberOfPositiveTests) {
        this.numberOfPositiveTests = numberOfPositiveTests;
    }

    public Number getNumberOfNegativeTests() {
        return numberOfNegativeTests;
    }

    public void setNumberOfNegativeTests(Number numberOfNegativeTests) {
        this.numberOfNegativeTests = numberOfNegativeTests;
    }

    public String getMaxDataValue() {
        return maxDataValue;
    }

    public void setMaxDataValue(String maxDataValue) {
        this.maxDataValue = maxDataValue;
    }

    public String getMinDataValue(){
        return minDataValue;
    }

    public void setMinDataValue(String minDataValue){
        this.minDataValue = minDataValue;
    }

    public String getDataValue() {
        return dataValue;
    }

    public void setDataValue(String dataValue) {
        this.dataValue = dataValue;
    }

    public String getFinalResult() {
        return finalResult;
    }

    public void setFinalResult(String finalResult) {
        this.finalResult = finalResult;
    }

    public String getUnits() {
        return units;
    }

    public void setUnits(String units) {
        this.units = units;
    }

    public String getTestWasValidatedBy() {
        return TestWasValidatedBy;
    }

    public void setTestWasValidatedBy(String testWasValidatedBy) {
        TestWasValidatedBy = testWasValidatedBy;
    }

    public String getAssayName() {
        return assayName;
    }

    public void setAssayName(String assayName) {
        this.assayName = assayName;
    }

    public String getSpecimenID() {
        return specimenID;
    }

    public void setSpecimenID(String specimenID) {
        this.specimenID = specimenID;
    }

    public String getTestStatus() {
        return testStatus;
    }
    public void setTestStatus(String testStatus) {
        this.testStatus = testStatus;
    }

    public String getValidated() {
        return validated;
    }
    public void setValidated(String validated) {
        this.validated = validated;
    }

    public PatientData getPatient() {
        return patient;
    }

    public void setPatient(PatientData patient) {
        this.patient = patient;
    }

    public Long getAnalizatorOib() {
        return analizatorOib;
    }

    public void setAnalizatorOib(Long AnalizatorOib) {
        this.analizatorOib = AnalizatorOib;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getSampleNumber() {
        return sampleNumber;
    }

    public void setSampleNumber(String sampleNumber) {
        this.sampleNumber = sampleNumber;
    }

    public String getAnalizatorName() {
        return analizatorName;
    }

    public void setAnalizatorName(String analizatorName) {
        this.analizatorName = analizatorName;
    }

    public String getTestMark() {
        return testMark;
    }

    public void setTestMark(String testMark) {
        this.testMark = testMark;
    }

    public String getLot() {
        return lot;
    }

    public void setLot(String lot) {
        this.lot = lot;
    }

    public String getExpirationDateReagens() {
        return expirationDateReagens;
    }

    public void setExpirationDateReagens(String expirationDateReagens) {
        this.expirationDateReagens = expirationDateReagens;
    }

    public String getInterpretedResult() {
        return interpretedResult;
    }

    public void setInterpretedResult(String interpretedResult) {
        this.interpretedResult = interpretedResult;
    }

    public String getNumericValueFromAnalizator() {
        return numericValueFromAnalizator;
    }

    public void setNumericValueFromAnalizator(String numericValueFromAnalizator) {
        this.numericValueFromAnalizator = numericValueFromAnalizator;
    }

    public String getDateOfReading() {
        return dateOfReading;
    }

    public void setDateOfReading(String dateOfReading) {
        this.dateOfReading = dateOfReading;
    }

    public String getTimeOfReading() {
        return timeOfReading;
    }

    public void setTimeOfReading(String timeOfReading) {
        this.timeOfReading = timeOfReading;
    }

    public String getInterpretationForEDelphyn() {
        return interpretationForEDelphyn;
    }

    public void setInterpretationForEDelphyn(String interpretationForEDelphyn) {
        this.interpretationForEDelphyn = interpretationForEDelphyn;
    }

    public String getTestMarkForEdelphyn() {
        return testMarkForEdelphyn;
    }

    public void setTestMarkForEdelphyn(String testMarkForEdelphyn) {
        this.testMarkForEdelphyn = testMarkForEdelphyn;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
