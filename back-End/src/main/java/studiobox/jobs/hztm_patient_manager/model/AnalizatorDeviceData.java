package studiobox.jobs.hztm_patient_manager.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "analizatorDeviceData")
public class AnalizatorDeviceData implements Serializable {
    private String analizatorName;
    private String analizatorID;


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    public AnalizatorDeviceData() {}

    public AnalizatorDeviceData(
            String AnalizatorName,
            String AnalizatorID

    ) {
        this.analizatorName = AnalizatorName;
        this.analizatorID = AnalizatorID;
    }



    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setAnalizatorName(String analizatorName) {
        this.analizatorName = analizatorName;
    }

    public String getAnalizatorName() {
        return analizatorName;
    }

    public void setAnalizatorID(String analizatorID) {
        this.analizatorID = analizatorID;
    }

    public String getAnalizatorID() {
        return analizatorID;
    }
}
