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

@Component({
  selector: 'app-analizatorTestsTab',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    FormsModule],
  templateUrl: './analizatorTestsTab.component.html',
  styleUrls: ['./analizatorTestsTab.component.css']
})
export class AnalizatorTestsTabComponent {
    title = 'hztm_pacient_management';

    constructor(
        public mainDataService: MainDataService,
        private router: Router,
        private analizatorService:AnalizatorServices
    ){}

    goBack() {
      this.router.navigate([`/home`]);
    }

  autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Reset height
    textarea.style.height = textarea.scrollHeight + 'px'; // Set to scrollHeight
  }

  confirmDelete(analizator: AnalizatorData) {
    if(this.mainDataService.currentUser.securityLevelStatus != SecurityLevel.High){
      return;
    }

    const userName = prompt('Enter username:');
    const password = prompt('Enter password:');
    const userNameAdmin = prompt('Enter admin username:');
    const passwordAdmin = prompt('Enter admin password:');
    if (userName == this.mainDataService.currentUser.userName && this.mainDataService.currentUser.password == password &&
      userNameAdmin == this.mainDataService.adminUserName && this.mainDataService.adminPassword == passwordAdmin
    ) {
      analizator.testStatus = 'DELETE';
      
      this.analizatorService.updateAnalizator(analizator, analizator.id);
      
    } else {
      alert('Invalid credentials!');
    }
}

archiveAnalizator(analizator: AnalizatorData) {
  if (analizator.validated == ValidationStatus.Validated && this.mainDataService.currentUser.securityLevelStatus == SecurityLevel.High) {
    const isSure = window.confirm('Želite li arhivirati test za uzorak:' + " " + analizator.sampleNumber + " " + "za pacijenta:" + " " + analizator.specimentID +"?");
    if (isSure) {
      analizator.testStatus = TestStatusEnum.Active;
      const now = new Date();
      analizator.testWasValidatedBy = this.mainDataService.currentUser.fullName + " / " + now.toLocaleDateString() + " / " + now.toLocaleTimeString();
      this.analizatorService.addAnalizatorData(analizator);//kreiraj novi analizator sa novim podacima

      analizator.testWasValidatedBy="";
      analizator.validated = ValidationStatus.NotValidated;
      analizator.testStatus = TestStatusEnum.Deleted;
      this.analizatorService.updateAnalizator(analizator, analizator.id); //updejtaj onaj stari tako da je deleted
    }
  }
}

confirmValidate(analizator: AnalizatorData) {
  if(this.mainDataService.currentUser.securityLevelStatus == SecurityLevel.Low){
      return;
    }
    
  const adminUser = prompt('Enter username:');
  const adminPass = prompt('Enter password:');

  if (this.mainDataService.currentUser.userName == adminUser && this.mainDataService.currentUser.password == adminPass) {
    analizator.validated = ValidationStatus.Validated;
    this.analizatorService.updateAnalizator(analizator, analizator.id)
  } else {
    alert('Invalid credentials!');
  }
}
}
