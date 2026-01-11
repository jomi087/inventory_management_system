import { useEffect, useState } from 'react';
import AuthService from '../services/AuthService';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

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

const Sales = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [paymentType, setPaymentType] = useState<'CASH' | 'CUSTOMER'>(
    'CASH'
  );
  const [customerId, setCustomerId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsRes, customersRes] = await Promise.all([
          AuthService.getItems(),
          AuthService.getCustomers(),
        ]);

        setItems(itemsRes.data.items);
        setCustomers(customersRes.data.customer);
      } catch (error) {
        let errorMsg = 'Failed to load data';

        if (axios.isAxiosError(error)) {
          errorMsg = error.response?.data?.message || errorMsg;
        }

        toast.error(errorMsg);
      }
    };

    fetchData();
  }, []);

  const handleSale = async () => {
    try {
      setLoading(true);
      const soldQty = Number(quantity);

      await AuthService.createSale({
        itemId,
        quantity: Number(soldQty),
        paymentType,
        customerId:
          paymentType === 'CUSTOMER' ? customerId : undefined,
      });

      toast.success('Sale completed');

      setItemId('');
      setQuantity('1');
      setCustomerId('');
      setPaymentType('CASH');

      setItems(prevItem =>
        prevItem.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity - soldQty }
            : item
        )
      );
    } catch (error) {
      let errorMsg = 'Something went wrong';
      if (axios.isAxiosError(error)) {
        // backend error message
        errorMsg =
          error.response?.data?.message || 'Failed to Create sale';
      }
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  const hasCustomers = customers.length > 0;

  const isSubmitDisabled =
    !itemId ||
    Number(quantity) <= 0 ||
    isNaN(Number(quantity)) ||
    (paymentType === 'CUSTOMER' && !customerId);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Breadcrumb – top left */}
      <nav className="px-6 pt-4 text-sm text-gray-600">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/" className="hover:text-gray-900">
              Dashboard
            </Link>
          </li>
          <li>/</li>
          <li className="font-semibold text-gray-800">Sales</li>
        </ol>
      </nav>

      {/* Centered Form */}
      <div className="flex min-h-[calc(100vh-100px)] items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
            Create Sale
          </h2>

          <div className="space-y-5">
            {/* Item */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Item
              </label>
              <select
                className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={itemId}
                onChange={e => setItemId(e.target.value)}
              >
                <option value="">Select Item</option>
                {items.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name} | ₹{item.price} | Qty: {item.quantity}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                min={1}
                className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
              />
            </div>

            {/* Payment */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Payment Type
              </label>
              <select
                className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={paymentType}
                onChange={e =>
                  setPaymentType(
                    e.target.value as 'CASH' | 'CUSTOMER'
                  )
                }
              >
                <option value="CASH">Cash</option>
                <option value="CUSTOMER" >
                  Customer
                </option>
              </select>
            </div>

            {/* Customer */}
            {paymentType === 'CUSTOMER' && (
              <>
                {!hasCustomers && (
                  <p className="text-sm text-red-500">
                    No customers found. Please add a customer first.
                  </p>
                )}

                {hasCustomers && (
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Customer
                    </label>
                    <select
                      className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      value={customerId}
                      onChange={e => setCustomerId(e.target.value)}
                    >
                      <option value="">Select Customer</option>
                      {customers.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </>
            )}

            {/* Submit */}
            <button
              disabled={isSubmitDisabled || loading}
              onClick={handleSale}
              className="mt-2 w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
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
