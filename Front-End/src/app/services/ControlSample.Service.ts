import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ControlSampleData } from "../dataStructure/ControlSampleData";
import { environment } from '../environments/environment';

@Injectable({
    providedIn:'root'
})

export class ControlSampleServices{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getAllControlSamples(): Observable<ControlSampleData[]>{
       return this.http.get<ControlSampleData[]>(`${this.apiServerUrl}/controlsamples/find/all`);
    }

    public getControlSamplesWithingDate(startDate: string, endDate:string): Observable<ControlSampleData[]>{
        return this.http.get<ControlSampleData[]>(`${this.apiServerUrl}/controlsamples/find/date/${startDate}/${endDate}`);
    }

    public getControlSamplesByLot(lot:string): Observable<ControlSampleData[]>{
        return this.http.get<ControlSampleData[]>(`${this.apiServerUrl}/controlsamples/find/lot/${lot}`);
    }

    public getControlSamplesByTestName(testName:string): Observable<ControlSampleData[]>{
        return this.http.get<ControlSampleData[]>(`${this.apiServerUrl}/controlsamples/find/testName/${testName}`);
    }

    public getControlSamplesByFilters(filters:any[], controls:ControlSampleData[]): Observable<ControlSampleData[]>{
        const body = {filters, controls};
       return this.http.post<ControlSampleData[]>(`${this.apiServerUrl}/controlsamples/find/byFiltersAndGivenList`, body);
    }

    public getFilteredControls(filters:any[]):Observable<ControlSampleData[]>{
        return this.http.post<ControlSampleData[]>(`${this.apiServerUrl}/controlsamples/find/byFilters`, filters);
    }
}