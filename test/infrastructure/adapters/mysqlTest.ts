import { describe } from "node:test";
import { create, getLast } from "../../../infrastructure/adapters/strokeRepository"
import { Stroke } from "../../../domain/stroke";
import assert from 'assert';


var stroke: Stroke = 
 {
  timestamp: '2023-04-17T18:04:03.288+00:00',
  y: '47.7215',
  x: '7.4459',
  type: '1',
  amplitude: '-5.0',
  height: '0.0',
  locationError: '0.072'
};

var count = 0

describe('DB test', function(){

   
    describe('#Insert Stroke', function(){
        it('should return an id', function(done) {
           create(stroke, (err: Error, orderId: number) => {
               if (err) {
                    done("ERROR")      
               }
               assert(orderId>0);
               done()
            });
        });
    });

    describe('#Get Last timestamp', function(){
        it('should return a timestamp', async function() {
               let results = await getLast();
              
        });
    });
});    



