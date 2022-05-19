import { Technology } from "./technology.model";

export class MyProject{
    projId: number = 0;
    projName: string= "";
    projDescription: string= "";
    projUrl: string= "";
    techList: Array<Technology>= new Array;
    projIndex: number= 0;
}