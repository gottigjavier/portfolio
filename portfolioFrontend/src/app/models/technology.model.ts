import { MyProject } from "./my-project.model";

export class Technology{
    techId: number =0;
    techName: string= "";
    techType: string= "";
    techIconUrl: string= "";
    techDescription: string= "";
    techLevel: number= 0;
    techIndex: number= 0;
    projectList: Array<MyProject>= new Array;

    }