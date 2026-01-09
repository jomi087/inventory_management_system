import { GetItemsResult, ItemFilter, ItemResponse } from '../types/Items';

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
        updateData: {
            name?: string | undefined;
            description?: string | undefined;
            quantity?: number | undefined;
            price?: number | undefined;
        }
    ): Promise<ItemResponse | null>;
    deleteById(id: string): Promise<boolean>;
}
