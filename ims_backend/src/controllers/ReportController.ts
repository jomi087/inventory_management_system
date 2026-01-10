import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../constants/http_constants';
import { CustomerLedgerParams } from '../validation/report/customerLedgerSchema';
import { ReportServiceInterface } from '../services/ReportServiceInterface';
import { SaleReportQuery } from '../validation/report/saleReportSchema';
import { GetItemRequest } from '../validation/inventory/getItemsQuerySchema';

export class ReportController {
    constructor(private readonly _reportService: ReportServiceInterface) {}

    getCustomerLedger = async (
        req: Request<CustomerLedgerParams>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { id } = req.params;

            const { customer, transactions, totalAmount } =
                await this._reportService.getCustomerLedger(id);

            res.status(HTTP_STATUS.OK).json({
                customer,
                transactions,
                totalAmount,
            });
        } catch (error) {
            next(error);
        }
    };

    getSalesReport = async (
        req: Request<{}, {}, {}, SaleReportQuery>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const salesReport = this._reportService.getSalesReport(req.query);

            res.status(HTTP_STATUS.OK).json({
                salesReport,
            });
        } catch (error) {
            next(error);
        }
    };

    getItemsReport = async (
        req: Request<{}, {}, {}, GetItemRequest>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { search, page = '1', limit = '10' } = req.query;
            const pageNumber = Number(page);
            const limitNumber = Number(limit);

            const { items, total } = await this._reportService.getItemsReport(
                search as string,
                pageNumber,
                limitNumber
            );

            res.status(HTTP_STATUS.OK).json({
                items,
                total,
            });
        } catch (error) {
            next(error);
        }
    };
}
