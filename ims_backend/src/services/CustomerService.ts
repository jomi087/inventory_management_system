import { HTTP_STATUS } from '../constants/http_constants';
import { AppError } from '../errors/AppError';
import { ERROR_MESSAGES } from '../messages/error_messages';
import { CustomerRepositoryInterface } from '../repositories/CustomerRepositoryInterface';
import { Customer } from '../types/customer';
import { UpdateCustomerBody } from '../validation/customer/updateCustomerSchema';
import { CustomerServiceInterface } from './CustomerServiceInterface';

export class CustomerServiceV1 implements CustomerServiceInterface {
    constructor(
        private readonly _customerRepository: CustomerRepositoryInterface
    ) {}

    async createCustomer(
        name: string,
        address: string,
        mobile: string
    ): Promise<Customer> {
        const existingCustomer =
            await this._customerRepository.findExistingCustomerByMoblie(mobile);

        if (existingCustomer) {
            throw new AppError(
                HTTP_STATUS.CONFLICT,
                ERROR_MESSAGES.CUSTOMER_EXIST
            );
        }

        const customer = await this._customerRepository.createCustomer({
            name: name.trim().toLowerCase(),
            address: address.trim(),
            mobile,
        });

        return customer;
    }

    async getCustomers(): Promise<Customer[]> {
        return await this._customerRepository.findAllCustomer();
    }

    async updateCustomer(
        id: string,
        update: UpdateCustomerBody
    ): Promise<Customer> {

        const sanitizedUpdate: Partial<UpdateCustomerBody> = {};

        if (update.name) {
            sanitizedUpdate.name = update.name.trim().toLowerCase();
        }

        if (update.address) {
            sanitizedUpdate.address = update.address.trim();
        }

        if (update.mobile) {
            const existingData = await this._customerRepository.findExistingCustomerByMoblie(update.mobile,id)

            if (existingData) {
                throw new AppError(
                    HTTP_STATUS.CONFLICT,
                    ERROR_MESSAGES.MOBILE_NUMBER_EXIST
                );
            }
            sanitizedUpdate.mobile = update.mobile;
        }

        const updatedCustomerData = await this._customerRepository.updateCustomerById(id, update)

        if (!updatedCustomerData) {
            throw new AppError(
                HTTP_STATUS.NOT_FOUND,
                ERROR_MESSAGES.CUSTOMER_NOT_FOUND
            );
        }

        return  updatedCustomerData
    }
}
