import { Types } from "mongoose";
import { IItem } from "../../models/itemModel";

// export interface ItemDB {  IItem is serving the same purpose
//   _id: Types.ObjectId;
//   name: string;
//   description: string;
//   price: number;
//   quantity: number;
// }

export const mapItemResponse = (item: IItem) => {
    return {
        id: item._id.toString(),
        name: item.name,
        description: item.description,
        price: item.price,
        quantity: item.quantity,
    };
};
