import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { InstitutionLabData } from "../dataStructure/InstitutionLabData";
import { PatientData } from "../dataStructure/PatientData";
import { AnalizatorData } from "../dataStructure/AnalizatorData";
import { UserData } from "../dataStructure/UserData";
import { InstitutionService } from "./Institution.Services";
import { ControlSampleData } from "../dataStructure/ControlSampleData";
import { RegistryDDKData } from "../dataStructure/RegistryDDKData";
import { DdkTestData } from "../dataStructure/DdkTestData";

@Injectable({
    providedIn:'root'
})

export class MainDataService{

    public patients: PatientData[] = [];
    public analizatorDatas: AnalizatorData[] = [];
    public institutions: InstitutionLabData[] = [];
    public controlSamples: ControlSampleData[] = [];
    public registryDdkDatas: RegistryDDKData[] = [];
    public ddkTests: DdkTestData[] = [];
    public archivedAnalizators: AnalizatorData[] = [];

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
