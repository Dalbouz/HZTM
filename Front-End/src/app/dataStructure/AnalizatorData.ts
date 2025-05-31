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
    id?: number;
    patient: PatientData;
    validated: string;
    testStatus: String;
    assayName:String;
    specimenID:string;
    testWasValidatedBy:string;
    isNew:boolean,
    units: string;
    finalResult: string;
    isEdited:boolean;
}