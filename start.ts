import { StrokeService } from "./application/services/StrokeService";
import { IStrokeRepository } from "./application/services/IStrokeRepository";
import { ISftpService } from "./application/services/ISftpService";
import { IKafkaStrokeProducer } from "./application/services/IKafkaStrokeProducer";

const {equal} = require("assert");
const sinon = require('sinon');
const assert = require('assert');

const sftpMock: ISftpService = {
    download: sinon.stub().resolves('some data'),
    connect: sinon.stub.resolves(),
    disconnect: sinon.stub.resolves()
  };

const kafkaMock: IKafkaStrokeProducer = {
    produceStroke: sinon.stub.resolves
}

const strokeRepository: IStrokeRepository = {
    getLast: sinon.stub().resolves(new Date("2023-04-17T18:04:03.288+00:00" )),
    create: sinon.stub().resolves()
}

var strokeService: StrokeService = new StrokeService(kafkaMock, sftpMock, strokeRepository)

function poll() {
    strokeService.getLatestStrokes('germany')
}

export function startPolling() {
    setInterval(poll, 900000)
}