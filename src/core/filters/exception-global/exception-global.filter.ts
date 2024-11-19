import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ExceptionGlobalFilter implements ExceptionFilter {
  private readonly logger = new Logger(ExceptionGlobalFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status: number =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? this.getReponseString(exception.getResponse())
        : 'Internal server error';

    this.logger.error(
      `${request.method} - ${request.url}`,
      `HTTP Status: ${status}`,
      `Error Message: ${message}`,
      `Timestamp: ${new Date().toISOString()}`,
      `${exception instanceof Error ? exception.stack : null}`
    );

    response.status(status).json({
      code: status,
      error: message,
      result: null,
    });
  }

  private getReponseString(exception: string | object) {
    if (typeof exception === 'object') {
      const _exception = exception as { message: string | string[] };

      return Array.isArray(_exception.message)
        ? _exception.message[0]
        : _exception.message;
    }

    return exception;
  }
}
