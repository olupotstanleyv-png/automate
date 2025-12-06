import React from 'react';
import { Order } from './types';
import { useSettings } from './store';

interface ReceiptProps {
  order: Order;
  onClose: () => void;
}

export default function Receipt({ order, onClose }: ReceiptProps) {
  const { settings } = useSettings();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm print:bg-white print:static print:block">
      <div className="bg-white text-black w-full max-w-2xl shadow-2xl rounded-lg overflow-hidden print:shadow-none print:max-w-none print:w-full print:rounded-none print-only">
        
        {/* Header Actions - Hidden when printing */}
        <div className="bg-gray-100 p-4 border-b flex justify-between items-center print:hidden">
          <h3 className="font-bold text-lg">Order Receipt</h3>
          <div className="flex gap-2">
            <button 
                onClick={() => window.print()} 
                className="bg-brand-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
                <i className="fa-solid fa-print"></i> Print
            </button>
            <button 
                onClick={onClose} 
                className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition-colors"
            >
                Close
            </button>
          </div>
        </div>

        {/* Invoice Content */}
        <div className="p-10 print:p-0">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    {settings.logoUrl ? (
                        <img src={settings.logoUrl} alt={settings.name} className="h-12 mb-2" />
                    ) : (
                        <h1 className="text-2xl font-bold uppercase tracking-wider">{settings.name}</h1>
                    )}
                    <p className="text-sm text-gray-600">{settings.general.storeAddress}</p>
                    <p className="text-sm text-gray-600">{settings.general.supportEmail}</p>
                    <p className="text-sm text-gray-600">{settings.general.supportPhone}</p>
                </div>
                <div className="text-right">
                    <h2 className="text-3xl font-bold text-gray-800 mb-1">INVOICE</h2>
                    <p className="text-gray-500 font-mono">#{order.id}</p>
                    <p className="text-sm text-gray-500 mt-2">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
            </div>

            {/* Bill To */}
            <div className="mb-8 border-t border-b border-gray-200 py-4">
                <div className="grid grid-cols-2">
                    <div>
                        <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">Bill To</h3>
                        <p className="font-bold">{order.customerName}</p>
                        <p className="text-sm text-gray-600">{order.customerEmail}</p>
                        <p className="text-sm text-gray-600">{order.customerPhone}</p>
                    </div>
                    {order.deliveryMethod === 'Shipping' && order.shippingAddress && (
                        <div className="text-right">
                            <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">Ship To</h3>
                            <p className="text-sm text-gray-600">{order.shippingAddress.street}</p>
                            <p className="text-sm text-gray-600">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Items */}
            <div className="mb-8">
                <table className="w-full text-left text-sm">
                    <thead className="border-b-2 border-gray-800">
                        <tr>
                            <th className="py-2">Item</th>
                            <th className="py-2 text-right">Qty</th>
                            <th className="py-2 text-right">Price</th>
                            <th className="py-2 text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {order.items.map((item, idx) => (
                            <tr key={idx}>
                                <td className="py-3">
                                    <div className="font-bold">{item.name}</div>
                                    <div className="text-xs text-gray-500">{item.category}</div>
                                </td>
                                <td className="py-3 text-right">{item.quantity}</td>
                                <td className="py-3 text-right">${item.price.toLocaleString()}</td>
                                <td className="py-3 text-right">${(item.price * item.quantity).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
                <div className="w-64 space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>${order.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span>${order.tax.toLocaleString()}</span>
                    </div>
                    {order.deliveryFee > 0 && (
                        <div className="flex justify-between">
                            <span className="text-gray-600">Shipping</span>
                            <span>${order.deliveryFee.toLocaleString()}</span>
                        </div>
                    )}
                    {order.serviceCharge > 0 && (
                        <div className="flex justify-between">
                            <span className="text-gray-600">Service Charge</span>
                            <span>${order.serviceCharge.toLocaleString()}</span>
                        </div>
                    )}
                    <div className="flex justify-between font-bold text-lg border-t border-gray-800 pt-2 mt-2">
                        <span>Total</span>
                        <span>${order.total.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200 text-center text-xs text-gray-500">
                <p className="mb-1">Payment Method: <span className="font-bold text-gray-800">{order.paymentMethod}</span> ({order.paymentStatus})</p>
                <p>Thank you for your business!</p>
                <p className="mt-4">{settings.name} • {settings.general.storeAddress}</p>
            </div>
        </div>
      </div>
    </div>
  );
}