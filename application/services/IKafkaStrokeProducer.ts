import { Stroke } from "../../domain/Stroke";

export interface IKafkaStrokeProducer {
  produceStroke(stroke: Stroke): Promise<void>;
}
