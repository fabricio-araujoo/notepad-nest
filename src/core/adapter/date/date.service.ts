import { Injectable } from '@nestjs/common';
import { DateTime, Settings } from 'luxon';
import { EDateFormat } from 'src/core/enums/date';

@Injectable()
export class DateService {
  private timezone: string = 'America/Sao_Paulo';

  constructor() {
    Settings.defaultZone = this.timezone;
  }

  formatISODate(date: string, format: EDateFormat): string {
    return DateTime.fromISO(date, { zone: 'utc' }).toFormat(format);
  }
}
