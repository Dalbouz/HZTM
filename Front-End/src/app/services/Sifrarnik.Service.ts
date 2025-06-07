import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ControlSampleData } from "../dataStructure/ControlSampleData";
import { environment } from '../environments/environment';
import { AnalizatorDeviceData } from "../dataStructure/AnalizatorDeviceData";
import { AssayaData } from "../dataStructure/AssayaData";

@Injectable({
    providedIn:'root'
})

export class SifrarnikService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}
    
//#region AnalizatorDevices
    public getAllAnalizatorDevices():Observable<AnalizatorDeviceData[]>{
         return this.http.get<AnalizatorDeviceData[]>(`${this.apiServerUrl}/analizatorDevice/find/all`);
    }

    public saveAnalizatorDevice(data: AnalizatorDeviceData):Observable<AnalizatorDeviceData>{
         return this.http.post<AnalizatorDeviceData>(`${this.apiServerUrl}/analizatorDevice/save`, data);
    }

    public getAssayaDataForDevice(data: AnalizatorDeviceData):Observable<AssayaData>{
         return this.http.post<AssayaData>(`${this.apiServerUrl}/analizatorDevice/find/assayaData`, data);
    }
//#endregion

//#region AssayaData
    public getAllAssayaData():Observable<AssayaData[]>{
         return this.http.get<AssayaData[]>(`${this.apiServerUrl}/assayaData/find/all`);
    }

    public SaveAssayaData(data: AssayaData):Observable<AssayaData>{
         return this.http.post<AssayaData>(`${this.apiServerUrl}/assayaData/save`, data);
    }
//#endregion
}