import { PatientData } from "./PatientData";

export interface UserData {
    fullName: string;
    password:string;
    username:string;
    passwordTimeout:number;
    activeStatus: boolean;
    patientList: PatientData[];
}