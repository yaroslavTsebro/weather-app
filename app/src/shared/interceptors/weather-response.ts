import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class WeatherResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => this.formatResponse(data)),
    );
  }

  private formatResponse(data: any): any {
    if (!data) return data;

    const formattedData = { ...data };

    if (formattedData.current) {
      formattedData.current = this.formatCurrent(formattedData.current);
    }
    if (formattedData.minutely) {
      formattedData.minutely = this.formatMinutely(formattedData.minutely);
    }
    if (formattedData.hourly) {
      formattedData.hourly = this.formatHourly(formattedData.hourly);
    }
    if (formattedData.daily) {
      formattedData.daily = this.formatDaily(formattedData.daily);
    }
    if (formattedData.alerts) {
      formattedData.alerts = this.formatAlerts(formattedData.alerts);
    }

    return formattedData;
  }

  private formatCurrent(current: any): any {
    return {
      sunrise: current.sunrise,
      sunset: current.sunset,
      temp: current.temp,
      feels_like: current.feels_like,
      pressure: current.pressure,
      humidity: current.humidity,
      uvi: current.uvi,
      wind_speed: current.wind_speed,
    };
  }

  private formatMinutely(minutely: any[]): any[] {
    return minutely.map((minute) => ({
      dt: minute.dt,
      precipitation: minute.precipitation,
    }));
  }

  private formatHourly(hourly: any[]): any[] {
    return hourly.map((hour) => ({
      dt: hour.dt,
      temp: hour.temp,
      feels_like: hour.feels_like,
      pressure: hour.pressure,
      humidity: hour.humidity,
      wind_speed: hour.wind_speed,
      clouds: hour.clouds,
    }));
  }

  private formatDaily(daily: any[]): any[] {
    return daily.map((day) => ({
      dt: day.dt,
      sunrise: day.sunrise,
      sunset: day.sunset,
      temp: {
        day: day.temp.day,
        min: day.temp.min,
        max: day.temp.max,
        night: day.temp.night,
        eve: day.temp.eve,
        morn: day.temp.morn,
      },
      feels_like: day.feels_like,
      pressure: day.pressure,
      humidity: day.humidity,
      wind_speed: day.wind_speed,
    }));
  }

  private formatAlerts(alerts: any[]): any[] {
    return alerts.map((alert) => ({
      sender_name: alert.sender_name,
      event: alert.event,
      start: alert.start,
      end: alert.end,
      description: alert.description,
    }));
  }
}