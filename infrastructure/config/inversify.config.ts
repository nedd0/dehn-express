import { Container } from 'inversify'
import { IKafkaStrokeProducer } from '../../application/services/IKafkaStrokeProducer' 
import { KafkaStrokeProducer } from '../adapters/KafkaStrokeProducer'
import { ISftpService } from '../../application/services/ISftpService'
import { SftpService } from '../adapters/SftpService'
import { IStrokeRepository } from '../../application/services/IStrokeRepository'
import { StrokeRepository } from '../adapters/StrokeRepository'

const container = new Container()

// Bind the StrokeService and its dependencies
container.bind<IKafkaStrokeProducer>('IKafkaStrokeProducer').to(KafkaStrokeProducer)
container.bind<ISftpService>('ISftpService').to(SftpService)
container.bind<IStrokeRepository>('IStrokeRepository').to(StrokeRepository)

export default container
