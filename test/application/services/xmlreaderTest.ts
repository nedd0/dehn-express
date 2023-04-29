import { describe } from "node:test";
import { LigthingXmlParseService } from "../../../domain/xmlreader";
const {equal} = require("assert");


var assert = require('assert');

const xml = `<?xml version="1.0"?>
<strokes xmlns="http://service.nowcast.de/lightning/strokes" from="2023-04-17T18:04:00.000+00:00" to="2023-04-17T18:05:00.000+00:00" alg="1"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://service.nowcast.de/lightning/strokes http://schemas.nowcast.de/nowcast-strokes.xsd">
<stroke timestamp="2023-04-17T18:04:03.251+00:00" y="47.7177" x="7.4612" type="1" amplitude="3.5" height="0.0" locationError="0.057"/>
<stroke timestamp="2023-04-17T18:04:03.287+00:00" y="47.7452" x="7.5199" type="1" amplitude="-6.3" height="0.0" locationError="0.176"/>
<stroke timestamp="2023-04-17T18:04:03.288+00:00" y="47.7215" x="7.4459" type="1" amplitude="-5.0" height="0.0" locationError="0.072"/>
</strokes>`;

describe('Xml Reading', function(){
    var reader: LigthingXmlParseService = new LigthingXmlParseService()

    console.log("------------------ 3 ")
    let lastStroke: Date = new Date("2023-04-17T18:04:03.251+00:00")
    let buf: Buffer[] = [Buffer.from(xml, 'utf8')]
    describe('#parseXmml', function(){
        it('XML should return 3 elements', function() {
            let results = reader.parseXml(buf, lastStroke)
            equal(results?.length, 3);
        })
    });
});

