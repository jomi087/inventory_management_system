import { Router } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import { protect } from '../middleware/authMiddleware';
import { createCustomerSchema } from '../validation/customer/createCustomerScehma';
import { updateCustomerSchema } from '../validation/customer/updateCustomerSchema';
import { CustomerControllers } from '../controllers/customerController';
import { CustomerServiceV1 } from '../services/customerService';
import { CustomerRepository } from '../repositories/CustomerRepository';

const customerRepository = new CustomerRepository();
const customerService = new CustomerServiceV1(customerRepository)
const customerControllers = new CustomerControllers(customerService)


const router = Router();

router
    .route('/')
    .all(protect)
    .post(validateRequest(createCustomerSchema), customerControllers.createCustomer)
    .get(customerControllers.getCustomers);

router
  .route('/:id')
  .all(protect)
  .put(validateRequest(updateCustomerSchema), customerControllers.updateCustomer);

export default router;
