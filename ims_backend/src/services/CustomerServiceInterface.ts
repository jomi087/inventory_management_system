import { Customer } from '../types/customer';
import { UpdateCustomerBody } from '../validation/customer/updateCustomerSchema';

export interface CustomerServiceInterface {
    createCustomer(
        name: string,
        address: string,
        mobile: string
    ): Promise<Customer>;
    getCustomers(): Promise<Customer[]>;
    updateCustomer(id: string, update: UpdateCustomerBody): Promise<Customer>;
}
