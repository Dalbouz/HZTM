import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
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

    public getUser(username: string): Observable<UserData>{
        return this.http.get<UserData>(`${this.apiServerUrl}/users/${username}`);
    }
}