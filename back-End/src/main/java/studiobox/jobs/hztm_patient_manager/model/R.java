package studiobox.jobs.hztm_patient_manager.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.io.Serializable;

@Entity
@Table(name="R")
public class R implements Serializable {

    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "RecordType")
    private String RecordType;

    @Column(name = "SequenceNumber")
    private String SequenceNumber;

    // UniversalTestID (9.3)
    @Column(name = "AssayNumber")
    private String AssayNumber;

    @Column(name = "AssayName")
    private String AssayName;

    @Column(name = "Dilution")
    private String Dilution;

    @Column(name = "ResultType")
    private String ResultType;

    // Main fields
    @Column(name = "DataValue")
    private String DataValue;

    @Column(name = "Units")
    private String Units;

    @Column(name = "ReferenceRanges")
    private String ReferenceRanges;

    @Column(name = "ResultAbnormalFlags")
    private String ResultAbnormalFlags;

    @Column(name = "ResultComment")
    private String ResultComment;

    // OperatorInfo (9.11)
    @Column(name = "Operator1")
    private String Operator1;

    @Column(name = "Operator2")
    private String Operator2;

    @Column(name = "DateTimeTestCompleted")
    private String DateTimeTestCompleted;

    @Column(name = "TestCompletionDateTime")
    private String TestCompletionDateTime;

    @Column(name = "InstrumentID")
    private String InstrumentID;

    @Column(name = "IdOcitanja")
    private int IdOcitanja;

    // No-argument constructor
    public R() {
    }

    // Parameterized constructor
    public R(
            int id,
            String RecordType,
            String SequenceNumber,
            String AssayNumber,
            String AssayName,
            String Dilution,
            String ResultType,
            String DataValue,
            String Units,
            String ReferenceRanges,
            String ResultAbnormalFlags,
            String ResultComment,
            String Operator1,
            String Operator2,
            String DateTimeTestCompleted,
            String TestCompletionDateTime,
            String InstrumentID,
            int IdOcitanja
    ) {
        this.id = id;
        this.RecordType = RecordType;
        this.SequenceNumber = SequenceNumber;
        this.AssayNumber = AssayNumber;
        this.AssayName = AssayName;
        this.Dilution = Dilution;
        this.ResultType = ResultType;
        this.DataValue = DataValue;
        this.Units = Units;
        this.ReferenceRanges = ReferenceRanges;
        this.ResultAbnormalFlags = ResultAbnormalFlags;
        this.ResultComment = ResultComment;
        this.Operator1 = Operator1;
        this.Operator2 = Operator2;
        this.DateTimeTestCompleted = DateTimeTestCompleted;
        this.TestCompletionDateTime = TestCompletionDateTime;
        this.InstrumentID = InstrumentID;
        this.IdOcitanja = IdOcitanja;
    }

    // Getters and Setters

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getRecordType() {
        return RecordType;
    }
    public void setRecordType(String RecordType) {
        this.RecordType = RecordType;
    }

    public String getSequenceNumber() {
        return SequenceNumber;
    }
    public void setSequenceNumber(String SequenceNumber) {
        this.SequenceNumber = SequenceNumber;
    }

    public String getAssayNumber() {
        return AssayNumber;
    }
    public void setAssayNumber(String AssayNumber) {
        this.AssayNumber = AssayNumber;
    }

    public String getAssayName() {
        return AssayName;
    }
    public void setAssayName(String AssayName) {
        this.AssayName = AssayName;
    }

    public String getDilution() {
        return Dilution;
    }
    public void setDilution(String Dilution) {
        this.Dilution = Dilution;
    }

    public String getResultType() {
        return ResultType;
    }
    public void setResultType(String ResultType) {
        this.ResultType = ResultType;
    }

    public String getDataValue() {
        return DataValue;
    }
    public void setDataValue(String DataValue) {
        this.DataValue = DataValue;
    }

    public String getUnits() {
        return Units;
    }
    public void setUnits(String Units) {
        this.Units = Units;
    }

    public String getReferenceRanges() {
        return ReferenceRanges;
    }
    public void setReferenceRanges(String ReferenceRanges) {
        this.ReferenceRanges = ReferenceRanges;
    }

    public String getResultAbnormalFlags() {
        return ResultAbnormalFlags;
    }
    public void setResultAbnormalFlags(String ResultAbnormalFlags) {
        this.ResultAbnormalFlags = ResultAbnormalFlags;
    }

    public String getResultComment() {
        return ResultComment;
    }
    public void setResultComment(String ResultComment) {
        this.ResultComment = ResultComment;
    }

    public String getOperator1() {
        return Operator1;
    }
    public void setOperator1(String Operator1) {
        this.Operator1 = Operator1;
    }

    public String getOperator2() {
        return Operator2;
    }
    public void setOperator2(String Operator2) {
        this.Operator2 = Operator2;
    }

    public String getDateTimeTestCompleted() {
        return DateTimeTestCompleted;
    }
    public void setDateTimeTestCompleted(String DateTimeTestCompleted) {
        this.DateTimeTestCompleted = DateTimeTestCompleted;
    }

    public String getTestCompletionDateTime() {
        return TestCompletionDateTime;
    }
    public void setTestCompletionDateTime(String TestCompletionDateTime) {
        this.TestCompletionDateTime = TestCompletionDateTime;
    }

    public String getInstrumentID() {
        return InstrumentID;
    }
    public void setInstrumentID(String InstrumentID) {
        this.InstrumentID = InstrumentID;
    }

    public int getIdOcitanja() {
        return IdOcitanja;
    }
    public void setIdOcitanja(int IdOcitanja) {
        this.IdOcitanja = IdOcitanja;
    }
}
