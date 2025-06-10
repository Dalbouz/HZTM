package studiobox.jobs.hztm_patient_manager.model;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name ="controlSamples")
public class ControlSampleData implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String analizatorName;
    private String controlSampleName;
    @Column(name="AssayName")
    private String assayName;
    private String lot;
    private String expirationDateTest;
    private String lotControlSamples;
    private String expirationDateControlSamples;
    private String sampleNumber;
    private String analizatorResult;
    private String analizatorUnit;
    private String interpretationFromAnalizator;
    private String sampleDate;
    private String acceptableValueLimits;
    private Integer targetValue;
    private String manufacturer;
    private String controlLabel;

    public ControlSampleData(){

    }

    public ControlSampleData(String AnalizatorName, String ControlSampleName, String assayName,
                             String lot, String ExpirationDateTest, String LotControlSamples, String ExpirationDateControlSamples,
                             String SampleNumber, String AnalizatorResult, String AnalizatorUnit, String InterpretationFromAnalizator, String SampleDate,
                             String acceptableValueLimits, Integer targetValue, String manufacturer, String controlLabel

    ) {
        this.analizatorName = AnalizatorName;
        this.controlSampleName = ControlSampleName;
        this.assayName = assayName;
        this.lot = lot;
        this.expirationDateTest = ExpirationDateTest;
        this.lotControlSamples = LotControlSamples;
        this.expirationDateControlSamples = ExpirationDateControlSamples;
        this.sampleNumber = sampleNumber;
        this.analizatorResult = AnalizatorResult;
        this.analizatorUnit = AnalizatorUnit;
        this.interpretationFromAnalizator = InterpretationFromAnalizator;
        this.sampleDate = sampleDate;
        this.acceptableValueLimits = acceptableValueLimits;
        this.targetValue = targetValue;
        this.manufacturer = manufacturer;
        this.controlLabel = controlLabel;
    }

    public String acceptableValueLimits(){
        return acceptableValueLimits;
    }

    public void setAcceptableValueLimits(String acceptableValueLimits){
        this.acceptableValueLimits = acceptableValueLimits;
    }

    public Integer getTargetValue(){
        return targetValue;
    }

    public void setTargetValue(Integer targetValue){
        this.targetValue = targetValue;
    }

    public String getManufacturer(){
        return manufacturer;
    }

    public void setManufacturer(String manufacturer){
        this.manufacturer = manufacturer;
    }

    public String getControlLabel(){
        return controlLabel;
    }

    public void setControlLabel(String controlLabel){
        this.controlLabel = controlLabel;
    }

    public String getSampleDate() {
        return sampleDate;
    }

    public void setSampleDate(String sampleDate) {
        this.sampleDate = sampleDate;
    }

    public String getAnalizatorName() {
        return analizatorName;
    }

    public void setAnalizatorName(String analizatorName) {
        this.analizatorName = analizatorName;
    }

    public String getControlSampleName() {
        return controlSampleName;
    }

    public void setControlSampleName(String controlSampleName) {
        this.controlSampleName = controlSampleName;
    }

    public String getAssayName() {
        return assayName;
    }

    public void setAssayName(String asayName) {
        this.assayName = assayName;
    }

    public String getLot() {
        return lot;
    }

    public void setLot(String lotTest) {
        this.lot = lotTest;
    }

    public String getExpirationDateTest() {
        return expirationDateTest;
    }

    public void setExpirationDateTest(String expirationDataTest) {
        this.expirationDateTest = expirationDataTest;
    }

    public String getLotControlSamples() {
        return lotControlSamples;
    }

    public void setLotControlSamples(String lotControlSamples) {
        this.lotControlSamples = lotControlSamples;
    }

    public String getExpirationDateControlSamples() {
        return expirationDateControlSamples;
    }

    public void setExpirationDateControlSamples(String expirationDataControlSamples) {
        this.expirationDateControlSamples = expirationDataControlSamples;
    }

    public String getSampleNumber() {
        return sampleNumber;
    }

    public void setSampleNumber(String sampleNumber) {
        this.sampleNumber = sampleNumber;
    }

    public String getAnalizatorResult() {
        return analizatorResult;
    }

    public void setAnalizatorResult(String analizatorResult) {
        this.analizatorResult = analizatorResult;
    }

    public String getAnalizatorUnit() {
        return analizatorUnit;
    }

    public void setAnalizatorUnit(String analizatorUnit) {
        this.analizatorUnit = analizatorUnit;
    }

    public String getInterpretationFromAnalizator() {
        return interpretationFromAnalizator;
    }

    public void setInterpretationFromAnalizator(String interpretationFromAnalizator) {
        this.interpretationFromAnalizator = interpretationFromAnalizator;
    }

}
