package studiobox.jobs.hztm_patient_manager.model;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "positivespecimen")
public class PositiveSpecimenData implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="SpecimenID")
    private String specimenID;
    private String dateOfFirstPositiveTest;
    private String dataValue;

    public PositiveSpecimenData(String specimenID, String dateOfFirstPositiveTest, String dataValue) {
        this.specimenID = specimenID;
        this.dateOfFirstPositiveTest = dateOfFirstPositiveTest;
        this.dataValue = dataValue;

    }

    public PositiveSpecimenData() {}

    public Long getId(){
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSpecimenID() {
        return specimenID;
    }

    public void setSpecimenID(String specimenID) {
        this.specimenID = specimenID;
    }

    public String  getDateOfFirstPositiveTest() {
        return dateOfFirstPositiveTest;
    }

    public  void setDateOfFirstPositiveTest(String dateOfFirstPositiveTest) {
        this.dateOfFirstPositiveTest = dateOfFirstPositiveTest;
    }

    public String getDataValue() {
        return dataValue;
    }
    public void setDataValue(String dataValue) {
        this.dataValue = dataValue;
    }
}
