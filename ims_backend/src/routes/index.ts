import { Router } from "express";
import authRoutes from './authRoute';
import inventoryRoutes from './itemRoute';

export const router = Router()

router.use('/auth', authRoutes);
router.use('/inventory', inventoryRoutes);
