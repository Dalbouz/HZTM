import { CommonModule, CurrencyPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { MainDataService } from '../services/MainData.Services';
import { AnalizatorData } from '../dataStructure/AnalizatorData';
import { SecurityLevel } from '../dataStructure/SecurityLevel';
import { AnalizatorServices } from '../services/Analizator.Services';
import { ValidationStatus } from '../dataStructure/ValidationStatus';
import { TestStatusEnum } from '../dataStructure/TestStatusEnum';
import { FiltersEnum } from '../dataStructure/FiltersEnum';
import { GenericServices } from '../services/GenericMethods.Service';
import { HttpErrorResponse } from '@angular/common/http';
import { PatientService } from '../services/Patient.Services';

@Component({
  selector: 'app-analizatorTestsTab',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    FormsModule],
  templateUrl: './analizatorTestsTab.component.html',
  styleUrls: ['./analizatorTestsTab.component.css']
})
export class AnalizatorTestsTabComponent implements OnInit, AfterViewInit, OnDestroy{
    title = 'hztm_pacient_management';

    public addingIndex: number = -1;
    public isEditing:boolean = false;
    public isTestSelected:boolean = false;
    public menuOpen:boolean = false;
    // private editedAnalizatorTemp: AnalizatorData | undefined;
    // private currentlyEditedAnalizator: AnalizatorData | undefined;
    private currentSelectedAnalizator: AnalizatorData | undefined;
    public showFromIndex:number = 0;
    private numberOfShownTests: number = 20;

    filteredAnalizatorTests: AnalizatorData[] = [];
    fullAnalizazorDataList: AnalizatorData[] = [];
    
    @ViewChildren('TextareaNotes') textareaNoteRefs!: QueryList<ElementRef<HTMLTextAreaElement>>;
    @ViewChildren('TextareaFinalResult') textareaFinalResultRefs!: QueryList<ElementRef<HTMLTextAreaElement>>;
    
    filters = [
    { label: FiltersEnum.validated, key: 'validated', active: true, value: ValidationStatus.NotValidated },
    { label: FiltersEnum.analizatorName, key: 'analizatorName', active: false, value: '' },
    { label: FiltersEnum.AssayName, key: 'AssayName', active: false, value: '' },
    { label: FiltersEnum.dateOfReading, key: 'dateOfReading', active: false, value: '' },
    // { label: FiltersEnum.timeOfReading, key: 'timeOfReading', active: false, value: '' },
    { label: FiltersEnum.sampleNumber, key: 'sampleNumber', active: false, value: '' },
    { label: FiltersEnum.specimenID, key: 'specimenID', active: false, value: '' },
    
    
    // Add more filters as needed
  ];

  constructor(
      public mainDataService: MainDataService,
      private router: Router,
      private analizatorService:AnalizatorServices,
      public genericMethods: GenericServices,
      public patientService: PatientService
  ){}

  ngOnDestroy(): void {
    this.clearAddingTestIfNotConfirmed();
    // this.clearVariablesForEditing();
    this.fullAnalizazorDataList = this.mainDataService.activeAnalizators;
    this.menuOpen = false;

    this.showFromIndex = 0;
    this.showList(0);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
        // Combine both sets of textarea references
        const allTextareas = [
          ...this.textareaNoteRefs.toArray(),
          ...this.textareaFinalResultRefs.toArray()
        ];

        // Auto-resize all textareas
        allTextareas.forEach(ref => {
          this.autoResize({ target: ref.nativeElement } as unknown as Event);
        });
      });
    this.clearAddingTestIfNotConfirmed();
    // this.clearVariablesForEditing();
    this.menuOpen = false;
  }

  ngOnInit():void{
      this.clearAddingTestIfNotConfirmed();
      // this.clearVariablesForEditing();
      this.menuOpen = false;
      
      this.fullAnalizazorDataList = this.mainDataService.activeAnalizators;
      this.showFromIndex = 0;
      this.showList(0);
  }

  public showList(value:number){
    this.filteredAnalizatorTests = [];
    if(value == 0){
      this.showFromIndex -= this.numberOfShownTests;
      if(this.showFromIndex < 0){
        this.showFromIndex = 0;
      }
    }
    else if(value == 1){
      this.showFromIndex += this.numberOfShownTests;
      if(this.showFromIndex > this.fullAnalizazorDataList.length){
        this.showFromIndex = this.fullAnalizazorDataList.length;
      }
    }

    for(let i = this.showFromIndex; i < this.numberOfShownTests + this.showFromIndex && i < this.fullAnalizazorDataList.length; i++){
      this.filteredAnalizatorTests.push(this.fullAnalizazorDataList[i]);
    }
  }

  public onRefresh(){
    this.disableAllFilters();

    this.fullAnalizazorDataList = this.mainDataService.activeAnalizators;
    this.showFromIndex = 0;
    this.showList(0);
    // this.clearAddingTestIfNotConfirmed();
  }

  public goBack():void {
    this.router.navigate([`/home`]);
    this.fullAnalizazorDataList = this.mainDataService.activeAnalizators;
    this.disableAllFilters();
    this.clearAddingTestIfNotConfirmed();
    // this.clearVariablesForEditing();
    this.menuOpen = false;

    this.showFromIndex = 0;
    this.showList(0);
  }

  public navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  public toggleFilter(filter: any) {
  this.genericMethods.toggleFilter(filter);
  }

  public disableAllFilters() {
      this.genericMethods.disableAllFilters(this.filters);
  }

  public autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Reset height
    textarea.style.height = textarea.scrollHeight + 'px'; // Set to scrollHeight
  }

  public onSearch():void
  {
    // this.filteredAnalizatorTests = this.genericMethods.getFilteredArrayOnSearch(this.filters, this.mainDataService.analizatorDatas) //old method using filter in front end
    this.filters[0].active = true;//set the validated filter to true
    this.filterAnalizators();
  }

  public expandTest(analizator: AnalizatorData){
    if(this.isEditing){
      return;
    }
    if(this.currentSelectedAnalizator == undefined){
      this.currentSelectedAnalizator = analizator;
      analizator.isSelected = true;
      this.isTestSelected = true;
      return;
    }

    if(this.currentSelectedAnalizator == analizator){
      this.currentSelectedAnalizator = undefined;
      analizator.isSelected = false;
      this.isTestSelected = false;
    }
  }

  public validateAll(){
    const isSure = window.confirm('Želite li validirati sve vidljive testove?');
      if (isSure) {
        this.filteredAnalizatorTests.forEach(test=>{
          test.validated = ValidationStatus.Validated;
          test.dateOfValidation = new Date().toISOString().split('T')[0];
          const now = new Date();
          test.testWasValidatedBy = this.mainDataService.currentUser.fullName + " / " + now.toLocaleDateString() + " / " + now.toLocaleTimeString();
          this.updateAnalizatorData(test, test.id);
          this.mainDataService.validatedAnalizators.push(test);
        })
      }
  }

