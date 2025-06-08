import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { MainDataService } from '../services/MainData.Services';
import { AnalizatorDeviceData } from '../dataStructure/AnalizatorDeviceData';
import { SifrarnikService } from '../services/Sifrarnik.Service';
import { HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { AssayaData } from '../dataStructure/AssayaData';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-analizatorDevicesSifrarnik',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    FormsModule],
  templateUrl: './analizatorDevicesSifrarnik.component.html',
  styleUrls: ['./analizatorDevicesSifrarnik.component.css']
})
export class AddnalizatorDevicesSifrarnikComponent implements OnInit{
    title = 'hztm_pacient_management';

    public analizatorNames: string[] = [];
    public currentValueSelected:string = '';
    public deviceNameTemp: string = '';
    public selectedAssays: string[] = [''];
    public currentSelectedDevice: AnalizatorDeviceData | undefined;
    

    constructor(
        public mainDataService: MainDataService,
        private router: Router,
        public sifrarnik:SifrarnikService
    ){}

    goBack() {
    // Add your logout logic here (e.g., clear tokens, redirect to login)
    this.router.navigate(['/sifrarnik']);
    }

    ngOnInit(): void {
      this.getAnalizatorDevices();
    }

    public onDeviceChange():void{
      this.selectedAssays = [''];

      if(this.currentValueSelected != '' && this.currentValueSelected != 'create'){
          this.getDeviceById();
      }
      
    }

private addDropdown() {
  this.selectedAssays.push('');
}

removeDropdown(index: number) {
  if (this.selectedAssays.length > 1) {
    this.selectedAssays.splice(index, 1);
  }
}

onSelectionChange(index: number) {
  if (
    index == this.selectedAssays.length - 1 &&
    this.selectedAssays[index]
  ) {
    this.addDropdown();
  }

  console.log(this.selectedAssays.length)
}

  onCancel():void{
    this.selectedAssays = [''];
    this.currentValueSelected = '';
    this.deviceNameTemp ='';
  }

  onConfirm():void{
    const newObj: AnalizatorDeviceData = {
      analizatorName: this.deviceNameTemp
    };
    
    
    // this.selectedAssays.shift();
    this.saveAnalizatorData(newObj);
  }

      public getDeviceById():void{
      this.sifrarnik.getDeviceByID(Number(this.currentValueSelected)).subscribe(
        (response: AnalizatorDeviceData) =>{
           if(response){
            this.currentSelectedDevice = response;
           }

           else{
            alert("NISMO NAŠLI ANALIZATOR UREĐAJE");
           }
        },
        (error: HttpErrorResponse) => {
          alert(`Error: ${error.error.message || error.message}`);
        }
      )
    }

    public getAnalizatorDevices():void{
      this.sifrarnik.getAllAnalizatorDevices().subscribe(
        (response: AnalizatorDeviceData[]) =>{
           if(response){
            this.mainDataService.analizatorDevicesList = response;
            response.forEach(element => {
              this.analizatorNames.push(element.analizatorName);// ?????
            });
           }

           else{
            alert("NISMO NAŠLI ANALIZATOR UREĐAJE");
           }
        },
        (error: HttpErrorResponse) => {
          alert(`Error: ${error.error.message || error.message}`);
        }
      )
    }

    public saveAnalizatorData(newObj: AnalizatorDeviceData):void{
      this.sifrarnik.saveAnalizatorDevice(newObj).subscribe(
        (response: AnalizatorDeviceData) =>{
           if(response){
            this.GetAssayByNames(response);
            this.mainDataService.analizatorDevicesList.push(response);
           }
        },
        (error: HttpErrorResponse) => {
          alert(`Error: ${error.error.message || error.message}`);
        }
      )
    }

    public GetAssayByNames(device: AnalizatorDeviceData):void{
      this.selectedAssays.forEach(element => {
        this.sifrarnik.getAssayByName(element).subscribe(
        (response: AssayaData) =>{
           if(response){
            const newObj:AssayaData = {
                minimalValue:response.minimalValue,
                maximalValue:response.maximalValue,
                analizatorID: device.id?.toString(),
                assayaName:response.assayaName
              }
            this.sifrarnik.SaveAssayaData(newObj).subscribe(
                (response: AssayaData) =>{
                  if(response){
                    this.currentValueSelected = '';
                    this.deviceNameTemp ='';
                    if(device.assayDatas == undefined)
                    {
                      device.assayDatas = [];
                    }
                    device.assayDatas?.push(response);
                  }
                  })
           }

           else{
            alert("NISMO NAŠLI ANALIZATOR UREĐAJE");
           }
        },
        (error: HttpErrorResponse) => {
          alert(`Error: ${error.error.message || error.message} + Nemogu naci assay po imenu`);
        }
      )
      });
      
    }
}