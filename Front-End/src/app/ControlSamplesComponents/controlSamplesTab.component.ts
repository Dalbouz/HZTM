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
// import { Chart, ChartConfiguration, registerables,ChartDataset } from 'chart.js';
import { Chart, TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend, registerables, ChartConfiguration } from 'chart.js';

// Force adapter initialization
import 'chartjs-adapter-date-fns';
import { AnalizatorDeviceData } from '../dataStructure/AnalizatorDeviceData';
import { AssayaData } from '../dataStructure/AssayaData';


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



export class ControlSamplesTabComponent implements OnInit{
    title = 'hztm_pacient_management';


    public sampleDateStart:string ='';
    public sampleDateEnd:string = '';
    public showTable:boolean = false;
    public filterActiveStatus: boolean = false;
    private activeFilter: FiltersEnum | undefined;
    public graphDateStart: string = '';
    public graphDateEnd: string = '';
    public graphControlLot: string = '';

    public selectedDeviceName:string = '';
    public selectedAssayName:string = '';
    public selectedDevice: AnalizatorDeviceData | undefined;
    public selectedAssay: AssayaData | undefined;

    public pozControls: ControlSampleData[] = [];
    public negControls: ControlSampleData[] = [];

    constructor(
        public mainDataService: MainDataService,
        private router: Router,
        private controlSampleService:ControlSampleServices,
        public genericMethods: GenericServices,
        
        
    ){}

     filters = [
        { label: FiltersEnum.analizatorDevice, key: 'analizatorName', active: false, value: '' },
        { label: FiltersEnum.AssayName, key: 'AssayName', active: false, value: '' },

        { label: FiltersEnum.controlSampleLot, key: 'lot', active: false, value: '' },
        // { label: FiltersEnum.controlSampleTestName, key: 'testName', active: false, value: '' },
        { label: FiltersEnum.controlSampleDate, key: 'sampleDate', active: false, value: '' },
       
        
        // Add more filters as needed
      ];

    public goBack():void {
      this.router.navigate([`/home`]);
      this.disableAllFilters();
    }

    ngOnInit(): void {
    //       Chart.register(TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend);
    
    // const config = {
    //   type: 'line',
    //   data: {
    //     datasets: [{
    //       label: 'Demo',
    //       data: [
    //         { x: '2025-06-09', y: 12.1 },
    //         { x: '2025-06-10', y: 13.7 }
    //       ]
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       x: { type: 'time' }
    //     }
    //   }
    // };

    // new Chart(document.getElementById('myChart') as HTMLCanvasElement, config);
  // }
    }

    public toggleFilter(selectedFilter: any):void {
      this.genericMethods.toggleFilter(selectedFilter);


      //if only one filter can be active at a time
      // if(this.filterActiveStatus == false){
      //   selectedFilter.active = true;
      //   this.activeFilter = selectedFilter.label;
      //   this.filterActiveStatus = true;
      // }
      // else{
      //   if(selectedFilter.label == this.activeFilter){
      //     selectedFilter.active = false;
      //     this.filterActiveStatus = false;
      //     this.activeFilter = undefined;
      //   }
      //   else{
      //     this.filters.forEach(filter => {
      //       filter.active = false;
      //     });
      //     selectedFilter.active = true;
      //     this.activeFilter = selectedFilter.label;
      //     this.filterActiveStatus = true;
      //   }
      // }
    }

    public onDeviceSelected(){
      this.mainDataService.analizatorDevicesList.forEach(element => {
        if(element.analizatorName == this.selectedDeviceName){
          this.selectedDevice = element;
          this.filters[0].active = true;
          this.filters[0].value = this.selectedDeviceName;
          return;
        }
      });
    }

    public onAssaySelected(){
      if(!this.selectedDevice?.assayDatas){
        return;
      }
      this.selectedDevice?.assayDatas.forEach(element => {
        if(element.assayaName == this.selectedAssayName){
          this.selectedAssay = element;
          this.filters[1].active = true;
          this.filters[1].value = this.selectedAssayName;
          return;
        }
      });
    }

