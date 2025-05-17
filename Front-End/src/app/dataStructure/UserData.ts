export interface UserData {
    id?:number;
    fullName: string;
    password:string;
    userName:string;
    passwordTimeout:number;
    activeStatus: boolean;
    securityLevelStatus: string;
}