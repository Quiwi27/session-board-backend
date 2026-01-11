import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

interface RequestWithBody extends Request {
  body: unknown;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  public catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<RequestWithBody>();

    let exceptionCode = 500;
    let errorResponse = {};

    if (exception instanceof HttpException) {
      exceptionCode = exception.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR;
      const exceptionMessage = exception.message ?? 'Unknown Message';

      errorResponse = {
        path: request.path,
        message: exceptionMessage,
        code: exceptionCode,
        timestamp: new Date().toISOString(),
      };

      const errorLogObject = {
        ...errorResponse,
        body: request.body ?? 'No body',
        stack: exception.stack ?? 'No stack',
      };

      this.logger.warn(`An error occurred: ${JSON.stringify(errorLogObject)}`);
    }

    response.status(exceptionCode).json(errorResponse);
  }
}
