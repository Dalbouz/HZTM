package studiobox.jobs.hztm_patient_manager.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.io.Serializable;

@Entity
@Table(name="Ocitanje")
public class Ocitanje implements Serializable {
    @Id
    @Column(name = "ID")
    private int ID;

    @Column(name = "Timestamp")
    private String Timestamp;

    @Column(name = "Comment")
    private String Comment;

    // No-argument constructor
    public Ocitanje() {
    }

    // Parameterized constructor
    public Ocitanje(int ID, String Timestamp, String Comment) {
        this.ID = ID;
        this.Timestamp = Timestamp;
        this.Comment = Comment;
    }

    // Getter and Setter for ID
    public int getID() {
        return ID;
    }
    public void setID(int ID) {
        this.ID = ID;
    }

    // Getter and Setter for Timestamp
    public String getTimestamp() {
        return Timestamp;
    }
    public void setTimestamp(String Timestamp) {
        this.Timestamp = Timestamp;
    }

    // Getter and Setter for Comment
    public String getComment() {
        return Comment;
    }
    public void setComment(String Comment) {
        this.Comment = Comment;
    }
}
