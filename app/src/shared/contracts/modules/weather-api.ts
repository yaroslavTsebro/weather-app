export const WEATHER_API_SERVICE = Symbol('WeatherApiService')

export interface IWeatherApiService {
  getWeatherData(lat: number, lon: number, part?: string): Promise<any>;
}
