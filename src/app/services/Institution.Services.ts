import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { InstitutionLabData } from "../dataStructure/InstitutionLabData";

@Injectable({
    providedIn:'root'
})

export class InstitutionService{
    private apiServerUrl = '';

    constructor(private http: HttpClient){}
 
    public getInstitution(institutioId: number): Observable<InstitutionLabData>{
        return this.http.get<InstitutionLabData>(`${this.apiServerUrl}/institutions/${institutioId}`);
    }

    public addInstitution(newInstitution: InstitutionLabData): Observable<InstitutionLabData>{
        return this.http.post<InstitutionLabData>(`${this.apiServerUrl}/institutions/add`, newInstitution);
    }
}