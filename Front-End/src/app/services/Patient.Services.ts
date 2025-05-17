import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, ObservableNotification } from "rxjs";
import { PatientData } from "../dataStructure/PatientData";
import { environment } from '../environments/environment';

@Injectable({
    providedIn:'root'
})

export class PatientService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}
 
    public getPatients(): Observable<PatientData[]>{
        return this.http.get<PatientData[]>(`${this.apiServerUrl}/patients/find/all`);
    }


    public updatePatient(patient: PatientData):Observable<PatientData>{
        return this.http.put<PatientData>(`${this.apiServerUrl}/patients/update`, patient);
    }

    public addPatient(patient:PatientData):Observable<PatientData>{
        return this.http.post<PatientData>(`${this.apiServerUrl}/patients/add`, patient);
    }

    public getPatientById(id: number): Observable<PatientData>{
        return this.http.get<PatientData>(`${this.apiServerUrl}/patients/find/${id}`);
    }

    public getPatientByOib(oib: number):Observable<PatientData>{
        return this.http.get<PatientData>(`${this.apiServerUrl}/patients/find/${oib}`);
    }
}