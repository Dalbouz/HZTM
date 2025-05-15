import { AnalizatorData } from "./AnalizatorData";

export interface PatientData{
    id: number;
    name:string;
    surname:string;
    dateOfBirh:string;
    MBO: number;
    OIB: number;
    priority:string;
    priorityReason:string;
    sampleNumber:string;
    dateOfSample:string;
    timeOfSample:string;
    sampleReceipt:string;
    testRequirements:string;
    analizatorData: AnalizatorData;
}