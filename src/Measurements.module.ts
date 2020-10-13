import { Module } from '@nestjs/common';
import {MeasurementsController} from "./Measurements.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MeasurementsService} from "./Measurements.service";
import {configService} from "./Config/Config.service";
import {MeasurementEntity} from "./Entities/Measurement.entity";

@Module({
  providers: [MeasurementsService],
  controllers: [MeasurementsController],
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([MeasurementEntity])
  ],
  exports: []
})
export class MeasurementsModule {}