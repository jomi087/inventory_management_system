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
    return axiosInstance.post('/sales', data);
  }

  getSales() {
    return axiosInstance.get('/sales/');
  }

  getCustomers(search?: string) {
    return axiosInstance.get('/customers', {
      params: { search },
    });
  }

  createCustomer(data: CreateCustomerPayload) {
    return axiosInstance.post('/customers', data);
  }

  updateCustomer(id: string, data: updateCustomerPayload) {
    return axiosInstance.put(`/customers/${id}`, data);
  }

  getSalesReport(from?: string, to?: string) {
    const params: Record<string, string> = {};

    if (from) params.from = from;
    if (to) params.to = to;

    return axiosInstance.get('/reports/sales', { params });
  }

  getItemsReport() {
    return axiosInstance.get('/reports/items');
  }

  getCustomerLedger(customerId: string) {
    return axiosInstance.get(`/reports/customers/${customerId}`);
  }
}

export default new AuthService();
