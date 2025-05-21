import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { UserService } from '../services/User.Services';
import { MainDataService } from '../services/MainData.Services';
import { UserData } from '../dataStructure/UserData';

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
    
    public userNameTemp:string ="";
    public passwordTemp:string ="";
    
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
    
     constructor(
        public mainDataService: MainDataService,
        private userService: UserService,
        private router: Router,
    ){}

    ngOnInit(): void {
      this.mainDataService.isLoggedIn = false;
      this.mainDataService.clearCurrentUser();
    }

    public login():void{
    if(this.userNameTemp == "" || this.passwordTemp == ""){
      return;
    }

    this.userService.getUser(this.userNameTemp, this.passwordTemp).subscribe(
      (response: UserData)=>{
        if(response != null){
            this.mainDataService.currentUser = response;
            this.mainDataService.currentUser.activeStatus = true; //ovo je samo lokalno, ne pusha se na server na serveru ne pise koji se user aktivan
            this.mainDataService.isLoggedIn = true; 
            this.loginSuccess();
        }
        else{
          alert("wrong credentials!");
        }
      },
      (error: HttpErrorResponse)=>{
        alert(error.message + "\nWRONG CREDENTIALS!")
      }
    )
  }

  public register():void{
    if(this.registerdUserTemp.fullName =="" || this.registerdUserTemp.password=="" || this.registerdUserTemp.userName == "" 
      || this.registerdUserTemp.securityLevelStatus==""){
      return;
    }
    if(this.registerdUserTemp.securityLevelStatus=="HIGH" && this.mainDataService.adminUserExist){
      if(this.mainDataService.adminUserName == this.adminUserNameChecker && this.mainDataService.adminPassword == this.adminPasswordChecker){
          this.addUser();
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
            // this.clearRegisterdUser();
            this.adminPasswordChecker ="";
            this.adminUserNameChecker = "";
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

    public switchBetweenLoginRegister(): void{
    this.showLogin = !this.showLogin;
    this.showRegister = !this.showRegister;
  }

  private clearRegisterdUser():void{
      this.registerdUserTemp.fullName = '';
      this.registerdUserTemp.password = '';
      this.registerdUserTemp.userName = '';
      this.registerdUserTemp.passwordTimeout = 0;
      this.registerdUserTemp.activeStatus = false;
      this.registerdUserTemp.securityLevelStatus = '';
    }

  private loginSuccess(): void{
    this.router.navigate(['/home']);
  }
}