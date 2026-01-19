import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { FiX } from 'react-icons/fi';
import { useDebounce } from 'use-debounce';

import AuthService from '../services/AuthService';

interface Item {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Customer {
  id: string;
  name: string;
}

type PaymentType = 'CASH' | 'CUSTOMER';

const Sales = () => {
  /* ---------------- STATE ---------------- */
  const [items, setItems] = useState<Item[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch] = useDebounce(searchQuery, 500);

  const [form, setForm] = useState({
    itemId: '',
    quantity: '1',
    paymentType: 'CASH' as PaymentType,
    customerId: '',
  });

  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  /* ---------------- FETCH ITEMS ---------------- */
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await AuthService.getItems();
      setItems(res.data.items);
    } catch (error) {
      handleError(error, 'Failed to load items');
    }
  };

  /* ---------------- DEBOUNCED SEARCH ---------------- */
  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setCustomers([]);
      return;
    }

    searchCustomer(debouncedSearch);
  }, [debouncedSearch]);

  const searchCustomer = async (query: string) => {
    try {
      setSearchLoading(true);
      const res = await AuthService.getCustomers(query);
      setCustomers(res.data.customer || []);
    } catch (error) {
      handleError(error, 'Failed to search customer');
    } finally {
      setSearchLoading(false);
    }
  };

  /* ---------------- CREATE SALE ---------------- */
  const handleSale = async () => {
    const soldQty = Number(form.quantity);
    const selectedItem = items.find(i => i.id === form.itemId);

    if (!selectedItem) return;

    if (soldQty > selectedItem.quantity) {
      toast.error('Insufficient stock');
      return;
    }

    try {
      setLoading(true);

      await AuthService.createSale({
        itemId: form.itemId,
        quantity: soldQty,
        paymentType: form.paymentType,
        customerId:
          form.paymentType === 'CUSTOMER'
            ? form.customerId
            : undefined,
      });

      toast.success('Sale completed');

      resetForm();
      updateStock(form.itemId, soldQty);
    } catch (error) {
      handleError(error, 'Failed to create sale');
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- HELPERS ---------------- */
  const resetForm = () => {
    setForm({
      itemId: '',
      quantity: '1',
      paymentType: 'CASH',
      customerId: '',
    });
    setSearchQuery('');
    setCustomers([]);
  };

  const updateStock = (id: string, sold: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity - sold }
          : item
      )
    );
  };

  const handleError = (error: unknown, fallback: string) => {
    let msg = fallback;

    if (axios.isAxiosError(error)) {
      msg = error.response?.data?.message || fallback;
    }

    toast.error(msg);
  };

  const isSubmitDisabled = useMemo(() => {
    const qty = Number(form.quantity);

    return (
      !form.itemId ||
      qty <= 0 ||
      isNaN(qty) ||
      (form.paymentType === 'CUSTOMER' && !form.customerId)
    );
  }, [form]);

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Breadcrumb */}
      <nav className="px-6 pt-4 text-sm text-gray-600">
        <ol className="flex space-x-2">
          <li>
            <Link to="/" className="hover:text-gray-900">
              Dashboard
            </Link>
          </li>
          <li>/</li>
          <li className="font-semibold text-gray-800">Sales</li>
        </ol>
      </nav>

      {/* Card */}
      <div className="flex justify-center p-6">
        <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
          <h2 className="mb-6 text-center text-2xl font-bold">
            Create Sale
          </h2>

          <div className="space-y-5">
            {/* Item */}
            <div>
              <label className="text-sm font-medium">Item</label>
              <select
                className="w-full rounded-lg border px-3 py-2"
                value={form.itemId}
                onChange={e =>
                  setForm(prev => ({
                    ...prev,
                    itemId: e.target.value,
                  }))
                }
              >
                <option value="">Select Item</option>
                {items.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name} | ₹{item.price} | Qty:
                    {item.quantity}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="text-sm font-medium">Quantity</label>
              <input
                type="number"
                min={1}
                className="w-full rounded-lg border px-3 py-2"
                value={form.quantity}
                onChange={e =>
                  setForm(prev => ({
                    ...prev,
                    quantity: e.target.value,
                  }))
                }
              />
            </div>

            {/* Payment */}
            <div>
              <label className="text-sm font-medium">
                Payment Type
              </label>
              <select
                className="w-full rounded-lg border px-3 py-2"
                value={form.paymentType}
                onChange={e => {
                  const mode = e.target.value as PaymentType;
                  if (mode == 'CASH' && form.customerId) {
                    setForm(prev => ({
                      ...prev,
                      customerId: '',
                    }));
                  }
                  setForm(prev => ({
                    ...prev,
                    paymentType: mode,
                  }));
                }}
              >
                <option value="CASH">Cash</option>
                <option value="CUSTOMER">Customer</option>
              </select>
            </div>

            {/* Customer Search */}
            {form.paymentType === 'CUSTOMER' && (
              <>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full border-b p-1 pr-8 focus:outline-none"
                    placeholder="Search customer"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                  <FiX
                    className="absolute top-2 right-1 text-gray-500"
                    size={18}
                    onClick={() => {}}
                  />
                </div>

                {searchLoading && (
                  <p className="text-sm text-gray-500">
                    Searching...
                  </p>
                )}

                {!searchLoading &&
                  customers.length === 0 &&
                  searchQuery && (
                    <p className="text-sm text-red-500">
                      No customers found
                    </p>
                  )}

                {customers.length > 0 && (
                  <select
                    className="w-full rounded-lg border px-3 py-2"
                    value={form.customerId}
                    onChange={e =>
                      setForm(prev => ({
                        ...prev,
                        customerId: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select Customer</option>
                    {customers.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                )}
              </>
            )}

            {/* Submit */}
            <button
              disabled={isSubmitDisabled || loading}
              onClick={handleSale}
              className="w-full rounded-lg bg-blue-600 py-2 text-white disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Submit Sale'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
