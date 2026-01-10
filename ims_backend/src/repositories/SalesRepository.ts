import { Types } from 'mongoose';
import SaleModel from '../models/saleModel';
import { SaleLedgerResponse, SaleReportResponse } from '../types/report';
import { mapSaleToLedgerRowResponse } from './mappers/sales/ledgerMapper';
import { SalesRepositoryInterface } from './SalesRepositoryInterface';
import { mapSaleToReportResponse } from './mappers/sales/reportMapper';

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

    async getSalesByCustomerId(
        customerId: string
    ): Promise<SaleLedgerResponse[]> {
        const sales = await SaleModel.find({ customerId })
            .populate<{
                itemId: { _id: Types.ObjectId; name: string };
            }>('itemId', 'name')
            .sort({ createdAt: 1 })
            .lean();

        return sales.map(mapSaleToLedgerRowResponse);
    }

    async findSalesInDateRange(from: Date, to: Date): Promise<SaleReportResponse[]> {
        const sales = await SaleModel.find({
            createdAt: {
                $gte: from,
                $lte: to,
            },
        })
            .populate<{
                itemId: { _id: Types.ObjectId; name: string };
            }>('itemId', 'name')
            .populate<{
                customerId: { _id: Types.ObjectId; name: string; mobile: string };
            }>('customerId', 'name mobile')
            .sort({ createdAt: 1 })
            .lean();

        return sales.map(mapSaleToReportResponse);
    }
}
