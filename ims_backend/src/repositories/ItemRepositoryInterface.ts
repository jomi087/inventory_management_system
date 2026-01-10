import { GetItemsResult, ItemFilter, ItemResponse } from '../types/Items';
import { UpdateItemBody } from '../validation/inventory/updateItemSchema';

export interface ItemRepositoryInterface {
    getItems(
        filter: ItemFilter,
        skip: number,
        limit: number
    ): Promise<GetItemsResult>;
    findExistingItemByName(name: string, excludeId?: string): Promise<boolean>;
    createItem(payload: {
        name: string;
        description: string;
        quantity: number;
        price: number;
    }): Promise<ItemResponse>;
    updateById(
        id: string,
        updateData: UpdateItemBody
    ): Promise<ItemResponse | null>;
    deleteById(id: string): Promise<boolean>;
    findItemById(id: string): Promise<ItemResponse | null>;
    reduceStock(itemId: string, quantity: number): Promise<ItemResponse | null>;
}
