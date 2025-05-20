import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { InstitutionLabData } from "../dataStructure/InstitutionLabData";
import { environment } from '../environments/environment';
import { PatientData } from "../dataStructure/PatientData";
import { AnalizatorData } from "../dataStructure/AnalizatorData";
import { UserData } from "../dataStructure/UserData";

@Injectable({
    providedIn:'root'
})

export class MainDataService{

    public patients: PatientData[] = [];
    public analizatorDatas: AnalizatorData[] = [];

    public adminUserExist: boolean = false;
    public adminUserName:string = "";
    public adminPassword:string ="";
    public isLoggedIn:boolean = false;

    public currentUser: UserData = {
    fullName: '',
    password: '',
    userName: '',
    passwordTimeout: 0,
    activeStatus: false,
    securityLevelStatus: ''
  };

  public registerdUser: UserData  = {
    fullName: '',
    password: '',
    userName: '',
    passwordTimeout: 0,
    activeStatus: false,
    securityLevelStatus: ''
  };

  public clearCurrentUser():void{
      this.currentUser.fullName = '';
      this.currentUser.password = '';
      this.currentUser.userName = '';
      this.currentUser.passwordTimeout = 0;
      this.currentUser.activeStatus = false;
      this.currentUser.securityLevelStatus = '';
    }
}
