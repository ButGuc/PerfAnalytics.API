import {MeasurementsController} from "./Measurements.controller";
import {MeasurementsService} from "./Measurements.service";
import {TestingModule, Test} from "@nestjs/testing";
import IMeasurement from "./Interfaces/IMeasurement";

const testData = [
  {
    "id": "531c05cf-5cd4-b912-c918-91dc472018b4",
    "timestamp": "2020-10-19T21:12:42.929Z",
    "origin": "http://localhost:8080",
    "url": "http://localhost:8080/",
    "domLoad": 30.235000000175205,
    "firstContentfulPaint": 419.9750000007043,
    "timeToFirstByte": 6.935000000339642,
    "windowLoad": 0.4650000000765431,
    "resourceLoads": [
      {
        "url": "http://localhost:8080/",
        "time": 315.2600000003076,
        "type": "document"
      },
      {
        "url": "http://localhost:8080/perfAnalytics.js",
        "time": 12.609999999767751,
        "type": "script"
      }
    ]
  },
  {
    "id": "d085915d-2eb2-9589-a7b1-f0d337918d00",
    "timestamp": "2020-10-19T21:11:55.407Z",
    "origin": "http://localhost:8080",
    "url": "http://localhost:8080/",
    "domLoad": 6.059999999706633,
    "firstContentfulPaint": 356.684999999743,
    "timeToFirstByte": 1.8900000004578033,
    "windowLoad": 0.7200000000011642,
    "resourceLoads": [
      {
        "url": "http://localhost:8080/",
        "time": 9.374999999636202,
        "type": "document"
      },
      {
        "url": "http://localhost:8080/perfAnalytics.js",
        "time": 58.93000000014581,
        "type": "script"
      }
    ]
  },
  {
    "id": "79c696d0-f549-baae-1cbf-2fa0f954bdc6",
    "timestamp": "2020-10-19T21:11:54.533Z",
    "origin": "http://localhost:8080",
    "url": "http://localhost:8080/",
    "domLoad": 3.4949999999298598,
    "firstContentfulPaint": 114.81499999990774,
    "timeToFirstByte": 4.469999999855645,
    "windowLoad": 0.5999999993946403,
    "resourceLoads": [
      {
        "url": "http://localhost:8080/",
        "time": 17.53000000007887,
        "type": "document"
      },
      {
        "url": "http://localhost:8080/perfAnalytics.js",
        "time": 10.500000000320142,
        "type": "script"
      }
    ]
  },
  {
    "id": "f7b08a9a-973a-e489-2344-5613b1a1ed60",
    "timestamp": "2020-10-19T21:11:46.535Z",
    "origin": "http://localhost:8080",
    "url": "http://localhost:8080/",
    "domLoad": 32.529999999496795,
    "firstContentfulPaint": 184.03499999931228,
    "timeToFirstByte": 6.0749999993277015,
    "windowLoad": 0.5249999994703103,
    "resourceLoads": [
      {
        "url": "http://localhost:8080/",
        "time": 18.524999999499414,
        "type": "document"
      },
      {
        "url": "http://localhost:8080/perfAnalytics.js",
        "time": 11.880000000019209,
        "type": "script"
      },
      {
        "url": "http://localhost:8080/sockjs-node/info?t=1603141904744",
        "time": 6.080000000110886,
        "type": "xmlhttprequest"
      }
    ]
  }
];

describe('Measurements Controller', () => {
  let controller: MeasurementsController;
  let service: MeasurementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeasurementsController],
      providers: [{
        provide: MeasurementsService,
        useValue: {
          getMeasurements: jest.fn().mockResolvedValue(testData),
          getLastFewRecordsMeasurements: jest.fn().mockResolvedValue(testData),
          getBetweenTwoDatesMeasurements: jest.fn().mockImplementation((
            firstDate: Date,
            secondDate: Date
          ) => {
            return Promise.resolve(testData);
          }),
          addMeasurement: jest.fn().mockImplementation((
            measurement: IMeasurement
          ) => {
            return Promise.resolve({id: "531c05cf-5cd4-b912-c918-91dc472018b4", timestamp: "2020-10-19T21:12:42.929Z", ...measurement});
          }),
        }
      }]
    }).compile();

    controller = module.get<MeasurementsController>(MeasurementsController);
    service = module.get<MeasurementsService>(MeasurementsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get', () => {
    it('should get an array of measurements', () => {
      expect(controller.get(null,null)).resolves.toEqual({result: testData});
    });
  });

  describe('get (firstDate, secondDate)', () => {
    it('should get an array of measurements but between two dates', () => {
      expect(controller.get('2020-10-19T00:00:00','2020-10-19T23:59:59')).resolves.toEqual({result: testData});
    });
  });

  describe('add', () => {
    it('should add measurement', () => {
      const newMeasurement: IMeasurement = {
        "origin": "http://localhost:8080",
        "url": "http://localhost:8080/",
        "domLoad": 30.235000000175205,
        "firstContentfulPaint": 419.9750000007043,
        "timeToFirstByte": 6.935000000339642,
        "windowLoad": 0.4650000000765431,
        "resourceLoads": [
          {
            "url": "http://localhost:8080/",
            "time": 315.2600000003076,
            "type": "document"
          }
        ]
      };

      expect(controller.add(newMeasurement)).resolves.toEqual({
        result: {
          id: "531c05cf-5cd4-b912-c918-91dc472018b4",
          timestamp: "2020-10-19T21:12:42.929Z",
          ...newMeasurement,
        }
      });
    });
  });

});