import { describe } from "node:test"
import { IStrokeRepository } from "../../../application/services/IStrokeRepository"
import { StrokeService } from "../../../application/services/StrokeService"
import { Stroke } from "../../../domain/Stroke"
import assert from 'assert'
import container from "../../../infrastructure/config/inversify.config"



var stroke: Stroke = 
 {
  timestamp: '2023-04-17T18:04:03.288+00:00',
  y: '47.7215',
  x: '7.4459',
  type: '1',
  amplitude: '-5.0',
  height: '0.0',
  locationError: '0.072', 
  country: 'germany'
};

var count = 0

describe('DB test', function(){
    let strokeRepository: IStrokeRepository;

    before(() => {
        strokeRepository = container.get<IStrokeRepository>("IStrokeRepository");
    });

    describe('#Insert Stroke', function(){
     
        it('should return an id', function(done) {
            strokeRepository.create(stroke, (err: Error, orderId: number) => {
               if (err) {
                    done("ERROR")      
               }
               assert(orderId>0);
               done()
            });
        });
    });

    let strokeService: StrokeService;

        before(() => {
            strokeService = container.get<StrokeService>(StrokeService);
        });
    describe('#Get Last timestamp', function(){
        it('should return a timestamp', async function() {
               let results = await strokeRepository.getLast();
              
        });
    });
});    