  public onSearch():void
  {
    //if only one filter can be active at a time
    // if(this.filterActiveStatus == false){
    //   return;
    // }

    if(!this.selectedDevice && !this.selectedAssay){
      return;
    }

    const isSure = window.confirm('Jeste li siguni da želite započeti pretragu?\n(ova pretraga može trajati neko vrijeme)');
      if (isSure) {
          this.filters.forEach(element => {
            if(element.label == FiltersEnum.controlSampleDate && element.active){
              this.sampleDateEnd = this.genericMethods.formatDateToYYYYMMDD(this.sampleDateEnd);
              this.sampleDateStart = this.genericMethods.formatDateToYYYYMMDD(this.sampleDateStart);
              this.getByDate(this.sampleDateStart, this.sampleDateEnd);
              this.showTable = true;
              return;
            }
          });
          this.filterControls();


    //     switch (this.activeFilter) {
    //       case FiltersEnum.controlSampleDate:
    //         console.log(this.sampleDateEnd);
    //         this.sampleDateEnd = this.genericMethods.formatDateToYYYYMMDD(this.sampleDateEnd);
    //         this.sampleDateStart = this.genericMethods.formatDateToYYYYMMDD(this.sampleDateStart);
    //         console.log(this.sampleDateEnd);
    //         this.getByDate(this.sampleDateStart, this.sampleDateEnd, 'ONSEARCH');
    //         break;
    //       case FiltersEnum.controlSampleLot:
    //         this.getByLot();
    //         break;
    //         case FiltersEnum.controlSampleTestName:
    //         this.getByTestName();
    //         break;
    //       // ... more cases ...
    //       default:
    // // code block if no case matches
    //   }
      this.showTable = true;
    }
  }

  public disableAllFilters() {
     this.genericMethods.disableAllFilters(this.filters);
    this.filterActiveStatus = false;
    this.activeFilter = undefined;
    this.selectedDeviceName = '';
    this.selectedDevice = undefined;
    this.selectedAssayName = '';
    this.selectedAssay = undefined;
    this.mainDataService.controlSamples = [];
  }

