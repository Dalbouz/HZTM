import { CommonModule, CurrencyPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { MainDataService } from '../services/MainData.Services';
import { GenericServices } from '../services/GenericMethods.Service';
import { ControlSampleServices } from '../services/ControlSample.Service';
import { FiltersEnum } from '../dataStructure/FiltersEnum';
import { ControlSampleData } from '../dataStructure/ControlSampleData';
import { HttpErrorResponse } from '@angular/common/http';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

 export interface ControlDataPoint {
  date: Date;
  value: number;
  lot: string;
  }


Chart.register(...registerables);

@Component({
  selector: 'app-controlSamplesTab',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    FormsModule],
  templateUrl: './controlSamplesTab.component.html',
  styleUrls: ['./controlSamplesTab.component.css']
})



export class ControlSamplesTabComponent {
    title = 'hztm_pacient_management';


    public sampleDateStart:string ='';
    public sampleDateEnd:string = '';
    public showTable:boolean = false;
    public filterActiveStatus: boolean = false;
    private activeFilter: FiltersEnum | undefined;
    public graphDateStart: string = '';
    public graphDateEnd: string = '';
    public graphControlLot: string = '';

    constructor(
        public mainDataService: MainDataService,
        private router: Router,
        private controlSampleService:ControlSampleServices,
        public genericMethods: GenericServices
    ){}

     filters = [
        { label: FiltersEnum.controlSampleLot, key: 'lotTest', active: false, value: '' },
        { label: FiltersEnum.controlSampleTestName, key: 'testName', active: false, value: '' },
        { label: FiltersEnum.controlSampleDate, key: 'sampleDate', active: false, value: '' },
        
        // Add more filters as needed
      ];

    public goBack():void {
      this.router.navigate([`/home`]);
      this.disableAllFilters();
    }

    public toggleFilter(selectedFilter: any):void {
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
    }

  public onSearch():void
  {
    if(this.filterActiveStatus == false){
      return;
    }

    const isSure = window.confirm('Jeste li siguni da želite započeti pretragu?\n(ova pretraga može trajati neko vrijeme)');
      if (isSure) {
        switch (this.activeFilter) {
          case FiltersEnum.controlSampleDate:
            console.log(this.sampleDateEnd);
            this.sampleDateEnd = this.genericMethods.formatDateToYYYYMMDD(this.sampleDateEnd);
            this.sampleDateStart = this.genericMethods.formatDateToYYYYMMDD(this.sampleDateStart);
            console.log(this.sampleDateEnd);
            this.getByDate(this.sampleDateStart, this.sampleDateEnd, 'ONSEARCH');
            break;
          case FiltersEnum.controlSampleLot:
            this.getByLot();
            break;
            case FiltersEnum.controlSampleTestName:
            this.getByTestName();
            break;
          // ... more cases ...
          default:
    // code block if no case matches
      }
      this.showTable = true;
    }
  }

  public disableAllFilters() {
     this.genericMethods.disableAllFilters(this.filters);
    this.filterActiveStatus = false;
    this.activeFilter = undefined;
  }

