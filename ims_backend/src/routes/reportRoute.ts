import { Router } from 'express';
import { protect } from '../middleware/authMiddleware';
import { validateRequest } from '../middleware/validateRequest';
import { customerLedgerSchema } from '../validation/report/customerLedgerSchema';
import { saleReportSchema } from '../validation/report/saleReportSchema';
import { ReportServiceV1 } from '../services/ReportService';
import { CustomerRepository } from '../repositories/CustomerRepository';
import { SalesRepository } from '../repositories/SalesRepository';
import { getItemsQuerySchema } from '../validation/inventory/getItemsQuerySchema';
import { ItemRepository } from '../repositories/ItemRepository';
import { ReportController } from '../controllers/ReportController';
import { itemReportSchema } from '../validation/report/itemReportSchema';
import { ExportServiceV1 } from '../services/ExportService';

const itemRepository = new ItemRepository();
const customerRepository = new CustomerRepository();
const salesRepository = new SalesRepository();
const exportService = new ExportServiceV1();
const reportService = new ReportServiceV1(
    customerRepository,
    salesRepository,
    itemRepository
);

const reportController = new ReportController(reportService, exportService);

const router = Router();

router.get(
    '/customers/:id',
    protect,
    validateRequest(customerLedgerSchema),
    reportController.getCustomerLedger
);

router.get(
    '/sales',
    protect,
    validateRequest(saleReportSchema),
    reportController.getSalesReport
);

router.get(
    '/items',
    protect,
    validateRequest(itemReportSchema),
    reportController.getItemsReport
);

// EXPORT - CUSTOMER LEDGER
router.get(
    '/customers/:id/export/pdf',
    protect,
    validateRequest(customerLedgerSchema),
    reportController.exportCustomerLedgerPDF
);

router.get(
    '/customers/:id/export/excel',
    protect,
    validateRequest(customerLedgerSchema),
    reportController.exportCustomerLedgerExcel
);

router.get(
    '/customers/:id/export/email',
    protect,
    validateRequest(customerLedgerSchema),
    reportController.exportCustomerLedgerEmail
);

// EXPORT - SALES
router.get(
    '/sales/export/pdf',
    protect,
    validateRequest(saleReportSchema),
    reportController.exportSalesPDF
);

router.get(
    '/sales/export/excel',
    protect,
    validateRequest(saleReportSchema),
    reportController.exportSalesExcel
);

router.get(
    '/sales/export/email',
    protect,
    validateRequest(saleReportSchema),
    reportController.exportSalesEmail
);

// EXPORT - ITEMS
router.get(
    '/items/export/pdf',
    protect,
    validateRequest(itemReportSchema),
    reportController.exportItemsPDF
);

router.get(
    '/items/export/excel',
    protect,
    validateRequest(itemReportSchema),
    reportController.exportItemsExcel
);

router.get(
    '/items/export/email',
    protect,
    validateRequest(itemReportSchema),
    reportController.exportItemsEmail
);

export default router;
