import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserData } from "../dataStructure/UserData";
import { environment } from '../environments/environment';

@Injectable({
    providedIn:'root'
})

export class UserService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}
 
    public getUser(userName: string, passwrod:string): Observable<UserData>{
        return this.http.get<UserData>(`${this.apiServerUrl}/users/find/${userName}/${passwrod}`);
    }

    public addUser(newUser: UserData): Observable<UserData>{
        return this.http.post<UserData>(`${this.apiServerUrl}/users/add`, newUser);
    }
}