  public onRefresh(){
    this.disableAllFilters();
  }

public generateReport():void{
  this.graphDateEnd = this.genericMethods.formatDateToYYYYMMDD(this.graphDateEnd);
  this.graphDateStart = this.genericMethods.formatDateToYYYYMMDD(this.graphDateStart);
  this.getByDate(this.graphDateStart, this.graphDateEnd, 'GRAPH');
}

//#region PrivateMethods

//#endregion

//#region CallersToBackend
    private getByDate(start:string, end:string, caller:string):void{
          this.controlSampleService.getControlSamplesWithingDate(start,end).subscribe(
            (response: ControlSampleData[]) => {
              if (response != null) {
                if(caller == 'ONSEARCH'){
                  return this.mainDataService.controlSamples = response;
                }
                else if(caller == 'GRAPH'){
                  const numberArray: number[] = Array.from({ length: 15 }, () =>
                  Math.floor(Math.random() * (1000 - 50 + 1)) + 5);

                  //   let i:number = 0;
                  //   const numberArray: number[] = [];
                  //   response.forEach(data =>{
                  //   if(data.lotControlSamples == this.graphControlLot){ //TU VIDJET STA TOCNO ZNACI PREMA LOTU KOJI LOT DA LI JE LOT TEST ILI LOT CONTROL SAMPLE
                  //     numberArray.push(data.targetValue); //TU TREBAM VIDJET I DODAT U BAZU KOJA JE TO VRIJEDNOST KOJU ON UZIMA MORA BITI NEMA INT VRIJEDNOST
                  //     console.log("Lot: " + data.lotControlSamples);
                  //     i++;
                  //   }
                  // })
                  this.createLeveyJenningsChart('leveyJenningsChart', numberArray, { showLegend: true });
                  return null;
                }
                return null;
              }
              else {
                alert("Nismo mogli naći kontrolne uzorke prema zadanim filterima"); // Handle existing user
                return null;
              }
            },
            (error: HttpErrorResponse) => {
              alert(`Error: ${error.error.message || error.message}`);
            }
          );
        }

    private getByLot():void{
      let val:string = '';
      this.filters.forEach(f => {
          if(f.active){
              val = f.value;
          }
      })
      this.controlSampleService.getControlSamplesByLot(val).subscribe(
        (response: ControlSampleData[]) => {
          if (response != null) {
            return this.mainDataService.controlSamples = response;
          }
          else {
            alert("Nismo mogli naći kontrolne uzorke prema zadanim filterima"); // Handle existing user
            return null;
          }
        },
        (error: HttpErrorResponse) => {
          alert(`Error: ${error.error.message || error.message}`);
        }
      );
    }

    private getByTestName():void{
      let val:string = '';
      this.filters.forEach(f => {
          if(f.active){
              val = f.value;
          }
      })
      this.controlSampleService.getControlSamplesByTestName(val).subscribe(
        (response: ControlSampleData[]) => {
          if (response != null) {
            return this.mainDataService.controlSamples = response;
          }
          else {
            alert("Nismo mogli naći kontrolne uzorke prema zadanim filterima"); // Handle existing user
            return null;
          }
        },
        (error: HttpErrorResponse) => {
          alert(`Error: ${error.error.message || error.message}`);
        }
      );
    }
//#endregion

//#region Chart
  public calculateMean(data: number[]): number {
    return data.reduce((sum, val) => sum + val, 0) / data.length;
  }

  public calculateSD(data: number[], mean: number): number {
    const variance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length;
    return Math.sqrt(variance);
  }

  public createLeveyJenningsChart(
    canvasId: string,
    data: number[],
    options: { showLegend?: boolean } = {}
  ): Chart {
    const labels = data.map((_, i) => (i + 1).toString());
    const mean = this.calculateMean(data);
    const sd = this.calculateSD(data, mean);

    const controlLines = [
      { value: mean + 3 * sd, color: 'red', label: '+3SD' },
      { value: mean + 2 * sd, color: 'orange', label: '+2SD' },
      { value: mean + sd, color: 'yellow', label: '+1SD' },
      { value: mean, color: 'green', label: 'Mean' },
      { value: mean - sd, color: 'yellow', label: '-1SD' },
      { value: mean - 2 * sd, color: 'orange', label: '-2SD' },
      { value: mean - 3 * sd, color: 'red', label: '-3SD' },
    ];

    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Measurement Values',
            data,
            borderColor: '#2196F3',
            backgroundColor: '#2196F3',
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6
          },
          ...controlLines.map(line => ({
            label: line.label,
            data: Array(data.length).fill(line.value),
            borderColor: line.color,
            borderDash: [5, 5],
            pointRadius: 0,
            borderWidth: 1.5
          }))
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: options.showLegend ?? true,
            position: 'top'
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Measurement Sequence'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Measurement Values'
            },
            beginAtZero: false
          }
        }
      }
    };

    return new Chart(document.getElementById(canvasId) as HTMLCanvasElement, config);
  }
//#endregion
}