import { HTTP_STATUS } from '../constants/http_constants';
import { AppError } from '../errors/AppError';
import { ERROR_MESSAGES } from '../messages/error_messages';
import { CustomerRepositoryInterface } from '../repositories/CustomerRepositoryInterface';
import { ItemRepositoryInterface } from '../repositories/ItemRepositoryInterface';
import { SalesRepositoryInterface } from '../repositories/SalesRepositoryInterface';
import { GetItemsResult, ItemReportResult } from '../types/Items';
import { SaleLedgerResponse, SaleReportResponse } from '../types/report';
import { SaleReportQuery } from '../validation/report/saleReportSchema';
import { ReportServiceInterface } from './ReportServiceInterface';

export class ReportServiceV1 implements ReportServiceInterface {
    constructor(
        private readonly _customerRepository: CustomerRepositoryInterface,
        private readonly _saleRepository: SalesRepositoryInterface,
        private readonly _itemRepository: ItemRepositoryInterface
    ) {}

    async getCustomerLedger(
        id: string,
        pageNumber: number,
        limitNumber: number
    ): Promise<{
        customer: {
            id: string;
            name: string;
            mobile: string;
        };
        transactions: SaleLedgerResponse[];
        totalAmount: number;
        total: number;
    }> {
        const skip = (pageNumber - 1) * limitNumber;

        const customer = await this._customerRepository.findCustomerById(id);
        if (!customer) {
            throw new AppError(
                HTTP_STATUS.NOT_FOUND,
                ERROR_MESSAGES.CUSTOMER_NOT_FOUND
            );
        }

        const { data: sales, total } =
            await this._saleRepository.getSalesByCustomerId(
                id,
                skip,
                limitNumber
            );

        const totalAmount =
            await this._saleRepository.getTotalAmountByCustomerId(id);

        return {
            customer: {
                id: customer.id,
                name: customer.name,
                mobile: customer.mobile,
            },
            transactions: sales,
            totalAmount,
            total,
        };
    }

    async getSalesReport(dateRange: SaleReportQuery): Promise<{
        data: SaleReportResponse[];
        total: number;
    }> {
        const { from, to, page = '1', limit = '10' } = dateRange;
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;

        let fromDate = from
            ? new Date(`${from}T00:00:00.000Z`)
            : new Date(new Date().setHours(0, 0, 0, 0));
        let toDate = to
            ? new Date(`${to}T23:59:59.999Z`)
            : new Date(new Date().setHours(23, 59, 59, 999));

        const salesReport = await this._saleRepository.findSalesInDateRange(
            fromDate,
            toDate,
            skip,
            limitNumber
        );
        return salesReport;
    }

    async getItemsReport(
        pageNumber: number,
        limitNumber: number
    ): Promise<ItemReportResult> {
        const skip = (pageNumber - 1) * limitNumber;
        const filter = {};

        const { items, total } = await this._itemRepository.getItems(
            filter,
            skip,
            limitNumber
        );

        const lowStockCount = await this._itemRepository.countLowStock(10);

        const outOfStockCount = await this._itemRepository.countOutOfStock();

        const totalInventoryValue =
            await this._itemRepository.getTotalInventoryValue();

        return {
            items,
            total,
            lowStockCount,
            outOfStockCount,
            totalInventoryValue,
        };
    }

    
}
