import { Inject, Injectable } from '@nestjs/common';
import { WeatherRepository } from '../db/repositories/weather.repository';
import { WeatherApiService } from '../weather-api/weather-api.service';
import { GetWeatherDto } from 'src/shared/dto/weather/get';
import { FetchWeatherDto } from 'src/shared/dto/weather/post';
import { Weather } from 'src/shared/entities/weather';

@Injectable()
export class WeatherService {
  constructor(
    @Inject() private readonly weatherRepository: WeatherRepository,
    private readonly weatherApiService: WeatherApiService,
  ) { }

  async fetchAndSaveWeatherData(dto: FetchWeatherDto) {
    const { lat, lon } = dto;

    const weatherData = await this.weatherApiService.fetchWeatherData(dto);

    const weather = new Weather();
    weather.lat = lat;
    weather.lon = lon;
    weather.data = weatherData;

    await this.weatherRepository.save(weather);
  }

  async getWeatherData(getWeatherDto: GetWeatherDto) {
    const { lat, lon, part } = getWeatherDto;
  
    let weather = await this.weatherRepository.findByCoordinates(lat, lon);
  
    if (!weather) {
      await this.fetchAndSaveWeatherData(getWeatherDto);
      weather = await this.weatherRepository.findByCoordinates(lat, lon);
    }

    const filteredData = this.filterWeatherData(weather.data, part);
  
    return filteredData;
  }
  

  private filterWeatherData(weatherData: any, part?: string): any {
    if (!part) { return weatherData; }

    const partsToExclude = part.split(',');

    const filteredData = { ...weatherData };

    partsToExclude.forEach((key) => {
      if (filteredData[key]) {
        delete filteredData[key];
      }
    });

    return filteredData;
  }
}