import { Router } from "express";
import authRoutes from './authRoute';
import inventoryRoutes from './itemRoute';
import customerRoutes from './customerRoute';
import saleRoutes from './saleRoute';
import reportRoutes from './reportRoute';

export const router = Router()

router.use('/auth', authRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/customers', customerRoutes);
router.use('/sales', saleRoutes);
router.use('/reports', reportRoutes);