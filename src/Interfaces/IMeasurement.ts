export default interface IMeasurement {
  origin: string;
  url: string;
  timeToFirstByte: number;
  firstContentfulPaint: number;
  domLoad: number;
  windowLoad: number;
  resourceLoads: {
    url: string;
    time: number;
    type: string;
  }[];
}