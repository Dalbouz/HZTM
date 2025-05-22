import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AnalizatorData } from "../dataStructure/AnalizatorData";
import { environment } from '../environments/environment';

@Injectable({
    providedIn:'root'
})

export class AnalizatorServices{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}
 
    // public GetAnalizatorByNameAndOib(analizatorName: string, analizatorOib:number): Observable<AnalizatorData>{
    //     return this.http.get<AnalizatorData>(`${this.apiServerUrl}/analizators/find/${analizatorName}/${analizatorOib}`);
    // }

    public getAllAnalizators(): Observable<AnalizatorData[]>{
       return this.http.get<AnalizatorData[]>(`${this.apiServerUrl}/analizators/find/all`);
    }

    public getAnalizatorById(id: number): Observable<AnalizatorData>{
        return this.http.get<AnalizatorData>(`${this.apiServerUrl}/analizators/find/${id}`);
    }

    public updateAnalizator(analizator: AnalizatorData, id:number): Observable<AnalizatorData>{
        return this.http.put<AnalizatorData>(`${this.apiServerUrl}/analizators/update/${id}`, analizator);
    }

    public deleteAnalizatorById(id:number):Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/analizators/delete/${id}`);
    }

    public addAnalizatorAndLinkToPatient(patientId:number, analizator: AnalizatorData): Observable<AnalizatorData>{
        return this.http.post<AnalizatorData>(`${this.apiServerUrl}/analizators/add/patient/${patientId}`, analizator);
    }

    public addAnalizatorData(analizator:AnalizatorData):Observable<AnalizatorData>{
        return this.http.post<AnalizatorData>(`${this.apiServerUrl}/analizators/add`, analizator);
    }

    public findAnalizatorsForPatient(patientId:number):Observable<AnalizatorData>{
        return this.http.get<AnalizatorData>(`${this.apiServerUrl}/analizators/find/patient/${patientId}`);
    }

    public unlinkAnalizatorFromPatient(id:number):Observable<AnalizatorData>{
        return this.http.put<AnalizatorData>(`${this.apiServerUrl}/analizators/unlink/${id}`, null);
    }

    public linkAnalizatorDataToParent(analizatorId:number, patientId:number):Observable<AnalizatorData>{
        return this.http.put<AnalizatorData>(`${this.apiServerUrl}/analizators/link/${analizatorId}/${patientId}`, null);
    }

    public getAnalizatorsDataBySpecimentID(specimentID:string):Observable<AnalizatorData[]>{
        return this.http.get<AnalizatorData[]>(`${this.apiServerUrl}/analizators/find/all/${specimentID}`);
    }
}