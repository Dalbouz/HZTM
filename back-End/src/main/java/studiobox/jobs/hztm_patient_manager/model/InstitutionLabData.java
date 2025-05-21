package studiobox.jobs.hztm_patient_manager.model;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class InstitutionLabData implements Serializable {
    private String name;
    private String adress;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    public InstitutionLabData() {}

    public  InstitutionLabData(String Name, String Adress) {
        this.name = Name;
        this.adress = Adress;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }
}
