export interface CreateCustomerPayload {
  name: string;
  address: string;
  mobile: string;
}

export interface updateCustomerPayload {
  mobile?: string | undefined;
  address?: string | undefined;
  name?: string | undefined;
}