//#region ActionButtons
  public confirmDelete(analizator: AnalizatorData):void {
    if(this.mainDataService.currentUser.securityLevelStatus != SecurityLevel.High){
      return;
    }

    const userName = prompt('Enter username:');
    if(userName == this.mainDataService.currentUser.userName){
      const password = prompt('Enter password:');
      if(password == this.mainDataService.currentUser.password ){
        const userNameAdmin = prompt('Enter admin username:');
        if(userNameAdmin == this.mainDataService.adminUserName){
          const passwordAdmin = prompt('Enter admin password:');
          if(this.mainDataService.adminPassword == passwordAdmin){

            analizator.testStatus = TestStatusEnum.Deleted;
            if(analizator.id != undefined)
              this.analizatorService.updateAnalizator(analizator, analizator.id);
          }
          else{
            alert("Admin password je netočan!");
          }
        }
        else{
          alert("Admin username je netočan!");
        }
      }
      else{
        alert("Password je netočan!");
      }
    }
    else{
      alert("Username je netočan!");
    }
  }

  // public archiveAnalizator(analizator: AnalizatorData):void {
  //   if (analizator.validated == ValidationStatus.Validated && this.mainDataService.currentUser.securityLevelStatus == SecurityLevel.High) {
  //     const isSure = window.confirm('Želite li arhivirati test za uzorak:' + " " + analizator.sampleNumber + " " + "za pacijenta:" + " " + analizator.specimenID +"?");
  //     if (isSure) {
  //       analizator.testStatus = TestStatusEnum.Archived;
  //       const now = new Date();
  //       analizator.testWasValidatedBy = this.mainDataService.currentUser.fullName + " / " + now.toLocaleDateString() + " / " + now.toLocaleTimeString();
  //       this.updateAnalizatorData(analizator, analizator.id);
  //     }
  //   }
  // }

  public confirmValidate(analizator: AnalizatorData):void {
    if(this.mainDataService.currentUser.securityLevelStatus == SecurityLevel.Low){
        return;
      }
      
    const adminUser = prompt('Enter username:');
    if(this.mainDataService.currentUser.userName == adminUser){

      const adminPass = prompt('Enter password:');
      if(this.mainDataService.currentUser.password == adminPass){
        analizator.validated = ValidationStatus.Validated;
        if(analizator.id != undefined)
          analizator.dateOfValidation = new Date().toISOString().split('T')[0];
          const now = new Date();
          analizator.testWasValidatedBy = this.mainDataService.currentUser.fullName + " / " + now.toLocaleDateString() + " / " + now.toLocaleTimeString();
          this.updateAnalizatorData(analizator, analizator.id);
          this.mainDataService.validatedAnalizators.push(analizator);
      }
      else{
        alert("Password je netočan!");
      }
    }
    else{
      alert("Username je netočan!");
    }
  }
//#endregion

