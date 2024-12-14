import { Body, Controller, Get, Post, Query, UseInterceptors } from '@nestjs/common';
import { GetWeatherDto } from 'src/shared/dto/weather/get';
import { FetchWeatherDto } from 'src/shared/dto/weather/post';
import { WeatherService } from './weather.service';
import { WeatherResponseInterceptor } from 'src/shared/interceptors/weather-response';


@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  async fetchAndSaveWeather(@Body() fetchWeatherDto: FetchWeatherDto) {
    return this.weatherService.fetchAndSaveWeatherData(fetchWeatherDto);
  }

  @Get()
  @UseInterceptors(WeatherResponseInterceptor)
  async getWeather(@Query() getWeatherDto: GetWeatherDto) {
    console.dir(getWeatherDto, {depth: Infinity})
    return this.weatherService.getWeatherData(getWeatherDto);
  }
}

