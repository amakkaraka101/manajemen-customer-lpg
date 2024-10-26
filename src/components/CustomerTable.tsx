import React from 'react';
import { Pencil, Trash2, Copy } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Customer {
  id: string;
  nik: string;
  name: string;
  status: string;
  address: string;
}

interface CustomerTableProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
}

export default function CustomerTable({ customers, onEdit, onDelete }: CustomerTableProps) {
  const handleCopyNik = async (nik: string) => {
    try {
      await navigator.clipboard.writeText(nik);
      toast.success('NIK copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy NIK');
    }
  };

  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-700">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">NIK</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Address</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
        {customers.map((customer) => (
          <tr key={customer.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
              <div className="flex items-center space-x-2">
                <span>{customer.nik}</span>
                <button
                  onClick={() => handleCopyNik(customer.nik)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  title="Copy NIK"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{customer.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                customer.status === 'UKM' 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              }`}>
                {customer.status}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{customer.address}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
              <button
                onClick={() => onEdit(customer)}
                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                <Pencil className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(customer.id)}
                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}