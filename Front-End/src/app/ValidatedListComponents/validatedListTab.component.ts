import { CommonModule, CurrencyPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { MainDataService } from '../services/MainData.Services';
import { GenericServices } from '../services/GenericMethods.Service';
import { ControlSampleServices } from '../services/ControlSample.Service';
import { FiltersEnum } from '../dataStructure/FiltersEnum';
import { AnalizatorData } from '../dataStructure/AnalizatorData';
import { ValidationStatus } from '../dataStructure/ValidationStatus';

@Component({
  selector: 'app-validatedListTab',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    FormsModule],
  templateUrl: './validatedListTab.component.html',
  styleUrls: ['./validatedListTab.component.css']
})



export class ValidatedListTabComponent implements OnInit, OnDestroy{
    title = 'hztm_pacient_management';

    public filteredValidatedTests: AnalizatorData[] = [];
    public filteredListTemp: AnalizatorData[] = [];
    public filteringDate:string ='';
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
        { label: FiltersEnum.dateOfReading, key: 'dateOfReading', active: false, value: '' },
        { label: FiltersEnum.sampleNumber, key: 'sampleNumber', active: false, value: '' },
        { label: FiltersEnum.AssayName, key: 'assayName', active: false, value: '' },
        
        // Add more filters as needed
      ];

      ngOnInit(): void {
        this.getValidatedTests();
      }

      ngOnDestroy(): void {
        
      }

    public goBack():void {
      this.router.navigate([`/analizatorTestsTab`]);
      this.disableAllFilters();
    }

    public toggleFilter(selectedFilter: any):void {
      this.genericMethods.toggleFilter(selectedFilter);
    }

  public onSearch():void
  {
    const isSure = window.confirm('Jeste li siguni da želite započeti pretragu?\n(ova pretraga može trajati neko vrijeme)');
      if (isSure) {
        this.filteredListTemp = [];
        this.filteredListTemp = this.genericMethods.getFilteredArrayOnSearch(this.filters,this.filteredValidatedTests);
        this.showTable = true;
    }
  }

  public disableAllFilters() {
     this.genericMethods.disableAllFilters(this.filters);
  }

  public onRefresh(){
    this.disableAllFilters();
    
  }

  
//#region PrivateMethods
    private getValidatedTests():void{
      this.mainDataService.analizatorDatas.forEach(analizatorTest=>{
        if(analizatorTest.validated == ValidationStatus.Validated){
          this.filteredValidatedTests.push(analizatorTest);
        }
      })
    }

    private formatDateToDDMMYYYY(dateString: string): string {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`;
  }

}
