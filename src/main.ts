import { NestFactory } from '@nestjs/core';
import {MeasurementsModule} from "./Measurements.module";
import {configService} from "./Config/Config.service";

async function bootstrap() {
  const app = await NestFactory.create(MeasurementsModule);
  await app.listen(configService.getPort());
}

bootstrap();
