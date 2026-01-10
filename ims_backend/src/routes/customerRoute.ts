import { Router } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import { protect } from '../middleware/authMiddleware';
import { createCustomerSchema } from '../validation/customer/createCustomerScehma';
import { updateCustomerSchema } from '../validation/customer/updateCustomerSchema';
import { CustomerController } from '../controllers/CustomerController';
import { CustomerServiceV1 } from '../services/CustomerService';
import { CustomerRepository } from '../repositories/CustomerRepository';

const customerRepository = new CustomerRepository();
const customerService = new CustomerServiceV1(customerRepository);
const customerController = new CustomerController(customerService);

const router = Router();

router
    .route('/')
    .all(protect)
    .post(
        validateRequest(createCustomerSchema),
        customerController.createCustomer
    )
    .get(customerController.getCustomers);

router
    .route('/:id')
    .all(protect)
    .put(
        validateRequest(updateCustomerSchema),
        customerController.updateCustomer
    );

export default router;
