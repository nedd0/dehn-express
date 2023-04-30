import { describe } from "node:test";
import { testContainer } from "../../TestContainer";
import { StrokeService } from "../../../application/services/StrokeService"; 


const {equal} = require("assert");
const sinon = require('sinon');
const assert = require('assert');

describe('StrokeService', function(){

      
    
    describe('#strokesService1', function(){
        let strokeService: StrokeService;

        before(() => {
            strokeService = testContainer.get<StrokeService>(StrokeService);
        });
        it('should return 3 elements', async function() {
            let strokes =  strokeService.getLatestStrokes("germany").then((x) => {
                equal(x.length, 3);
       
            })
            //equal(strokes.length, 3);
       
           
        })
    })

    describe('#Strokesservice2', function(){    
        let strokeService: StrokeService;

        before(() => {
            strokeService = testContainer.get<StrokeService>(StrokeService);
        });
        it('should return 1 element', async function() {
            let strokes =  strokeService.getLatestStrokes("germany").then((x) => {
                equal(x.length, 1);
       
            })
        });
    });    
});

