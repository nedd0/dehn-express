import { Producer, Kafka } from 'kafkajs';
import { Stroke } from '../../domain/stroke';
import { injectable } from 'inversify';

@injectable()
export class KafkaStrokeProducer {
  private producer: Producer;

  constructor() {
    const kafka = new Kafka({
      brokers: ['localhost:9092'], // Replace with your Kafka broker URLs
    });

    this.producer = kafka.producer();
  }

  async produceStroke(stroke: Stroke) {
    await this.producer.connect();
    
    await this.producer.send({
      topic: 'stroke-events', // Replace with your Kafka topic name
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
