import { Schema, model, Document, Types } from 'mongoose';

export interface ISale extends Document {
    itemId: Types.ObjectId;
    quantity: number;
    priceAtSale: number;
    customerId?: Types.ObjectId;
    paymentType: 'CASH' | 'CUSTOMER';
}

const saleSchema = new Schema<ISale>(
    {
        itemId: {
            type: Types.ObjectId,
            ref: 'Item',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        priceAtSale: {
            type: Number,
            required: true,
        },
        customerId: {
            type: Types.ObjectId,
            ref: 'Customer',
        },
        paymentType: {
            type: String,
            enum: ['CASH', 'CUSTOMER'],
            required: true,
        },
    },
    { timestamps: true }
);

const SaleModel = model<ISale>('Sale', saleSchema);
export default SaleModel;
