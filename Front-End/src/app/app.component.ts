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
import { SifrarnikService } from './services/Sifrarnik.Service';
import { AnalizatorDeviceData } from './dataStructure/AnalizatorDeviceData';
import { AssayaData } from './dataStructure/AssayaData';

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
    private ddkService: DDKServices,
    private sifrarnik: SifrarnikService
  ){}


  //Pokrece se samo jednom sve dok ne osvjezimo stranicu 
  ngOnInit(): void {
    this.getPatients();
    
    this.mainDataService.getInstitutions();

    this.getDdkTests();

    this.getArchivedAnalizators();

    this.getActiveAnalizators();

    this.getValidatedAnalizators();

    this.getAllAnalizatorDevices();

    this.getAllAssayaDataUnique();

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

//#region ArchivedAnalizators
 private getArchivedAnalizators():void{
      this.analizatorService.getArchivedAnalizators().subscribe(
        (response: AnalizatorData[]) =>{
          this.mainDataService.archivedAnalizators = response;
          console.log(response.length);
        },
        (error: HttpErrorResponse) => {
        console.log(error.message + "\nPokusavam dohvatiti sve analizator testove ali nejde!");
      }
      )
    }
//#endregion

//#region Patient&AnalizatorData
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
          this.mainDataService.allAnalizatorDatas = response;
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
      alert(error.message + "\nNEMA ANALIZATOR PODATAKA! za pacijenta:\n" + patient.name + "\n SpecimenID: " + patient.specimentID);
    }
    )
    });
  }

  private getActiveAnalizators():void{
    this.analizatorService.getActiveAnalizators().subscribe(
      (response:AnalizatorData[])=>{
        if(response){
          this.mainDataService.activeAnalizators = response;
          console.log(response.length);
        }
        else{
          alert("Nemožemo dokvatiti aktivne testove")
        }
      },
       (error: HttpErrorResponse) => {
        console.log(error.message + "\nNemožemo dokvatiti aktivne testove!");}
    );
  }

  private getValidatedAnalizators():void{
    this.analizatorService.getValidatedAnalizators().subscribe(
      (response:AnalizatorData[])=>{
        if(response){
          this.mainDataService.validatedAnalizators = response;
        }
        else{
          alert("Nemožemo dokvatiti validirane testove")
        }
      },
       (error: HttpErrorResponse) => {
        console.log(error.message + "\nNemožemo dokvatiti validirane testove!");}
    );
  }
//#endregion

//#region DDK
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
//#endregion


//#region sifrarnik
private getAllAnalizatorDevices():void{
      this.sifrarnik.getAllAnalizatorDevices().subscribe(
        (response: AnalizatorDeviceData[]) =>{
          this.mainDataService.analizatorDevicesList = response;
          this.mainDataService.analizatorDevicesList.forEach(element => {
            this.getAssayDataForDevice(element);
          });
        },
        (error: HttpErrorResponse) => {
        console.log(error.message + "\nPokusavam dohvatiti sve analizator uređaje ali nejde!");
      }
      )
    }

    private getAssayDataForDevice(device: AnalizatorDeviceData):void{
      this.sifrarnik.getAssayaDataForDevice(device).subscribe(
        (response: AssayaData[]) =>{
            device.assayDatas = response;
        },
        (error: HttpErrorResponse) => {
        console.log(error.message + "\nNema Pretraga za uređaj: " + device.analizatorName);}
      )
    }

    private getAllAssayaDataUnique():void{
      this.sifrarnik.getAllUniqueByName().subscribe(
        (response: AssayaData[]) =>{
          this.mainDataService.assayaDataList = response;
        },
        (error: HttpErrorResponse) => {
        console.log(error.message + "\nPokusavam dohvatiti sve Assaya podatke ali nejde!");
      }
      )
    }
//#endregion
}
