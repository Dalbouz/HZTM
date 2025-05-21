import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { InstitutionLabData } from "../dataStructure/InstitutionLabData";
import { environment } from '../environments/environment';
import { PatientData } from "../dataStructure/PatientData";
import { AnalizatorData } from "../dataStructure/AnalizatorData";
import { UserData } from "../dataStructure/UserData";
import { InstitutionService } from "./Institution.Services";

@Injectable({
    providedIn:'root'
})

export class MainDataService{

    public patients: PatientData[] = [];
    public analizatorDatas: AnalizatorData[] = [];
    public institutions: InstitutionLabData[] = [];

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

  public currentInstitution: InstitutionLabData = {
    name:'',
    adress:''
  };

  // public registerdUser: UserData  = {
  //   fullName: '',
  //   password: '',
  //   userName: '',
  //   passwordTimeout: 0,
  //   activeStatus: false,
  //   securityLevelStatus: ''
  // };

  public clearCurrentUser():void{
      this.currentUser.fullName = '';
      this.currentUser.password = '';
      this.currentUser.userName = '';
      this.currentUser.passwordTimeout = 0;
      this.currentUser.activeStatus = false;
      this.currentUser.securityLevelStatus = '';
    }

    public clearCurrentInstitution():void{
      this.currentInstitution.name='';
      this.currentInstitution.adress='';
    }

    constructor(public institutionServices: InstitutionService){}

    public getInstitutions(): InstitutionLabData[]{
        this.institutionServices.getInstitutions().subscribe(
          (response: InstitutionLabData[]) =>{
            if(response.length == 0 || response == null){
              return alert("Nema zapisane ustanove u bazi");
            }
            this.institutions = response;
             return response;
          },
        )
        return []; 
      }
}
