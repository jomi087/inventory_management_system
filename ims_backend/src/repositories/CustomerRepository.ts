import CustomerModel, { ICustomer } from '../models/customerModel';
import { Customer } from '../types/customer';
import { BaseRepository } from './base/BaseRepository';
import { CustomerRepositoryInterface } from './CustomerRepositoryInterface';
import { mapCustomerResponse } from './mappers/cutomerMapper';

export class CustomerRepository
    extends BaseRepository<Customer, ICustomer>
    implements CustomerRepositoryInterface
{
    constructor() {
        super(CustomerModel);
    }

    protected mapToDomain(doc: ICustomer): Customer {
        return mapCustomerResponse(doc);
    }

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
        // ---------------- OLD WAY ----------------
        // Here we directly use the CustomerModel to create a record
        // const customer = await CustomerModel.create(payload);
        // return mapCustomerResponse(customer);

        // ---------------- NEW WAY ----------------
        // Because of the BaseRepository implementation,
        // we now use the shared `create` method.
        // This method contains common database logic
        // and helps avoid code duplication across repositories.

        return this.create(paylaod);
    }

    async findAllCustomer(): Promise<Customer[]> {
        const customer = await CustomerModel.find().lean();
        // return customer.map(mapCustomerResponse); //OLD WAY
        return this.findAll(); //NEW WAY
    }

    async updateCustomerById(
        id: string,
        updateData: {
            name?: string | undefined;
            address?: string | undefined;
            mobile?: string | undefined;
        }
    ): Promise<Customer | null> {
        // const updatedCustomer = await CustomerModel.findByIdAndUpdate( //OLD WAY
        //     id,
        //     { $set: updateData },
        //     { new: true }
        // );
        // if (!updatedCustomer) return null;
        // return mapCustomerResponse(updatedCustomer);

        return this.updateById(id, updateData); //NEW WAY
    }

    async findCustomerById(id: string): Promise<Customer | null> {
        // const customer = await CustomerModel.findById(id).lean(); //OLD WAY
        // if (!customer) return null;
        // return mapCustomerResponse(customer);

        return this.findById(id); //NEW WAY
    }
}
