package studiobox.jobs.hztm_patient_manager.exception;

public class DataNotFound extends RuntimeException {
    public DataNotFound(String analizatorDataNotFound) {
        super (analizatorDataNotFound);
    }
}
