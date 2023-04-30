import { injectable } from "inversify";
import { Stroke } from "../../domain/Stroke";
import { db } from "../config/mysql.config";
import { OkPacket } from "mysql2";
import { IStrokeRepository } from "../../application/services/IStrokeRepository";

@injectable()
export class StrokeRepository implements IStrokeRepository{

 create(stroke: Stroke, callback: Function)  {
    const queryString = "INSERT INTO strokes (timestamp, x, y, type, amplitude, height, location_error) values (?,?,?,?,?,?,?);";
    db.query(
        queryString, 
        [stroke.timestamp, stroke.x, stroke.y, stroke.type, stroke.amplitude, stroke.height, stroke.locationError], 
        (err, result) => {
            if (err) {
                console.log(err);
                callback(err);
            };
            const insertId = (<OkPacket> result).insertId;
            callback(null, insertId);
        });
    

    }

    getLast():Promise<any> {
   
        const queryString = "SELECT s.timestamp FROM strokes s ORDER BY s.timestamp DESC LIMIT 1";
        return new Promise((resolve, reject) => {
            db.query( queryString, (err, results, fields) => {
                if (err) {
                    reject(err)
                } else {
    
                    resolve(results)
                }
                    
            })
        })
    
    }

}



