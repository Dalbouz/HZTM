import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserData } from "../dataStructure/UserData";
import { PatientData } from "../dataStructure/PatientData";

@Injectable({
    providedIn:'root'
})

export class InstitutionService{
    private apiServerUrl = '';

    constructor(private http: HttpClient){}
 
    public getUserPatients(currentUser: UserData): PatientData[]{
        return currentUser.patientList;
    }
}