import {Injectable} from "@nestjs/common";
import IMeasurement from "./Interfaces/IMeasurement";
import {MeasurementEntity} from "./Entities/Measurement.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Between, Repository} from "typeorm";

@Injectable()
export class MeasurementsService {
  constructor(
    @InjectRepository(MeasurementEntity)
    private measurementRepository: Repository<MeasurementEntity>
  ) {}

  async getMeasurements(): Promise<MeasurementEntity[]> {
    return await this.getLastFewRecordsMeasurements();
  }

  async getLastFewRecordsMeasurements(): Promise<MeasurementEntity[]> {
    return await this.measurementRepository.find({
      take: 30,
      order: {
        timestamp: 'DESC'
      },
    });
  }

  async getBetweenTwoDatesMeasurements(firstDate: Date, secondDate: Date): Promise<MeasurementEntity[]> {
    return await this.measurementRepository.find({
      take: 1000,
      where: {
        timestamp: Between(firstDate, secondDate)
      },
      order: {
        timestamp: 'DESC'
      },
    });
  }

  async addMeasurement(measurement: IMeasurement) {
    const newMeasurement = new MeasurementEntity();

    newMeasurement.origin = measurement.origin;
    newMeasurement.url = measurement.url;
    newMeasurement.domLoad = measurement.domLoad;
    newMeasurement.windowLoad = measurement.windowLoad;
    newMeasurement.firstContentfulPaint = measurement.firstContentfulPaint;
    newMeasurement.timeToFirstByte = measurement.timeToFirstByte;
    newMeasurement.resourceLoads = measurement.resourceLoads;

    return await this.measurementRepository.save(newMeasurement);
  }
}