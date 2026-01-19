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
        customerId: string,
        skip: number,
        limit: number
    ): Promise<{
        data: SaleLedgerResponse[];
        total: number;
    }> {
        const [total, sales] = await Promise.all([
            SaleModel.countDocuments({ customerId }),
            SaleModel.find({ customerId })
                .populate<{
                    itemId: { _id: Types.ObjectId; name: string };
                }>('itemId', 'name')
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: 1 })
                .lean(),
        ]);
        return {
            data: sales.map(mapSaleToLedgerRowResponse),
            total,
        };
    }

    async getTotalAmountByCustomerId(customerId: string): Promise<number> {
        const result = await SaleModel.aggregate([
            { $match: { customerId } },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: {
                            $multiply: ['$quantity', '$priceAtSale'],
                        },
                    },
                },
            },
        ]);

        return result.length ? result[0].total : 0;
    }

    async findSalesInDateRange(
        from: Date,
        to: Date,
        skip: number,
        limit: number
    ): Promise<{
        data: SaleReportResponse[];
        total: number;
    }> {
        const filter = {
            createdAt: {
                $gte: from,
                $lte: to,
            },
        };
        const [total, sales] = await Promise.all([
            SaleModel.countDocuments(filter),
            SaleModel.find(filter)
                .populate<{
                    itemId: { _id: Types.ObjectId; name: string };
                }>('itemId', 'name')
                .populate<{
                    customerId: {
                        _id: Types.ObjectId;
                        name: string;
                        mobile: string;
                    };
                }>('customerId', 'name mobile')
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })
                .lean(),
        ]);

        return {
            data: sales.map(mapSaleToReportResponse),
            total,
        };
    }
}
