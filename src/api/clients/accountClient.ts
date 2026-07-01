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
import {
  accountResponseSchema,
  transferResponseSchema,
} from '../../schemas/apiSchemas';
import { buildUnexpectedStatusError } from '../../utils/apiDiagnostics';
import { basicAuth } from '../../utils/auth';

export class AccountClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly username: string,
    private readonly password: string,
  ) {}

  async createAccount(): Promise<CreateAccountResponse> {
    const headers = this.userHeaders();
    const response = await this.request.post(endpoints.accounts, {
      headers,
    });

    await this.expectStatus(response, 201, headers);

    const body = await response.json();

    return accountResponseSchema.parse(body) as CreateAccountResponse;
  }

  async getCustomerAccounts(): Promise<CustomerAccountResponse[]> {
    const headers = this.userHeaders();
    const response = await this.request.get(endpoints.customerAccounts, {
      headers,
    });

    await this.expectStatus(response, 200, headers);

    const body = await response.json();

    return accountResponseSchema
      .array()
      .parse(body) as CustomerAccountResponse[];
  }

  async deposit(data: DepositRequest): Promise<DepositResponse> {
    const headers = this.userHeaders();
    const response = await this.request.post(endpoints.deposit, {
      headers,
      data,
    });

    await this.expectStatus(response, 200, headers);

    const body = await response.json();

    return accountResponseSchema.parse(body) as DepositResponse;
  }

  async transfer(data: TransferRequest): Promise<TransferResponse> {
    const headers = this.userHeaders();
    const response = await this.request.post(endpoints.transfer, {
      headers,
      data,
    });

    await this.expectStatus(response, 200, headers);

    const body = await response.json();

    return transferResponseSchema.parse(body) as TransferResponse;
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
