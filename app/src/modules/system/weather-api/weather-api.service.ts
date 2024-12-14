import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { Constants } from 'src/shared/constants';
import { IEnvVariables } from 'src/shared/contracts/modules/config';
import { IWeatherApiService } from 'src/shared/contracts/modules/weather-api';
import { FetchWeatherDto } from 'src/shared/dto/weather/post';

@Injectable()
export class WeatherApiService implements IWeatherApiService {
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<IEnvVariables>
  ) {
    this.apiKey = this.configService.get<string>('WEATHER_API_KEY');
  }

  async fetchWeatherData(dto: FetchWeatherDto): Promise<any> {
    const params = {
      lat: dto.lat,
      lon: dto.lon,
      appid: this.apiKey
    };

    const response = await lastValueFrom(this.httpService.get(Constants.WEATHER_API_URL + '/data/3.0/onecall', { params }));

    if (response.status !== 200) { throw new InternalServerErrorException() }

    return response.data;
  }
}