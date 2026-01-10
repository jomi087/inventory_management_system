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

const itemRepository = new ItemRepository()
const customerRepository = new CustomerRepository();
const salesRepository = new SalesRepository();
const reportService = new ReportServiceV1(customerRepository, salesRepository, itemRepository);
const reportController = new ReportController(reportService);

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

router.get('/items', protect, validateRequest(getItemsQuerySchema), reportController.getItemsReport);

export default router;