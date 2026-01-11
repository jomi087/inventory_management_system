import PDFDocument from 'pdfkit';

export const generateSalesReportPDF = (data: any) => {
    return new Promise<Buffer>((resolve) => {
        const doc = new PDFDocument();
        const buffers: Buffer[] = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => resolve(Buffer.concat(buffers)));

        doc.fontSize(18).text('Sales Report', { align: 'center' });
        doc.moveDown();

        data.forEach((sale: any) => {
            doc.text(
                `${sale.itemName} | Qty: ${sale.quantity} | Price: ${sale.priceAtSale}`
            );
        });

        doc.end();
    });
};

export const generateItemsReportPDF = (data: any) => {
    return new Promise<Buffer>((resolve) => {
        const doc = new PDFDocument();
        const buffers: Buffer[] = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => resolve(Buffer.concat(buffers)));

        doc.text('Item Report');

        data.items.forEach((item: any) => {
            doc.text(
                `${item.name} | Qty: ${item.quantity} | Price: ${item.price}`
            );
        });

        doc.end();
    });
};

export const generateCustomerLedgerPDF = (data: any) => {
    return new Promise<Buffer>((resolve) => {
        const doc = new PDFDocument();
        const buffers: Buffer[] = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => resolve(Buffer.concat(buffers)));

        doc.text(`Customer: ${data.customer.name}`);
        doc.moveDown();

        data.transactions.forEach((t: any) => {
            doc.text(
                `${t.date} | Qty: ${t.quantity} | Amount: ${
                    t.quantity * t.priceAtSale
                }`
            );
        });

        doc.text(`Total: ${data.totalAmount}`);
        doc.end();
    });
};
