import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, ObservableNotification } from "rxjs";
import { UserData } from "../dataStructure/UserData";
import { PatientData } from "../dataStructure/PatientData";

@Injectable({
    providedIn:'root'
})

export class PatientService{
    private apiServerUrl = '';

    constructor(private http: HttpClient){}
 
    public getPatients(): Observable<PatientData[]>{
        return this.http.get<PatientData[]>(`${this.apiServerUrl}/patients/all`);
    }


    public updatePatient(patient: PatientData):Observable<PatientData>{
        return this.http.put<PatientData>(`${this.apiServerUrl}/patients/update`, patient)
    }

    public getPatientById(id: number): Observable<PatientData>{
        return this.http.get<PatientData>(`${this.apiServerUrl}/patients/find/${id}`);
    }

    public getPatientByOib(oib: number):Observable<PatientData>{
        return this.http.get<PatientData>(`${this.apiServerUrl}/patients/find/${oib}`);
    }
}