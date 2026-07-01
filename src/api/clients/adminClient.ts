import type { APIRequestContext, APIResponse } from '@playwright/test';
import { endpoints } from '../endpoints';
import { env } from '../../config/env';
import type {
  CreateUserRequest,
  CreateUserResponse,
  ErrorResponse,
} from '../../models';
import { buildUnexpectedStatusError } from '../../utils/apiDiagnostics';
import { basicAuth } from '../../utils/auth';

export class AdminClient {
  constructor(private readonly request: APIRequestContext) {}

  async createUser(data: CreateUserRequest): Promise<CreateUserResponse> {
    const headers = this.adminHeaders();
    const response = await this.request.post(endpoints.adminUsers, {
      headers,
      data,
    });

    await this.expectStatus(response, 201, headers);

    return response.json() as Promise<CreateUserResponse>;
  }

  async createUserExpectBadRequest(
    data: object,
  ): Promise<ErrorResponse> {
    const headers = this.adminHeaders();
    const response = await this.request.post(endpoints.adminUsers, {
      headers,
      data,
      failOnStatusCode: false,
    });

    await this.expectStatus(response, 400, headers);

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
    headers: Record<string, string>,
  ): Promise<void> {
    if (response.status() === expectedStatus) {
      return;
    }

    throw await buildUnexpectedStatusError(response, expectedStatus, headers);
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
