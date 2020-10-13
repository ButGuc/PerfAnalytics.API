import {MeasurementEntity} from "./Measurement.entity";

describe('Measurement Entity', () => {
  it('It should create a new measurement.', () => {
    const measurement = new MeasurementEntity();

    measurement.origin = "test.com.tr";
    measurement.url = "test.com.tr/home-page";
    measurement.domLoad = 1.25;
    measurement.windowLoad = 3.59;
    measurement.firstContentfulPaint = 2.53;
    measurement.timeToFirstByte = 58.2;
    measurement.resourceLoads = [
      {
        url: "test.com.tr/assets/style.css",
        time: 15.0,
        type: "link",
      },
      {
        url: "test.com.tr/assets/main.js",
        time: 9.2,
        type: "script",
      }
    ];

    expect(measurement).toBeTruthy();
    expect(measurement.origin).toBe("test.com.tr");
    expect(measurement.url).toBe("test.com.tr/home-page");
    expect(measurement.domLoad).toBe(1.25);
    expect(measurement.windowLoad).toBe(3.59);
    expect(measurement.firstContentfulPaint).toBe(2.53);
    expect(measurement.timeToFirstByte).toBe(58.2);
    expect(measurement.resourceLoads).toEqual([
      {
        url: "test.com.tr/assets/style.css",
        time: 15.0,
        type: "link",
      },
      {
        url: "test.com.tr/assets/main.js",
        time: 9.2,
        type: "script",
      }
    ]);
  });
});