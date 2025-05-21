// import { SampleData } from "./SampleData";

import { AnalizatorData } from "./AnalizatorData";

export interface PatientData{
    id: number;
    name:string;
    surname:string;
    dateOfBirth:string;
    mbo: number;
    oib: number;
    priority:string;
    priorityReason:string;
    sampleNumber: number;
    dateOfSample:string;
    timeOfSample:string;
    sampleReceipt:string;
    testRequirements:string;
    specimentID:string;
    analizatorDatas:AnalizatorData[];
}