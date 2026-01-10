import { HTTP_STATUS } from '../constants/http_constants';
import { AppError } from '../errors/AppError';
import { ERROR_MESSAGES } from '../messages/error_messages';
import { CustomerRepositoryInterface } from '../repositories/CustomerRepositoryInterface';
import { ItemRepositoryInterface } from '../repositories/ItemRepositoryInterface';
import { SalesRepositoryInterface } from '../repositories/SalesRepositoryInterface';
import { GetItemsResult } from '../types/Items';
import { SaleLedgerResponse, SaleReportResponse } from '../types/report';
import { SaleReportQuery } from '../validation/report/saleReportSchema';
import { ReportServiceInterface } from './ReportServiceInterface';

export class ReportServiceV1 implements ReportServiceInterface {
    constructor(
        private readonly _customerRepository: CustomerRepositoryInterface,
        private readonly _saleRepository: SalesRepositoryInterface,
        private readonly _itemRepository: ItemRepositoryInterface
    ) {}

    async getCustomerLedger(id: string): Promise<{
        customer: {
            id: string;
            name: string;
            mobile: string;
        };
        transactions: SaleLedgerResponse[];
        totalAmount: number;
    }> {
        const customer = await this._customerRepository.findCustomerById(id);
        if (!customer) {
            throw new AppError(
                HTTP_STATUS.NOT_FOUND,
                ERROR_MESSAGES.CUSTOMER_NOT_FOUND
            );
        }

        const sales = await this._saleRepository.getSalesByCustomerId(id);

        const totalAmount = sales.reduce(
            (sum, sale) => sum + sale.quantity * sale.priceAtSale,
            0
        );

        return {
            customer: {
                id: customer.id,
                name: customer.name,
                mobile: customer.mobile,
            },
            transactions: sales,
            totalAmount,
        };
    }

    async getSalesReport(
        dateRange: SaleReportQuery
    ): Promise<SaleReportResponse[]> {
        const { from, to } = dateRange;

        let fromDate = from
            ? new Date(`${from}T00:00:00.000Z`)
            : new Date(new Date().setHours(0, 0, 0, 0));
        let toDate = to
            ? new Date(`${to}T00:00:00.000Z`)
            : new Date(new Date().setHours(23, 59, 59, 999));

        const salesReport = await this._saleRepository.findSalesInDateRange(
            fromDate,
            toDate
        );
        return salesReport;
    }

    async getItemsReport(
        search: string,
        pageNumber: number,
        limitNumber: number
    ): Promise<GetItemsResult> {
        const skip = (pageNumber - 1) * limitNumber;

        const filter =
            typeof search === 'string' && search.trim()
                ? {
                      $or: [
                          { name: { $regex: search, $options: 'i' } },
                          {
                              description: {
                                  $regex: search,
                                  $options: 'i',
                              },
                          },
                      ],
                  }
                : {};

        return await this._itemRepository.getItems(filter, skip, limitNumber);
    }
}
