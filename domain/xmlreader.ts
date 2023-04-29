
import { Stroke } from "./stroke";
const xml2js = require('xml2js');
const parser = new xml2js.Parser({ attrkey: "ATTR" });
const fs = require('fs');

export class LigthingXmlParseService {
    /**
     * parseXml
     */
    public parseXml(files:Buffer[], lastStroke:Date) {
       
       for (const file of files) {
  
        let xml = file.toString()
        let cleanedXml = xml.replace("\ufeff", ""); 
        let strokes = []; 
        parser.parseString(cleanedXml, (error, result) => {
            if(error === null) {
                result.strokes.stroke.forEach(element => {
                    let stroke: Stroke = element.ATTR;
                    if (new Date(stroke.timestamp) > lastStroke) {
                        strokes.push(stroke)
                    }    
                }); 
            } else {
                    console.log(error);
                    return [];
            } 
        });
        
        

        return strokes;
        } 
    }
}