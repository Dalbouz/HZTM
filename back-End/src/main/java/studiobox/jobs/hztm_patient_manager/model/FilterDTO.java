package studiobox.jobs.hztm_patient_manager.model;

public class FilterDTO {
    private String label;
    private String key;
    private boolean active;
    private String value;

    // Getters and setters
    public String getKey() { return key; }
    public boolean isActive() { return active; }
    public String getValue() { return value; }
}