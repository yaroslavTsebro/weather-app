export interface IWeather {
  id: number;
  lat: number;
  lon: number;
  part?: string;
  data: any;
  createdAt: Date;
  updatedAt: Date;
}