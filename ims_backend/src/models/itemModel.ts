import { Schema, model, Document } from 'mongoose';
import {
    ITEM_DESCRIPTION,
    ITEM_NAME,
    ITEM_NUMBERS,
} from '../constants/validation_constants';
import { VALIDATION_MESSAGES } from '../messages/validation_messages';

const { ITEM_NAME_LENGTH, NAME_REQUIRED, DESCRIPTION_LENGTH, DESCRIPTION_REQUIRED,  QUANTITY_REQUIRED, QUANTITY_MIN, PRICE_MIN, PRICE_REQUIRED } =
    VALIDATION_MESSAGES;


export interface Iitem extends Document {
    name: string;
    description: string;
    quantity: number;
    price: number;
}

const itemSchema = new Schema<Iitem>(
    {
        name: {
            type: String,
            required: [true,NAME_REQUIRED],
            lowercase: true,
            trim: true,
            minlength: [ITEM_NAME.MIN_LENGTH, ITEM_NAME_LENGTH],
            maxlength: [ITEM_NAME.MAX_LENGTH, ITEM_NAME_LENGTH],
        },
        description: {
            type: String,
            required: [true, DESCRIPTION_REQUIRED],
            lowercase: true,
            trim: true,
            minlength: [ITEM_DESCRIPTION.MIN_LENGTH, DESCRIPTION_LENGTH],
            maxlength: [ITEM_DESCRIPTION.MAX_LENGTH, DESCRIPTION_LENGTH],
        },
        quantity: {
            type: Number,
            required: [true, QUANTITY_REQUIRED],
            min: [ITEM_NUMBERS.MIN_QUANTITY, QUANTITY_MIN],
        },
        price: {
            type: Number,
            required: [true, PRICE_REQUIRED],
            min: [ITEM_NUMBERS.MIN_PRICE, PRICE_MIN],
        },
    },
    {
        timestamps: true,
    }
);

const ItemModel = model<Iitem>('Item', itemSchema);
export default ItemModel;
