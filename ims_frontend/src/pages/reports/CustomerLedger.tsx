import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AuthService from '../../services/AuthService';
import axiosInstance from '../../services/axiosConfig';

import { PDFDownloadLink } from '@react-pdf/renderer';
import * as XLSX from 'xlsx';
import { LedgerPDF } from './LedgerPDF';
import axios from 'axios';

interface Customer {
  id: string;
  name: string;
}

interface Ledger {
  id: string;
  item: { name: string };
  quantity: number;
  priceAtSale: number;
  paymentType: string;
  createdAt: string;
}

const CustomerLedger = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [ledger, setLedger] = useState<Ledger[]>([]);
  const [customerId, setCustomerId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleError = (error: unknown, fallback: string) => {
    let msg = fallback;

    if (axios.isAxiosError(error)) {
      msg = error.response?.data?.message || fallback;
    }

    toast.error(msg);
  };

  const fetchCustomers = async () => {
    try {
      const res = await AuthService.getCustomers();
      setCustomers(res.data.customer);
    } catch (error) {
      handleError(error, 'Failed to load customers');
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchLedger = async () => {
    if (!customerId) return;

    try {
      setLoading(true);
      const res = await AuthService.getCustomerLedger(customerId);
      setLedger(res.data.transactions);

      const name =
        customers.find(c => c.id === customerId)?.name || '';

      setCustomerName(name);
    } catch (error) {
      handleError(error, 'Failed to load ledger');
    } finally {
      setLoading(false);
    }
  };

  /* FRONTEND EXCEL */
  const downloadExcel = () => {
    const data = ledger.map(l => ({
      Item: l.item.name,
      Quantity: l.quantity,
      Price: l.priceAtSale,
      Payment: l.paymentType,
      Date: new Date(l.createdAt).toLocaleDateString(),
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Ledger');

    XLSX.writeFile(wb, `${customerName}-ledger.xlsx`);
  };

  /* BACKEND EMAIL */
  const sendViaEmail = async () => {
    try {
      setLoading(true);
      await axiosInstance.get(
        `/reports/customers-ledger/${customerId}/export/email`
      );
      toast.success('Email sent');
    } catch (error) {
      handleError(error, 'Failed to send email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-4 rounded bg-white p-4 shadow">
      <h3 className="font-semibold">Customer Ledger</h3>

      {/* SELECT */}
      <div className="flex gap-3">
        <select
          value={customerId}
          onChange={e => setCustomerId(e.target.value)}
          className="rounded border px-2 py-2"
        >
          <option value="">Select Customer</option>
          {customers.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          onClick={fetchLedger}
          className="rounded bg-blue-600 px-4 py-2 text-white active:scale-95"
        >
          View
        </button>
      </div>

      {/* TABLE */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-2">Item</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Price</th>
              <th className="p-2">Payment</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {ledger.map(l => (
              <tr key={l.id} className="border-b">
                <td className="p-2 text-center">{l.item.name}</td>
                <td className="p-2 text-center">{l.quantity}</td>
                <td className="p-2 text-center">{l.priceAtSale}</td>
                <td className="p-2 text-center">{l.paymentType}</td>
                <td className="p-2 text-center">
                  {new Date(l.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* EXPORT */}
      {ledger.length > 0 && (
        <div className="flex gap-3">
          {/* PDF */}
          <PDFDownloadLink
            document={
              <LedgerPDF ledger={ledger} customer={customerName} />
            }
            fileName={`${customerName}-ledger.pdf`}
          >
            {({ loading }) =>
              loading ? (
                'Generating PDF...'
              ) : (
                <button className="rounded bg-gray-700 px-4 py-2 text-white active:scale-95">
                  PDF
                </button>
              )
            }
          </PDFDownloadLink>

          {/* EXCEL */}
          <button
            onClick={downloadExcel}
            className="rounded bg-green-600 px-4 py-2 text-white active:scale-95"
          >
            Excel
          </button>

          {/* EMAIL */}
          <button
            onClick={sendViaEmail}
            className="rounded bg-indigo-600 px-4 py-2 text-white active:scale-95"
          >
            Email
          </button>
        </div>
      )}
    </section>
  );
};

export default CustomerLedger;
