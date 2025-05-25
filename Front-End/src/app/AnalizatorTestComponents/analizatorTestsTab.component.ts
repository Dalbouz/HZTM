import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-analizatorTestsTab',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    FormsModule],
  templateUrl: './analizatorTestsTab.component.html',
  styleUrls: ['./analizatorTestsTab.component.css']
})
export class AnalizatorTestsTabComponent implements OnInit{
    title = 'hztm_pacient_management';

    filteredAnalizatorTests: AnalizatorData[] = [];

    filters = [
    { label: FiltersEnum.analizatorName, key: 'analizatorName', active: false, value: '' },
    { label: FiltersEnum.assayName, key: 'assayTest', active: false, value: '' },
    { label: FiltersEnum.dateOfReading, key: 'dateOfReading', active: false, value: '' },
    { label: FiltersEnum.timeOfReading, key: 'timeOfReading', active: false, value: '' },
    { label: FiltersEnum.sampleNumber, key: 'sampleNumber', active: false, value: '' },
    
    // Add more filters as needed
  ];

   ngOnInit():void{
      this.filteredAnalizatorTests = this.mainDataService.analizatorDatas;
  }

    constructor(
        public mainDataService: MainDataService,
        private router: Router,
        private analizatorService:AnalizatorServices,
        public genericMethods: GenericServices
    ){}

    public goBack():void {
      this.router.navigate([`/home`]);
      this.filteredAnalizatorTests = this.mainDataService.analizatorDatas;
      this.disableAllFilters();
    }

    public toggleFilter(filter: any) {
    this.genericMethods.toggleFilter(filter);
  }

  public autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Reset height
    textarea.style.height = textarea.scrollHeight + 'px'; // Set to scrollHeight
  }

  public confirmDelete(analizator: AnalizatorData):void {
    alert(analizator.specimenID);
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

  public archiveAnalizator(analizator: AnalizatorData):void {
    if (analizator.validated == ValidationStatus.Validated && this.mainDataService.currentUser.securityLevelStatus == SecurityLevel.High) {
      const isSure = window.confirm('Želite li arhivirati test za uzorak:' + " " + analizator.sampleNumber + " " + "za pacijenta:" + " " + analizator.specimenID +"?");
      if (isSure) {
        analizator.testStatus = TestStatusEnum.Archived;
        const now = new Date();
        analizator.testWasValidatedBy = this.mainDataService.currentUser.fullName + " / " + now.toLocaleDateString() + " / " + now.toLocaleTimeString();
        this.addAnalizatorData(analizator);//kreiraj novi analizator sa novim podacima
      }
    }
  }

  public confirmValidate(analizator: AnalizatorData):void {
    if(this.mainDataService.currentUser.securityLevelStatus == SecurityLevel.Low){
        return;
      }
      
    const adminUser = prompt('Enter username:');
    if(this.mainDataService.currentUser.userName == adminUser){

      const adminPass = prompt('Enter password:');
      if(this.mainDataService.currentUser.password == adminPass){
        analizator.validated = ValidationStatus.Validated;
        this.updateAnalizatorData(analizator, analizator.id);
      }
      else{
        alert("Password je netočan!");
      }
    }
    else{
      alert("Username je netočan!");
    }
  }

  public onSearch():void
  {
    this.filteredAnalizatorTests = this.genericMethods.getFilteredArrayOnSearch(this.filters, this.mainDataService.analizatorDatas)
  }

  public disableAllFilters() {
      this.genericMethods.disableAllFilters(this.filters);
  }

  public onRefresh(){
    this.disableAllFilters();
    this.filteredAnalizatorTests = this.mainDataService.analizatorDatas;
  }
//#region CallersToBackend
  private addAnalizatorData(analizator: AnalizatorData):void{
      this.analizatorService.addAnalizatorData(analizator).subscribe(
        (response: AnalizatorData) => {
          if (response != null) {
            this.mainDataService.analizatorDatas.push(response);
          }
          else {
            alert("Error wont add Analizator Test"); // Handle existing user
          }
        },
        (error: HttpErrorResponse) => {
          alert(`Error: ${error.error.message || error.message}`);
        }
      );
    }

    private updateAnalizatorData(analizator: AnalizatorData, id:number):void{
      this.analizatorService.updateAnalizator(analizator, id).subscribe(
        (response: AnalizatorData) => {
          if (response != null) {
            this.mainDataService.analizatorDatas = this.genericMethods.replaceObjectById(this.mainDataService.analizatorDatas, response);
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
  //#endregion
}
