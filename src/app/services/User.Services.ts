import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserData } from "../dataStructure/UserData";

@Injectable({
    providedIn:'root'
})

export class UserServices{
    private apiServerUrl = '';

    constructor(private http: HttpClient){}
 
    public getUser(username: string): Observable<UserData>{
        return this.http.get<UserData>(`${this.apiServerUrl}/users/${username}`);
    }

    public addUser(newUser: UserData): Observable<UserData>{
        return this.http.post<UserData>(`${this.apiServerUrl}/users/add`, newUser);
    }
}