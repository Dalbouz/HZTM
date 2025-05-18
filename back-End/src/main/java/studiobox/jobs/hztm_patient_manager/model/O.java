package studiobox.jobs.hztm_patient_manager.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.io.Serializable;

@Entity
@Table(name="O")
public class O implements Serializable {
    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "RecordType")
    private String RecordType;

    @Column(name = "SequenceNumber")
    private String SequenceNumber;

    @Column(name = "SpecimenID")
    private String SpecimenID;

    @Column(name = "KodUzorka")
    private String KodUzorka;

    @Column(name = "SerijskiBroj")
    private String SerijskiBroj;

    @Column(name = "TestBroj1")
    private String TestBroj1;

    @Column(name = "TestBroj2")
    private String TestBroj2;

    @Column(name = "TestBroj3")
    private String TestBroj3;

    @Column(name = "TestID")
    private String TestID;

    @Column(name = "NazivTesta")
    private String NazivTesta;

    @Column(name = "Razrjedjenje")
    private String Razrjedjenje;

    @Column(name = "Priority")
    private String Priority;

    @Column(name = "CollectionDateTime")
    private String CollectionDateTime;

    @Column(name = "ActionCode")
    private String ActionCode;

    @Column(name = "Status")
    private String Status;

    @Column(name = "IdOcitanja")
    private int IdOcitanja;
    public O() {
    }

    // Constructor
    public O(
            int id,
            String RecordType,
            String SequenceNumber,
            String SpecimenID,
            String KodUzorka,
            String SerijskiBroj,
            String TestBroj1,
            String TestBroj2,
            String TestBroj3,
            String TestID,
            String NazivTesta,
            String Razrjedjenje,
            String Priority,
            String CollectionDateTime,
            String ActionCode,
            String Status,
            int IdOcitanja
    ) {
        this.id = id;
        this.RecordType = RecordType;
        this.SequenceNumber = SequenceNumber;
        this.SpecimenID = SpecimenID;
        this.KodUzorka = KodUzorka;
        this.SerijskiBroj = SerijskiBroj;
        this.TestBroj1 = TestBroj1;
        this.TestBroj2 = TestBroj2;
        this.TestBroj3 = TestBroj3;
        this.TestID = TestID;
        this.NazivTesta = NazivTesta;
        this.Razrjedjenje = Razrjedjenje;
        this.Priority = Priority;
        this.CollectionDateTime = CollectionDateTime;
        this.ActionCode = ActionCode;
        this.Status = Status;
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

    public String getSpecimenID() {
        return SpecimenID;
    }
    public void setSpecimenID(String SpecimenID) {
        this.SpecimenID = SpecimenID;
    }

    public String getKodUzorka() {
        return KodUzorka;
    }
    public void setKodUzorka(String KodUzorka) {
        this.KodUzorka = KodUzorka;
    }

    public String getSerijskiBroj() {
        return SerijskiBroj;
    }
    public void setSerijskiBroj(String SerijskiBroj) {
        this.SerijskiBroj = SerijskiBroj;
    }

    public String getTestBroj1() {
        return TestBroj1;
    }
    public void setTestBroj1(String TestBroj1) {
        this.TestBroj1 = TestBroj1;
    }

    public String getTestBroj2() {
        return TestBroj2;
    }
    public void setTestBroj2(String TestBroj2) {
        this.TestBroj2 = TestBroj2;
    }

    public String getTestBroj3() {
        return TestBroj3;
    }
    public void setTestBroj3(String TestBroj3) {
        this.TestBroj3 = TestBroj3;
    }

    public String getTestID() {
        return TestID;
    }
    public void setTestID(String TestID) {
        this.TestID = TestID;
    }

    public String getNazivTesta() {
        return NazivTesta;
    }
    public void setNazivTesta(String NazivTesta) {
        this.NazivTesta = NazivTesta;
    }

    public String getRazrjedjenje() {
        return Razrjedjenje;
    }
    public void setRazrjedjenje(String Razrjedjenje) {
        this.Razrjedjenje = Razrjedjenje;
    }

    public String getPriority() {
        return Priority;
    }
    public void setPriority(String Priority) {
        this.Priority = Priority;
    }

    public String getCollectionDateTime() {
        return CollectionDateTime;
    }
    public void setCollectionDateTime(String CollectionDateTime) {
        this.CollectionDateTime = CollectionDateTime;
    }

    public String getActionCode() {
        return ActionCode;
    }
    public void setActionCode(String ActionCode) {
        this.ActionCode = ActionCode;
    }

    public String getStatus() {
        return Status;
    }
    public void setStatus(String Status) {
        this.Status = Status;
    }

    public int getIdOcitanja() {
        return IdOcitanja;
    }
    public void setIdOcitanja(int IdOcitanja) {
        this.IdOcitanja = IdOcitanja;
    }
}
