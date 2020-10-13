import {Body, Controller, Get, Post, Query, Req} from "@nestjs/common";
import {MeasurementsService} from "./Measurements.service";
import { Request } from 'express';
import IMeasurement from "./Interfaces/IMeasurement";
import * as moment from "moment";

@Controller('/measurements')
export class MeasurementsController {
  constructor(private readonly measurementsService: MeasurementsService) {}

  @Get()
  async get(
    @Query('firstDate') firstDate: string,
    @Query('secondDate') secondDate: string
  ) {
    let result;
    if (firstDate && secondDate) {
      result = await this.measurementsService.getBetweenTwoDatesMeasurements(
        moment(firstDate, 'YYYY-MM-DD hh:mm:ss').toDate(),
        moment(secondDate, 'YYYY-MM-DD hh:mm:ss').toDate(),
      );
    } else {
      result = await this.measurementsService.getMeasurements()
    }

    return { result: result ?? [] };
  }

  @Post()
  async add(
    @Req() request: Request,
    @Body() measurement: IMeasurement
  ) {
    const result = await this.measurementsService.addMeasurement(measurement);

    return { result };
  }
}