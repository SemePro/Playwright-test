// support/ApiHelper.ts
import { APIRequestContext } from '@playwright/test';

export class ApiHelper {
  private request: APIRequestContext;
  private baseUrl: string;

  constructor(request: APIRequestContext, baseUrl: string) {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  // Generic GET request
  async get(endpoint: string) {
    const response = await this.request.get(`${this.baseUrl}${endpoint}`);
    return response;
  }

  // Generic POST request
  async post(endpoint: string, data: any) {
    const response = await this.request.post(`${this.baseUrl}${endpoint}`, { data });
    return response;
  }

  // Generic PUT request
  async put(endpoint: string, data: any) {
    const response = await this.request.put(`${this.baseUrl}${endpoint}`, { data });
    return response;
  }

  // Generic DELETE request
  async delete(endpoint: string) {
    const response = await this.request.delete(`${this.baseUrl}${endpoint}`);
    return response;
  }
}
