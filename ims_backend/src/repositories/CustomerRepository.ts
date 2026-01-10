import CustomerModel from '../models/customerModel';
import { Customer } from '../types/customer';
import { CustomerRepositoryInterface } from './CustomerRepositoryInterface';
import { mapCustomerResponse } from './mappers/cutomerMapper';

export class CustomerRepository implements CustomerRepositoryInterface {
    async findExistingCustomerByMoblie(
        mobile: string,
        excludeId?: string
    ): Promise<boolean> {
        const query: { mobile: string; _id?: { $ne: string } } = { mobile };

        if (excludeId) {
            query._id = { $ne: excludeId };
        }

        const customer = await CustomerModel.findOne(query);
        return customer ? true : false;
    }

    async createCustomer(paylaod: {
        name: string;
        address: string;
        mobile: string;
    }): Promise<Customer> {
        const customer = await CustomerModel.create(paylaod);
        return mapCustomerResponse(customer);
    }

    async findAllCustomer(): Promise<Customer[]> {
        const customer = await CustomerModel.find().lean();
        return customer.map(mapCustomerResponse);
    }

    async updateCustomerById(
        id: string,
        updateData: {
            name?: string | undefined;
            address?: string | undefined;
            mobile?: string | undefined;
        }
    ): Promise<Customer | null> {
        const updatedCustomer = await CustomerModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        );
        if (!updatedCustomer) return null;
        return mapCustomerResponse(updatedCustomer);
    }

    async findCustomerById(id: string): Promise<Customer | null> {
        const customer = await CustomerModel.findById(id).lean();
        if (!customer) return null;
        return mapCustomerResponse(customer);
    }

    
}
