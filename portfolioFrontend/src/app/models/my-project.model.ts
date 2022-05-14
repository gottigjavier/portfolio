import { Technology } from "./technology.model";

export class MyProject{
    projId: number = 0;
    projName: string= "";
    projDescription: string= "";
    projUrl: string= "";
    techList: Set<Technology>= new Set;
    projIndex: number= 0;
}