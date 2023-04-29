import { Stroke } from "../../domain/stroke";
import { LigthingXmlParseService } from "../../domain/xmlreader";  
import { IStrokeRepository } from "./IStrokeRepository";
import { IKafkaStrokeProducer } from "./IKafkaStrokeProducer";
import { ISftpService } from "./ISftpService";
import { injectable, inject } from 'inversify'

@injectable()
export class StrokeService {

    private kafkaProducer: IKafkaStrokeProducer
    private sftpService: ISftpService
    private strokeRepository: IStrokeRepository 
   
    constructor(
        @inject('IKafkaStrokeProducer') kafkaProducer: IKafkaStrokeProducer, 
        @inject("ISftpService") sftpService: ISftpService,
        @inject("IStrokeRepository") strokeRepository:IStrokeRepository) {
       
            this.kafkaProducer = kafkaProducer
            this.sftpService = sftpService
            this.strokeRepository = strokeRepository
    }

    
    public getLatestStrokes(country: string) : Promise<Array<Stroke>> {
    
        return this.strokeRepository.getLast().then( value => {
            let lastCallback = value[0].timestamp

            return this.sftpService.download(lastCallback, country).then( files => {
                let strokes = new LigthingXmlParseService().parseXml(files, lastCallback)
        
                let newStrokes = []

                strokes.forEach((stroke:Stroke) => {
                    if (lastCallback===null || new Date(stroke.timestamp)>lastCallback) {
                        this.strokeRepository.create(stroke, (err, id) => {
                            if(err) {return}
                        } )
                        newStrokes.push(stroke)
                        this.kafkaProducer.produceStroke(stroke)
                    }
                } )
                return newStrokes
                

            } )

            
        })

    }

}