  public onRefresh(){
    this.disableAllFilters();
  }

// public generateReport():void{
//   this.graphDateEnd = this.genericMethods.formatDateToYYYYMMDD(this.graphDateEnd);
//   this.graphDateStart = this.genericMethods.formatDateToYYYYMMDD(this.graphDateStart);
//   this.getByDate(this.graphDateStart, this.graphDateEnd, 'GRAPH');
// }

//#region PrivateMethods

//#endregion

//#region CallersToBackend
    private getByDate(start:string, end:string):void{
          this.controlSampleService.getControlSamplesWithingDate(start,end).subscribe(
            (response: ControlSampleData[]) => {
              if (response != null) {
                  this.filterControlsByGivenList(response);

                

                  //   let i:number = 0;
                  //   const numberArray: number[] = [];
                  //   response.forEach(data =>{
                  //   if(data.lotControlSamples == this.graphControlLot){ //TU VIDJET STA TOCNO ZNACI PREMA LOTU KOJI LOT DA LI JE LOT TEST ILI LOT CONTROL SAMPLE
                  //     numberArray.push(data.targetValue); //TU TREBAM VIDJET I DODAT U BAZU KOJA JE TO VRIJEDNOST KOJU ON UZIMA MORA BITI NEMA INT VRIJEDNOST
                  //     console.log("Lot: " + data.lotControlSamples);
                  //     i++;
                  //   }
                  // })
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

    // private getByLot():void{
    //   let val:string = '';
    //   this.filters.forEach(f => {
    //       if(f.active){
    //           val = f.value;
    //       }
    //   })
    //   this.controlSampleService.getControlSamplesByLot(val).subscribe(
    //     (response: ControlSampleData[]) => {
    //       if (response != null) {
    //         return this.mainDataService.controlSamples = response;
    //       }
    //       else {
    //         alert("Nismo mogli naći kontrolne uzorke prema zadanim filterima"); // Handle existing user
    //         return null;
    //       }
    //     },
    //     (error: HttpErrorResponse) => {
    //       alert(`Error: ${error.error.message || error.message}`);
    //     }
    //   );
    // }

    // private getByTestName():void{
    //   let val:string = '';
    //   this.filters.forEach(f => {
    //       if(f.active){
    //           val = f.value;
    //       }
    //   })
    //   this.controlSampleService.getControlSamplesByTestName(val).subscribe(
    //     (response: ControlSampleData[]) => {
    //       if (response != null) {
    //         return this.mainDataService.controlSamples = response;
    //       }
    //       else {
    //         alert("Nismo mogli naći kontrolne uzorke prema zadanim filterima"); // Handle existing user
    //         return null;
    //       }
    //     },
    //     (error: HttpErrorResponse) => {
    //       alert(`Error: ${error.error.message || error.message}`);
    //     }
    //   );
    // }

    private filterControls():void{
          this.controlSampleService.getFilteredControls(this.filters).subscribe(
            (response: ControlSampleData[]) => {
              if (response != null) {
                const pozArray:number[] = [];
                const negArray: number[] = [];
                const pozDates:string[]=[];
                const negDates:string[]=[]
                this.mainDataService.controlSamples = response;

                 this.mainDataService.controlSamples.forEach(element => {
                  if(element.controlSampleName.includes("POZ")){
                      this.pozControls.push(element);
                      pozArray.push(element.targetValue);
                      pozDates.push(element.sampleDate);
                  }
                  else if(element.controlSampleName.includes("NEG")){
                    this.negControls.push(element);
                    negArray.push(element.targetValue);
                    negDates.push(element.sampleDate);
                  }
                });
                this.createLeveyJenningsChart('leveyJenningsChartPOZ', pozArray,{ showLegend: true });
                this.createLeveyJenningsChart('leveyJenningsChartNEG', negArray,{ showLegend: true });
                return;
              }
              else {
                alert("Error cant find filtered controls"); // Handle existing user
                return null;
              }
            },
            (error: HttpErrorResponse) => {
              alert(`Error: ${error.error.message || error.message}`);
            }
          );
        }

        private filterControlsByGivenList(list:ControlSampleData[]):void{
          this.controlSampleService.getControlSamplesByFilters(this.filters,list).subscribe(
            (response: ControlSampleData[]) => {
              if (response != null) {
                const pozArray:number[] = [];
                const negArray: number[] = [];
                const pozDates:string[]=[];
                const negDates:string[]=[]
                this.mainDataService.controlSamples = response;

                this.mainDataService.controlSamples.forEach(element => {
                  if(element.controlSampleName.includes("POZ")){
                      this.pozControls.push(element);
                      pozArray.push(element.targetValue);
                      pozDates.push(element.sampleDate);
                  }
                  else if(element.controlSampleName.includes("NEG")){
                    this.negControls.push(element);
                    negArray.push(element.targetValue);
                    negDates.push(element.sampleDate);
                  }
                });
                this.createLeveyJenningsChart('leveyJenningsChartPOZ', pozArray,{ showLegend: true });
                this.createLeveyJenningsChart('leveyJenningsChartNEG', negArray,{ showLegend: true });
                return;
              }
              else {
                alert("Error cant find filtered controls"); // Handle existing user
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

// public createLeveyJenningsChart(
//   canvasId: string,
//   data: number[],
//   dates: string[],
//   options: { showLegend?: boolean } = {}
// ): Chart {
//   // Convert dates to timestamps
//   const timestamps = dates.map(date => new Date(date).getTime());

//   // Calculate statistics
//   const mean = this.calculateMean(data);
//   const sd = this.calculateSD(data, mean);

//   // Create data points
//   const dataPoints: ScatterDataPoint[] = data.map((val, i) => ({
//     x: timestamps[i],
//     y: val
//   }));

//   // Control lines configuration
//   const controlLines = [
//     { value: mean + 3 * sd, color: 'red', label: '+3SD' },
//     { value: mean + 2 * sd, color: 'orange', label: '+2SD' },
//     { value: mean + sd, color: 'yellow', label: '+1SD' },
//     { value: mean, color: 'green', label: 'Mean' },
//     { value: mean - sd, color: 'yellow', label: '-1SD' },
//     { value: mean - 2 * sd, color: 'orange', label: '-2SD' },
//     { value: mean - 3 * sd, color: 'red', label: '-3SD' },
//   ];

//   // Chart configuration
//   const config: ChartConfiguration<'line', ScatterDataPoint[]> = {
//     type: 'line',
//     data: {
//       datasets: [
//         {
//           label: 'Measurement Values',
//           data: dataPoints,
//           borderColor: '#2196F3',
//           backgroundColor: '#2196F3',
//           tension: 0,
//           pointRadius: 4,
//           pointHoverRadius: 6
//         },
//         ...controlLines.map(line => ({
//           label: line.label,
//           data: timestamps.map(ts => ({ x: ts, y: line.value })),
//           borderColor: line.color,
//           borderDash: [5, 5],
//           pointRadius: 0,
//           borderWidth: 1.5
//         }))
//       ]
//     },
//     options: {
//       responsive: true,
//       maintainAspectRatio: false,
//       plugins: {
//         legend: {
//           display: options.showLegend ?? true,
//           position: 'top'
//         },
//         tooltip: {
//           mode: 'index',
//           intersect: false,
//           callbacks: {
//             title: (items) => {
//               const date = new Date(items[0].parsed.x);
//               return date.toLocaleDateString();
//             }
//           }
//         }
//       },
//       scales: {
//         x: {
//           type: 'time',
//           time: {
//             unit: 'day',
//             tooltipFormat: 'MMM dd, yyyy'
//           },
//           title: {
//             display: true,
//             text: 'Date'
//           }
//         },
//         y: {
//           title: {
//             display: true,
//             text: 'Measurement Values'
//           },
//           beginAtZero: false
//         }
//       }
//     }
//   };

//   return new Chart(document.getElementById(canvasId) as HTMLCanvasElement, config);
// }

  //OLD
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
            tension: 0,
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