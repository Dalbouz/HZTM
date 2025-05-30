import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { MainDataService } from '../services/MainData.Services';
import { FiltersEnum } from '../dataStructure/FiltersEnum';
import { GenericServices } from '../services/GenericMethods.Service';
import { RegistryDDKData } from '../dataStructure/RegistryDDKData';
import { DdkTestData } from '../dataStructure/DdkTestData';
import { DDKServices } from '../services/DDKServices';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ddkTab',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    FormsModule],
  templateUrl: './ddkTab.component.html',
  styleUrls: ['./ddkTab.component.css']
})
export class DdkTabComponent implements OnInit, OnDestroy{
    title = 'hztm_pacient_management';

    public patientDatasTemp: RegistryDDKData[] = [];
    public testsDataTemp: DdkTestData[] = [];
    public isCreatingDDK: boolean = false;
    public isCreatingTest:boolean = false;
    public filterActiveStatus: boolean = false;
    private activeFilter: FiltersEnum | undefined;

    filters = [
        { label: FiltersEnum.code, key: 'code', active: false, value: '' },
        { label: FiltersEnum.centerThatGetsTheBlood, key: 'centerThatGetsTheBlood', active: false, value: '' },
        { label: FiltersEnum.testResult, key: 'testResult', active: false, value: '' }
        
        // Add more filters as needed
    ]

    constructor(
        public mainDataService: MainDataService,
        private router: Router,
        public genericMethodService: GenericServices,
        public ddkService: DDKServices
    ){}

    ngOnDestroy(): void {
      this.patientDatasTemp = this.mainDataService.registryDdkDatas;
    }

    public ngOnInit(): void {
      this.patientDatasTemp = this.mainDataService.registryDdkDatas;
      this.isCreatingDDK = false;
      this.isCreatingTest = false;
    }

    goBack() {
    this.router.navigate([`/home`]);
    this.patientDatasTemp = this.mainDataService.registryDdkDatas;
  }

  // public getFilteredTestBySample(patient: RegistryDDKData): DdkTestData[] {
  //   if (!patient.tests) return [];
    
  //   return patient.tests.filter(a => {
  //     const match = String(a.sampleNumber).trim() === String(patient.selectedSampleNumber).trim();
  //     console.log(`SampleNumber: ${a.sampleNumber} | Match: ${match}`);
  //     return match;
  //   });
  // }

  public toggleFilter(selectedFilter: any) {
    if(this.filterActiveStatus == false){
        selectedFilter.active = true;
        this.activeFilter = selectedFilter.label;
        this.filterActiveStatus = true;
      }
      else{
        if(selectedFilter.label == this.activeFilter){
          selectedFilter.active = false;
          this.filterActiveStatus = false;
          this.activeFilter = undefined;
        }
        else{
          this.filters.forEach(filter => {
            filter.active = false;
          });
          selectedFilter.active = true;
          this.activeFilter = selectedFilter.label;
          this.filterActiveStatus = true;
        }
      }
    this.genericMethodService.toggleFilter(filter);
  }

    public onSearch():void
    {
      switch (this.activeFilter) {
          case FiltersEnum.centerThatGetsTheBlood:
            this.patientDatasTemp = this.genericMethodService.getFilteredArrayOnSearch(this.filters, this.mainDataService.registryDdkDatas);
            break;
          case FiltersEnum.code:
            this.testsDataTemp = this.genericMethodService.getFilteredArrayOnSearch(this.filters, this.mainDataService.ddkTests);
            this.patientDatasTemp.forEach(patient =>{
              if(patient.id == this.testsDataTemp[0].patientId){
                this.patientDatasTemp = [];
                this.patientDatasTemp.push(patient);
                return;
              }
            })
            break;
            case FiltersEnum.testResult:
              const newList: RegistryDDKData[] = [];
              this.filters.forEach(filter=>{
                if(filter.key == 'testResult' && filter.active){
                  this.patientDatasTemp.forEach(patient=>{
                    if(patient.tests){
                        patient.tests.forEach(test =>{
                        if(test.testResult == filter.value){
                          newList.push(patient);
                        }
                      })
                    }
                  })
                  this.patientDatasTemp = newList;
                  return;
                }
              })
              
            break;
          // ... more cases ...
          default:
      }
    }
      

