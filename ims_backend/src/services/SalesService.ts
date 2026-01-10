import { HTTP_STATUS } from '../constants/http_constants';
import { AppError } from '../errors/AppError';
import { ERROR_MESSAGES } from '../messages/error_messages';
import { CustomerRepositoryInterface } from '../repositories/CustomerRepositoryInterface';
import { ItemRepositoryInterface } from '../repositories/ItemRepositoryInterface';
import { SalesRepositoryInterface } from '../repositories/SalesRepositoryInterface';
import { CreateSaleBody } from '../validation/sale/createSaleSchema';
import { SalesServiceInterface } from './SalesServiceInterface';

export class SalesServiceV1 implements SalesServiceInterface {
    constructor(
        private readonly _itemRepository: ItemRepositoryInterface,
        private readonly _customerRepository: CustomerRepositoryInterface,
        private readonly _salesRepository: SalesRepositoryInterface
    ) {}

    async createSale(payload: CreateSaleBody): Promise<void> {
        const { itemId, quantity, customerId, paymentType } = payload;

        const item = await this._itemRepository.findItemById(itemId);
        if (!item) {
            throw new AppError(
                HTTP_STATUS.NOT_FOUND,
                ERROR_MESSAGES.ITEM_NOT_FOUND
            );
        }

        if (paymentType === 'CUSTOMER') {
            if (!customerId) {
                throw new AppError(
                    HTTP_STATUS.BAD_REQUEST,
                    ERROR_MESSAGES.CUSTOMER_REQUIRED
                );
            }

            const customerExists =
                await this._customerRepository.findCustomerById(customerId);

            if (!customerExists) {
                throw new AppError(
                    HTTP_STATUS.NOT_FOUND,
                    ERROR_MESSAGES.CUSTOMER_NOT_FOUND
                );
            }
        }

        const updatedItem = await this._itemRepository.reduceStock(
            itemId,
            quantity
        );

        if (!updatedItem) {
            throw new AppError(
                HTTP_STATUS.BAD_REQUEST,
                ERROR_MESSAGES.INSUFFICIENT_STOCK
            );
        }

        await this._salesRepository.createSale({
            itemId,
            quantity,
            priceAtSale: updatedItem.price,
            ...(paymentType === 'CUSTOMER' && { customerId }),
            paymentType,
        });

    }
}
