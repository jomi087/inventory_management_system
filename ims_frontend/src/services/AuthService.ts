import { API_ROUTES } from '../constants/apiRoutes';
import type {
  CreateCustomerPayload,
  updateCustomerPayload,
} from '../types/customer';
import type {
  CreateItemPayload,
  UpdateItemPayload,
} from '../types/item';
import type { CreateSalesPayload } from '../types/sales';
import axiosInstance from './axiosConfig';

class AuthService {
  login(email: string, password: string) {
    return axiosInstance.post('/auth/login', { email, password });
  }

  getItems(search?: string, page?: number, limit?: number) {
    return axiosInstance.get('/inventory/items', {
      params: { search, page, limit },
    });
  }

  createItem(data: CreateItemPayload) {
    return axiosInstance.post('/inventory/items', data);
  }

  updateItem(id: string, data: UpdateItemPayload) {
    return axiosInstance.put(`/inventory/items/${id}`, data);
  }

  deleteItem(id: string) {
    return axiosInstance.delete(`/inventory/items/${id}`);
  }

  createSale(data: CreateSalesPayload) {
    return axiosInstance.post(API_ROUTES.SALES.ROOT, data);
  }

  getSales() {
    return axiosInstance.get(API_ROUTES.SALES.ROOT);
  }

  getCustomers(search?: string) {
    return axiosInstance.get(API_ROUTES.CUSTOMERS.ROOT, {
      params: { search },
    });
  }

  createCustomer(data: CreateCustomerPayload) {
    return axiosInstance.post(API_ROUTES.CUSTOMERS.ROOT, data);
  }

  updateCustomer(id: string, data: updateCustomerPayload) {
    return axiosInstance.put(API_ROUTES.CUSTOMERS.BY_ID(id), data);
  }

  getSalesReport(from?: string, to?: string) {
    const params: Record<string, string> = {};

    if (from) params.from = from;
    if (to) params.to = to;

    return axiosInstance.get(API_ROUTES.REPORTS.SALES, { params });
  }

  getItemsReport() {
    return axiosInstance.get(API_ROUTES.REPORTS.ITEMS);
  }

  getCustomerLedger(customerId: string) {
    return axiosInstance.get(API_ROUTES.REPORTS.CUSTOMER_LEDGER(customerId));
  }
}

export default new AuthService();
