import { Types } from 'mongoose';

export interface SalePopulatedDB {
    _id: Types.ObjectId;
    itemId: {
        _id: Types.ObjectId;
        name: string;
    };
    quantity: number;
    priceAtSale: number;
    paymentType: 'CASH' | 'CUSTOMER';
    createdAt: Date;
}

export const mapSaleToLedgerRowResponse = (sale: SalePopulatedDB) => {
    return {
        id: sale._id.toString(),
        item: {
            id: sale.itemId._id?.toString() ?? "N/A",
            name: sale.itemId.name ?? "N/A",
        },
        quantity: sale.quantity,
        priceAtSale: sale.priceAtSale,
        paymentType: sale.paymentType,
        createdAt: sale.createdAt,
    };
};


