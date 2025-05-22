import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { MainDataService } from '../services/MainData.Services';
import { AnalizatorData } from '../dataStructure/AnalizatorData';
import { SecurityLevel } from '../dataStructure/SecurityLevel';

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

    const adminUser = prompt('Enter username:');
    const adminPass = prompt('Enter password:');
    if (adminUser== this.mainDataService.currentUser.userName && this.mainDataService.currentUser.password == adminPass) {
      analizator.testStatus = 'DELETE';
      // napraviti update na trenutnom testu na bazi
    } else {
      alert('Invalid credentials!');
    }
}

archiveAnalizator(analizator: AnalizatorData) {
  if (analizator.validated === 'VALIDATED' && this.mainDataService.currentUser.securityLevelStatus == SecurityLevel.High) {
    const isSure = window.confirm('Želite li arhivirati test za uzorak:' + " " + analizator.sampleNumber + " " + "za pacijenta:" + " " + analizator.specimentID +"?");
    if (isSure) {
      analizator.testStatus = 'ARCHIVE';
      const now = new Date();
      analizator.testWasValidatedBy = this.mainDataService.currentUser.fullName + " / " + now.toLocaleDateString() + " / " + now.toLocaleTimeString();
      //spremi u bazu kao novi test, a starom testu postaviti testStatus na Deleted
    }
  }
}

confirmValidate(analizator: AnalizatorData) {
  if(this.mainDataService.currentUser.securityLevelStatus != SecurityLevel.High){
      return;
    }
    
  const adminUser = prompt('Enter username:');
  const adminPass = prompt('Enter password:');
  // TODO: Validate admin credentials
  if (this.mainDataService.currentUser.userName == adminUser && this.mainDataService.currentUser.password == adminPass) {
    analizator.validated = 'VALIDATED';
    // Spremit u bazu trenutnom testu sa validated varijablom postavljenom na Validated
  } else {
    alert('Invalid credentials!');
  }
}
}
