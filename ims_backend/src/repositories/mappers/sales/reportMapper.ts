import { Types } from 'mongoose';

export interface SaleReportPopulatedDB {
    _id: Types.ObjectId;
    itemId: {
        _id: Types.ObjectId;
        name: string;
    };
    quantity: number;
    priceAtSale: number;
    customerId: {
        _id: Types.ObjectId;
        name: string;
        mobile: string;
    };
    paymentType: 'CASH' | 'CUSTOMER';
    createdAt: Date;
}

export const mapSaleToReportResponse  = (sale: SaleReportPopulatedDB) => {
    return {
        id: sale._id.toString(),
        item: {
            id: sale.itemId._id?.toString() ?? 'N/A',
            name: sale.itemId.name ?? 'N/A',
        },
        quantity: sale.quantity,
        priceAtSale: sale.priceAtSale,
        customer: {
            id: sale.customerId._id.toString(),
            name: sale.customerId.name,
            mobile: sale.customerId.mobile,
        },
        paymentType: sale.paymentType,
        createdAt: sale.createdAt,
    };
};
