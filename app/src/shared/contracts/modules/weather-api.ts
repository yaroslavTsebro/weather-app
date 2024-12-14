export const WEATHER_API_SERVICE = Symbol('WeatherApiService')

export interface IWeatherApiService {
  fetchWeatherData(lat: number, lon: number, part?: string): Promise<any>;
}
