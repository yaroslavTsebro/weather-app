import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { Constants } from 'src/shared/constants';
import { IWeatherApiService } from 'src/shared/contracts/modules/weather-api';

@Injectable()
export class WeatherApiService implements IWeatherApiService {
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.apiKey = this.configService.get<string>('WEATHER_API_KEY');
  }

  async fetchWeatherData(lat: number, lon: number, part?: string): Promise<any> {
    const params = {
      lat,
      lon,
      exclude: part,
      appid: this.apiKey
    };

    const response = await lastValueFrom(this.httpService.get(Constants.WEATHER_API_URL + '/data/3.0/onecall', { params }));

    if (response.status !== 200) { throw new InternalServerErrorException() }

    return response.data;
  }
}