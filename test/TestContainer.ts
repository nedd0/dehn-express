import "reflect-metadata";
import { Container } from "inversify";
import { StrokeService } from "../application/services/StrokeService"; 
import { ISftpService } from "../application/services/ISftpService"; 
import { IStrokeRepository } from "../application/services/IStrokeRepository";
import { IKafkaStrokeProducer } from "../application/services/IKafkaStrokeProducer"; 

const sinon = require('sinon');


const mockSftpService : ISftpService = {
    download: sinon.stub().resolves('some data'),
    connect: sinon.stub().resolves(),
    disconnect: sinon.stub().resolves()
  };

const mockStrokeRepository: IStrokeRepository = {
    getLast: sinon.stub().resolves(new Date("2023-04-17T18:04:03.288+00:00" )),
    create: sinon.stub().resolves()
}

const mockKafkaProducer : IKafkaStrokeProducer = {
    produceStroke: sinon.stub().resolves()
}


const testContainer = new Container();

testContainer.bind<ISftpService>("ISftpService").toConstantValue(mockSftpService);
testContainer.bind<IStrokeRepository>("IStrokeRepository").toConstantValue(mockStrokeRepository);
testContainer.bind<IKafkaStrokeProducer>("IKafkaStrokeProducer").toConstantValue(mockKafkaProducer);
testContainer.bind<StrokeService>(StrokeService).toSelf();

const strokeService = testContainer.resolve<StrokeService>(StrokeService);

export {testContainer}