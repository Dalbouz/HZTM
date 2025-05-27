import { UntypedFormBuilder } from "@angular/forms";

export interface ControlSampleData{
    id: number;
    analizatorName:string;
    controlSampleName: string;
    testName:string;
    lotTest:string;
    expirationDateTest:string;
    lotControlSamples:string;
    expirationDateControlSamples:string;
    sampleNumber:string;
    analizatorResult:string;
    analizatorUnit:string;
    interpretationFromAnalizator:string;
    sampleDate:string;
}