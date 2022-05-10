import { MyProject } from "./my-project.model";

export interface Technology{
    techId: number,
    techName: string,
    techType: string,
    techIconUrl: string,
    techDescription: string,
    techLevel: number,
    myProject: Set<MyProject>
    techIndex: number,
}