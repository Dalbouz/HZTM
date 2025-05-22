import { PatientData } from "../dataStructure/PatientData";

export interface AnalizatorData{
    sampleNumber:string;
    analizatorName:string;
    analizatorOib:number;
    testMark:string;
    lot:string;
    expirationDateReagens:string;
    interpretedResult:string;
    numericValueFromAnalizator:string;
    dateOfReading:string;
    timeOfReading:string;
    interpretationForEDelphyn:string;
    testMarkForEDelphyn:string;
    notes:string;
    id: number;
    patient: PatientData;
    validated: string;
    testStatus: String;
    assayName:String;
    specimentID:string;
    testWasValidatedBy:string;
}