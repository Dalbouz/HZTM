import { AssayaData } from "./AssayaData";


export interface AnalizatorDeviceData{
    id?:number;
    analizatorName:string;
    assayDatas?: AssayaData[];
}