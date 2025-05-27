import { PatientData } from "../dataStructure/PatientData";

export interface AnalizatorDataTempNoId{
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
    patient: PatientData;
    validated: string;
    testStatus: String;
    assayName:String;
    specimenID:string;
    testWasValidatedBy:string;
    isNew:boolean
}