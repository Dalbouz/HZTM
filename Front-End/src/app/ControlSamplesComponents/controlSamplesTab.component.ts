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

 export interface ControlDataPoint {
  date: Date;
  value: number;
  lot: string;
  }

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
            this.sampleDateEnd = this.formatDateToDDMMYYYY(this.sampleDateEnd);
            this.sampleDateStart = this.formatDateToDDMMYYYY(this.sampleDateStart);
            console.log(this.sampleDateStart);
            console.log(this.sampleDateEnd);
            this.getByDate();
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

  private formatDateToDDMMYYYY(dateString: string): string {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}.${month}.${year}`;
}
//#region CallersToBackend
    private getByDate():void{
          this.controlSampleService.getControlSamplesWithingDate(this.sampleDateStart,this.sampleDateEnd).subscribe(
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
// private chart: Chart;
//   private dataPoints: ControlDataPoint[] = [];
//   private mean: number;
//   private sd: number;

//   constructor(private canvas: HTMLCanvasElement) {}

//   public updateChart(data: ControlDataPoint[]) {
//     this.dataPoints = data;
//     this.calculateStatistics();
//     this.renderChart();
//     this.checkWestgardRules();
//   }

//   private calculateStatistics() {
//     const values = this.dataPoints.map(p => p.value);
//     this.mean = values.reduce((a,b) => a + b, 0) / values.length;
//     const variance = values.reduce((a,b) => a + Math.pow(b - this.mean, 2), 0) / values.length;
//     this.sd = Math.sqrt(variance);
//   }

//   private renderChart() {
//     if (this.chart) this.chart.destroy();

//     this.chart = new Chart(this.canvas, {
//       type: 'line',
//       data: {
//         labels: this.dataPoints.map(p => p.date.toISOString().split('T')[0]),
//         datasets: [{
//           label: 'Control Values',
//           data: this.dataPoints.map(p => p.value),
//           borderColor: '#4CAF50',
//           tension: 0.1
//         }]
//       },
//       options: {
//         scales: {
//           x: { type: 'time' },
//           y: {
//             min: this.mean - (4 * this.sd),
//             max: this.mean + (4 * this.sd),
//             grid: {
//               color: (ctx) => this.getGridColor(ctx.tick.value)
//             }
//           }
//         },
//         plugins: {
//           annotation: {
//             annotations: this.getControlLimits()
//           }
//         }
//       }
//     });
//   }

//   private getControlLimits() {
//     return {
//       meanLine: {
//         type: 'line',
//         yMin: this.mean,
//         yMax: this.mean,
//         borderColor: '#2196F3',
//         borderWidth: 2
//       },
//       plus1sd: this.createLimitLine(this.mean + this.sd, '#FFC107'),
//       plus2sd: this.createLimitLine(this.mean + 2*this.sd, '#FF9800'),
//       plus3sd: this.createLimitLine(this.mean + 3*this.sd, '#F44336'),
//       minus1sd: this.createLimitLine(this.mean - this.sd, '#FFC107'),
//       minus2sd: this.createLimitLine(this.mean - 2*this.sd, '#FF9800'),
//       minus3sd: this.createLimitLine(this.mean - 3*this.sd, '#F44336')
//     };
//   }

//   private createLimitLine(value: number, color: string) {
//     return {
//       type: 'line',
//       yMin: value,
//       yMax: value,
//       borderColor: color,
//       borderWidth: 1,
//       borderDash: [5, 5]
//     };
//   }

//   private checkWestgardRules() {
//     const violations = [
//       this.check13sRule(),
//       this.check22sRule(),
//       this.checkR4sRule(),
//       thischeck41sRule(),
//       this.check7TRule()
//     ].filter(v => v.length > 0);

//     this.displayViolations(violations.flat());
//   }

//   private check13sRule(): string[] {
//     return this.dataPoints
//       .filter(p => Math.abs(p.value - this.mean) > 3 * this.sd)
//       .map(p => `1:3s rule violated on ${p.date.toDateString()}`);
//   }

//   // Implement other Westgard rules similarly
// }

// // Initialize chart
// const chart = new LeveyJenningsChart(document.getElementById('ljChart') as HTMLCanvasElement);

// async function generateReport() {
//   const startDate = (document.getElementById('startDate') as HTMLInputElement).value;
//   const endDate = (document.getElementById('endDate') as HTMLInputElement).value;
//   const lot = (document.getElementById('lot') as HTMLInputElement).value;

//   const data = await fetchControlData(startDate, endDate, lot);
//   chart.updateChart(data);
// }

// // Simulated data fetch
// async function fetchControlData(start: string, end: string, lot: string): Promise<ControlDataPoint[]> {
//   // Replace with actual API call
//   return simulateControlData();
// }

// function simulateControlData(): ControlDataPoint[] {
//   // Generate mock data for demonstration
//   const data: ControlDataPoint[] = [];
//   const baseDate = new Date();
//   for (let i = 0; i < 30; i++) {
//     data.push({
//       date: new Date(baseDate.setDate(baseDate.getDate() + 1)),
//       value: 100 + (Math.random() * 4 - 2),
//       lot: 'LOT123'
//     });
//   }
//   return data;
// }
//#endregion
}
