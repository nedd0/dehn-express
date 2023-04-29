import { Stroke } from "../../domain/stroke";

export interface IKafkaStrokeProducer {
  produceStroke(stroke: Stroke): Promise<void>;
}
