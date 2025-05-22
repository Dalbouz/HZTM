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
    sampleNumbers: string[];
    dateOfSample:string; //trebao bi biti array jer ce biti vise uzoraka
    timeOfSample:string;//trebao bi biti array jer ce biti vise uzoraka
    sampleReceipt:string;//trebao bi biti array jer ce biti vise uzoraka
    testRequirements:string;
    specimentID:string;
    analizatorDatas:AnalizatorData[];
    selectedSampleNumber?:string;
}