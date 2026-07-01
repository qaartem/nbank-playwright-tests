import type { APIRequestContext, APIResponse } from '@playwright/test';
import { endpoints } from '../endpoints';
import type {
  CustomerProfileResponse,
  UpdateCustomerProfileRequest,
  UpdateCustomerProfileResponse,
} from '../../models';
import { buildUnexpectedStatusError } from '../../utils/apiDiagnostics';
import { basicAuth } from '../../utils/auth';

export class ProfileClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly username: string,
    private readonly password: string,
  ) {}

  async getProfile(): Promise<CustomerProfileResponse> {
    const headers = this.userHeaders();
    const response = await this.request.get(endpoints.customerProfile, {
      headers,
    });

    await this.expectStatus(response, 200, headers);

    return response.json() as Promise<CustomerProfileResponse>;
  }

  async updateProfile(
    data: UpdateCustomerProfileRequest,
  ): Promise<UpdateCustomerProfileResponse> {
    const headers = this.userHeaders();
    const response = await this.request.put(endpoints.customerProfile, {
      headers,
      data,
    });

    await this.expectStatus(response, 200, headers);

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
    headers: Record<string, string>,
  ): Promise<void> {
    if (response.status() === expectedStatus) {
      return;
    }

    throw await buildUnexpectedStatusError(response, expectedStatus, headers);
  }
}
