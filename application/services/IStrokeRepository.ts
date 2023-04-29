import { Stroke } from "../../domain/stroke";

export interface IStrokeRepository {
    create(stroke: Stroke, callback: Function)
    getLast():Promise<any> 
}