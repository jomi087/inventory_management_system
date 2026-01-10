import SaleModel from '../models/saleModel';
import { SalesRepositoryInterface } from './SalesRepositoryInterface';

export class SalesRepository implements SalesRepositoryInterface {
    async createSale(payload: {
        itemId: string;
        quantity: number;
        priceAtSale: number;
        customerId?: string;
        paymentType: 'CASH' | 'CUSTOMER';
    }): Promise<void> {
        await SaleModel.create(payload);
    }
}
