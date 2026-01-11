import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AuthService from '../../services/AuthService';

import { PDFDownloadLink } from '@react-pdf/renderer';

import * as XLSX from 'xlsx';
import { SalesPDF } from '../../components/export/SalesPDF';
import axiosInstance from '../../services/axiosConfig';

export interface Sale {
  id: string;
  item: { name: string };
  quantity: number;
  priceAtSale: number;
  paymentType: string;
  createdAt: string;
}

const SalesReport = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [from, setFrom] = useState<string>();
  const [to, setTo] = useState<string>();
  const [loading, setLoading] = useState(false);

  const fetchSales = async () => {
    try {
      setLoading(true);
      const res = await AuthService.getSalesReport(from, to);
      setSales(res.data.salesReport);
    } catch {
      toast.error('Failed to load report');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  /* FRONTEND EXCEL */
  const downloadExcel = () => {
    const data = sales.map(s => ({
      Item: s.item.name,
      Quantity: s.quantity,
      Price: s.priceAtSale,
      Payment: s.paymentType,
      Date: new Date(s.createdAt).toLocaleDateString(),
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sales');

    XLSX.writeFile(wb, 'sales.xlsx');
  };

  const SendReportViaEmail = async () => {
    try {
      setLoading(true);
      await axiosInstance.get(
        `/reports/sales/export/email?from=${from}&to=${to}`
      );
      toast.success('Email Sent Successfull');
    } catch {
      toast.error('Failed to load report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-4 rounded bg-white p-4 shadow">
      <h3 className="font-semibold">
        Sales Report
      </h3>

      {/* FILTER */}
      <div className="flex gap-3">
        <input
          type="date"
          value={from}
          onChange={e => setFrom(e.target.value)}
          className="rounded border px-3 py-2"
        />

        <input
          type="date"
          value={to}
          onChange={e => setTo(e.target.value)}
          className="rounded border px-3 py-2"
        />

        <button
          onClick={fetchSales}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Filter
        </button>
      </div>

      {/* TABLE */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
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
              {sales.map(s => (
                <tr key={s.id} className="border-b">
                  <td className="p-2 text-center">{s.item.name}</td>
                  <td className="p-2 text-center">{s.quantity}</td>
                  <td className="p-2 text-center">{s.priceAtSale}</td>
                  <td className="p-2 text-center">{s.paymentType}</td>
                  <td className="p-2 text-center">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      { sales.length > 0  &&
        <div className="flex gap-3">
          <PDFDownloadLink
            document={<SalesPDF sales={sales} />}
            fileName="sales.pdf"
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

          <button
            onClick={downloadExcel}
            className="rounded bg-green-600 px-4 py-2 text-white active:scale-95"
          >
            Excel
          </button>

          <button
            onClick={SendReportViaEmail}
            className="rounded bg-indigo-600 px-4 py-2 text-white active:scale-95"
          >
            Email
          </button>
        </div>
      }
    </section>
  );
};

export default SalesReport;
