import { Container } from 'inversify'
import "reflect-metadata";
import { IKafkaStrokeProducer } from '../../application/services/IKafkaStrokeProducer' 
import { KafkaStrokeProducer } from '../adapters/KafkaStrokeProducer'
import { ISftpService } from '../../application/services/ISftpService'
import { SftpService } from '../adapters/SftpService'
import { IStrokeRepository } from '../../application/services/IStrokeRepository'
import { StrokeRepository } from '../adapters/StrokeRepository'
import { StrokeService } from '../../application/services/StrokeService'


const container = new Container()

// Bind the StrokeService and its dependencies
container.bind<IKafkaStrokeProducer>('IKafkaStrokeProducer').to(KafkaStrokeProducer)
container.bind<ISftpService>('ISftpService').to(SftpService)
container.bind<IStrokeRepository>('IStrokeRepository').to(StrokeRepository)
container.bind<StrokeService>(StrokeService).toSelf();

export default container
