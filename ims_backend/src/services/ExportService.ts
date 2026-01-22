// services/ExportService.ts
import {
    generateSalesReportPDF,
    generateItemsReportPDF,
    generateCustomerLedgerPDF,
} from '../utils/pdfExporter';

import {
    generateSalesReportExcel,
    generateItemsReportExcel,
    generateCustomerLedgerExcel,
} from '../utils/excelExporter';

import { IExportService } from './ExportServiceInterface';
import { sendMail } from '../utils/mail';

export class ExportServiceV1 implements IExportService {
    async exportSalesPDF(data: any): Promise<Buffer> {
        return generateSalesReportPDF(data);
    }

    async exportSalesExcel(data: any): Promise<Buffer> {
        return generateSalesReportExcel(data);
    }

    async exportItemsPDF(data: any): Promise<Buffer> {
        return generateItemsReportPDF(data);
    }

    async exportItemsExcel(data: any): Promise<Buffer> {
        return generateItemsReportExcel(data);
    }

    async exportCustomerLedgerPDF(data: any): Promise<Buffer> {
        return generateCustomerLedgerPDF(data);
    }

    async exportCustomerLedgerExcel(data: any): Promise<Buffer> {
        return generateCustomerLedgerExcel(data);
    }

    async sendReportEmail(
        to: string,
        subject: string,
        file: Buffer,
        filename: string
    ) {

        return sendMail(
            to,
            subject,
            'Please find attached report',
            [
                {
                    filename,
                    content: file,
                },
            ],
        );
    }
}
