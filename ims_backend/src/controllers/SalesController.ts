import { Request, Response, NextFunction } from 'express';
import { CreateSaleBody } from '../validation/sale/createSaleSchema';
import { HTTP_STATUS } from '../constants/http_constants';
import { SUCCESS_MESSAGES } from '../messages/success_messages';
import { ISalesService } from '../services/SalesServiceInterface';

export class SalesController {
    constructor(
        private readonly _salesService: ISalesService
    ) { }
    
    createSale = async (
        req: Request<{}, {}, CreateSaleBody>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            await this._salesService.createSale(req.body);

            res.status(HTTP_STATUS.CREATED).json({
                message: SUCCESS_MESSAGES.SALE_CREATED,
            });
        } catch (error) {
            next(error);
        }
    };

    // getSales = async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const sales = await SaleModel.find()
    //             .populate('itemId', 'name')
    //             .populate('customerId', 'name mobile')
    //             .sort({ createdAt: -1 });

    //         res.status(HTTP_STATUS.OK).json({
    //             sales: sales.map(mapSaleResponse),
    //         });
    //     } catch (error) {
    //         next(error);
    //     }
    // };
}
