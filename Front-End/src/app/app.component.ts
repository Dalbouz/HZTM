import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { UserService } from './services/User.Services';
import { UserData } from './dataStructure/UserData';
import { PatientData } from './dataStructure/PatientData';
import { PatientService } from './services/Patient.Services';
import { AnalizatorServices } from './services/Analizator.Services';
import { AnalizatorData } from './dataStructure/AnalizatorData';
import { MainDataService } from './services/MainData.Services';
import { InstitutionLabData } from './dataStructure/InstitutionLabData';
import { InstitutionService } from './services/Institution.Services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit{
  title = 'hztm_pacient_management';

  public analizatorDatas: AnalizatorData[] = []; 
  
  // public showLoginWindow: boolean = true;
  // public showLogin: boolean = true;
  // public showRegister:boolean = false;
  public showPatientPanel:boolean = false;
  public showAnalizatorPanel:boolean = false;
  // public adminUserExist: boolean = false;

  // public adminUserName:string = "";
  // public adminPassword:string ="";
  // public adminUserNameChecker:string = "";
  // public adminPasswordChecker:string ="";

  // public currentUser: UserData = {
  //   fullName: '',
  //   password: '',
  //   userName: '',
  //   passwordTimeout: 0,
  //   activeStatus: false,
  //   securityLevelStatus: ''
  // };

  // public registerdUser: UserData  = {
  //   fullName: '',
  //   password: '',
  //   userName: '',
  //   passwordTimeout: 0,
  //   activeStatus: false,
  //   securityLevelStatus: ''
  // };

  constructor(
    private userService: UserService,
    private patientService: PatientService,
    private analizatorService: AnalizatorServices,
    private mainDataService: MainDataService,
    private institutionServices: InstitutionService
  ){}


  //Pokrece se samo jednom sve dok ne osvjezimo stranicu 
  ngOnInit(): void {
    this.getPatients();
    this.mainDataService.getInstitutions();

    this.userService.getUserById(1).subscribe(
        (response: UserData) => {
          if(response == null){
            this.mainDataService.adminUserExist = false;
          }
          else{
            this.mainDataService.adminUserExist = true;
            this.mainDataService.adminUserName = response.userName;
            this.mainDataService.adminPassword = response.password;
          }
        })
  }

  // public login():void{
  //   if(this.currentUser.userName == "" || this.currentUser.password == ""){
  //     return;
  //   }

  //   this.userService.getUser(this.currentUser.userName, this.currentUser.password).subscribe(
  //     (response: UserData)=>{
  //       this.currentUser = response;
  //       if(this.currentUser != null){
  //         this.currentUser.activeStatus = true; //ovo je samo lokalno, ne pusha se na server na serveru ne pise koji se user aktivan
  //         this.switchBetweenLoginPatientPanel();
  //       }
  //       else{
  //         alert("wrong credentials!");
  //         this.clearCurrentUser();
  //       }
  //     },
  //     (error: HttpErrorResponse)=>{
  //       alert(error.message + "\nWRONG CREDENTIALS!")
  //     }
  //   )
  // }

  // public register():void{
  //   if(this.registerdUser.fullName =="" || this.registerdUser.password=="" || this.registerdUser.userName == "" 
  //     || this.registerdUser.securityLevelStatus==""){
  //     return;
  //   }
  //   if(this.registerdUser.securityLevelStatus=="HIGH" && this.adminUserExist){
  //     if(this.adminUserName == this.adminUserNameChecker && this.adminPassword == this.adminPasswordChecker){
  //         this.addUser();
  //     }
  //     else{
  //       alert("Wrong admin Credentials!");
  //     }
  //   }
  //   else{
  //     this.addUser();
  //   }
  // }


  

    public getPatients():PatientData[]{
      this.patientService.getPatients().subscribe(
        (response: PatientData[]) =>{
          if(response.length == 0){
            return alert("NEMA PACIJENATA!");
          }
          this.mainDataService.patients = response;
          this.setAnalizatorDataForPatients();
          return this.mainDataService.patients;
        },
        (error: HttpErrorResponse) => {
        alert(error.message + "\nNEMA PACIJENATA!");
      }
    )
    return [];
    }

    public getAnalizatorDatas():void{
      this.analizatorService.getAllAnalizators().subscribe(
        (response: AnalizatorData[]) =>{
          this.mainDataService.analizatorDatas = response;
        },
        (error: HttpErrorResponse) => {
        alert(error.message + "\nNEMA ANALIZATOR PODATAKA!");
      }
      )
    }

      public setAnalizatorDataForPatients():void{
        this.mainDataService.patients.forEach(patient => {
          this.analizatorService.getAnalizatorDataBySpecimentID(patient.specimentID).subscribe(
      (response: AnalizatorData[]) =>{
        if(response == null || response.length == 0){
          return alert("Za pacijenta" + patient.name + " " + patient.surname + "Nema Analizator Testova");
        }
        
        patient.analizatorDatas = response;
      },
      (error: HttpErrorResponse) => {
      alert(error.message + "\nNEMA ANALIZATOR PODATAKA!");
    }
    )
    });
    
  }

    public showHideAnalizatorData():void{
      if(!this.showAnalizatorPanel){
        this.getAnalizatorDatas();
      }
        // this.switchBetweenAnalizatorPatientPanel();
    }

    // public logout():void{
    //   // this.switchBetweenLoginPatientPanel();
    //   // this.clearCurrentUser();
    // }

  // public switchBetweenLoginRegister(): void{
  //   this.showLogin = !this.showLogin;
  //   this.showRegister = !this.showRegister;
  // }

  // public switchBetweenLoginPatientPanel():void{
  //   this.showLoginWindow = !this.showLoginWindow;
  //   this.showPatientPanel = !this.showPatientPanel;
  // }

  //  public switchBetweenAnalizatorPatientPanel():void{
  //   this.showPatientPanel = !this.showPatientPanel;
  //   this.showAnalizatorPanel = !this.showAnalizatorPanel;
  // }
    // private clearRegisterdUser():void{
    //   this.registerdUser.fullName = '';
    //   this.registerdUser.password = '';
    //   this.registerdUser.userName = '';
    //   this.registerdUser.passwordTimeout = 0;
    //   this.registerdUser.activeStatus = false;
    //   this.registerdUser.securityLevelStatus = '';
    // }

    // private clearCurrentUser():void{
    //   this.currentUser.fullName = '';
    //   this.currentUser.password = '';
    //   this.currentUser.userName = '';
    //   this.currentUser.passwordTimeout = 0;
    //   this.currentUser.activeStatus = false;
    //   this.currentUser.securityLevelStatus = '';
    // }

    
    // private addUser():void{
    //   this.userService.addUser(this.registerdUser).subscribe(
    //     (response: UserData) => {
    //       if (response !== null) {
    //         this.switchBetweenLoginRegister();
    //         this.clearRegisterdUser();
    //         this.adminPasswordChecker ="";
    //         this.adminUserNameChecker = "";
    //       } else {
    //         alert("Username already exists!"); // Handle existing user
    //       }
    //     },
    //     (error: HttpErrorResponse) => {
    //       alert(`Error: ${error.error.message || error.message}`);
    //     }
    //   );
    // }

}
