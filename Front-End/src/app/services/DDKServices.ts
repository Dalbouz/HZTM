import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '../environments/environment';
import { RegistryDDKData } from "../dataStructure/RegistryDDKData";
import { DdkTestData } from "../dataStructure/DdkTestData";

@Injectable({
    providedIn:'root'
})

export class DDKServices{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getAllPatients(): Observable<RegistryDDKData[]>{
       return this.http.get<RegistryDDKData[]>(`${this.apiServerUrl}/ddkRegistry/find/all`);
    }

    public addPatient(data: RegistryDDKData): Observable<RegistryDDKData>{
         return this.http.post<RegistryDDKData>(`${this.apiServerUrl}/ddkRegistry/add/` , data);
    }

     public updatePatient(data: RegistryDDKData, id:number): Observable<RegistryDDKData>{
        return this.http.put<RegistryDDKData>(`${this.apiServerUrl}/ddkRegistry/update/${id}`, data);
    }

    public getAllTests(): Observable<DdkTestData[]>{
       return this.http.get<DdkTestData[]>(`${this.apiServerUrl}/ddkTests/find/all`);
    }

    public addTest(data: DdkTestData): Observable<DdkTestData>{
         return this.http.post<DdkTestData>(`${this.apiServerUrl}/ddkTests/add/` , data);
    }

     public updateTest(data: DdkTestData, id:number): Observable<DdkTestData>{
        return this.http.put<DdkTestData>(`${this.apiServerUrl}/ddkTests/update/${id}`, data);
    }

    public getPatientsWithTests(dataList: DdkTestData[]): Observable<RegistryDDKData[]>{
        return this.http.post<RegistryDDKData[]>(`${this.apiServerUrl}/ddkRegistry/get/patientsWithTests`, dataList);
    }
}