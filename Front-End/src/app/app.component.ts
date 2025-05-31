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
import { DDKServices } from './services/DDKServices';
import { RegistryDDKData } from './dataStructure/RegistryDDKData';
import { DdkTestData } from './dataStructure/DdkTestData';

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
  
  public showPatientPanel:boolean = false;
  public showAnalizatorPanel:boolean = false;

  constructor(
    private userService: UserService,
    private patientService: PatientService,
    private analizatorService: AnalizatorServices,
    private mainDataService: MainDataService,
    private ddkService: DDKServices
  ){}


  //Pokrece se samo jednom sve dok ne osvjezimo stranicu 
  ngOnInit(): void {
    this.getPatients();
    
    this.mainDataService.getInstitutions();

    this.getDdkTests();

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

    public getPatients():PatientData[]{
      this.patientService.getPatients().subscribe(
        (response: PatientData[]) =>{
          if(response.length == 0){
            return alert("NEMA PACIJENATA!");
          }
          this.mainDataService.patients = response;
          this.getAnalizatorDatas();
         
          return this.mainDataService.patients;
        },
        (error: HttpErrorResponse) => {
        alert(error.message + "\nNEMA PACIJENATA!");
      }
    )
    return [];
    }

    private getAnalizatorDatas():void{
      this.analizatorService.getAllAnalizators().subscribe(
        (response: AnalizatorData[]) =>{
          this.mainDataService.analizatorDatas = response;
          this.setAnalizatorDataForPatients();
        },
        (error: HttpErrorResponse) => {
        alert(error.message + "\nPokusavam dohvatiti sve analizator testove ali nejde!");
      }
      )
    }

    //vidjeti jos kako ce ED slati listu uzoraka u bazu
    private setAnalizatorDataForPatients():void{
      this.mainDataService.patients.forEach(patient => {
        this.analizatorService.getAnalizatorsDataBySpecimentID(patient.specimentID).subscribe(
          (response: AnalizatorData[]) =>{
            if(response == null || response.length == 0){
              return alert("Za pacijenta" + patient.name + " " + patient.surname + "Nema Analizator Testova");
            }
            patient.analizatorDatas = response;
            
            //dodaje broj uzorka iz analizator testa u array uzorka za pacijenta
            patient.sampleNumbers = [];
            patient.analizatorDatas.forEach(analizatorData => {
              analizatorData.isNew = false;
              analizatorData.isEdited = false;
              if (!patient.sampleNumbers.includes(analizatorData.sampleNumber)) {
              patient.sampleNumbers.push(analizatorData.sampleNumber);
          }
    
        });
      },
      (error: HttpErrorResponse) => {
      alert(error.message + "\nNEMA ANALIZATOR PODATAKA!");
    }
    )
    });
  
  }


  // private getDdkPatientsWithTests(testList: DdkTestData[]){
  //   this.ddkService.getPatientsWithTests(testList).subscribe(
  //     (response: RegistryDDKData[]) =>{
  //       this.mainDataService.registryDdkDatas = response;
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message + "\nPokusavam dohvatiti sve DDK pacijente sa testovima ali nejde!");
  //     }
  //   )
  // }

  private getDdkPatients(){
    this.ddkService.getAllPatients().subscribe(
      (response:RegistryDDKData[]) =>{
        this.mainDataService.registryDdkDatas = response;
        this.connectDdkTestsWithDdkPatients();
      },
      (error: HttpErrorResponse) => {
            alert(error.message + "\nPokusavam dohvatiti sve DDK pacijente ali nejde!");
          }
    )
  }

  private connectDdkTestsWithDdkPatients():void{
    this.mainDataService.registryDdkDatas.forEach(patient =>{
      this.mainDataService.ddkTests.forEach(test=>{
        if(patient.id == test.patientId){
          if(!patient.tests){
            patient.tests = [];
          }
          patient.tests.push(test);
        }
      })
    })
  }

  private getDdkTests(){
    this.ddkService.getAllTests().subscribe(
          (response: DdkTestData[]) =>{
            this.mainDataService.ddkTests = response;
            this.getDdkPatients();
          },
          (error: HttpErrorResponse) => {
            alert(error.message + "\nPokusavam dohvatiti sve DDK testove ali nejde!");
          }
        )
  }
}
