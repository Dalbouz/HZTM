import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { InstitutionLabData } from "../dataStructure/InstitutionLabData";
import { environment } from '../environments/environment';
import { PatientData } from "../dataStructure/PatientData";
import { AnalizatorData } from "../dataStructure/AnalizatorData";

@Injectable({
    providedIn:'root'
})

export class CommunicationService{
    private loginPanelVisibility = new Subject<boolean>();
    public loginPanelVisibilityChange$ = this.loginPanelVisibility

    public OnLoginPanelVisibilityChange(value: boolean){
        this.loginPanelVisibility.next(value);
    }
}
