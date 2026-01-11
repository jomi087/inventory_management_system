import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AuthService from '../services/AuthService';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Customer {
  id: string;
  name: string;
  address: string;
  mobile: string;
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    address: '',
    mobile: '',
  });

  const fetchCustomers = async () => {
    try {
      const res = await AuthService.getCustomers();
      setCustomers(res.data.customer);
    } catch (error) {
      let errorMsg = 'Failed to load customers';

      if (axios.isAxiosError(error)) {
        errorMsg = error.response?.data?.message || errorMsg;
      }

      toast.error(errorMsg);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const resetForm = () => {
    setForm({ name: '', address: '', mobile: '' });
    setEditingId(null);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (editingId) {
        const payload = {
          ...(form.name && { name: form.name }),
          ...(form.address && { address: form.address }),
          ...(form.mobile && { mobile: form.mobile }),
        };
        //check if payloadi s empty or not
        if (Object.keys(payload).length === 0) {
          toast('No fields to update');
          return; // stop API call
        }

        const res = await AuthService.updateCustomer(
          editingId,
          payload
        );
        toast.success('Customer updated');
        setCustomers(prevCust =>
          prevCust.map(cust =>
            cust.id === editingId ? res.data.updatedCustomer : cust
          )
        );
      } else {
        // CREATE
        if (!form.name || !form.address || !form.mobile) {
          toast.error('All fields are required');
          return;
        }

        const res = await AuthService.createCustomer(form);
        toast.success('Customer created');
        setCustomers(prevCust => [...prevCust, res.data.customer]);
      }

      resetForm();
    } catch (error) {
      let errorMsg = 'Some error occured';

      if (axios.isAxiosError(error)) {
        errorMsg = error.response?.data?.message || errorMsg;
      }

      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (customer: Customer) => {
    setEditingId(customer.id);
    setForm({
      name: customer.name,
      address: customer.address,
      mobile: customer.mobile,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="mb-2 text-2xl font-bold text-gray-800">
        Customers
      </h2>
      {/* Breadcrumb – top left */}
      <nav className="px-6 pb-6 text-sm text-gray-600">
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

      {/* CREATE / EDIT CUSTOMER */}
      <div className="mb-8 rounded-lg bg-white p-4 shadow">
        <h3 className="mb-4 font-semibold">
          {editingId ? 'Edit Customer' : 'Add Customer'}
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <input
            placeholder="Name"
            className="rounded border px-3 py-2"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Address"
            className="rounded border px-3 py-2"
            value={form.address}
            onChange={e =>
              setForm({
                ...form,
                address: e.target.value,
              })
            }
          />
          <input
            placeholder="Mobile"
            className="rounded border px-3 py-2"
            value={form.mobile}
            onChange={e =>
              setForm({
                ...form,
                mobile: e.target.value,
              })
            }
          />
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
          >
            {loading
              ? 'Saving...'
              : editingId
                ? 'Update Customer'
                : 'Add Customer'}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              className="rounded border px-4 py-2"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* CUSTOMER LIST */}
      <div className="rounded-lg bg-white p-4 shadow">
        <h3 className="mb-4 font-semibold">Customer List</h3>

        {customers.length === 0 ? (
          <p className="text-gray-500">No customers found</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2">Name</th>
                <th>Address</th>
                <th>Mobile</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(c => (
                <tr key={c.id} className="border-b">
                  <td className="py-2">{c.name}</td>
                  <td>{c.address}</td>
                  <td>{c.mobile}</td>
                  <td className="text-right">
                    <button
                      onClick={() => handleEdit(c)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Customers;
