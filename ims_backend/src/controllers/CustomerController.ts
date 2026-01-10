import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../constants/http_constants';
import { SUCCESS_MESSAGES } from '../messages/success_messages';
import { CreateCustomerRequest } from '../validation/customer/createCustomerScehma';
import {
    UpdateCustomerBody,
    UpdateCustomerParams,
} from '../validation/customer/updateCustomerSchema';
import { CustomerServiceInterface } from '../services/CustomerServiceInterface';

export class CustomerController {
    constructor(private readonly _customerService: CustomerServiceInterface) {}

    createCustomer = async (
        req: Request<{}, {}, CreateCustomerRequest>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { name, address, mobile } = req.body;

            const customer = await this._customerService.createCustomer(
                name,
                address,
                mobile
            );

            res.status(HTTP_STATUS.CREATED).json({
                message: SUCCESS_MESSAGES.CUSTOMER_CREATED,
                customer,
            });
        } catch (error) {
            next(error);
        }
    };

    getCustomers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const customers = await this._customerService.getCustomers();

            res.status(HTTP_STATUS.CREATED).json({
                customer: customers,
            });
        } catch (error) {
            next(error);
        }
    };

    updateCustomer = async (
        req: Request<UpdateCustomerParams, {}, UpdateCustomerBody>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const update = req.body;
            const { id } = req.params;

            const customers = await this._customerService.updateCustomer(
                id,
                update
            );

            res.status(HTTP_STATUS.OK).json({
                message: SUCCESS_MESSAGES.CUSTOMER_UPDATED,
                updatedCustomer: customers,
            });
        } catch (error) {
            next(error);
        }
    };
}
