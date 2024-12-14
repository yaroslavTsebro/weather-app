import { FetchWeatherDto } from 'src/shared/dto/weather/post';

export const WEATHER_API_SERVICE = Symbol('WeatherApiService')

export interface IWeatherApiService {
  fetchWeatherData(dto: FetchWeatherDto): Promise<any>;
}
