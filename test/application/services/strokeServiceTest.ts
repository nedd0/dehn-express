import { describe } from "node:test";
import { StrokeService } from "../../../application/services/strokeService"; 
import { ISftpService } from "../../../application/services/ISftpService";
import { IKafkaStrokeProducer } from "../../../application/services/IKafkaStrokeProducer";
import { IStrokeRepository } from "../../../application/services/IStrokeRepository";




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

const xml = `<?xml version="1.0"?>
<strokes xmlns="http://service.nowcast.de/lightning/strokes" from="2023-04-17T18:04:00.000+00:00" to="2023-04-17T18:05:00.000+00:00" alg="1"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://service.nowcast.de/lightning/strokes http://schemas.nowcast.de/nowcast-strokes.xsd">
<stroke timestamp="2023-04-17T18:04:03.251+00:00" y="47.7177" x="7.4612" type="1" amplitude="3.5" height="0.0" locationError="0.057"/>
<stroke timestamp="2023-04-17T18:04:03.287+00:00" y="47.7452" x="7.5199" type="1" amplitude="-6.3" height="0.0" locationError="0.176"/>
<stroke timestamp="2023-04-17T18:04:03.288+00:00" y="47.7215" x="7.4459" type="1" amplitude="-5.0" height="0.0" locationError="0.072"/>
</strokes>`;


const xml2 = `<?xml version="1.0"?>
<strokes xmlns="http://service.nowcast.de/lightning/strokes" from="2023-04-17T18:04:00.000+00:00" to="2023-04-17T18:05:00.000+00:00" alg="1"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://service.nowcast.de/lightning/strokes http://schemas.nowcast.de/nowcast-strokes.xsd">
<stroke timestamp="2023-04-17T18:04:03.251+00:00" y="47.7177" x="7.4612" type="1" amplitude="3.5" height="0.0" locationError="0.057"/>
<stroke timestamp="2023-04-17T18:04:03.287+00:00" y="47.7452" x="7.5199" type="1" amplitude="-6.3" height="0.0" locationError="0.176"/>
<stroke timestamp="2023-04-18T18:04:03.288+00:00" y="47.7215" x="7.4459" type="1" amplitude="-5.0" height="0.0" locationError="0.072"/>
</strokes>`;



describe('StrokeService', function(){

    

    
    
    describe('#strokesService1', function(){

        it('should return 3 elements', async function() {
            let strokes =  strokeService.getLatestStrokes("germany").then((x) => {
                equal(x.length, 3);
       
            })
            //equal(strokes.length, 3);
       
           
        })
    })

    describe('#Strokesservice2', function(){    

        it('should return 1 element', async function() {
            let strokes =  strokeService.getLatestStrokes("germany").then((x) => {
                equal(x.length, 1);
       
            })
        });
    });    
});

