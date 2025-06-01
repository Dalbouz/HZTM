import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '../environments/environment';
import { PatientData } from "../dataStructure/PatientData";

@Injectable({
    providedIn:'root'
})

export class ListsServices{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getAllPositivePatientsByDateRange(startDate:string, endDate:string): Observable<PatientData[]>{
       return this.http.get<PatientData[]>(`${this.apiServerUrl}/positivespecimen/find/date/${startDate}/${endDate}`);
    }
}