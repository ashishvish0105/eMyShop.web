export interface IApiResponseModel<T  = any> {
  statusCode: number;
  message: string;
  payload: T;
  requestId: string;
  errors: string[];
}
