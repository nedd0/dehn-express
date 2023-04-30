import "reflect-metadata";
import container from './infrastructure/config/inversify.config';
import { StrokeService } from "./application/services/StrokeService";

const strokeService = container.get<StrokeService>('StrokeService');