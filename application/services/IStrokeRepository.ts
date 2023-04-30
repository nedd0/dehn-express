import { Stroke } from "../../domain/Stroke";

export interface IStrokeRepository {
    create(stroke: Stroke, callback: Function)
    getLast():Promise<any> 
}