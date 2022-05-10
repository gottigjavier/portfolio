import { Technology } from "./technology.model";

export interface MyProject{
    projId: number,
    projName: string,
    projDescription: string,
    projUrl: string,
    techList: Set<Technology>,
    projIndex: number
}