import { Customer, CustomerFilter } from '../types/customer';

export interface ICustomerRepository {
    findExistingCustomerByMoblie(
        mobile: string,
        excludeId?: string
    ): Promise<boolean>;
    createCustomer(paylaod: {
        name: string;
        address: string;
        mobile: string;
    }): Promise<Customer>;
    findAllCustomer(filter:CustomerFilter): Promise<Customer[]>;
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
