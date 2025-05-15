import { PatientData } from "./PatientData";

export interface UserData {
    id:number;
    fullName: string;
    password:string;
    username:string;
    passwordTimeout:number;
    activeStatus: boolean;
    patientList: PatientData[];
}