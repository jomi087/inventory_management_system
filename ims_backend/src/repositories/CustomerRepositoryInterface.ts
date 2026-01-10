import { Customer } from '../types/customer';

export interface CustomerRepositoryInterface {
    findExistingCustomerByMoblie(
        mobile: string,
        excludeId?: string
    ): Promise<boolean>;
    createCustomer(paylaod: {
        name: string;
        address: string;
        mobile: string;
    }): Promise<Customer>;
    findAllCustomer(): Promise<Customer[]>;
    updateCustomerById(
        id: string,
        updateData: {
            name?: string | undefined;
            address?: string | undefined;
            mobile?: string | undefined;
        }
    ): Promise<Customer | null>;
    findCustomerById(id: string): Promise<Customer | null>;
}
