import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { UserService } from '../services/User.Services';
import { MainDataService } from '../services/MainData.Services';
import { UserData } from '../dataStructure/UserData';
import { InstitutionService } from '../services/Institution.Services';
import { InstitutionLabData } from '../dataStructure/InstitutionLabData';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
    title = 'hztm_pacient_management';

    public showLoginWindow: boolean = true;
    public showLogin: boolean = true;
    public showRegister:boolean = false;
    public showCreateInstitution: boolean = false;
    
    public userNameTemp:string ="";
    public passwordTemp:string ="";
    //public selectedInstitution: string = "";
    
    public adminUserNameChecker:string = "";
    public adminPasswordChecker:string ="";

    public registerdUserTemp: UserData  = {
        fullName: '',
        password: '',
        userName: '',
        passwordTimeout: 0,
        activeStatus: false,
        securityLevelStatus: ''
    };

    public institutionTemp: InstitutionLabData  = {
        name: '',
        adress:'',
    };
    
     constructor(
        public mainDataService: MainDataService,
        private userService: UserService,
        private router: Router,
        private institutionService: InstitutionService
    ){}

    ngOnInit(): void {
      this.mainDataService.isLoggedIn = false;
      this.mainDataService.clearCurrentUser();
      //this.mainDataService.clearCurrentInstitution();
      //this.selectedInstitution='';
    }

    
//#region Login
    public login():void{
    if(this.userNameTemp == "" || this.passwordTemp == "" /*|| this.selectedInstitution==""*/){
      
      return;
    }

    this.userService.getUser(this.userNameTemp, this.passwordTemp).subscribe(
      (response: UserData)=>{
        if(response != null){
            this.mainDataService.currentUser = response;
            this.mainDataService.currentUser.activeStatus = true; //ovo je samo lokalno, ne pusha se na server na serveru ne pise koji se user aktivan
            this.mainDataService.isLoggedIn = true; 
            this.loginSuccess();
            //this.getInstitutionByName();
        }
        else{
          alert("wrong credentials!");
        }
      },
      (error: HttpErrorResponse)=>{
        alert(error.message + "\nWRONG CREDENTIALS!")
      }
    );
  }
//#endregion

//#region RegisterUser
  public register():void{
    if(this.registerdUserTemp.fullName =="" || this.registerdUserTemp.password=="" || this.registerdUserTemp.userName == "" 
      || this.registerdUserTemp.securityLevelStatus==""){
      return;
    }
    if(this.registerdUserTemp.securityLevelStatus=="HIGH" && this.mainDataService.adminUserExist){
      if(this.mainDataService.adminUserName == this.adminUserNameChecker && this.mainDataService.adminPassword == this.adminPasswordChecker){
          this.addUser();
           this.clearAdminChecker();
           this.clearRegisterdUserTemp();
           this.clearUserCredentialsTemp();
           //this.selectedInstitution='';
      }
      else{
        alert("Wrong admin Credentials!");
      }
    }
    else{
      this.addUser();
    }
  }

  private addUser():void{
      this.userService.addUser(this.registerdUserTemp).subscribe(
        (response: UserData) => {
          if (response != null) {
            this.switchBetweenLoginRegister();
          }
          else {
            alert("Username already exists!"); // Handle existing user
          }
        },
        (error: HttpErrorResponse) => {
          alert(`Error: ${error.error.message || error.message}`);
        }
      );
    }
//#endregion

//#region RegisterInstitution
    private addInstitution():void{
            this.institutionService.addInstitution(this.institutionTemp).subscribe(
          (response: InstitutionLabData) => {
          if (response != null) {
            this.mainDataService.getInstitutions();
            this.clearInstitutionTemp();
          }
          else {
            alert("Institution error!"); // Handle existing user
          }
        },
        (error: HttpErrorResponse) => {
          alert(`Error: ${error.error.message || error.message}`);
        }
      );
    }

    public registerInstitution():void{
        if(this.institutionTemp.name =="" || this.institutionTemp.adress==""){
          return;
    }
    
      if(this.mainDataService.adminUserName == this.adminUserNameChecker && this.mainDataService.adminPassword == this.adminPasswordChecker){
          this.addInstitution();
          this.switchBetweenLoginCreateInstitution();
          this.clearAdminChecker();
          this.clearUserCredentialsTemp();
      }
      else{
        alert("Wrong admin Credentials!");
      }
    }
//#endregion

    // private getInstitutionByName():void{
    //   this.institutionService.getInstitution(this.selectedInstitution).subscribe(
    //     (response: InstitutionLabData)=>{
    //       if(response!=null){
    //         this.mainDataService.currentInstitution = response;
    //       }
    //       else{
    //       alert("Select an Institution");
    //     }
    //   },
    //   (error: HttpErrorResponse)=>{
    //     alert(error.message + "\nNo Institution")
    //   }
    //   );
    // }

//#region SwitchPanelMethods
    public switchBetweenLoginRegister(): void{
      this.showLogin = !this.showLogin;
      this.showRegister = !this.showRegister;
      this.clearAdminChecker();
      this.clearRegisterdUserTemp();
      this.clearUserCredentialsTemp();
      //this.selectedInstitution='';
  }

  public switchBetweenLoginCreateInstitution(): void{
    this.showLogin = !this.showLogin;
    this.showCreateInstitution = !this.showCreateInstitution;
     this.clearUserCredentialsTemp();
     this.clearInstitutionTemp();
     this.clearAdminChecker();
     //this.selectedInstitution='';
  }
  //#endregion

//#region ClearMethods
    private clearAdminChecker():void{
        this.adminPasswordChecker ="";
        this.adminUserNameChecker = "";
    }
  
    private clearUserCredentialsTemp():void{
      this.userNameTemp="";
      this.passwordTemp="";
    }

    private clearInstitutionTemp():void{
      this.institutionTemp.name='';
      this.institutionTemp.adress='';
    }

  private clearRegisterdUserTemp():void{
    
    this.registerdUserTemp.fullName = '';
      this.registerdUserTemp.password = '';
      this.registerdUserTemp.userName = '';
      this.registerdUserTemp.passwordTimeout = 0;
      this.registerdUserTemp.activeStatus = false;
      this.registerdUserTemp.securityLevelStatus = '';
    }
//#endregion

  private loginSuccess(): void{
    this.router.navigate(['/home']);
  }

  public goToSifrarnik():void{
    const adminUser = prompt('Enter username:');
    if(this.mainDataService.adminUserName == adminUser){
      const adminPass = prompt('Enter password:');
      if(this.mainDataService.adminPassword == adminPass){
       this.router.navigate(['/sifrarnik']);
       console.log("GO");
      }
      else{
        console.log("wrong password");
      }
    }
  }
}