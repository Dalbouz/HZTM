package studiobox.jobs.hztm_patient_manager.model;

import java.io.Serializable;

public class AnalizatorData implements Serializable {
    private int SampleNumber;
    private String AnalizatorName;
    private String TestMark;
    private String Lot;
    private String ExirationDateReagens;
    private String InterpretedResult;
    private int NumericValueFromAnalizator;
    private String DateOfReading;
    private String TimeOfReading;
    private String InterpretationForEDelphyn;
    private String TestMarkForEdelphyn;
    private String Notes;
}
