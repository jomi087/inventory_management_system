import PDFDocument from 'pdfkit';
import { CustomerLedgerReport, ItemReportResult, SaleLedgerResponse, SaleReportResponse } from '../types/report';
import { ItemResponse } from '../types/Items';

export const generateSalesReportPDF = (data: SaleReportResponse[]) => {
    return new Promise<Buffer>((resolve) => {
        const doc = new PDFDocument();
        const buffers: Buffer[] = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => resolve(Buffer.concat(buffers)));

        doc.fontSize(18).text('Sales Report', { align: 'center' });
        doc.moveDown();

        data.forEach((sale: SaleReportResponse) => {
            doc.text(
                `${sale.item.name} | Qty: ${sale.quantity} | Price: ${sale.priceAtSale}`
            );
        });

        doc.end();
    });
};

export const generateItemsReportPDF = (data: ItemReportResult) => {
    return new Promise<Buffer>((resolve) => {
        const doc = new PDFDocument();
        const buffers: Buffer[] = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => resolve(Buffer.concat(buffers)));

        doc.text('Item Report');

        data.items.forEach((item: ItemResponse) => {
            doc.text(
                `${item.name} | Qty: ${item.quantity} | Price: ${item.price}`
            );
        });

        doc.end();
    });
};

export const generateCustomerLedgerPDF = (data: CustomerLedgerReport) => {
    return new Promise<Buffer>((resolve) => {
        const doc = new PDFDocument();
        const buffers: Buffer[] = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => resolve(Buffer.concat(buffers)));

        doc.text(`Customer: ${data.customer.name}`);
        doc.moveDown();

        data.transactions.forEach((t: SaleLedgerResponse) => {
            doc.text(
                `${t.createdAt} | Qty: ${t.quantity} | Amount: ${
                    t.quantity * t.priceAtSale
                }`
            );
        });

        doc.text(`Total: ${data.totalAmount}`);
        doc.end();
    });
};
