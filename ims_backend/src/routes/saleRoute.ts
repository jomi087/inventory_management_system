import { Router } from 'express';
import { protect } from '../middleware/authMiddleware';
import { validateRequest } from '../middleware/validateRequest';
import { createSaleSchema } from '../validation/sale/createSaleSchema';
import { SalesController } from '../controllers/SalesController';
import { SalesServiceV1 } from '../services/SalesService';
import { SalesRepository } from '../repositories/SalesRepository';
import { CustomerRepository } from '../repositories/CustomerRepository';
import { ItemRepository } from '../repositories/ItemRepository';

const itemRepository = new ItemRepository();
const customerRepository = new CustomerRepository();
const salesRepository = new SalesRepository();

const salesService = new SalesServiceV1(
    itemRepository,
    customerRepository,
    salesRepository
);
const salesController = new SalesController(salesService);

const router = Router();

router
    .route('/')
    .all(protect)
    .post(validateRequest(createSaleSchema), salesController.createSale);
// .get(getSales);

export default router;
