import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaFileInvoice } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Invoice = () => {
  const invoices = [
    { id: 'INV-2026-001', guest: 'Priya Sharma', amount: '₹1,20,000', date: 'Oct 15, 2026', status: 'Paid' },
    { id: 'INV-2026-002', guest: 'John Smith', amount: '₹36,000', date: 'Oct 16, 2026', status: 'Pending' },
    { id: 'INV-2026-003', guest: 'Emma Watson', amount: '₹1,25,000', date: 'Oct 25, 2026', status: 'Paid' },
  ];

  const generatePDF = (inv) => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.setTextColor(51, 149, 255);
    doc.text('LuxeStays Invoice', 14, 22);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Invoice Number: ${inv.id}`, 14, 32);
    doc.text(`Guest: ${inv.guest}`, 14, 40);
    doc.text(`Issue Date: ${inv.date}`, 14, 48);
    doc.text(`Amount: ${inv.amount}`, 14, 56);
    doc.text(`Status: ${inv.status}`, 14, 64);
    
    doc.autoTable({
      startY: 80,
      head: [['Description', 'Amount']],
      body: [
        ['Room Stay', inv.amount],
        ['Taxes & Fees', 'Included in Total'],
      ],
      theme: 'grid',
      headStyles: { fillColor: [51, 149, 255] }
    });

    doc.save(`${inv.id}.pdf`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Invoices</h1>
          <p className="text-gray-400 mt-1">Manage billing, payments, and generated invoices.</p>
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-6">
        <table className="w-full text-left text-sm">
          <thead className="text-gray-400 border-b border-white/10">
            <tr>
              <th className="pb-4 font-medium">Invoice #</th>
              <th className="pb-4 font-medium">Guest</th>
              <th className="pb-4 font-medium">Issue Date</th>
              <th className="pb-4 font-medium">Amount Due</th>
              <th className="pb-4 font-medium">Status</th>
              <th className="pb-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-white/5 transition-colors">
                <td className="py-4 font-mono text-hotel-gold text-xs flex items-center gap-2">
                  <FaFileInvoice className="text-gray-500" /> {inv.id}
                </td>
                <td className="py-4 font-medium text-white">{inv.guest}</td>
                <td className="py-4 text-gray-400">{inv.date}</td>
                <td className="py-4 text-white font-medium">{inv.amount}</td>
                <td className="py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${inv.status === 'Paid' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {inv.status}
                  </span>
                </td>
                <td className="py-4 text-right">
                  <button onClick={() => generatePDF(inv)} className="text-hotel-gold hover:text-white transition-colors border border-hotel-gold/30 px-3 py-1 rounded-lg text-xs flex items-center gap-2 ml-auto">
                    <FaDownload /> PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Invoice;
