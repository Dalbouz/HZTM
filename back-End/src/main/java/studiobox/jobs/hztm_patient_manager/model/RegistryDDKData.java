package studiobox.jobs.hztm_patient_manager.model;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "ddkRegistry")
public class RegistryDDKData implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ddkNumber;
    private String name;
    private String surname;
    private String dateOfBirth;
    private String centerThatGetsTheBlood;

    private List<DdkTestData>  ddkTestDataList;

    public RegistryDDKData() {}

    public RegistryDDKData (String ddkNumber, String name, String surname, String dateOfBirth, String centerThatGetsTheBlood, List<DdkTestData> ddkTestDataList) {
        this.ddkNumber = ddkNumber;
        this.name = name;
        this.surname = surname;
        this.dateOfBirth = dateOfBirth;
        this.centerThatGetsTheBlood = centerThatGetsTheBlood;
        this.ddkTestDataList = ddkTestDataList;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<DdkTestData> getDdkTestDataList() {
        return ddkTestDataList;
    }

    public void setDdkTestDataList(List<DdkTestData> ddkTestDataList) {
        this.ddkTestDataList = ddkTestDataList;
    }

    public String getDdkNumber() {
        return ddkNumber;
    }

    public void setDdkNumber(String ddkNumber) {
        this.ddkNumber = ddkNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getCenterThatGetsTheBlood() {
        return centerThatGetsTheBlood;
    }

    public  void setCenterThatGetsTheBlood(String centerThatGetsTheBlood) {
        this.centerThatGetsTheBlood = centerThatGetsTheBlood;
    }
}
