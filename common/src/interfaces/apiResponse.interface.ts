export interface ApiResponseInterface {
  code: number;
  status: string;
  message: string;
  data?: unknown;
  errors?: string | object;
}