  public disableAllFilters() {
      this.genericMethodService.disableAllFilters(this.filters);
  }

  public onRefresh(){
    this.disableAllFilters();
    this.patientDatasTemp = this.mainDataService.registryDdkDatas;
    this.filterActiveStatus = false;
  }

  public addTest(patient:RegistryDDKData){
      if(!patient.tests){
        patient.tests = [];
      }
     const newTest: DdkTestData = {
      sample: '',
      test:'',
      method:'',
      readingValue:'',
      dateOfReading:'',
      testResult:'',
      patientId: patient.id,
      dose: '',
      isNew: true
     }

     // Find the index of the base test and insert below it
    patient.tests.splice(0, 0, newTest);
    this.isCreatingTest = true;
  }

  public cancelAddTest(patient:RegistryDDKData){
    
      patient.tests.splice(0, 1);
      this.isCreatingTest = false;
  }

  public confirmAddTest(test: DdkTestData, patient: RegistryDDKData) {
    // Validate required fields
    // if (!test.analizatorName || !test.testMark || !test.lot || 
    //   !test.expirationDateReagens || !test.interpretedResult || !test.numericValueFromAnalizator || 
    //   !test.interpretationForEDelphyn || !test.testMarkForEDelphyn || !test.assayName) {
    //   alert('Please fill all required fields');
    //   return;
    // }
    test.isNew = false;
    delete test.id;
    delete test.code;
    const test1:DdkTestData = this.addTestDataToDatabase(test);
    this.mainDataService.ddkTests.push(test1);
    this.isCreatingTest = false;
    patient.tests[0] = test1;
  }

  public addDDK(){
    const newPatient: RegistryDDKData = {
      name: '',
      surname:'',
      ddkNumber:'',
      dateOfBirth:'',
      centerThatGetsTheBlood:'',
      isNew: true,
      tests:[]
     }
     this.mainDataService.registryDdkDatas.splice(0, 0, newPatient);
     this.isCreatingDDK = true;
  }

   public cancelAddPatient(){
      this.mainDataService.registryDdkDatas.splice(0, 1);
      
      this.isCreatingDDK = false;
    }

  public confirmAddPatient(patient: RegistryDDKData) {
    // Validate required fields
    if (!patient.name || !patient.surname || !patient.centerThatGetsTheBlood || 
      !patient.dateOfBirth || !patient.ddkNumber) {
      alert('Please fill all required fields');
      return;
    }
    patient.isNew = false;
    delete patient.id;
    const test1:RegistryDDKData = this.addDDKToDatabase(patient);
    this.isCreatingDDK = false;
  }

//#region DatabaseCalls
  private addDDKToDatabase(test: RegistryDDKData):RegistryDDKData{
      this.ddkService.addPatient(test).subscribe(
        (response: RegistryDDKData) => {
          if (response != null) {
            return response;
          }
          else {
            alert("Error wont add Analizator Test"); // Handle existing user
            return null;
          }
        },
        (error: HttpErrorResponse) => {
          alert(`Error: ${error.error.message || error.message}`);
        }
      );
      return test;
  }
  

  private addTestDataToDatabase(test: DdkTestData):DdkTestData{
        this.ddkService.addTest(test).subscribe(
          (response: DdkTestData) => {
            if (response != null) {
               return response;
            }
            else {
              alert("Error wont add Analizator Test"); // Handle existing user
              return null;
            }
          },
          (error: HttpErrorResponse) => {
            alert(`Error: ${error.error.message || error.message}`);
          }
        );
        return test;
      }
      //#endregion
  }


