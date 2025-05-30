export interface DdkTestData{
  id?:number;
  dose:string;
  sample:string;
  test:string;
  method:string;
  readingValue:string;
  dateOfReading:string;
  code?:string;
  patientId?:number;
  testResult:string;
  isNew:boolean;
}