import type { APIRequestContext, APIResponse } from '@playwright/test';
import { endpoints } from '../endpoints';
import type {
  CustomerProfileResponse,
  UpdateCustomerProfileRequest,
  UpdateCustomerProfileResponse,
} from '../../models';
import { basicAuth } from '../../utils/auth';

export class ProfileClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly username: string,
    private readonly password: string,
  ) {}

  async getProfile(): Promise<CustomerProfileResponse> {
    const response = await this.request.get(endpoints.customerProfile, {
      headers: this.userHeaders(),
    });

    await this.expectStatus(response, 200);

    return response.json() as Promise<CustomerProfileResponse>;
  }

  async updateProfile(
    data: UpdateCustomerProfileRequest,
  ): Promise<UpdateCustomerProfileResponse> {
    const response = await this.request.put(endpoints.customerProfile, {
      headers: this.userHeaders(),
      data,
    });

    await this.expectStatus(response, 200);

    return response.json() as Promise<UpdateCustomerProfileResponse>;
  }

  private userHeaders(): Record<string, string> {
    return {
      Authorization: basicAuth(this.username, this.password),
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
}