//#region EditingAnalizators
  // public editAnalizator(analizator:AnalizatorData):void{
  //   if(this.mainDataService.currentUser.securityLevelStatus != SecurityLevel.High){
  //     return;
  //   }

  //   if(this.isEditing){
  //     return;
  //   }

  //   this.isEditing = true;
  //   analizator.isEdited = true;
  //   this.editedAnalizatorTemp = {...analizator};
  //   this.currentlyEditedAnalizator = analizator;
  // }

  // public confirmEdit(analizator: AnalizatorData){
  //   if(analizator.isEdited && this.isEditing){
  //     this.updateAnalizatorData(analizator, analizator.id);
  //     this.clearVariablesForEditing();
  //   }
  // }

  // public cancelEdit(analizator: AnalizatorData){
  //   if (this.editedAnalizatorTemp != null) {
  //   Object.assign(analizator, this.editedAnalizatorTemp);
  //   }
  //   this.clearVariablesForEditing();
  // }

  // private clearVariablesForEditing(){
  //   this.editedAnalizatorTemp = undefined;
  //   this.isEditing = false;
  //   if(this.currentlyEditedAnalizator){
  //     this.currentlyEditedAnalizator.isEdited = false;
  //     this.currentlyEditedAnalizator = undefined;
  //   }
  // }
//#endregion

//#region AddingAnalizator
  public addTest(baseTest: AnalizatorData){
     
  // Create a copy of the base test with default values
  const newTest: AnalizatorData = {
    ...baseTest,
    analizatorName: '', // You can override or set new values below
    testMark: '',
    interpretedResult: '',
    numericValueFromAnalizator:'',
    interpretationForEDelphyn: '',
    testMarkForEDelphyn: '',
    testWasValidatedBy: '',
    lot: '',
    expirationDateReagens: '',
    assayName: '',
    isNew: true,
    isSelected: true,
    validated: ValidationStatus.NotValidated,
    testStatus: TestStatusEnum.Active,
    dateOfReading: new Date().toISOString().split('T')[0],
    timeOfReading: new Date().toLocaleTimeString(),
    notes: '',
    finalResult:'',
    dataValue: '',
    idOcitanjaAnalizatora: ''
  };

  // Find the index of the base test and insert below it
  const index = this.filteredAnalizatorTests.indexOf(baseTest);
  this.filteredAnalizatorTests.splice(index + 1, 0, newTest);
  this.addingIndex = index + 1;
  this.isEditing = true;

  if(this.currentSelectedAnalizator){
    this.currentSelectedAnalizator.isSelected = false;
    this.currentSelectedAnalizator = undefined;
  }
  this.isTestSelected = true;
  }

  public confirmAdd(test: AnalizatorData) {
    // Validate required fields
    if (!test.analizatorName || !test.testMark || !test.lot || 
      !test.expirationDateReagens || !test.interpretedResult || !test.numericValueFromAnalizator || 
      !test.interpretationForEDelphyn || !test.testMarkForEDelphyn || !test.assayName) {
      alert('Please fill all required fields');
      return;
    }
    test.isNew = false;
    test.isSelected = false;
    this.addingIndex = -1;
    delete test.id;
    const test1:AnalizatorData = this.addAnalizatorData(test);
    this.mainDataService.patients.forEach(patient =>{
      if(patient.specimentID == test1.specimenID){
        patient.analizatorDatas.push(test1);
        return;
      }
    })
    this.isEditing = false;
    this.isTestSelected = false;
  }

  public cancelAdd(test: AnalizatorData){
    this.clearAddingTestIfNotConfirmed();
  }

  private clearAddingTestIfNotConfirmed(){
    if(this.addingIndex > 0){
      this.filteredAnalizatorTests.splice(this.addingIndex, 1);
      this.addingIndex = -1;
      this.isEditing = false;
      this.isTestSelected = false;
    }
  }
//#endregion

//#region CallersToBackend
  private addAnalizatorData(analizator: AnalizatorData):AnalizatorData{
      this.analizatorService.addAnalizatorData(analizator).subscribe(
        (response: AnalizatorData) => {
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
      return analizator;
    }

    private updateAnalizatorData(analizator: AnalizatorData, id:number = -1):void{
      this.analizatorService.updateAnalizator(analizator, id).subscribe(
        (response: AnalizatorData) => {
          if (response != null) {
            this.mainDataService.activeAnalizators = this.genericMethods.replaceObjectById(this.mainDataService.activeAnalizators, response);
          }
          else {
            alert("Error wont update Analizator Test"); // Handle existing user
          }
        },
        (error: HttpErrorResponse) => {
          alert(`Error: ${error.error.message || error.message}`);
        }
      );
    }

    // private findPatientBySpecimenID(specimenID:string):void{
    //   this.patientService.getPatientBySpecimenID(specimenID).subscribe(
    //     (response: PatientData) => {
    //       if (response != null) {
    //          return response;
    //       }
    //       else {
    //         alert("Error wont add Analizator Test"); // Handle existing user
    //         return null;
    //       }
    //     },
    //     (error: HttpErrorResponse) => {
    //       alert(`Error: ${error.error.message || error.message}`);
    //     }
    //   );
    // }

    private filterAnalizators():void{
      this.analizatorService.filterAnalizators(this.filters).subscribe(
        (response: AnalizatorData[]) => {
          if (response != null) {
            this.fullAnalizazorDataList = response;

            this.showFromIndex = 0;
            this.showList(0);
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
    }
  //#endregion
}
