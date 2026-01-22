import { HTTP_STATUS } from '../constants/http_constants';
import { AppError } from '../errors/AppError';
import { ERROR_MESSAGES } from '../messages/error_messages';
import { IItemRepository } from '../repositories/ItemRepositoryInterface';
import { GetItemsResult, ItemResponse } from '../types/Items';
import { UpdateItemBody } from '../validation/inventory/updateItemSchema';
import { IItemService } from './ItemServiceInterface';

export class ItemServiceV1 implements IItemService {
    constructor(private readonly _itemRepository: IItemRepository ) {}

    async getItems(
        pageNumber: number,
        limitNumber: number,
        search?: string
    ): Promise<GetItemsResult> {
        const skip = (pageNumber - 1) * limitNumber;

        const trimmedSearch = search?.trim();
        const filter = trimmedSearch
            ? {
                  $or: [
                      { name: { $regex: trimmedSearch, $options: 'i' } },
                      {
                          description: {
                              $regex: trimmedSearch,
                              $options: 'i',
                          },
                      },
                  ],
              }
            : {};

        return await this._itemRepository.getItems(filter, skip, limitNumber);
    }

    async createItem(
        name: string,
        description: string,
        quantity: number,
        price: number
    ): Promise<ItemResponse> {
        const sanitizedName = name.trim().toLowerCase();

        const existingItem =
            await this._itemRepository.findExistingItemByName(sanitizedName);

        if (existingItem) {
            throw new AppError(HTTP_STATUS.CONFLICT, ERROR_MESSAGES.ITEM_EXIST);
        }

        return await this._itemRepository.createItem({
            name: sanitizedName,
            description: description.trim(),
            quantity,
            price,
        });
    }

    async updateItem(
        id: string,
        update: UpdateItemBody
    ): Promise<ItemResponse> {
        if (update.name) {
            const sanitizedName = update.name.trim().toLowerCase();

            const existingItem =
                await this._itemRepository.findExistingItemByName(
                    sanitizedName,
                    id
                );

            if (existingItem) {
                throw new AppError(
                    HTTP_STATUS.CONFLICT,
                    ERROR_MESSAGES.ITEM_EXIST
                );
            }
            update.name = sanitizedName;
        }

        const updatedItem = await this._itemRepository.updateItemById(
            id,
            update
        );

        if (!updatedItem) {
            throw new AppError(
                HTTP_STATUS.NOT_FOUND,
                ERROR_MESSAGES.ITEM_NOT_FOUND
            );
        }

        return updatedItem;
    }

    async deleteItem(id: string): Promise<void> {
        const deletedItem = await this._itemRepository.deleteById(id);

        if (!deletedItem) {
            throw new AppError(
                HTTP_STATUS.NOT_FOUND,
                ERROR_MESSAGES.ITEM_NOT_FOUND
            );
        }
    }
}
