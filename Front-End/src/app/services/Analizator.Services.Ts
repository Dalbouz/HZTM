import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AnalizatorData } from "../dataStructure/AnalizatorData";

@Injectable({
    providedIn:'root'
})

export class AnalizatorServices{
    private apiServerUrl = '';

    constructor(private http: HttpClient){}
 
    public GetAnalizatorByNameAndOib(analizatorName: string, analizatorOib:number): Observable<AnalizatorData>{
        return this.http.get<AnalizatorData>(`${this.apiServerUrl}/analizator/find/${analizatorName}/${analizatorOib}`);
    }

    public GetAnalizatorById(id: number): Observable<AnalizatorData>{
        return this.http.get<AnalizatorData>(`${this.apiServerUrl}/analizator/find/${id}`);
    }

    public updateAnalizator(analizator: AnalizatorData): Observable<AnalizatorData>{
        return this.http.put<AnalizatorData>(`${this.apiServerUrl}/analizator/update`, analizator);
    }

    public deleteAnalizatorById(id:number):Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/analizator/delete/${id}`);
    }
}