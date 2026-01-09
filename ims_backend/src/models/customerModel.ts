import { Schema, model, Document } from 'mongoose';
import { VALIDATION_MESSAGES } from '../messages/validation_messages';
import { CUSTOMER_NAME } from '../constants/validation_constants';

export interface ICustomer extends Document {
    name: string;
    address: string;
    mobile: string;
}

const customerSchema = new Schema<ICustomer>(
    {
        name: {
            type: String,
            required: [true, VALIDATION_MESSAGES.NAME_REQUIRED],
            trim: true,
            lowercase: true,
            minlength: [
                CUSTOMER_NAME.MIN_LENGTH,
                VALIDATION_MESSAGES.CUSTOMER_NAME_LENGTH,
            ],
            maxlength: [
                CUSTOMER_NAME.MAX_LENGTH,
                VALIDATION_MESSAGES.CUSTOMER_NAME_LENGTH,
            ],
        },
        address: {
            type: String,
            required: [true, VALIDATION_MESSAGES.ADDRESS_REQUIRED],
            trim: true,
        },
        mobile: {
            type: String,
            required: [true, VALIDATION_MESSAGES.MOBILE_REQUIRED],
            unique: true,
            trim: true,
        },
        // balance: {
        //     type: Number,
        //     default: 0,
        // },
    },
    {
        timestamps: true,
    }
);

const CustomerModel = model<ICustomer>('Customer', customerSchema);
export default CustomerModel;
