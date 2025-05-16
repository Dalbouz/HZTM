package studiobox.jobs.hztm_patient_manager.model;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class UserData implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long Id;

    private String FullName;
    private String Password;
    private String UserName;
    private int PasswordTimeout;
    private boolean ActiveStatus;
    private String SecurityLevelStatus;

    public UserData() {}

    public UserData(String FullName, String Password, String UserName, int PasswordTimeout, boolean ActiveStatus, String SecurityLevelStatus) {
        this.FullName = FullName;
        this.Password = Password;
        this.UserName = UserName;
        this.PasswordTimeout = PasswordTimeout;
        this.ActiveStatus = false;
    }

    public String getSecurityLevelStatus() {
        return SecurityLevelStatus;
    }

    public void setSecurityLevelStatus(String SecurityLevelStatus) {
        this.SecurityLevelStatus = SecurityLevelStatus;
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        this.Id = id;
    }

    public String getFullName() {
        return FullName;
    }

    public void setFullName(String fullName) {
        FullName = fullName;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public String getUserName() {
        return UserName;
    }
    public void setUserName(String userName) {
        UserName = userName;
    }

    public boolean isActiveStatus() {
        return ActiveStatus;
    }

    public void setActiveStatus(boolean activeStatus) {
        ActiveStatus = activeStatus;
    }
}
