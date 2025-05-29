import { DdkTestData } from "./DdkTestData";

export interface RegistryDDKData{
    id: number;
    ddkNumber:string;
    name: string;
    surname:string;
    dateOfBirth:string;
    centerThatGetsTheBlood:string;
    tests:DdkTestData[];
}