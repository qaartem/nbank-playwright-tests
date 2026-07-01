import type { APIRequestContext, APIResponse } from '@playwright/test';
import { endpoints } from '../endpoints';
import type {
  CreateAccountResponse,
  CustomerAccountResponse,
  DepositRequest,
  DepositResponse,
  TransferRequest,
  TransferResponse,
} from '../../models';
import { basicAuth } from '../../utils/auth';

export class AccountClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly username: string,
    private readonly password: string,
  ) {}

  async createAccount(): Promise<CreateAccountResponse> {
    const response = await this.request.post(endpoints.accounts, {
      headers: this.userHeaders(),
    });

    await this.expectStatus(response, 201);

    return response.json() as Promise<CreateAccountResponse>;
  }

  async getCustomerAccounts(): Promise<CustomerAccountResponse[]> {
    const response = await this.request.get(endpoints.customerAccounts, {
      headers: this.userHeaders(),
    });

    await this.expectStatus(response, 200);

    return response.json() as Promise<CustomerAccountResponse[]>;
  }

  async deposit(data: DepositRequest): Promise<DepositResponse> {
    const response = await this.request.post(endpoints.deposit, {
      headers: this.userHeaders(),
      data,
    });

    await this.expectStatus(response, 200);

    return response.json() as Promise<DepositResponse>;
  }

  async transfer(data: TransferRequest): Promise<TransferResponse> {
    const response = await this.request.post(endpoints.transfer, {
      headers: this.userHeaders(),
      data,
    });

    await this.expectStatus(response, 200);

    return response.json() as Promise<TransferResponse>;
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
