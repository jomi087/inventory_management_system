import { Types } from "mongoose";

export interface ItemDB {
  _id: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export const mapItemResponse = (item: ItemDB) => {
    return {
        id: item._id.toString(),
        name: item.name,
        description: item.description,
        price: item.price,
        quantity: item.quantity,
    };
};
