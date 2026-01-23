import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../constants/http_constants';
import {
    CustomerLedgerParams,
    CustomerLedgerQuery,
} from '../validation/report/customerLedgerSchema';
import { IReportService } from '../services/ReportServiceInterface';
import { SaleReportQuery } from '../validation/report/saleReportSchema';
import { ItemReportQuery } from '../validation/report/itemReportSchema';
import { IExportService } from '../services/ExportServiceInterface';

export class ReportController {
    constructor(
        private readonly _reportService: IReportService,
        private readonly _exportService: IExportService
    ) {}

    getCustomerLedger = async (
        req: Request<CustomerLedgerParams, {}, {}, CustomerLedgerQuery>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { id } = req.params;
            const { page = '1', limit = '10' } = req.query;
            const pageNumber = Number(page);
            const limitNumber = Number(limit);

            const { customer, transactions, totalAmount, total } =
                await this._reportService.getCustomerLedger(
                    id,
                    pageNumber,
                    limitNumber
                );

            res.status(HTTP_STATUS.OK).json({
                customer,
                transactions,
                totalAmount,
                total,
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
            const { data, total } = await this._reportService.getSalesReport(
                req.query
            );

            res.status(HTTP_STATUS.OK).json({
                salesReport: data,
                total,
            });
        } catch (error) {
            next(error);
        }
    };

    getItemsReport = async (
        req: Request<{}, {}, {}, ItemReportQuery>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { page = '1', limit = '10' } = req.query;
            const pageNumber = Number(page);
            const limitNumber = Number(limit);

            const {
                items,
                total,
                lowStockCount,
                outOfStockCount,
                totalInventoryValue,
            } = await this._reportService.getItemsReport(
                pageNumber,
                limitNumber
            );

            res.status(HTTP_STATUS.OK).json({
                items,
                total,
                lowStockCount,
                outOfStockCount,
                totalInventoryValue,
            });
        } catch (error) {
            next(error);
        }
    };


    exportSalesEmail = async (
        req: Request<{}, {}, {}, SaleReportQuery>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { data } = await this._reportService.getSalesReport(
                req.query
            );

            const pdf = await this._exportService.exportSalesPDF(data);

            await this._exportService.sendReportEmail(
                req.user!.email,
                'Sales Report',
                pdf,
                'sales.pdf'
            );

            res.json({ message: 'Email sent' });
        } catch (error) {
            next(error);
        }
    };


    exportItemsEmail = async (
        req: Request<{}, {}, {}, ItemReportQuery>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { page = '1', limit = '10' } = req.query;

            const data = await this._reportService.getItemsReport(
                Number(page),
                Number(limit)
            );

            const pdf = await this._exportService.exportItemsPDF(data);

            await this._exportService.sendReportEmail(
                req.user!.email,
                'Items Report',
                pdf,
                'items.pdf'
            );

            res.json({ message: 'Email sent' });
        } catch (error) {
            next(error);
        }
    };


    exportCustomerLedgerEmail = async (
        req: Request<CustomerLedgerParams, {}, {}, CustomerLedgerQuery>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { id } = req.params;

            const data = await this._reportService.getCustomerLedger(
                id,
                1,
                1000
            ); // export full ledger

            const pdf = await this._exportService.exportCustomerLedgerPDF(data);

            await this._exportService.sendReportEmail(
                req.user!.email,
                'Customer Report',
                pdf,
                'customer.pdf'
            );

            res.json({ message: 'Email sent' });
        } catch (error) {
            next(error);
        }
    };
}
