export interface BaseResponse<T> {
  [x: string]: any;
  message: string;
  status: number;
  data: T;
}
