import { ApiException } from '@exceptions/app/api.exception';

export class JenosizeException extends ApiException {
  /**
   * @param error
   * @returns ApiException
   */
  static WorngNumber(error?: string[]): ApiException {
    throw new ApiException(100101, error);
  }
}
