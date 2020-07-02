export namespace HttpModel {
  /**
   * @interface Request
   */
  type IRequest = (
    url: string,
    params?: IRequestQueryPayload | unknown,
    payload?: IRequestPayload | unknown,
  ) => Promise<{}>;
  export interface IRequestPayload {
    [key: string]: {};
  }

  export interface IRequestQueryPayload {
    [key: string]: {};
  }

  export interface IRequestResponse<T> {
    data: T;
    message: string;
  }
}
