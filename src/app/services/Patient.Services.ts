import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SelectMultipleControlValueAccessor } from "@angular/forms";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class PatientServices{
    private apiServerUrl = '';

    constructor(private http:HttpClient){}

     
}