package studiobox.jobs.hztm_patient_manager.model;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class UserData implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    private String fullName;
    private String password;
    private String userName;
    private int passwordTimeout;
    private boolean activeStatus;
    private String securityLevelStatus;

    public UserData() {}

    public UserData(String FullName, String Password, String UserName, int PasswordTimeout, boolean ActiveStatus, String SecurityLevelStatus) {
        this.fullName = FullName;
        this.password = Password;
        this.userName = UserName;
        this.passwordTimeout = PasswordTimeout;
        this.activeStatus = false;
    }

    public int getPasswordTimeout(){
        return passwordTimeout;
    }

    public void setPasswordTimeout(int PasswordTimeout){
        this.passwordTimeout = PasswordTimeout;
    }

    public String getSecurityLevelStatus() {
        return securityLevelStatus;
    }

    public void setSecurityLevelStatus(String SecurityLevelStatus) {
        this.securityLevelStatus = SecurityLevelStatus;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }

    public boolean isActiveStatus() {
        return activeStatus;
    }

    public void setActiveStatus(boolean activeStatus) {
        this.activeStatus = activeStatus;
    }
}
