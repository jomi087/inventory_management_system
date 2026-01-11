import ExcelJS from 'exceljs';

export const generateSalesReportExcel = async (data: any): Promise<Buffer> => {
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet('Sales');

    ws.columns = [
        { header: 'Item', key: 'item' },
        { header: 'Qty', key: 'qty' },
        { header: 'Price', key: 'price' },
    ];

    data.forEach((sale: any) => {
        ws.addRow({
            item: sale.itemName,
            qty: sale.quantity,
            price: sale.priceAtSale,
        });
    });

    const file = await wb.xlsx.writeBuffer();
    return Buffer.from(file);
};

export const generateItemsReportExcel = async (data: any): Promise<Buffer> => {
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet('Items');

    ws.columns = [
        { header: 'Name', key: 'name' },
        { header: 'Qty', key: 'qty' },
        { header: 'Price', key: 'price' },
    ];

    data.items.forEach((item: any) => {
        ws.addRow({
            name: item.name,
            qty: item.quantity,
            price: item.price,
        });
    });

    const file = await wb.xlsx.writeBuffer();
    return Buffer.from(file);
};

export const generateCustomerLedgerExcel = async (data: any): Promise<Buffer> => {
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet('Ledger');

    ws.columns = [
        { header: 'Date', key: 'date' },
        { header: 'Qty', key: 'qty' },
        { header: 'Amount', key: 'amount' },
    ];

    data.transactions.forEach((t: any) => {
        ws.addRow({
            date: t.date,
            qty: t.quantity,
            amount: t.quantity * t.priceAtSale,
        });
    });

    const file = await wb.xlsx.writeBuffer();
    return Buffer.from(file);
};
