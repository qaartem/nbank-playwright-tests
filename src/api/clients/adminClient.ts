import type { APIRequestContext, APIResponse } from '@playwright/test';
import { endpoints } from '../endpoints';
import { env } from '../../config/env';
import type {
  CreateUserRequest,
  CreateUserResponse,
  ErrorResponse,
} from '../../models';
import { basicAuth } from '../../utils/auth';

export class AdminClient {
  constructor(private readonly request: APIRequestContext) {}

  async createUser(data: CreateUserRequest): Promise<CreateUserResponse> {
    const response = await this.request.post(endpoints.adminUsers, {
      headers: this.adminHeaders(),
      data,
    });

    await this.expectStatus(response, 201);

    return response.json() as Promise<CreateUserResponse>;
  }

  async createUserExpectBadRequest(
    data: object,
  ): Promise<ErrorResponse> {
    const response = await this.request.post(endpoints.adminUsers, {
      headers: this.adminHeaders(),
      data,
      failOnStatusCode: false,
    });

    await this.expectStatus(response, 400);

    return this.parseErrorResponse(response);
  }

  private adminHeaders(): Record<string, string> {
    return {
      Authorization: basicAuth(env.adminUsername, env.adminPassword),
    };
  }

  private async expectStatus(
    response: APIResponse,
    expectedStatus: number,
  ): Promise<void> {
    if (response.status() === expectedStatus) {
      return;
    }

    const responseBody = await response.text();

    throw new Error(
      `Expected ${expectedStatus} but received ${response.status()} ${response.statusText()}: ${responseBody}`,
    );
  }

  private async parseErrorResponse(
    response: APIResponse,
  ): Promise<ErrorResponse> {
    const responseBody = await response.text();

    try {
      return JSON.parse(responseBody) as ErrorResponse;
    } catch {
      return { message: responseBody };
    }
  }
}
