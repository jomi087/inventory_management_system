import { NextFunction, Request, Response } from 'express';

import { SUCCESS_MESSAGES } from '../messages/success_messages';
import { GetItemRequest } from '../validation/inventory/getItemsQuerySchema';
import { HTTP_STATUS } from '../constants/http_constants';
import { createItemRequest } from '../validation/inventory/createItemSchema ';
import {
    UpdateItemBody,
    UpdateItemParams,
} from '../validation/inventory/updateItemSchema';
import { DeleteItemParams } from '../validation/inventory/deleteItemSchema';
import { ItemServiceInterface } from '../services/ItemServiceInterface';

export class ItemController {
    constructor(private readonly _itemService: ItemServiceInterface) {}

    getItems = async (
        req: Request<{}, {}, {}, GetItemRequest>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { search, page = '1', limit = '10' } = req.query;
            const pageNumber = Number(page);
            const limitNumber = Number(limit);

            const { items, total } = await this._itemService.getItems(
                pageNumber,
                limitNumber,
                search,
            );

            res.status(HTTP_STATUS.OK).json({
                items,
                total,
            });
        } catch (error) {
            next(error);
        }
    };

    createItem = async (
        req: Request<{}, {}, createItemRequest>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { name, description, price, quantity } = req.body;

            const items = await this._itemService.createItem(
                name,
                description,
                quantity,
                price
            );

            res.status(HTTP_STATUS.CREATED).json({
                message: SUCCESS_MESSAGES.ITEM_CREATED,
                items,
            });
        } catch (error) {
            next(error);
        }
    };

    updateItem = async (
        req: Request<UpdateItemParams, {}, UpdateItemBody>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const update = req.body;
            const { id } = req.params;

            const updatedItem = await this._itemService.updateItem(id, update);

            res.status(HTTP_STATUS.OK).json({
                message: SUCCESS_MESSAGES.ITEM_UPDATED,
                item: updatedItem,
            });
        } catch (error) {
            next(error);
        }
    };

    deleteItem = async (
        req: Request<DeleteItemParams>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { id } = req.params;

            await this._itemService.deleteItem(id);

            res.status(HTTP_STATUS.OK).json({
                message: SUCCESS_MESSAGES.ITEM_DELETED,
            });
        } catch (error) {
            next(error);
        }
    };
}
