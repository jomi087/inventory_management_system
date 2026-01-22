import { GetItemsResult, ItemResponse } from '../types/Items';
import { UpdateItemBody } from '../validation/inventory/updateItemSchema';

export interface IItemService {
    getItems(
        pageNumber: number,
        limitNumber: number,
        search?: string
    ): Promise<GetItemsResult>;
    createItem(
        name: string,
        description: string,
        quantity: number,
        price: number
    ): Promise<ItemResponse>;
    updateItem(id: string, update: UpdateItemBody): Promise<ItemResponse>;
    deleteItem(id: string): Promise<void>;
}
