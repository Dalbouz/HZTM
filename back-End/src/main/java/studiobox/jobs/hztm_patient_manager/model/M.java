package studiobox.jobs.hztm_patient_manager.model;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name="M")
public class M implements Serializable {
    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "SequenceNumber")
    private String SequenceNumber;

    @Column(name = "RecordType")
    private String RecordType;

    @Column(name = "RecordTypeSubID")
    private String RecordTypeSubID;

    @Column(name = "SubstanceIdentifier")
    private String SubstanceIdentifier;

    @Column(name = "SubstanceType")
    private String SubstanceType;

    @Column(name = "InventoryContainerIdentifier")
    private String InventoryContainerIdentifier;

    @Column(name = "ExpirationDateTime")
    private String ExpirationDateTime;

    @Column(name = "CalibrationDateTime")
    private String CalibrationDateTime;

    @Column(name = "LotNumber")
    private String LotNumber;

    @Column(name = "IdOcitanja")
    private int IdOcitanja;

    public M() {
    }

    public M(int Id, String SequenceNumber, String RecordType, String RecordTypeSubID, String SubstanceIdentifier, String SubstanceType,
             String InventoryContainerIdentifie, String ExpirationDateTime, String CalibrationDateTime, String LotNumber, int IdOcitanja) {
        this.SequenceNumber = SequenceNumber;
        this.RecordType = RecordType;
        this.RecordTypeSubID = RecordTypeSubID;
        this.SubstanceIdentifier = SubstanceIdentifier;
        this.SubstanceType = SubstanceType;
        this.InventoryContainerIdentifier = InventoryContainerIdentifier;
        this.ExpirationDateTime = ExpirationDateTime;
        this.CalibrationDateTime = CalibrationDateTime;
        this.LotNumber = LotNumber;
        this.IdOcitanja = IdOcitanja;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getSequenceNumber() {
        return SequenceNumber;
    }
    public void setSequenceNumber(String SequenceNumber) {
        this.SequenceNumber = SequenceNumber;
    }
    public String getRecordType() {
        return RecordType;
    }
    public void setRecordType(String RecordType) {
        this.RecordType = RecordType;
    }
    public String getRecordTypeSubID() {
        return RecordTypeSubID;
    }
    public void setRecordTypeSubID(String RecordTypeSubID) {
        this.RecordTypeSubID = RecordTypeSubID;
    }
    public String getSubstanceIdentifier() {
        return SubstanceIdentifier;

    }
    public void setSubstanceIdentifier(String SubstanceIdentifier) {
        this.SubstanceIdentifier = SubstanceIdentifier;
    }
    public String getSubstanceType() {
        return SubstanceType;
    }
    public void setSubstanceType(String SubstanceType) {
        this.SubstanceType = SubstanceType;
    }
    public String getInventoryContainerIdentifier() {
        return InventoryContainerIdentifier;

    }
    public void setInventoryContainerIdentifier(String InventoryContainerIdentifier) {
        this.InventoryContainerIdentifier = InventoryContainerIdentifier;

    }
    public String getExpirationDateTime() {
        return ExpirationDateTime;
    }
    public void setExpirationDateTime(String ExpirationDataTime) {
        this.ExpirationDateTime = ExpirationDataTime;
    }
    public String getCalibrationDateTime() {
        return CalibrationDateTime;
    }
    public void setCalibrationDateTime(String CalibrationDateTime) {
        this.CalibrationDateTime = CalibrationDateTime;
    }
    public String getLotNumber() {
        return LotNumber;
    }
    public void setLotNumber(String LotNumber) {
        this.LotNumber = LotNumber;
    }
    public int getIdOcitanja() {
        return IdOcitanja;
    }
    public void setIdOcitanja(int IdOcitanja) {
        this.IdOcitanja = IdOcitanja;
    }


}