import ItemModel from '../models/itemModel';
import { GetItemsResult, ItemFilter, ItemResponse } from '../types/Items';
import { UpdateItemBody } from '../validation/inventory/updateItemSchema';
import { ItemRepositoryInterface } from './ItemRepositoryInterface';
import { mapItemResponse } from './mappers/itemMapper';

export class ItemRepository implements ItemRepositoryInterface {
    async getItems(
        filter: ItemFilter,
        skip: number,
        limit: number
    ): Promise<GetItemsResult> {
        const [items, total] = await Promise.all([
            ItemModel.find(filter).skip(skip).limit(limit).lean(),
            ItemModel.countDocuments(filter),
        ]);

        return {
            items: items.map(mapItemResponse),
            total,
        };
    }

    async findExistingItemByName(
        name: string,
        excludeId?: string
    ): Promise<boolean> {
        const query: { name: string; _id?: { $ne: string } } = { name };

        if (excludeId) {
            query._id = { $ne: excludeId };
        }

        const item = await ItemModel.findOne(query);

        return item ? true : false;
    }

    async createItem(payload: {
        name: string;
        description: string;
        quantity: number;
        price: number;
    }): Promise<ItemResponse> {
        const newItem = await ItemModel.create(payload);
        return mapItemResponse(newItem);
    }

    async updateById(
        id: string,
        updateData: UpdateItemBody
    ): Promise<ItemResponse | null> {
        const updatedItem = await ItemModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        );
        if (!updatedItem) return null;
        return mapItemResponse(updatedItem);
    }

    async deleteById(id: string): Promise<boolean> {
        const deletedData = await ItemModel.findByIdAndDelete(id);
        return deletedData ? true : false;
    }

    async findItemById(id: string): Promise<ItemResponse | null> {
        const item = await ItemModel.findById(id);
        if (!item) return null;
        return mapItemResponse(item);
    }

    async reduceStock(
        itemId: string,
        quantity: number
    ): Promise<ItemResponse | null> {
        const updatedItem = await ItemModel.findByIdAndUpdate(
            {
                _id: itemId,
                quantity: { $gte: quantity },
            },
            { $inc: { quantity: -quantity } },
            { new: true }
        );
        if (!updatedItem) return null;
        return mapItemResponse(updatedItem);
    }
}
