import { useState } from 'react';
import SalesReport from './SalesReport';
import ItemsReport from './ItemReport';
import CustomerLedger from './CustomerLedger';

type Tab = 'sales' | 'items' | 'ledger';

const Reports = () => {
  const [activeTab, setActiveTab] = useState<Tab>('sales');

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 space-y-6">
      <h2 className="text-2xl font-bold">Reports</h2>

      {/* TABS */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveTab('sales')}
          className={`px-4 py-2 rounded ${
            activeTab === 'sales'
              ? 'bg-blue-600 text-white'
              : 'bg-white border'
          }`}
        >
          Sales Report
        </button>

        <button
          onClick={() => setActiveTab('items')}
          className={`px-4 py-2 rounded ${
            activeTab === 'items'
              ? 'bg-blue-600 text-white'
              : 'bg-white border'
          }`}
        >
          Items Report
        </button>

        <button
          onClick={() => setActiveTab('ledger')}
          className={`px-4 py-2 rounded ${
            activeTab === 'ledger'
              ? 'bg-blue-600 text-white'
              : 'bg-white border'
          }`}
        >
          Customer Ledger
        </button>
      </div>

      {/* MINI PAGES */}
      {activeTab === 'sales' && <SalesReport />}
      {activeTab === 'items' && <ItemsReport />}
      {activeTab === 'ledger' && <CustomerLedger />}
    </div>
  );
};

export default Reports;
