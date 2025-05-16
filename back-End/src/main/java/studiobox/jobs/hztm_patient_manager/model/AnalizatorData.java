package studiobox.jobs.hztm_patient_manager.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.io.Serializable;

@Entity
public class AnalizatorData implements Serializable {
    private int SampleNumber;
    private String AnalizatorName;
    private int AnalizatorOib;
    private String TestMark;
    private String Lot;
    private String ExirationDateReagens;
    private String InterpretedResult;
    private int NumericValueFromAnalizator;
    private String DateOfReading;
    private String TimeOfReading;
    private String InterpretationForEDelphyn;
    private String TestMarkForEdelphyn;
    private String Notes;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public AnalizatorData() {}

    public AnalizatorData(
            int SampleNumber,
            String AnalizatorName,
            String TestMark,
            String Lot,
            String ExirationDateReagens,
            String InterpretedResult,
            int NumericValueFromAnalizator,
            String DateOfReading,
            String TimeOfReading,
            String InterpretationForEDelphyn,
            String TestMarkForEdelphyn,
            String Notes,
            int AnalizatorOib
    ) {
        this.SampleNumber = SampleNumber;
        this.AnalizatorName = AnalizatorName;
        this.TestMark = TestMark;
        this.Lot = Lot;
        this.ExirationDateReagens = ExirationDateReagens;
        this.InterpretedResult = InterpretedResult;
        this.NumericValueFromAnalizator = NumericValueFromAnalizator;
        this.DateOfReading = DateOfReading;
        this.TimeOfReading = TimeOfReading;
        this.InterpretationForEDelphyn = InterpretationForEDelphyn;
        this.TestMarkForEdelphyn = TestMarkForEdelphyn;
        this.Notes = Notes;
        this.AnalizatorOib = AnalizatorOib;
    }

    public int getAnalizatorOib() {
        return AnalizatorOib;
    }

    public void setAnalizatorOib(int AnalizatorOib) {
        this.AnalizatorOib = AnalizatorOib;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public int getSampleNumber() {
        return SampleNumber;
    }

    public void setSampleNumber(int sampleNumber) {
        this.SampleNumber = sampleNumber;
    }

    public String getAnalizatorName() {
        return AnalizatorName;
    }

    public void setAnalizatorName(String analizatorName) {
        this.AnalizatorName = analizatorName;
    }

    public String getTestMark() {
        return TestMark;
    }

    public void setTestMark(String testMark) {
        this.TestMark = testMark;
    }

    public String getLot() {
        return Lot;
    }

    public void setLot(String lot) {
        this.Lot = lot;
    }

    public String getExirationDateReagens() {
        return ExirationDateReagens;
    }

    public void setExirationDateReagens(String exirationDateReagens) {
        this.ExirationDateReagens = exirationDateReagens;
    }

    public String getInterpretedResult() {
        return InterpretedResult;
    }

    public void setInterpretedResult(String interpretedResult) {
        this.InterpretedResult = interpretedResult;
    }

    public int getNumericValueFromAnalizator() {
        return NumericValueFromAnalizator;
    }

    public void setNumericValueFromAnalizator(int numericValueFromAnalizator) {
        this.NumericValueFromAnalizator = numericValueFromAnalizator;
    }

    public String getDateOfReading() {
        return DateOfReading;
    }

    public void setDateOfReading(String dateOfReading) {
        this.DateOfReading = dateOfReading;
    }

    public String getTimeOfReading() {
        return TimeOfReading;
    }

    public void setTimeOfReading(String timeOfReading) {
        this.TimeOfReading = timeOfReading;
    }

    public String getInterpretationForEDelphyn() {
        return InterpretationForEDelphyn;
    }

    public void setInterpretationForEDelphyn(String interpretationForEDelphyn) {
        this.InterpretationForEDelphyn = interpretationForEDelphyn;
    }

    public String getTestMarkForEdelphyn() {
        return TestMarkForEdelphyn;
    }

    public void setTestMarkForEdelphyn(String testMarkForEdelphyn) {
        this.TestMarkForEdelphyn = testMarkForEdelphyn;
    }

    public String getNotes() {
        return Notes;
    }

    public void setNotes(String notes) {
        this.Notes = notes;
    }
}
