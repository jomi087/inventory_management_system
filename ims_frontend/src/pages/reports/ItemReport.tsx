import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AuthService from '../../services/AuthService';
import axiosInstance from '../../services/axiosConfig';

import { PDFDownloadLink } from '@react-pdf/renderer';
import * as XLSX from 'xlsx';
import { ItemsPDF } from '../../components/export/ItemPDF';

interface Item {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

const ItemsReport = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await AuthService.getItemsReport();
      setItems(res.data.items);
    } catch {
      toast.error('Failed to load items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  /* FRONTEND EXCEL */
  const downloadExcel = () => {
    const data = items.map(i => ({
      Name: i.name,
      Quantity: i.quantity,
      Price: i.price,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Items');

    XLSX.writeFile(wb, 'items.xlsx');
  };

  /* BACKEND EMAIL */
  const sendViaEmail = async () => {
    try {
      setLoading(true);
      await axiosInstance.get('/reports/items/export/email');
      toast.success('Email sent successfully');
    } catch {
      toast.error('Failed to send email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-4 rounded bg-white p-4 shadow">
      <h3 className="font-semibold">Items Report</h3>

      {/* TABLE */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-2 text-center w-44">Sr.No</th>
              <th className="p-2 text-center">Name</th>
              <th className="p-2 text-center">Qty</th>
              <th className="p-2 text-center">Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i,idx) => (
              <tr key={i.id} className="border-b">
                <td className="p-2 text-center w-44">{idx+1}</td>
                <td className="p-2 text-center">{i.name}</td>
                <td className="p-2 text-center">{i.quantity}</td>
                <td className="p-2 text-center">{i.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* EXPORT */}
      {items.length > 0 && (
        <div className="flex gap-3">
          {/* PDF */}
          <PDFDownloadLink
            document={<ItemsPDF items={items} />}
            fileName="items.pdf"
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

export default ItemsReport;
