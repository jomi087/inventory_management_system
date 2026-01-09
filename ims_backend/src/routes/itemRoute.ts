import { Router } from 'express';
import { protect } from '../middleware/authMiddleware';
import { validateRequest } from '../middleware/validateRequest';
import { getItemsQuerySchema } from '../validation/inventory/getItemsQuerySchema';
import { createdItemSchema } from '../validation/inventory/createItemSchema ';
import { updateItemSchema } from '../validation/inventory/updateItemSchema';
import { deleteItemSchema } from '../validation/inventory/deleteItemSchema';
import { ItemControllers } from '../controllers/ItemControllers';
import { ItemServiceV1 } from '../services/ItemService';
import { ItemRepository } from '../repositories/ItemRepository';


const itemRepository = new ItemRepository()
const itemService = new ItemServiceV1(itemRepository)
const itemControllers = new ItemControllers(itemService)

const router = Router();

router
    .route('/items')
    .all(protect) // applies to GET, POST, PUT, DELETE
    .get(validateRequest(getItemsQuerySchema), itemControllers.getItems)
    .post(validateRequest(createdItemSchema), itemControllers.createItem);
//now pending
router
    .route('/items/:id')
    .all(protect)
    .put(validateRequest(updateItemSchema), itemControllers.updateItem)
    .delete(validateRequest(deleteItemSchema), itemControllers.deleteItem);

export default router;
