import { Technology } from "./technology.model";

export interface MyProject{
    projId: number,
    projName: string,
    projDescription: string,
    projUrl: string,
    techList: Array<Technology>,
    projShow: boolean,
    projIndex: number
}