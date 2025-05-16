package studiobox.jobs.hztm_patient_manager.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.io.Serializable;

@Entity
public class AnalizatorData implements Serializable {
    private int sampleNumber;
    private String analizatorName;
    private int analizatorOib;
    private String testMark;
    private String lot;
    private String expirationDateReagens;
    private String interpretedResult;
    private int numericValueFromAnalizator;
    private String dateOfReading;
    private String timeOfReading;
    private String interpretationForEDelphyn;
    private String testMarkForEdelphyn;
    private String notes;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public AnalizatorData() {}

    public AnalizatorData(
            int SampleNumber,
            String AnalizatorName,
            String TestMark,
            String Lot,
            String expirationDateReagens,
            String InterpretedResult,
            int NumericValueFromAnalizator,
            String DateOfReading,
            String TimeOfReading,
            String InterpretationForEDelphyn,
            String TestMarkForEdelphyn,
            String Notes,
            int AnalizatorOib
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
    }

    public int getAnalizatorOib() {
        return analizatorOib;
    }

    public void setAnalizatorOib(int AnalizatorOib) {
        this.analizatorOib = AnalizatorOib;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public int getSampleNumber() {
        return sampleNumber;
    }

    public void setSampleNumber(int sampleNumber) {
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

    public int getNumericValueFromAnalizator() {
        return numericValueFromAnalizator;
    }

    public void setNumericValueFromAnalizator(int numericValueFromAnalizator) {
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
