import { Producer, Kafka } from 'kafkajs';
import { Stroke } from '../../domain/Stroke';
import { injectable } from 'inversify';
import * as dotenv from "dotenv";
import { IKafkaStrokeProducer } from '../../application/services/IKafkaStrokeProducer';

dotenv.config();

@injectable()
export class KafkaStrokeProducer implements IKafkaStrokeProducer{
  private producer: Producer;

  constructor() {
    const kafka = new Kafka({
      brokers: [process.env.KAFKA_BROKER_HOS+process.env.KAFKA_BROKER_PORT], 
    });

    this.producer = kafka.producer();
  }

  async produceStroke(stroke: Stroke) {
    await this.producer.connect();
    
    await this.producer.send({
      topic: process.env.KAFKA_STROKE_TOPIC, 
      messages: [
        { 
          key: stroke.timestamp, 
          value: JSON.stringify(stroke)
        }
      ],
    });

    await this.producer.disconnect();
  }
}
