import React, { useState } from 'react';
import { 
  MOCK_FLEET, 
  MOCK_BOOKINGS, 
  MOCK_TRANSACTIONS, 
  MOCK_NOTIFICATIONS, 
  MOCK_SERVICE_RECORDS, 
  MOCK_POS_SESSIONS,
  MOCK_ACTIVITY_LOGS,
  MOCK_SERVICE_PACKAGES,
  MOCK_BLOG_POSTS,
  DEFAULT_ROLES,
  MOCK_STAFF,
  MOCK_CUSTOMERS
} from './data';
import { 
  Product, 
  Order, 
  SupportTicket, 
  PublicTeamMember, 
  UserRole, 
  StaffMember, 
  Vehicle, 
  Booking, 
  Customer,
  Transaction,
  NotificationLog,
  ServiceRecord,
  POSSession,
  WorkOrder,
  POSWorkflowStage,
  POSItem,
  PaymentMethodType,
  PaymentStatus,
  BlogPost,
  BlogStatus,
  SystemRole,
  StaffStatus,
  Permission
} from './types';
import { useOrders, useSettings, useContact, useTeam, useProducts, useFleet, useStaff, useCustomerNotification } from './store';
import Receipt from './Receipt';

// --- TYPES ---
type AdminTab = 'dashboard' | 'pos' | 'products' | 'vehicles' | 'bookings' | 'maintenance' | 'compliance' | 'orders' | 'customers' | 'staff' | 'financials' | 'notifications' | 'reports' | 'audit' | 'settings' | 'support' | 'team' | 'blog';

interface SidebarItemProps {
  tab: AdminTab;
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ tab, icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all duration-200 border-l-2 ml-1 ${
      isActive
        ? 'bg-brand-gold/10 text-brand-gold border-brand-gold'
        : 'text-gray-400 border-transparent hover:bg-white/5 hover:text-gray-200'
    }`}
  >
    <i className={`fa-solid ${icon} w-5 text-center`}></i>
    {label}
  </button>
);

// --- HELPER: FILE UPLOAD ---
const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, onSuccess: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                onSuccess(reader.result);
            }
        };
        reader.readAsDataURL(file);
    }
};

// --- VIEW COMPONENTS ---

const DashboardView = () => {
  const { orders } = useOrders();
  const { tickets } = useContact();

  return (
    <div className="space-y-8 animate-fade-in">
        <h2 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h2>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-brand-surface p-6 rounded-xl border border-white/5">
                <div className="text-gray-400 text-sm font-bold uppercase mb-2">Total Revenue</div>
                <div className="text-3xl font-bold text-white">$124,500</div>
                <div className="text-green-500 text-xs mt-2"><i className="fa-solid fa-arrow-up"></i> 12% vs last month</div>
            </div>
            <div className="bg-brand-surface p-6 rounded-xl border border-white/5">
                <div className="text-gray-400 text-sm font-bold uppercase mb-2">Active Orders</div>
                <div className="text-3xl font-bold text-white">{orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length}</div>
                <div className="text-gray-500 text-xs mt-2">Processing now</div>
            </div>
            <div className="bg-brand-surface p-6 rounded-xl border border-white/5">
                <div className="text-gray-400 text-sm font-bold uppercase mb-2">Open Tickets</div>
                <div className="text-3xl font-bold text-white">{tickets.filter(t => t.status === 'Open').length}</div>
                <div className="text-orange-500 text-xs mt-2">Requires attention</div>
            </div>
            <div className="bg-brand-surface p-6 rounded-xl border border-white/5">
                <div className="text-gray-400 text-sm font-bold uppercase mb-2">Fleet Status</div>
                <div className="text-3xl font-bold text-white">85%</div>
                <div className="text-blue-500 text-xs mt-2">Utilization Rate</div>
            </div>
        </div>
    </div>
  );
};

const ProductsView = () => {
    const { products, addProduct, updateProduct, deleteProduct } = useProducts();
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

    const handleEdit = (product: Product) => {
        setCurrentProduct(product);
        setIsEditing(true);
    };

    const handleNew = () => {
        setCurrentProduct({
            id: `PROD-${Date.now()}`,
            name: '',
            price: 0,
            category: 'parts',
            image: 'https://via.placeholder.com/400',
            description: '',
            rating: 5.0
        });
        setIsEditing(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if(!currentProduct) return;
        
        if (products.some(p => p.id === currentProduct.id)) {
            updateProduct(currentProduct.id, currentProduct);
        } else {
            addProduct(currentProduct);
        }
        setIsEditing(false);
        setCurrentProduct(null);
    };

    return (
    <div className="space-y-6 animate-fade-in">
       <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Product Inventory</h2>
            <p className="text-gray-400 text-sm">Manage store items, pricing, and stock.</p>
          </div>
          <button onClick={handleNew} className="bg-brand-gold text-black font-bold py-2 px-4 rounded hover:bg-brand-gold-light flex items-center gap-2">
             <i className="fa-solid fa-plus"></i> Add Product
          </button>
       </div>
       <div className="bg-brand-surface rounded-xl border border-white/5 overflow-hidden shadow-lg">
          <table className="w-full text-left text-sm text-gray-400">
             <thead className="bg-brand-dark text-xs uppercase font-bold text-gray-500 border-b border-white/5">
                <tr>
                   <th className="p-4">Product</th>
                   <th className="p-4">Category</th>
                   <th className="p-4">Price</th>
                   <th className="p-4">Rating</th>
                   <th className="p-4 text-right">Actions</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-white/5">
                {products.map(p => (
                   <tr key={p.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 flex items-center gap-4">
                         <div className="w-10 h-10 rounded bg-brand-dark overflow-hidden shrink-0">
                            <img src={p.image} alt="" className="w-full h-full object-cover" />
                         </div>
                         <div>
                             <div className="text-white font-bold">{p.name}</div>
                             <div className="text-xs text-gray-500">ID: {p.id}</div>
                         </div>
                      </td>
                      <td className="p-4 capitalize">
                         <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs">{p.category}</span>
                      </td>
                      <td className="p-4 text-brand-gold font-mono">${p.price.toLocaleString()}</td>
                      <td className="p-4">
                         <div className="flex items-center text-yellow-500 text-xs gap-1">
                            <i className="fa-solid fa-star"></i>
                            <span className="text-gray-300">{p.rating}</span>
                         </div>
                      </td>
                      <td className="p-4 text-right">
                         <button onClick={() => handleEdit(p)} className="text-gray-400 hover:text-white mr-3 transition-colors"><i className="fa-solid fa-pen"></i></button>
                         <button onClick={() => deleteProduct(p.id)} className="text-gray-400 hover:text-red-500 transition-colors"><i className="fa-solid fa-trash"></i></button>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>

       {/* Product Edit Modal */}
       {isEditing && currentProduct && (
           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
               <div className="bg-brand-surface w-full max-w-2xl rounded-xl border border-white/10 p-6 max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl">
                   <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                       <i className="fa-solid fa-box text-brand-gold"></i>
                       {products.some(p => p.id === currentProduct.id) ? 'Edit Product' : 'New Product'}
                   </h3>
                   <form onSubmit={handleSave} className="space-y-4">
                       <div className="grid grid-cols-2 gap-4">
                           <div>
                               <label className="block text-xs text-gray-500 uppercase mb-1">Product Name</label>
                               <input type="text" required value={currentProduct.name} onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded p-2 text-white focus:border-brand-gold focus:outline-none" />
                           </div>
                           <div>
                               <label className="block text-xs text-gray-500 uppercase mb-1">Price</label>
                               <input type="number" required value={currentProduct.price} onChange={e => setCurrentProduct({...currentProduct, price: parseFloat(e.target.value)})} className="w-full bg-brand-dark border border-white/10 rounded p-2 text-white focus:border-brand-gold focus:outline-none" />
                           </div>
                       </div>
                       <div>
                           <label className="block text-xs text-gray-500 uppercase mb-1">Category</label>
                           <select value={currentProduct.category} onChange={e => setCurrentProduct({...currentProduct, category: e.target.value as any})} className="w-full bg-brand-dark border border-white/10 rounded p-2 text-white focus:border-brand-gold focus:outline-none">
                               <option value="parts">Parts</option>
                               <option value="automation">Automation</option>
                               <option value="accessories">Accessories</option>
                               <option value="cars">Cars</option>
                           </select>
                       </div>
                       <div>
                           <label className="block text-xs text-gray-500 uppercase mb-1">Product Image</label>
                           <div className="flex items-center gap-4">
                               <img src={currentProduct.image} alt="Preview" className="w-16 h-16 object-cover rounded bg-brand-dark" />
                               <div className="flex-1">
                                   <input 
                                       type="file" 
                                       accept="image/*"
                                       onChange={(e) => handleImageUpload(e, (base64) => setCurrentProduct({...currentProduct, image: base64}))}
                                       className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
                                   />
                               </div>
                           </div>
                       </div>
                       <div>
                           <label className="block text-xs text-gray-500 uppercase mb-1">Description</label>
                           <textarea rows={3} value={currentProduct.description} onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded p-2 text-white focus:border-brand-gold focus:outline-none" />
                       </div>
                       <div className="flex justify-end gap-2 pt-4">
                           <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                           <button type="submit" className="px-6 py-2 bg-brand-gold text-black font-bold rounded hover:bg-brand-gold-light">Save Product</button>
                       </div>
                   </form>
               </div>
           </div>
       )}
    </div>
    );
};

const VehiclesView = () => {
    const { fleet } = useFleet();
    return (
    <div className="space-y-6 animate-fade-in">
       <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Fleet Management</h2>
            <p className="text-gray-400 text-sm">Track vehicle status, maintenance, and availability.</p>
          </div>
          <button className="bg-brand-gold text-black font-bold py-2 px-4 rounded hover:bg-brand-gold-light flex items-center gap-2">
             <i className="fa-solid fa-car"></i> Add Vehicle
          </button>
       </div>
       <div className="bg-brand-surface rounded-xl border border-white/5 overflow-hidden shadow-lg">
          <table className="w-full text-left text-sm text-gray-400">
             <thead className="bg-brand-dark text-xs uppercase font-bold text-gray-500 border-b border-white/5">
                <tr>
                   <th className="p-4">Vehicle Details</th>
                   <th className="p-4">VIN</th>
                   <th className="p-4">Status</th>
                   <th className="p-4">Mileage</th>
                   <th className="p-4">Value</th>
                   <th className="p-4 text-right">Actions</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-white/5">
                {fleet.map(v => (
                   <tr key={v.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 flex items-center gap-4">
                         <div className="w-12 h-8 rounded bg-brand-dark overflow-hidden shrink-0">
                             <img src={v.images[0]} alt="" className="w-full h-full object-cover" />
                         </div>
                         <div>
                            <div className="text-white font-bold">{v.make} {v.model}</div>
                            <div className="text-xs text-gray-500">{v.year} • {v.category}</div>
                         </div>
                      </td>
                      <td className="p-4 font-mono text-xs text-gray-500">{v.vin}</td>
                      <td className="p-4">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${
                              v.status === 'Available' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                              v.status === 'Booked' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 
                              'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                          }`}>
                              {v.status}
                          </span>
                      </td>
                      <td className="p-4">{v.mileage.toLocaleString()} mi</td>
                      <td className="p-4 text-brand-gold font-mono">${v.price.toLocaleString()}</td>
                      <td className="p-4 text-right">
                         <button className="text-gray-400 hover:text-white mr-3 transition-colors"><i className="fa-solid fa-pen"></i></button>
                         <button className="text-gray-400 hover:text-brand-gold transition-colors"><i className="fa-solid fa-clipboard-list"></i></button>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
    );
};

const OrdersView = () => {
    const { orders, updateOrder, deleteOrder } = useOrders();
    const { addNotification } = useCustomerNotification();
    const [filter, setFilter] = useState<string>('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

    const filteredOrders = orders.filter(o => {
        const matchesFilter = filter === 'All' || o.status === filter;
        const matchesSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              o.customerName.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const handleStatusChange = (id: string, newStatus: any) => {
        if (window.confirm(`Change order status to ${newStatus}?`)) {
            updateOrder(id, { status: newStatus });
            // Trigger Notification
            addNotification({
                title: 'Order Updated',
                message: `Your order #${id} has been marked as ${newStatus}.`,
                type: 'info'
            });
        }
    };

    const handlePaymentStatusChange = (id: string, newPaymentStatus: PaymentStatus) => {
        if (window.confirm(`Mark payment as ${newPaymentStatus}?`)) {
            updateOrder(id, { paymentStatus: newPaymentStatus });
            // Trigger Notification
            addNotification({
                title: 'Payment Update',
                message: `Payment for order #${id} has been marked as ${newPaymentStatus}.`,
                type: 'success'
            });
        }
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
            deleteOrder(id);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                   <h2 className="text-2xl font-bold text-white">Order Management</h2>
                   <p className="text-gray-400 text-sm">Track, approve, and manage customer orders.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <div className="relative">
                        <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs"></i>
                        <input 
                            type="text" 
                            placeholder="Search orders..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-brand-surface border border-white/10 rounded-full py-1.5 pl-8 pr-4 text-sm text-white focus:border-brand-gold focus:outline-none w-48"
                        />
                    </div>
                    <button className="px-3 py-1.5 bg-brand-surface border border-white/10 rounded text-sm text-gray-300 hover:text-white hover:border-brand-gold">
                        <i className="fa-solid fa-download mr-1"></i> Export CSV
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex overflow-x-auto gap-2 pb-2 border-b border-white/5">
                {['All', 'Placed', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
                            filter === f 
                            ? 'bg-brand-gold text-brand-black border-brand-gold' 
                            : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                        }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="bg-brand-surface rounded-xl border border-white/5 overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-400">
                     <thead className="bg-brand-dark text-xs uppercase font-bold text-gray-500 border-b border-white/5">
                        <tr>
                           <th className="p-4">Order ID</th>
                           <th className="p-4">Customer</th>
                           <th className="p-4">Total</th>
                           <th className="p-4">Payment</th>
                           <th className="p-4">Status</th>
                           <th className="p-4">Date</th>
                           <th className="p-4 text-right">Actions</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-white/5">
                        {filteredOrders.length > 0 ? filteredOrders.map(o => (
                           <tr key={o.id} className="hover:bg-white/5 transition-colors group">
                              <td className="p-4 font-mono text-xs text-brand-gold">{o.id}</td>
                              <td className="p-4">
                                 <div className="text-white font-bold">{o.customerName}</div>
                                 <div className="text-xs text-gray-500">{o.customerEmail}</div>
                              </td>
                              <td className="p-4 font-bold text-white">${o.total.toLocaleString()}</td>
                              <td className="p-4">
                                 <span className={`text-xs ${o.paymentStatus === 'Paid' ? 'text-green-500' : 'text-orange-500'}`}>
                                     {o.paymentMethod} ({o.paymentStatus})
                                 </span>
                              </td>
                              <td className="p-4">
                                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                                        o.status === 'Delivered' ? 'bg-green-500/10 text-green-500' : 
                                        o.status === 'Cancelled' ? 'bg-red-500/10 text-red-500' : 
                                        o.status === 'Shipped' ? 'bg-blue-500/10 text-blue-500' :
                                        o.status === 'Confirmed' ? 'bg-purple-500/10 text-purple-500' :
                                        'bg-yellow-500/10 text-yellow-500'
                                  }`}>
                                      {o.status}
                                  </span>
                              </td>
                              <td className="p-4 text-xs">{new Date(o.createdAt).toLocaleDateString()}</td>
                              <td className="p-4 text-right">
                                 <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                     <button 
                                        onClick={() => setViewingOrder(o)}
                                        className="w-8 h-8 rounded bg-gray-500/10 text-gray-400 hover:bg-gray-500 hover:text-white transition-colors flex items-center justify-center"
                                        title="View Invoice"
                                     >
                                        <i className="fa-solid fa-file-invoice"></i>
                                     </button>

                                     {/* 1. Payment Approval (If Pending) */}
                                     {o.paymentStatus === 'Pending' && o.status !== 'Cancelled' && (
                                         <button 
                                            onClick={() => handlePaymentStatusChange(o.id, 'Paid')}
                                            className="w-8 h-8 rounded bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white transition-colors flex items-center justify-center"
                                            title="Approve Payment"
                                         >
                                             <i className="fa-solid fa-dollar-sign"></i>
                                         </button>
                                     )}

                                     {/* 2. Order Confirmation (If Placed) */}
                                     {o.status === 'Placed' && (
                                         <button 
                                            onClick={() => handleStatusChange(o.id, 'Confirmed')}
                                            className="w-8 h-8 rounded bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors flex items-center justify-center"
                                            title="Confirm Order"
                                         >
                                             <i className="fa-solid fa-check"></i>
                                         </button>
                                     )}

                                     {/* 3. Mark Shipped (If Confirmed) */}
                                     {(o.status === 'Confirmed') && (
                                         <button 
                                            onClick={() => handleStatusChange(o.id, 'Shipped')}
                                            className="w-8 h-8 rounded bg-purple-500/10 text-purple-500 hover:bg-purple-500 hover:text-white transition-colors flex items-center justify-center"
                                            title="Mark Shipped"
                                         >
                                             <i className="fa-solid fa-truck-fast"></i>
                                         </button>
                                     )}

                                     {/* 4. Cancel/Delete */}
                                     {o.status !== 'Cancelled' && o.status !== 'Delivered' && (
                                         <button 
                                            onClick={() => handleStatusChange(o.id, 'Cancelled')}
                                            className="w-8 h-8 rounded bg-orange-500/10 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors flex items-center justify-center"
                                            title="Cancel Order"
                                         >
                                             <i className="fa-solid fa-ban"></i>
                                         </button>
                                     )}
                                     <button 
                                        onClick={() => handleDelete(o.id)}
                                        className="w-8 h-8 rounded bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center"
                                        title="Delete Order"
                                     >
                                        <i className="fa-solid fa-trash"></i>
                                     </button>
                                 </div>
                              </td>
                           </tr>
                        )) : (
                            <tr>
                                <td colSpan={7} className="p-8 text-center text-gray-500">
                                    No orders found.
                                </td>
                            </tr>
                        )}
                     </tbody>
                  </table>
                </div>
            </div>

            {/* Invoice Modal for Admin */}
            {viewingOrder && (
                <Receipt order={viewingOrder} onClose={() => setViewingOrder(null)} />
            )}
        </div>
    );
};

const BookingsView = () => (
    <div className="space-y-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-white">Service Bookings</h2>
        <div className="bg-brand-surface rounded-xl border border-white/5 overflow-hidden shadow-lg">
            <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-brand-dark text-xs uppercase font-bold text-gray-500 border-b border-white/5">
                    <tr>
                        <th className="p-4">Booking Ref</th>
                        <th className="p-4">Customer</th>
                        <th className="p-4">Vehicle</th>
                        <th className="p-4">Type</th>
                        <th className="p-4">Dates</th>
                        <th className="p-4">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {MOCK_BOOKINGS.map(b => (
                        <tr key={b.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-mono text-xs text-brand-gold">{b.id}</td>
                            <td className="p-4 font-bold text-white">{b.customerName}</td>
                            <td className="p-4">{b.vehicleName}</td>
                            <td className="p-4">{b.type}</td>
                            <td className="p-4 text-xs">
                                <div>{b.startDate}</div>
                                {b.endDate && <div className="text-gray-600">to {b.endDate}</div>}
                            </td>
                            <td className="p-4">
                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${b.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                                    {b.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const CustomersView = () => (
    <div className="space-y-6 animate-fade-in">
       <h2 className="text-2xl font-bold text-white">Customer Database</h2>
       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_CUSTOMERS.map(c => (
              <div key={c.id} className="bg-brand-surface p-6 rounded-xl border border-white/5 hover:border-brand-gold/30 transition-all">
                  <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold text-xl font-bold">
                          {c.name.charAt(0)}
                      </div>
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${c.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'}`}>
                          {c.status}
                      </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{c.name}</h3>
                  <div className="text-sm text-gray-500 mb-4">{c.email}</div>
                  <div className="space-y-2 text-sm text-gray-400">
                      <div className="flex justify-between">
                          <span>Phone:</span>
                          <span className="text-white">{c.phone}</span>
                      </div>
                      <div className="flex justify-between">
                          <span>Total Spend:</span>
                          <span className="text-brand-gold font-bold">${c.totalSpend.toLocaleString()}</span>
                      </div>
                  </div>
                  <div className="mt-6 flex gap-2">
                      <button className="flex-1 py-2 bg-white/5 rounded text-sm font-bold text-white hover:bg-white/10">View Profile</button>
                      <button className="flex-1 py-2 border border-white/10 rounded text-sm font-bold text-gray-400 hover:text-white">History</button>
                  </div>
              </div>
          ))}
       </div>
    </div>
);

const StaffView = () => {
    const { staff, updateStaff } = useStaff();
    return (
    <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Staff Directory</h2>
            <button className="bg-brand-surface border border-white/10 text-white px-4 py-2 rounded text-sm hover:border-brand-gold">Manage Roles</button>
        </div>
        <div className="bg-brand-surface rounded-xl border border-white/5 overflow-hidden shadow-lg">
            <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-brand-dark text-xs uppercase font-bold text-gray-500 border-b border-white/5">
                    <tr>
                        <th className="p-4">Employee</th>
                        <th className="p-4">Role</th>
                        <th className="p-4">Department</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Last Active</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {staff.map(s => (
                        <tr key={s.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-4">
                                <div className="text-white font-bold">{s.name}</div>
                                <div className="text-xs">{s.email}</div>
                            </td>
                            <td className="p-4">{s.role}</td>
                            <td className="p-4">{s.department}</td>
                            <td className="p-4">
                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${s.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                    {s.status}
                                </span>
                            </td>
                            <td className="p-4 text-xs font-mono">{new Date(s.lastActive).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    );
};

const FinancialsView = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Financial Transactions</h2>
          <div className="flex gap-2">
              <button className="bg-brand-surface border border-white/10 text-white px-3 py-1.5 rounded text-sm hover:border-brand-gold">Export CSV</button>
          </div>
      </div>
      <div className="bg-brand-surface rounded-xl border border-white/5 overflow-hidden shadow-lg">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-brand-dark text-xs uppercase font-bold text-gray-500 border-b border-white/5">
            <tr>
              <th className="p-4">Date</th>
              <th className="p-4">Description</th>
              <th className="p-4">Type</th>
              <th className="p-4">Category</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {MOCK_TRANSACTIONS.map(t => (
              <tr key={t.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4">{t.date}</td>
                <td className="p-4 text-white font-medium">{t.description}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${t.type === 'Income' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {t.type}
                  </span>
                </td>
                <td className="p-4">{t.category}</td>
                <td className={`p-4 font-mono font-bold ${t.type === 'Income' ? 'text-green-400' : 'text-white'}`}>
                  {t.type === 'Income' ? '+' : '-'}${t.amount.toLocaleString()}
                </td>
                <td className="p-4 text-xs">{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
);

const MaintenanceView = () => (
    <div className="space-y-6 animate-fade-in">
       <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Maintenance Log</h2>
          <button className="bg-brand-gold text-black font-bold py-2 px-4 rounded hover:bg-brand-gold-light">
             <i className="fa-solid fa-plus mr-2"></i> Log Service
          </button>
       </div>
       <div className="bg-brand-surface rounded-xl border border-white/5 overflow-hidden shadow-lg">
          <table className="w-full text-left text-sm text-gray-400">
             <thead className="bg-brand-dark text-xs uppercase font-bold text-gray-500 border-b border-white/5">
                <tr>
                   <th className="p-4">Vehicle</th>
                   <th className="p-4">Service Type</th>
                   <th className="p-4">Date</th>
                   <th className="p-4">Cost</th>
                   <th className="p-4">Status</th>
                   <th className="p-4">Center</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-white/5">
                {MOCK_SERVICE_RECORDS.map(r => (
                   <tr key={r.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 text-white font-bold">{r.vehicleName}</td>
                      <td className="p-4">{r.type}</td>
                      <td className="p-4">{r.date}</td>
                      <td className="p-4 text-brand-gold">${r.cost}</td>
                      <td className="p-4">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                             r.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 
                             r.status === 'In-Progress' ? 'bg-blue-500/10 text-blue-500' : 'bg-yellow-500/10 text-yellow-500'
                          }`}>
                             {r.status}
                          </span>
                      </td>
                      <td className="p-4 text-xs">{r.serviceCenter}</td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
);

const SupportView = () => {
    const { tickets } = useContact();
    return (
    <div className="space-y-6 animate-fade-in">
       <h2 className="text-2xl font-bold text-white">Support Tickets</h2>
       <div className="bg-brand-surface rounded-xl border border-white/5 overflow-hidden shadow-lg">
          <table className="w-full text-left text-sm text-gray-400">
             <thead className="bg-brand-dark text-xs uppercase font-bold text-gray-500 border-b border-white/5">
                <tr>
                   <th className="p-4">Ticket ID</th>
                   <th className="p-4">Subject</th>
                   <th className="p-4">Customer</th>
                   <th className="p-4">Priority</th>
                   <th className="p-4">Status</th>
                   <th className="p-4 text-right">Actions</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-white/5">
                {tickets.map(t => (
                   <tr key={t.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-mono text-xs text-brand-gold">{t.id}</td>
                      <td className="p-4 text-white font-medium">
                         {t.subject}
                         <div className="text-xs text-gray-500 truncate max-w-xs">{t.message}</div>
                      </td>
                      <td className="p-4">{t.customerName}</td>
                      <td className="p-4">
                         <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${t.priority === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-gray-500/10 text-gray-500'}`}>
                            {t.priority}
                         </span>
                      </td>
                      <td className="p-4">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${t.status === 'Open' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'}`}>
                             {t.status}
                          </span>
                      </td>
                      <td className="p-4 text-right">
                         <button className="text-brand-gold hover:underline text-xs">Reply</button>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
    );
};

const POSView = () => {
    const { fleet } = useFleet();
    const [currentStage, setCurrentStage] = useState<POSWorkflowStage>('INTAKE');
    const [scannedCode, setScannedCode] = useState('');
    const [scanLoading, setScanLoading] = useState(false);
    const [currentWorkOrder, setCurrentWorkOrder] = useState<WorkOrder | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('Credit Card');
    const [isQRGenerated, setIsQRGenerated] = useState(false);

    // --- 1. INTAKE / SCANNING LOGIC ---
    const handleSimulateScan = () => {
        setScanLoading(true);
        setTimeout(() => {
            // Simulate finding a car from fleet
            const foundCar = fleet.find(c => c.vin.includes(scannedCode) || c.id === scannedCode) || fleet[0];
            const newOrder: WorkOrder = {
                id: `WO-${Math.floor(Math.random() * 10000)}`,
                vehicleId: foundCar.id,
                vehicleDetails: { make: foundCar.make, model: foundCar.model, vin: foundCar.vin, mileage: foundCar.mileage },
                items: [],
                subtotal: 0,
                tax: 0,
                total: 0,
                status: 'Draft',
                notes: '',
                createdAt: new Date().toISOString()
            };
            setCurrentWorkOrder(newOrder);
            setScanLoading(false);
            setCurrentStage('WORK_ORDER');
        }, 1200);
    };

    // --- 2. WORK ORDER LOGIC ---
    const addToWorkOrder = (item: POSItem) => {
        if(!currentWorkOrder) return;
        const updatedItems = [...currentWorkOrder.items, item];
        const subtotal = updatedItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
        const tax = subtotal * 0.1;
        
        setCurrentWorkOrder({
            ...currentWorkOrder,
            items: updatedItems,
            subtotal,
            tax,
            total: subtotal + tax
        });
    };

    // --- RENDER STAGES ---
    return (
        <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
            
            {/* PROGRESS HEADER */}
            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                 <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <i className="fa-solid fa-cash-register text-brand-gold"></i> INL POS System
                 </h2>
                 <div className="flex gap-2">
                     {['INTAKE', 'WORK_ORDER', 'ESTIMATE', 'PAYMENT', 'SUCCESS'].map((stage, idx) => (
                         <div key={stage} className={`flex items-center gap-2 ${currentStage === stage ? 'text-brand-gold font-bold' : 'text-gray-600'}`}>
                             <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border ${currentStage === stage ? 'border-brand-gold bg-brand-gold text-black' : 'border-gray-600'}`}>
                                 {idx + 1}
                             </div>
                             <span className="text-xs hidden md:block">{stage.replace('_', ' ')}</span>
                             {idx < 4 && <div className="w-8 h-px bg-gray-700 mx-2 hidden md:block"></div>}
                         </div>
                     ))}
                 </div>
            </div>

            {/* STAGE 1: INTAKE SCANNER */}
            {currentStage === 'INTAKE' && (
                <div className="grid md:grid-cols-2 gap-8 items-center h-[60vh]">
                    <div className="bg-brand-surface p-10 rounded-xl border border-white/10 text-center space-y-6">
                        <div className="w-24 h-24 bg-brand-dark rounded-full mx-auto flex items-center justify-center border-2 border-brand-gold animate-pulse">
                            <i className="fa-solid fa-qrcode text-4xl text-white"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-white">Scan VIN or QR Code</h3>
                        <p className="text-gray-400">Use handheld scanner or enter VIN manually to start intake.</p>
                        
                        <div className="relative max-w-sm mx-auto">
                            <input 
                                type="text" 
                                value={scannedCode}
                                onChange={(e) => setScannedCode(e.target.value)}
                                placeholder="Scan or Type Code..." 
                                className="w-full bg-brand-black border border-white/20 p-4 rounded text-center text-white text-lg tracking-widest focus:border-brand-gold focus:outline-none"
                                autoFocus
                            />
                            <button 
                                onClick={handleSimulateScan}
                                className="mt-4 w-full bg-brand-gold text-black font-bold py-3 rounded hover:bg-brand-gold-light transition-all flex items-center justify-center gap-2"
                            >
                                {scanLoading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <i className="fa-solid fa-barcode"></i>}
                                {scanLoading ? 'Processing...' : 'Simulate Scan'}
                            </button>
                        </div>
                    </div>
                    <div className="text-gray-500 space-y-4">
                        <h4 className="font-bold text-white uppercase tracking-widest text-xs border-b border-white/10 pb-2">Recent Intakes</h4>
                        <div className="bg-brand-surface p-4 rounded border border-white/5 flex justify-between items-center opacity-60">
                            <div>
                                <div className="text-white font-bold">Tesla Model 3</div>
                                <div className="text-xs">VIN: ...8841 • 10 mins ago</div>
                            </div>
                            <span className="text-green-500 text-xs">Processing</span>
                        </div>
                         <div className="bg-brand-surface p-4 rounded border border-white/5 flex justify-between items-center opacity-40">
                            <div>
                                <div className="text-white font-bold">BMW X5</div>
                                <div className="text-xs">VIN: ...9912 • 25 mins ago</div>
                            </div>
                            <span className="text-green-500 text-xs">Completed</span>
                        </div>
                    </div>
                </div>
            )}

            {/* STAGE 2: WORK ORDER CREATION */}
            {currentStage === 'WORK_ORDER' && currentWorkOrder && (
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left: Inventory & Services */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-brand-surface p-6 rounded-xl border border-white/10">
                            <h3 className="font-bold text-white mb-4">Quick Add Services</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {MOCK_SERVICE_PACKAGES.map(pkg => (
                                    <button 
                                        key={pkg.id}
                                        onClick={() => addToWorkOrder({ id: pkg.id, name: pkg.name, price: pkg.price, quantity: 1, type: 'Service', code: pkg.laborCode })}
                                        className="p-4 bg-brand-dark rounded border border-white/5 hover:border-brand-gold/50 text-left transition-all hover:bg-white/5 group"
                                    >
                                        <div className="text-brand-gold font-bold text-sm mb-1">{pkg.laborCode}</div>
                                        <div className="text-white font-bold text-sm leading-tight mb-2 group-hover:text-brand-gold transition-colors">{pkg.name}</div>
                                        <div className="text-gray-400 text-xs">${pkg.price}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <div className="bg-brand-surface p-6 rounded-xl border border-white/10">
                            <h3 className="font-bold text-white mb-4">Add Parts / Custom</h3>
                            <div className="flex gap-4">
                                <input type="text" placeholder="Search Part SKU or Name..." className="flex-1 bg-brand-dark p-3 rounded border border-white/10 text-white focus:border-brand-gold focus:outline-none" />
                                <button className="bg-white/10 text-white px-6 rounded font-bold hover:bg-white/20">Search</button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Active Work Order */}
                    <div className="bg-brand-surface border border-white/10 rounded-xl flex flex-col h-full sticky top-4">
                        <div className="p-4 border-b border-white/10 bg-brand-dark/50">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-bold text-white">Work Order #{currentWorkOrder.id}</h3>
                                <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded font-bold">DRAFT</span>
                            </div>
                            <div className="text-sm text-gray-400">
                                <div>{currentWorkOrder.vehicleDetails.make} {currentWorkOrder.vehicleDetails.model}</div>
                                <div className="text-xs font-mono mt-1">VIN: {currentWorkOrder.vehicleDetails.vin}</div>
                            </div>
                        </div>
                        
                        <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-2 min-h-[300px]">
                            {currentWorkOrder.items.length === 0 ? (
                                <div className="text-center text-gray-500 py-10">No items added yet.</div>
                            ) : (
                                currentWorkOrder.items.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center text-sm p-2 bg-white/5 rounded">
                                        <div>
                                            <div className="text-white font-bold">{item.name}</div>
                                            <div className="text-xs text-gray-500">{item.code} • {item.type}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-white">${item.price}</div>
                                            <div className="text-xs text-brand-gold cursor-pointer hover:underline">Remove</div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="p-4 border-t border-white/10 bg-brand-dark/30 space-y-2">
                             <div className="flex justify-between text-gray-400 text-sm"><span>Subtotal</span><span>${currentWorkOrder.subtotal.toFixed(2)}</span></div>
                             <div className="flex justify-between text-gray-400 text-sm"><span>Tax (10%)</span><span>${currentWorkOrder.tax.toFixed(2)}</span></div>
                             <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-white/5"><span>Total</span><span>${currentWorkOrder.total.toFixed(2)}</span></div>
                             
                             <button 
                                onClick={() => setCurrentStage('ESTIMATE')}
                                disabled={currentWorkOrder.items.length === 0}
                                className="w-full mt-4 bg-brand-gold text-black font-bold py-3 rounded hover:bg-brand-gold-light disabled:opacity-50 transition-colors"
                             >
                                 Create Estimate
                             </button>
                        </div>
                    </div>
                </div>
            )}

            {/* STAGE 3: ESTIMATE & APPROVAL */}
            {currentStage === 'ESTIMATE' && currentWorkOrder && (
                <div className="max-w-4xl mx-auto bg-brand-surface rounded-xl border border-white/10 overflow-hidden">
                    <div className="p-8 text-center border-b border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-2">Estimate Generated</h2>
                        <p className="text-gray-400">Please present this QR code to the customer to review and approve the estimate on their device.</p>
                    </div>
                    <div className="p-10 flex flex-col md:flex-row items-center justify-center gap-12">
                        <div className="bg-white p-4 rounded-xl shadow-2xl">
                             <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://carautomate.inc/approve/${currentWorkOrder.id}`} alt="Approval QR" />
                        </div>
                        <div className="text-center md:text-left space-y-4">
                            <div>
                                <div className="text-xs text-gray-500 uppercase font-bold">Estimate Link</div>
                                <div className="text-brand-gold font-mono bg-black/30 p-2 rounded text-sm select-all">https://carautomate.inc/approve/{currentWorkOrder.id}</div>
                            </div>
                            <div className="flex gap-4">
                                <button className="flex-1 bg-white/10 text-white px-6 py-3 rounded font-bold hover:bg-white/20"><i className="fa-solid fa-envelope mr-2"></i> Email</button>
                                <button className="flex-1 bg-white/10 text-white px-6 py-3 rounded font-bold hover:bg-white/20"><i className="fa-solid fa-comment mr-2"></i> SMS</button>
                            </div>
                            <div className="pt-4">
                                <button 
                                    onClick={() => setCurrentStage('PAYMENT')}
                                    className="w-full bg-green-600 text-white font-bold py-3 rounded hover:bg-green-500 shadow-lg shadow-green-900/20"
                                >
                                    <i className="fa-solid fa-check mr-2"></i> Mark Approved Manually
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* STAGE 4: PAYMENT */}
            {currentStage === 'PAYMENT' && currentWorkOrder && (
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <div className="space-y-6">
                        <div className="bg-brand-surface p-6 rounded-xl border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-6">Select Payment Method</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {['Cash', 'Credit Card', 'QR Code', 'PayPal'].map((m) => (
                                    <button
                                        key={m}
                                        onClick={() => { setPaymentMethod(m as PaymentMethodType); setIsQRGenerated(false); }}
                                        className={`p-6 rounded-lg border flex flex-col items-center gap-2 transition-all ${
                                            paymentMethod === m 
                                            ? 'bg-brand-gold text-brand-black border-brand-gold' 
                                            : 'bg-brand-dark text-gray-400 border-white/10 hover:border-brand-gold/30'
                                        }`}
                                    >
                                        <i className={`text-2xl fa-solid ${
                                            m === 'Cash' ? 'fa-money-bill-wave' : 
                                            m === 'Credit Card' ? 'fa-credit-card' : 
                                            m === 'QR Code' ? 'fa-qrcode' : 'fa-paypal'
                                        }`}></i>
                                        <span className="font-bold">{m}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Payment Specific UI */}
                        <div className="bg-brand-surface p-6 rounded-xl border border-white/10 min-h-[250px] flex flex-col justify-center items-center text-center">
                            {paymentMethod === 'QR Code' ? (
                                !isQRGenerated ? (
                                    <button onClick={() => setIsQRGenerated(true)} className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-200">Generate Payment QR</button>
                                ) : (
                                    <div className="animate-fade-in">
                                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=pay:${currentWorkOrder.total}`} alt="Pay QR" className="mx-auto border-4 border-white rounded-lg mb-4" />
                                        <p className="text-gray-400 text-sm">Scan to pay with Stripe / UPI / Wallet</p>
                                    </div>
                                )
                            ) : paymentMethod === 'Credit Card' ? (
                                <div className="w-full max-w-sm space-y-4">
                                    <div className="bg-brand-dark p-4 rounded text-left border border-white/10">
                                        <div className="text-xs text-gray-500 uppercase mb-1">Card Reader Status</div>
                                        <div className="flex items-center gap-2 text-green-500 font-bold"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> Connected</div>
                                    </div>
                                    <p className="text-gray-400">Waiting for tap or insert...</p>
                                </div>
                            ) : (
                                <div className="text-gray-400">
                                    <i className="fa-solid fa-hand-holding-dollar text-4xl mb-4 text-brand-gold"></i>
                                    <p>Please collect <b>${currentWorkOrder.total.toFixed(2)}</b> from the customer.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Summary & Confirm */}
                    <div className="bg-brand-surface p-8 rounded-xl border border-white/10 flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-6">Payment Summary</h3>
                        <div className="space-y-4 flex-1">
                             <div className="flex justify-between text-gray-400"><span>Work Order ID</span><span className="font-mono text-white">{currentWorkOrder.id}</span></div>
                             <div className="flex justify-between text-gray-400"><span>Customer</span><span className="text-white">Walk-in Guest</span></div>
                             <div className="border-t border-white/10 my-4"></div>
                             <div className="flex justify-between text-xl font-bold text-white"><span>Total Due</span><span className="text-brand-gold">${currentWorkOrder.total.toFixed(2)}</span></div>
                        </div>
                        <button 
                            onClick={() => setCurrentStage('SUCCESS')}
                            className="w-full bg-green-600 text-white font-bold py-4 rounded-lg hover:bg-green-500 shadow-lg shadow-green-900/20 text-lg mt-8"
                        >
                            Confirm Payment Received
                        </button>
                    </div>
                </div>
            )}

            {/* STAGE 5: SUCCESS */}
            {currentStage === 'SUCCESS' && (
                <div className="text-center py-20 bg-brand-surface rounded-xl border border-white/10">
                     <div className="w-24 h-24 bg-green-500 rounded-full mx-auto flex items-center justify-center text-4xl text-black mb-6 shadow-lg shadow-green-500/20">
                         <i className="fa-solid fa-check"></i>
                     </div>
                     <h2 className="text-3xl font-bold text-white mb-2">Transaction Complete!</h2>
                     <p className="text-gray-400 mb-8">Receipt sent to customer via SMS & Email.</p>
                     
                     <div className="flex justify-center gap-4">
                         <button className="bg-white/10 text-white font-bold py-3 px-8 rounded hover:bg-white/20"><i className="fa-solid fa-print mr-2"></i> Print Receipt</button>
                         <button 
                            onClick={() => { setCurrentStage('INTAKE'); setCurrentWorkOrder(null); setScannedCode(''); }}
                            className="bg-brand-gold text-black font-bold py-3 px-8 rounded hover:bg-brand-gold-light"
                        >
                            Start New Intake
                        </button>
                     </div>
                </div>
            )}

        </div>
    );
};

const ComplianceView = () => {
    const { fleet } = useFleet();
    return (
      <div className="space-y-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-white">Compliance & Documents</h2>
          <div className="bg-brand-surface rounded-xl border border-white/5 overflow-hidden shadow-lg">
               <table className="w-full text-left text-sm text-gray-400">
                  <thead className="bg-brand-dark text-xs uppercase font-bold text-gray-500 border-b border-white/5">
                      <tr>
                          <th className="p-4">Vehicle</th>
                          <th className="p-4">Document Type</th>
                          <th className="p-4">Number</th>
                          <th className="p-4">Expiry Date</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Action</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                      {fleet.flatMap(v => v.compliance?.map(c => ({...c, vehicle: `${v.make} ${v.model}`})))
                          .filter(c => c)
                          .map((doc: any, idx) => {
                               const expiry = new Date(doc.expiryDate);
                               const now = new Date();
                               const daysLeft = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 3600 * 24));
                               let statusColor = 'text-green-500 bg-green-500/10';
                               let statusText = 'Valid';
                               if (daysLeft < 0) { statusColor = 'text-red-500 bg-red-500/10'; statusText = 'Expired'; }
                               else if (daysLeft < 30) { statusColor = 'text-yellow-500 bg-yellow-500/10'; statusText = `Expiring in ${daysLeft} days`; }

                               return (
                                   <tr key={`${doc.id}-${idx}`} className="hover:bg-white/5">
                                       <td className="p-4 font-bold text-white">{doc.vehicle}</td>
                                       <td className="p-4">{doc.type}</td>
                                       <td className="p-4 font-mono text-xs">{doc.number}</td>
                                       <td className="p-4">{doc.expiryDate}</td>
                                       <td className="p-4"><span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${statusColor}`}>{statusText}</span></td>
                                       <td className="p-4 text-right"><button className="text-brand-gold hover:underline">Renew</button></td>
                                   </tr>
                               );
                          })
                      }
                  </tbody>
               </table>
          </div>
      </div>
    );
};

const NotificationsView = () => (
      <div className="space-y-6 animate-fade-in">
          <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Notification Logs</h2>
              <button className="text-gray-400 hover:text-white text-sm">Clear History</button>
          </div>
          <div className="bg-brand-surface rounded-xl border border-white/5 overflow-hidden shadow-lg">
               {MOCK_NOTIFICATIONS.map(n => (
                   <div key={n.id} className="p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors flex items-start gap-4">
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                           n.type === 'Email' ? 'bg-blue-500/10 text-blue-500' : 
                           n.type === 'SMS' ? 'bg-green-500/10 text-green-500' : 'bg-purple-500/10 text-purple-500'
                       }`}>
                           <i className={`fa-solid ${n.type === 'Email' ? 'fa-envelope' : n.type === 'SMS' ? 'fa-comment' : 'fa-brands fa-whatsapp'}`}></i>
                       </div>
                       <div className="flex-1">
                           <div className="flex justify-between">
                               <h4 className="font-bold text-white text-sm">{n.category} Alert</h4>
                               <span className="text-[10px] text-gray-500">{n.timestamp}</span>
                           </div>
                           <p className="text-sm text-gray-400">{n.message}</p>
                           <div className="mt-1 text-xs text-gray-600">To: {n.recipient} • Status: {n.status}</div>
                       </div>
                   </div>
               ))}
          </div>
      </div>
);

const ReportsView = () => (
      <div className="space-y-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-white">Business Reports</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['Sales Performance', 'Inventory Turnover', 'Customer Retention', 'Service Efficiency', 'Fleet Utilization', 'Financial Statement'].map((r, i) => (
                  <div key={i} className="bg-brand-surface p-6 rounded-xl border border-white/5 hover:border-brand-gold/30 transition-all cursor-pointer group">
                      <div className="w-12 h-12 bg-brand-dark rounded-lg mb-4 flex items-center justify-center text-gray-400 group-hover:text-brand-gold group-hover:bg-brand-gold/10 transition-colors">
                          <i className="fa-solid fa-chart-pie text-xl"></i>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{r}</h3>
                      <p className="text-sm text-gray-500 mb-4">View detailed analysis and export data.</p>
                      <span className="text-brand-gold text-sm font-bold flex items-center gap-2">View Report <i className="fa-solid fa-arrow-right"></i></span>
                  </div>
              ))}
          </div>
      </div>
);

const BlogView = () => {
    const [currentTab, setCurrentTab] = useState<'All' | 'Draft' | 'Review' | 'Published'>('All');
    const [isEditing, setIsEditing] = useState(false);
    const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);

    const filteredPosts = MOCK_BLOG_POSTS.filter(p => currentTab === 'All' || p.status === currentTab);

    const handleEdit = (post: BlogPost) => {
        setCurrentPost(post);
        setIsEditing(true);
    };

    const handleNew = () => {
        setCurrentPost({
            id: `blog-${Date.now()}`,
            title: '',
            slug: '',
            content: '',
            excerpt: '',
            image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2070&auto=format&fit=crop',
            author: 'Admin',
            category: 'Technology',
            tags: [],
            status: 'Draft',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
        setIsEditing(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, dispatch save action here
        console.log("Saved Post:", currentPost);
        setIsEditing(false);
        setCurrentPost(null);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white">Blog Management</h2>
                    <p className="text-gray-400 text-sm">Manage articles, SEO, and publishing workflow.</p>
                </div>
                <button onClick={handleNew} className="bg-brand-gold text-black font-bold py-2 px-4 rounded hover:bg-brand-gold-light flex items-center gap-2">
                    <i className="fa-solid fa-pen-nib"></i> New Post
                </button>
            </div>

            {/* Workflow Tabs */}
            <div className="flex gap-2 border-b border-white/10 pb-1">
                {['All', 'Draft', 'Review', 'Published'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setCurrentTab(tab as any)}
                        className={`px-6 py-2 text-sm font-bold transition-all border-b-2 ${
                            currentTab === tab 
                            ? 'border-brand-gold text-brand-gold bg-white/5' 
                            : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Post List */}
            <div className="bg-brand-surface rounded-xl border border-white/5 overflow-hidden">
                <table className="w-full text-left text-sm text-gray-400">
                    <thead className="bg-brand-dark text-xs uppercase font-bold text-gray-500 border-b border-white/5">
                        <tr>
                            <th className="p-4">Title</th>
                            <th className="p-4">Author</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Date</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredPosts.map(post => (
                            <tr key={post.id} className="hover:bg-white/5 transition-colors group">
                                <td className="p-4">
                                    <div className="font-bold text-white mb-1 group-hover:text-brand-gold transition-colors">{post.title}</div>
                                    <div className="text-xs text-gray-500 truncate max-w-xs">{post.slug}</div>
                                </td>
                                <td className="p-4">{post.author}</td>
                                <td className="p-4">
                                    <span className="bg-white/5 px-2 py-1 rounded text-xs border border-white/10">{post.category}</span>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                                        post.status === 'Published' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                                        post.status === 'Review' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                                        'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                                    }`}>
                                        {post.status}
                                    </span>
                                </td>
                                <td className="p-4 text-xs">{post.date || new Date(post.createdAt).toLocaleDateString()}</td>
                                <td className="p-4 text-right">
                                    <button onClick={() => handleEdit(post)} className="text-gray-400 hover:text-white mr-3"><i className="fa-solid fa-pen-to-square"></i></button>
                                    <button className="text-gray-400 hover:text-red-500"><i className="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {isEditing && currentPost && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-brand-surface w-full max-w-4xl rounded-xl border border-white/10 p-6 max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <i className="fa-solid fa-pen-nib text-brand-gold"></i>
                                {currentPost.id.startsWith('blog-') ? 'New Post' : 'Edit Post'}
                            </h3>
                            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-white"><i className="fa-solid fa-xmark text-xl"></i></button>
                        </div>
                        
                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-2 space-y-4">
                                    <div>
                                        <label className="block text-xs text-gray-500 uppercase mb-1">Title</label>
                                        <input 
                                            type="text" 
                                            value={currentPost.title} 
                                            onChange={e => setCurrentPost({...currentPost, title: e.target.value})} 
                                            className="w-full bg-brand-dark border border-white/10 rounded p-3 text-white focus:border-brand-gold focus:outline-none text-lg font-bold"
                                            placeholder="Enter post title..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-500 uppercase mb-1">Content (Markdown/HTML)</label>
                                        <textarea 
                                            rows={12} 
                                            value={currentPost.content} 
                                            onChange={e => setCurrentPost({...currentPost, content: e.target.value})} 
                                            className="w-full bg-brand-dark border border-white/10 rounded p-3 text-white focus:border-brand-gold focus:outline-none font-mono text-sm"
                                            placeholder="# Start writing..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-500 uppercase mb-1">Excerpt</label>
                                        <textarea 
                                            rows={3} 
                                            value={currentPost.excerpt} 
                                            onChange={e => setCurrentPost({...currentPost, excerpt: e.target.value})} 
                                            className="w-full bg-brand-dark border border-white/10 rounded p-3 text-white focus:border-brand-gold focus:outline-none text-sm"
                                            placeholder="Short summary for preview cards..."
                                        />
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="bg-brand-dark p-4 rounded border border-white/5">
                                        <h4 className="text-white font-bold text-sm mb-3">Publishing</h4>
                                        <div className="mb-4">
                                            <label className="block text-xs text-gray-500 uppercase mb-1">Status</label>
                                            <select 
                                                value={currentPost.status} 
                                                onChange={e => setCurrentPost({...currentPost, status: e.target.value as BlogStatus})} 
                                                className="w-full bg-brand-surface border border-white/10 rounded p-2 text-white focus:border-brand-gold focus:outline-none"
                                            >
                                                <option value="Draft">Draft</option>
                                                <option value="Review">Review</option>
                                                <option value="Published">Published</option>
                                                <option value="Archived">Archived</option>
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-xs text-gray-500 uppercase mb-1">Category</label>
                                            <select 
                                                value={currentPost.category} 
                                                onChange={e => setCurrentPost({...currentPost, category: e.target.value})} 
                                                className="w-full bg-brand-surface border border-white/10 rounded p-2 text-white focus:border-brand-gold focus:outline-none"
                                            >
                                                <option>Technology</option>
                                                <option>Maintenance</option>
                                                <option>Performance</option>
                                                <option>Customization</option>
                                                <option>Safety</option>
                                                <option>News</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 uppercase mb-1">Author</label>
                                            <input 
                                                type="text" 
                                                value={currentPost.author} 
                                                onChange={e => setCurrentPost({...currentPost, author: e.target.value})} 
                                                className="w-full bg-brand-surface border border-white/10 rounded p-2 text-white focus:border-brand-gold focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-brand-dark p-4 rounded border border-white/5">
                                        <h4 className="text-white font-bold text-sm mb-3">SEO Settings</h4>
                                        <div className="mb-3">
                                            <label className="block text-xs text-gray-500 uppercase mb-1">SEO Title</label>
                                            <input 
                                                type="text" 
                                                value={currentPost.seoTitle || ''} 
                                                onChange={e => setCurrentPost({...currentPost, seoTitle: e.target.value})} 
                                                className="w-full bg-brand-surface border border-white/10 rounded p-2 text-white focus:border-brand-gold focus:outline-none text-xs"
                                                placeholder="Defaults to Title"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 uppercase mb-1">Featured Image URL</label>
                                            <input 
                                                type="text" 
                                                value={currentPost.image} 
                                                onChange={e => setCurrentPost({...currentPost, image: e.target.value})} 
                                                className="w-full bg-brand-surface border border-white/10 rounded p-2 text-white focus:border-brand-gold focus:outline-none text-xs"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                                <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 text-gray-400 hover:text-white font-bold transition-colors">Cancel</button>
                                <button type="submit" className="px-8 py-2 bg-brand-gold text-black font-bold rounded hover:bg-brand-gold-light transition-colors shadow-lg">Save Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const TeamView = () => {
    const { teamMembers, addTeamMember, updateTeamMember, deleteTeamMember } = useTeam();
    const [isEditingTeam, setIsEditingTeam] = useState(false);
    const [currentTeamMember, setCurrentTeamMember] = useState<PublicTeamMember | null>(null);

    const handleEditTeam = (member: PublicTeamMember) => {
        setCurrentTeamMember(member);
        setIsEditingTeam(true);
      };
    
      const handleNewTeam = () => {
        setCurrentTeamMember({
          id: '',
          name: '',
          role: '',
          department: 'Management',
          bio: '',
          image: 'https://via.placeholder.com/400',
          status: 'Active',
          socialLinks: {},
          certifications: [],
          specializations: [],
          yearsOfExperience: undefined,
          portfolioLink: '',
          isFeatured: false,
          joinDate: new Date().toISOString().split('T')[0]
        });
        setIsEditingTeam(true);
      };
    
      const handleSaveTeam = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentTeamMember) return;
        
        if (currentTeamMember.id) {
          updateTeamMember(currentTeamMember.id, currentTeamMember);
        } else {
          addTeamMember({ ...currentTeamMember, id: `tm-${Date.now()}` });
        }
        setIsEditingTeam(false);
        setCurrentTeamMember(null);
      };
    
      const handleDeleteTeam = (id: string) => {
        if (window.confirm('Are you sure you want to remove this team member?')) {
          deleteTeamMember(id);
        }
      };

      return (
        <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Team Management</h2>
            <p className="text-gray-400">Manage public profiles, roles, and visibility for the "Our Team" page.</p>
          </div>
          <button onClick={handleNewTeam} className="bg-brand-gold text-black font-bold py-2 px-4 rounded hover:bg-brand-gold-light flex items-center gap-2">
            <i className="fa-solid fa-plus"></i> Add Member
          </button>
        </div>

        <div className="grid gap-4">
           {teamMembers.map(member => (
             <div key={member.id} className="bg-brand-surface p-4 rounded-lg border border-white/5 flex items-center justify-between group hover:border-brand-gold/30 transition-all">
                <div className="flex items-center gap-4">
                  <img src={member.image} alt={member.name} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                  <div>
                    <div className="flex items-center gap-2">
                       <h3 className="font-bold text-white">{member.name}</h3>
                       {member.isFeatured && <i className="fa-solid fa-star text-brand-gold text-xs" title="Featured Spotlight"></i>}
                       <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${member.status === 'Active' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                         {member.status}
                       </span>
                    </div>
                    <p className="text-sm text-gray-400">{member.role} • {member.department}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                   <button onClick={() => handleEditTeam(member)} className="w-8 h-8 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors" title="Edit">
                      <i className="fa-solid fa-pen"></i>
                   </button>
                   <button onClick={() => handleDeleteTeam(member.id)} className="w-8 h-8 rounded bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                      <i className="fa-solid fa-trash"></i>
                   </button>
                </div>
             </div>
           ))}
        </div>

        {/* Edit Modal */}
        {isEditingTeam && currentTeamMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-brand-surface w-full max-w-2xl rounded-xl border border-white/10 p-6 max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <i className="fa-solid fa-user-pen text-brand-gold"></i>
                  {currentTeamMember.id ? 'Edit Member' : 'Add New Member'}
              </h3>
              <form onSubmit={handleSaveTeam} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-xs text-gray-500 uppercase mb-1">Full Name *</label>
                     <input type="text" required value={currentTeamMember.name} onChange={e => setCurrentTeamMember({...currentTeamMember, name: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded p-2 text-white focus:border-brand-gold focus:outline-none" />
                   </div>
                   <div>
                     <label className="block text-xs text-gray-500 uppercase mb-1">Job Title *</label>
                     <input type="text" required value={currentTeamMember.role} onChange={e => setCurrentTeamMember({...currentTeamMember, role: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded p-2 text-white focus:border-brand-gold focus:outline-none" />
                   </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-xs text-gray-500 uppercase mb-1">Department</label>
                     <select value={currentTeamMember.department} onChange={e => setCurrentTeamMember({...currentTeamMember, department: e.target.value as any})} className="w-full bg-brand-dark border border-white/10 rounded p-2 text-white focus:border-brand-gold focus:outline-none">
                        <option value="Management">Management</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Service">Service</option>
                        <option value="Sales">Sales</option>
                        <option value="Support">Support</option>
                     </select>
                   </div>
                   <div>
                     <label className="block text-xs text-gray-500 uppercase mb-1">Status</label>
                     <select value={currentTeamMember.status} onChange={e => setCurrentTeamMember({...currentTeamMember, status: e.target.value as any})} className="w-full bg-brand-dark border border-white/10 rounded p-2 text-white focus:border-brand-gold focus:outline-none">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                     </select>
                   </div>
                </div>
                
                <div>
                    <label className="block text-xs text-gray-500 uppercase mb-1">Profile Image</label>
                    <div className="flex items-center gap-4">
                        <img src={currentTeamMember.image} alt="Profile" className="w-16 h-16 rounded-full object-cover border border-white/10" />
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, (base64) => setCurrentTeamMember({...currentTeamMember, image: base64}))}
                            className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                     <div>
                         <label className="block text-xs text-gray-500 uppercase mb-1">Years of Experience</label>
                         <input 
                            type="number" 
                            min="0" 
                            value={currentTeamMember.yearsOfExperience !== undefined ? currentTeamMember.yearsOfExperience : ''} 
                            onChange={e => setCurrentTeamMember({...currentTeamMember, yearsOfExperience: e.target.value ? parseInt(e.target.value) : undefined})} 
                            className="w-full bg-brand-dark border border-white/10 rounded p-2 text-white focus:border-brand-gold focus:outline-none" 
                            placeholder="e.g. 10" 
                         />
                     </div>
                     <div>
                         <label className="block text-xs text-gray-500 uppercase mb-1">Portfolio URL</label>
                         <input 
                            type="text" 
                            value={currentTeamMember.portfolioLink || ''} 
                            onChange={e => setCurrentTeamMember({...currentTeamMember, portfolioLink: e.target.value})} 
                            className="w-full bg-brand-dark border border-white/10 rounded p-2 text-white focus:border-brand-gold focus:outline-none" 
                            placeholder="https://..." 
                         />
                     </div>
                </div>

                <div>
                    <label className="block text-xs text-gray-500 uppercase mb-1">Bio</label>
                    <textarea rows={3} value={currentTeamMember.bio} onChange={e => setCurrentTeamMember({...currentTeamMember, bio: e.target.value})} className="w-full bg-brand-dark border border-white/10 rounded p-2 text-white focus:border-brand-gold focus:outline-none" />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs text-gray-500 uppercase mb-1">Email</label>
                        <input type="text" value={currentTeamMember.socialLinks.email || ''} onChange={e => setCurrentTeamMember({...currentTeamMember, socialLinks: {...currentTeamMember.socialLinks, email: e.target.value}})} className="w-full bg-brand-dark border border-white/10 rounded p-2 text-white focus:border-brand-gold focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 uppercase mb-1">LinkedIn URL</label>
                        <input type="text" value={currentTeamMember.socialLinks.linkedin || ''} onChange={e => setCurrentTeamMember({...currentTeamMember, socialLinks: {...currentTeamMember.socialLinks, linkedin: e.target.value}})} className="w-full bg-brand-dark border border-white/10 rounded p-2 text-white focus:border-brand-gold focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 uppercase mb-1">Twitter URL</label>
                        <input type="text" value={currentTeamMember.socialLinks.twitter || ''} onChange={e => setCurrentTeamMember({...currentTeamMember, socialLinks: {...currentTeamMember.socialLinks, twitter: e.target.value}})} className="w-full bg-brand-dark border border-white/10 rounded p-2 text-white focus:border-brand-gold focus:outline-none" />
                    </div>
                </div>

                <div className="flex items-center gap-2 pt-2 bg-brand-dark/50 p-2 rounded border border-white/5">
                    <input 
                        type="checkbox" 
                        id="featured"
                        checked={currentTeamMember.isFeatured}
                        onChange={e => setCurrentTeamMember({...currentTeamMember, isFeatured: e.target.checked})}
                        className="rounded border-white/10 bg-brand-dark text-brand-gold focus:ring-brand-gold"
                    />
                    <label htmlFor="featured" className="text-sm text-gray-300 cursor-pointer">Feature this member (Spotlight on Team Page)</label>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-white/10 mt-4">
                    <button type="button" onClick={() => setIsEditingTeam(false)} className="px-4 py-2 text-gray-400 hover:text-white transition-colors">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-brand-gold text-black font-bold rounded hover:bg-brand-gold-light transition-colors shadow-lg shadow-brand-gold/20">Save Member</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      );
};

const SettingsView = () => {
    const { settings, updateSettings } = useSettings();
    const { staff, updateStaff } = useStaff();
    const [activeTab, setActiveTab] = useState<'General' | 'Branding' | 'Users' | 'Notifications' | 'Social Media' | 'Audit & Logs' | 'Roles & Permissions'>('General');
    const [systemRoles, setSystemRoles] = useState<SystemRole[]>(DEFAULT_ROLES);
    const [auditFilter, setAuditFilter] = useState('All');
  
    const handleRoleUpdate = (id: string, newRole: UserRole) => {
        updateStaff(id, { role: newRole });
    };

    const handleStatusUpdate = (id: string, newStatus: StaffStatus) => {
        updateStaff(id, { status: newStatus as any });
    };

    const handleToggleSocial = (id: string) => {
        const updatedAccounts = settings.socialAccounts.map(acc => {
            if (acc.id === id) {
                return { ...acc, status: acc.status === 'Connected' ? 'Pending' : 'Connected' } as any;
            }
            return acc;
        });
        updateSettings({ socialAccounts: updatedAccounts });
    };

    const handleUpdateSocialHandle = (id: string, newHandle: string) => {
        const updatedAccounts = settings.socialAccounts.map(acc => {
            if (acc.id === id) return { ...acc, handle: newHandle };
            return acc;
        });
        updateSettings({ socialAccounts: updatedAccounts });
    };

    const togglePermission = (roleId: string, module: string, perm: Permission) => {
        setSystemRoles(prev => prev.map(role => {
            if (role.id !== roleId) return role;
            const currentPerms = role.permissions[module] || [];
            const newPerms = currentPerms.includes(perm) 
                ? currentPerms.filter(p => p !== perm) 
                : [...currentPerms, perm];
            return { ...role, permissions: { ...role.permissions, [module]: newPerms } };
        }));
    };

    const filteredLogs = MOCK_ACTIVITY_LOGS.filter(log => {
        if (auditFilter === 'All') return true;
        if (auditFilter === 'Admin') return ['Manager', 'Admin'].includes(log.role);
        if (auditFilter === 'System') return ['System', 'Settings'].includes(log.module);
        if (auditFilter === 'Bookings') return log.module === 'Bookings';
        if (auditFilter === 'Security') return ['Security', 'Auth'].includes(log.module);
        return true;
    });
  
    return (
      <div className="animate-fade-in space-y-6 max-w-5xl">
         <div className="flex justify-between items-end mb-6">
            <div>
                <h2 className="text-2xl font-bold text-white">System Settings</h2>
                <p className="text-gray-400">Configure store preferences and manage user access.</p>
            </div>
         </div>
         
         <div className="flex gap-2 border-b border-white/10 pb-1 overflow-x-auto">
            {['General', 'Branding', 'Users', 'Roles & Permissions', 'Notifications', 'Social Media', 'Audit & Logs'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-6 py-3 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${activeTab === tab ? 'border-brand-gold text-brand-gold bg-white/5' : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                    {tab}
                </button>
            ))}
         </div>
  
         {activeTab === 'General' && (
             <div className="bg-brand-surface p-8 rounded-xl border border-white/5 space-y-6">
                 <h3 className="text-white font-bold text-lg mb-4 border-l-4 border-brand-gold pl-3">Store Details</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                         <label className="block text-xs text-gray-500 uppercase mb-2">Store Name</label>
                         <input type="text" value={settings.name} onChange={e => updateSettings({ name: e.target.value })} className="w-full bg-brand-dark border border-white/10 rounded p-3 text-white focus:border-brand-gold focus:outline-none" />
                     </div>
                     <div>
                         <label className="block text-xs text-gray-500 uppercase mb-2">Currency</label>
                         <input type="text" value={settings.general.currency} onChange={e => updateSettings({ general: { ...settings.general, currency: e.target.value } })} className="w-full bg-brand-dark border border-white/10 rounded p-3 text-white focus:border-brand-gold focus:outline-none" />
                     </div>
                     <div>
                         <label className="block text-xs text-gray-500 uppercase mb-2">Support Email</label>
                         <input type="text" value={settings.general.supportEmail} onChange={e => updateSettings({ general: { ...settings.general, supportEmail: e.target.value } })} className="w-full bg-brand-dark border border-white/10 rounded p-3 text-white focus:border-brand-gold focus:outline-none" />
                     </div>
                     <div>
                         <label className="block text-xs text-gray-500 uppercase mb-2">Support Phone</label>
                         <input type="text" value={settings.general.supportPhone} onChange={e => updateSettings({ general: { ...settings.general, supportPhone: e.target.value } })} className="w-full bg-brand-dark border border-white/10 rounded p-3 text-white focus:border-brand-gold focus:outline-none" />
                     </div>
                     <div className="md:col-span-2">
                         <label className="block text-xs text-gray-500 uppercase mb-2">Store Address</label>
                         <input type="text" value={settings.general.storeAddress} onChange={e => updateSettings({ general: { ...settings.general, storeAddress: e.target.value } })} className="w-full bg-brand-dark border border-white/10 rounded p-3 text-white focus:border-brand-gold focus:outline-none" />
                     </div>
                 </div>
                 <div className="flex justify-end pt-4">
                     <button className="bg-brand-gold text-brand-black font-bold py-2 px-6 rounded hover:bg-brand-gold-light transition-colors">Save Changes</button>
                 </div>
             </div>
         )}

         {activeTab === 'Branding' && (
             <div className="bg-brand-surface p-8 rounded-xl border border-white/5 space-y-8">
                 <h3 className="text-white font-bold text-lg border-l-4 border-brand-gold pl-3">Appearance & Media</h3>
                 
                 <div className="space-y-6">
                     {/* Logo Upload */}
                     <div className="flex items-start gap-6 border-b border-white/5 pb-6">
                         <div className="w-32 h-32 bg-brand-dark rounded-lg flex items-center justify-center border border-white/10 overflow-hidden shrink-0">
                             {settings.logoUrl ? (
                                 <img src={settings.logoUrl} alt="Logo" className="w-full h-full object-contain p-2" />
                             ) : (
                                 <i className="fa-solid fa-image text-3xl text-gray-600"></i>
                             )}
                         </div>
                         <div className="flex-1">
                             <h4 className="text-white font-bold mb-1">Store Logo</h4>
                             <p className="text-sm text-gray-400 mb-4">Recommended size: 512x512px. Transparent PNG preferred.</p>
                             <div className="relative inline-block">
                                 <button className="bg-brand-gold text-black font-bold py-2 px-4 rounded text-sm hover:bg-brand-gold-light">
                                     <i className="fa-solid fa-upload mr-2"></i> Upload Logo
                                 </button>
                                 <input 
                                     type="file" 
                                     accept="image/*"
                                     onChange={(e) => handleImageUpload(e, (base64) => updateSettings({ logoUrl: base64 }))}
                                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                 />
                             </div>
                         </div>
                     </div>

                     {/* Hero Background Upload */}
                     <div className="flex items-start gap-6">
                         <div className="w-64 h-32 bg-brand-dark rounded-lg flex items-center justify-center border border-white/10 overflow-hidden shrink-0">
                             {settings.heroImageUrl ? (
                                 <img src={settings.heroImageUrl} alt="Hero" className="w-full h-full object-cover" />
                             ) : (
                                 <i className="fa-solid fa-image text-3xl text-gray-600"></i>
                             )}
                         </div>
                         <div className="flex-1">
                             <h4 className="text-white font-bold mb-1">Homepage Background</h4>
                             <p className="text-sm text-gray-400 mb-4">High resolution image for the main hero section. 1920x1080px recommended.</p>
                             <div className="relative inline-block">
                                 <button className="bg-white/10 text-white font-bold py-2 px-4 rounded text-sm hover:bg-white/20">
                                     <i className="fa-solid fa-upload mr-2"></i> Upload Background
                                 </button>
                                 <input 
                                     type="file" 
                                     accept="image/*"
                                     onChange={(e) => handleImageUpload(e, (base64) => updateSettings({ heroImageUrl: base64 }))}
                                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                 />
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         )}
  
         {activeTab === 'Users' && (
             <div className="bg-brand-surface p-8 rounded-xl border border-white/5">
                 <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-white font-bold text-lg border-l-4 border-brand-gold pl-3 mb-1">User Management</h3>
                        <p className="text-gray-400 text-sm">Manage staff accounts and approval status.</p>
                    </div>
                    <button className="bg-brand-gold text-black font-bold py-2 px-4 rounded hover:bg-brand-gold-light flex items-center gap-2">
                        <i className="fa-solid fa-user-plus"></i> Add User
                    </button>
                 </div>
                 
                 <div className="overflow-x-auto rounded-lg border border-white/5">
                     <table className="w-full text-left text-sm text-gray-400">
                         <thead className="text-xs uppercase bg-brand-dark text-gray-500">
                             <tr>
                                 <th className="p-4">Name</th>
                                 <th className="p-4">Role</th>
                                 <th className="p-4">Department</th>
                                 <th className="p-4">Status</th>
                                 <th className="p-4 text-right">Actions</th>
                             </tr>
                         </thead>
                         <tbody className="divide-y divide-white/5 bg-brand-dark/20">
                             {staff.map(member => (
                                 <tr key={member.id} className="hover:bg-white/5 transition-colors">
                                     <td className="p-4 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-brand-dark flex items-center justify-center text-xs font-bold text-brand-gold border border-white/10">
                                            {member.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-white">{member.name}</div>
                                            <div className="text-xs text-gray-500">{member.email}</div>
                                        </div>
                                     </td>
                                     <td className="p-4">
                                         <select 
                                            value={member.role}
                                            onChange={(e) => handleRoleUpdate(member.id, e.target.value as UserRole)}
                                            className="bg-brand-black border border-white/10 rounded px-3 py-1.5 text-white text-xs focus:border-brand-gold outline-none w-36"
                                         >
                                             {systemRoles.map(r => (
                                                 <option key={r.id} value={r.name}>{r.name}</option>
                                             ))}
                                         </select>
                                     </td>
                                     <td className="p-4">{member.department}</td>
                                     <td className="p-4">
                                         <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                                             member.status === 'Active' ? 'bg-green-500/10 text-green-500' : 
                                             member.status === 'Inactive' ? 'bg-red-500/10 text-red-500' :
                                             'bg-yellow-500/10 text-yellow-500'
                                         }`}>
                                             {member.status}
                                         </span>
                                     </td>
                                     <td className="p-4 text-right">
                                         {member.status === 'Active' ? (
                                             <button onClick={() => handleStatusUpdate(member.id, 'Inactive')} className="text-xs text-red-500 hover:underline">Deactivate</button>
                                         ) : (
                                             <button onClick={() => handleStatusUpdate(member.id, 'Active')} className="text-xs text-green-500 hover:underline">Activate</button>
                                         )}
                                     </td>
                                 </tr>
                             ))}
                         </tbody>
                     </table>
                 </div>
             </div>
         )}

         {activeTab === 'Roles & Permissions' && (
             <div className="bg-brand-surface p-8 rounded-xl border border-white/5 space-y-8">
                 <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-white font-bold text-lg border-l-4 border-brand-gold pl-3 mb-1">Role Configuration</h3>
                        <p className="text-gray-400 text-sm">Define granular access controls for each role.</p>
                    </div>
                    <button className="bg-white/10 text-white font-bold py-2 px-4 rounded hover:bg-white/20 flex items-center gap-2">
                        <i className="fa-solid fa-plus"></i> New Role
                    </button>
                 </div>

                 {/* Permission Matrix */}
                 <div className="overflow-x-auto">
                     <table className="w-full text-left text-sm text-gray-400 border-collapse">
                         <thead>
                             <tr>
                                 <th className="p-4 bg-brand-dark text-white border-b border-white/10 sticky left-0 z-10 w-48">Module / Capability</th>
                                 {systemRoles.map(role => (
                                     <th key={role.id} className="p-4 text-center bg-brand-dark/50 border-b border-white/10 min-w-[100px] border-l border-white/5">
                                         <div className="font-bold text-white">{role.name}</div>
                                         <div className="text-[10px] font-normal text-gray-500 mt-1">{role.isSystem ? 'System' : 'Custom'}</div>
                                     </th>
                                 ))}
                             </tr>
                         </thead>
                         <tbody className="divide-y divide-white/5">
                             {['Dashboard', 'Orders', 'Customers', 'Inventory', 'Finance', 'Settings'].map(module => (
                                 <React.Fragment key={module}>
                                     <tr className="bg-brand-dark/30">
                                         <td colSpan={systemRoles.length + 1} className="p-2 pl-4 text-xs font-bold text-brand-gold uppercase tracking-wider">{module}</td>
                                     </tr>
                                     {(['View', 'Edit', 'Create', 'Delete', 'Approve'] as Permission[]).map(perm => (
                                         <tr key={`${module}-${perm}`} className="hover:bg-white/5 transition-colors">
                                             <td className="p-3 pl-8 sticky left-0 bg-brand-surface border-r border-white/5 text-gray-300">
                                                 {perm} {module}
                                             </td>
                                             {systemRoles.map(role => {
                                                 const hasPerm = role.permissions[module]?.includes(perm);
                                                 return (
                                                     <td key={`${role.id}-${module}-${perm}`} className="p-3 text-center border-l border-white/5">
                                                         <button 
                                                            onClick={() => togglePermission(role.id, module, perm)}
                                                            className={`w-5 h-5 rounded border flex items-center justify-center mx-auto transition-all ${
                                                                hasPerm 
                                                                ? 'bg-brand-gold border-brand-gold text-black' 
                                                                : 'bg-transparent border-gray-600 hover:border-gray-400'
                                                            }`}
                                                            disabled={role.name === 'Admin'} // Admin always has access
                                                         >
                                                             {hasPerm && <i className="fa-solid fa-check text-xs"></i>}
                                                         </button>
                                                     </td>
                                                 );
                                             })}
                                         </tr>
                                     ))}
                                 </React.Fragment>
                             ))}
                         </tbody>
                     </table>
                 </div>
             </div>
         )}
         
         {activeTab === 'Notifications' && (
              <div className="bg-brand-surface p-8 rounded-xl border border-white/5">
                  <h3 className="text-white font-bold text-lg mb-6 border-l-4 border-brand-gold pl-3">Email Notification Preferences</h3>
                  <div className="space-y-4 max-w-2xl">
                      <div className="flex items-center justify-between p-4 bg-brand-dark/50 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                          <div>
                              <div className="text-white font-bold">New Order Alerts</div>
                              <div className="text-xs text-gray-500">Receive an email when a customer places an order.</div>
                          </div>
                          <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${settings.emails.notifications.newOrder ? 'bg-brand-gold' : 'bg-gray-700'}`} onClick={() => updateSettings({ emails: { ...settings.emails, notifications: { ...settings.emails.notifications, newOrder: !settings.emails.notifications.newOrder } } })}>
                               <div className={`absolute top-1 w-4 h-4 bg-black rounded-full transition-all ${settings.emails.notifications.newOrder ? 'left-7' : 'left-1'}`}></div>
                          </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-brand-dark/50 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                          <div>
                              <div className="text-white font-bold">Order Cancellation Alerts</div>
                              <div className="text-xs text-gray-500">Receive an email when an order is cancelled.</div>
                          </div>
                          <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${settings.emails.notifications.cancelledOrder ? 'bg-brand-gold' : 'bg-gray-700'}`} onClick={() => updateSettings({ emails: { ...settings.emails, notifications: { ...settings.emails.notifications, cancelledOrder: !settings.emails.notifications.cancelledOrder } } })}>
                               <div className={`absolute top-1 w-4 h-4 bg-black rounded-full transition-all ${settings.emails.notifications.cancelledOrder ? 'left-7' : 'left-1'}`}></div>
                          </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-brand-dark/50 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                          <div>
                              <div className="text-white font-bold">Refund Alerts</div>
                              <div className="text-xs text-gray-500">Receive an email when a refund is processed.</div>
                          </div>
                          <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${settings.emails.notifications.refund ? 'bg-brand-gold' : 'bg-gray-700'}`} onClick={() => updateSettings({ emails: { ...settings.emails, notifications: { ...settings.emails.notifications, refund: !settings.emails.notifications.refund } } })}>
                               <div className={`absolute top-1 w-4 h-4 bg-black rounded-full transition-all ${settings.emails.notifications.refund ? 'left-7' : 'left-1'}`}></div>
                          </div>
                      </div>
                  </div>
              </div>
         )}

         {activeTab === 'Social Media' && (
             <div className="bg-brand-surface p-8 rounded-xl border border-white/5">
                 <h3 className="text-white font-bold text-lg mb-6 border-l-4 border-brand-gold pl-3">Social Media Management</h3>
                 <p className="text-gray-400 mb-6 text-sm">Connect your social media accounts to enable cross-platform posting and analytics.</p>
                 
                 <div className="grid gap-4">
                    {settings.socialAccounts.map(account => (
                        <div key={account.id} className="bg-brand-dark/50 p-4 rounded-lg border border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded flex items-center justify-center text-xl ${
                                    account.platform === 'TikTok' ? 'bg-black text-white border border-white/20' : 
                                    account.platform === 'Facebook' ? 'bg-blue-600 text-white' : 
                                    account.platform === 'Instagram' ? 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white' : 
                                    'bg-red-600 text-white'
                                }`}>
                                    <i className={`fa-brands fa-${account.platform.toLowerCase()}`}></i>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">{account.platform}</h4>
                                    <input 
                                        type="text" 
                                        value={account.handle} 
                                        onChange={(e) => handleUpdateSocialHandle(account.id, e.target.value)}
                                        className="bg-transparent border-b border-white/10 text-xs text-gray-400 focus:border-brand-gold focus:text-white outline-none w-40"
                                        placeholder="@username"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`text-xs font-bold uppercase ${account.status === 'Connected' ? 'text-green-500' : 'text-gray-500'}`}>
                                    {account.status}
                                </span>
                                <button 
                                    onClick={() => handleToggleSocial(account.id)}
                                    className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                                        account.status === 'Connected' 
                                        ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' 
                                        : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                                    }`}
                                >
                                    {account.status === 'Connected' ? 'Disconnect' : 'Connect'}
                                </button>
                            </div>
                        </div>
                    ))}
                    {settings.socialAccounts.length === 0 && (
                        <div className="text-center py-6 text-gray-500">
                            No social accounts configured.
                        </div>
                    )}
                 </div>
                 <div className="mt-6 pt-6 border-t border-white/5">
                     <button className="text-brand-gold text-sm font-bold hover:underline flex items-center gap-2">
                        <i className="fa-solid fa-plus"></i> Add Another Account
                     </button>
                 </div>
             </div>
         )}

         {activeTab === 'Audit & Logs' && (
            <div className="bg-brand-surface p-8 rounded-xl border border-white/5">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-white font-bold text-lg border-l-4 border-brand-gold pl-3">System Activity Logs</h3>
                    <div className="flex gap-3">
                        <select 
                            value={auditFilter} 
                            onChange={e => setAuditFilter(e.target.value)}
                            className="bg-brand-dark border border-white/10 rounded px-3 py-1.5 text-xs text-white focus:border-brand-gold outline-none"
                        >
                            <option value="All">All Logs</option>
                            <option value="Security">Security</option>
                            <option value="Bookings">Bookings</option>
                            <option value="System">System</option>
                            <option value="Admin">Admin Actions</option>
                        </select>
                        <button className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded transition-colors">
                            <i className="fa-solid fa-download mr-1"></i> Export Logs
                        </button>
                    </div>
                </div>
                
                <div className="overflow-x-auto rounded-lg border border-white/5">
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead className="bg-brand-dark text-xs uppercase font-bold text-gray-500">
                            <tr>
                                <th className="p-4">Timestamp</th>
                                <th className="p-4">User</th>
                                <th className="p-4">Action</th>
                                <th className="p-4">Module</th>
                                <th className="p-4">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 bg-brand-dark/20">
                            {filteredLogs.map(log => (
                                <tr key={log.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-mono text-xs whitespace-nowrap">{log.timestamp}</td>
                                    <td className="p-4">
                                        <div className="font-bold text-white text-xs">{log.userName}</div>
                                        <div className="text-[10px] text-gray-500">{log.role}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                                            log.action.includes('Delete') ? 'bg-red-500/10 text-red-500' :
                                            log.action.includes('Create') || log.action.includes('Add') ? 'bg-green-500/10 text-green-500' :
                                            log.action.includes('Update') ? 'bg-blue-500/10 text-blue-500' :
                                            'bg-gray-500/10 text-gray-400'
                                        }`}>
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="p-4 text-xs font-bold text-gray-300">{log.module}</td>
                                    <td className="p-4 text-xs max-w-xs truncate">{log.details}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
         )}
      </div>
    );
};

export default function Admin() {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  
  // Sidebar Group State
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    'Overview': true,
    'Operations': true,
    'Content': true,
    'System': true
  });

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  // --- RENDER CONTENT ---
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardView />;
      case 'settings': return <SettingsView />;
      case 'team': return <TeamView />;
      case 'products': return <ProductsView />;
      case 'vehicles': return <VehiclesView />;
      case 'orders': return <OrdersView />;
      case 'bookings': return <BookingsView />;
      case 'customers': return <CustomersView />;
      case 'staff': return <StaffView />;
      case 'financials': return <FinancialsView />;
      case 'maintenance': return <MaintenanceView />;
      case 'support': return <SupportView />;
      case 'pos': return <POSView />;
      case 'compliance': return <ComplianceView />;
      case 'notifications': return <NotificationsView />;
      case 'reports': return <ReportsView />;
      case 'blog': return <BlogView />;
      default:
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] text-gray-500 animate-fade-in">
                <i className="fa-solid fa-screwdriver-wrench text-5xl mb-4 text-brand-gold/20"></i>
                <h3 className="text-xl font-bold text-gray-400">Module Under Construction</h3>
                <p className="text-sm">The {activeTab} module is coming soon.</p>
            </div>
        );
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden animate-fade-in">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-surface border-r border-white/5 flex-shrink-0 flex flex-col overflow-y-auto custom-scrollbar">
         <div className="p-4">
             <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Admin Console</div>
         </div>
         
         <nav className="flex-1 space-y-1 pb-4">
            {/* Overview Group */}
            <div className="px-3 pt-2">
               <button onClick={() => toggleGroup('Overview')} className="flex items-center justify-between w-full text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 hover:text-white">
                  <span>Overview</span>
                  <i className={`fa-solid fa-chevron-down transition-transform ${expandedGroups['Overview'] ? '' : '-rotate-90'}`}></i>
               </button>
               {expandedGroups['Overview'] && (
                 <div className="space-y-1">
                    <SidebarItem tab="dashboard" icon="fa-chart-line" label="Dashboard" isActive={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
                    <SidebarItem tab="orders" icon="fa-cart-shopping" label="Orders" isActive={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
                    <SidebarItem tab="financials" icon="fa-sack-dollar" label="Financials" isActive={activeTab === 'financials'} onClick={() => setActiveTab('financials')} />
                 </div>
               )}
            </div>

            {/* Operations Group */}
            <div className="px-3 pt-4">
               <button onClick={() => toggleGroup('Operations')} className="flex items-center justify-between w-full text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 hover:text-white">
                  <span>Operations</span>
                  <i className={`fa-solid fa-chevron-down transition-transform ${expandedGroups['Operations'] ? '' : '-rotate-90'}`}></i>
               </button>
               {expandedGroups['Operations'] && (
                 <div className="space-y-1">
                    <SidebarItem tab="pos" icon="fa-cash-register" label="POS System" isActive={activeTab === 'pos'} onClick={() => setActiveTab('pos')} />
                    <SidebarItem tab="bookings" icon="fa-calendar-check" label="Bookings" isActive={activeTab === 'bookings'} onClick={() => setActiveTab('bookings')} />
                    <SidebarItem tab="vehicles" icon="fa-car" label="Fleet Management" isActive={activeTab === 'vehicles'} onClick={() => setActiveTab('vehicles')} />
                    <SidebarItem tab="maintenance" icon="fa-wrench" label="Maintenance" isActive={activeTab === 'maintenance'} onClick={() => setActiveTab('maintenance')} />
                    <SidebarItem tab="staff" icon="fa-users-gear" label="Staff" isActive={activeTab === 'staff'} onClick={() => setActiveTab('staff')} />
                 </div>
               )}
            </div>

            {/* Content Group */}
            <div className="px-3 pt-4">
               <button onClick={() => toggleGroup('Content')} className="flex items-center justify-between w-full text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 hover:text-white">
                  <span>Content</span>
                  <i className={`fa-solid fa-chevron-down transition-transform ${expandedGroups['Content'] ? '' : '-rotate-90'}`}></i>
               </button>
               {expandedGroups['Content'] && (
                 <div className="space-y-1">
                    <SidebarItem tab="products" icon="fa-box-open" label="Products" isActive={activeTab === 'products'} onClick={() => setActiveTab('products')} />
                    <SidebarItem tab="team" icon="fa-people-group" label="Team Management" isActive={activeTab === 'team'} onClick={() => setActiveTab('team')} />
                    <SidebarItem tab="customers" icon="fa-users" label="Customers" isActive={activeTab === 'customers'} onClick={() => setActiveTab('customers')} />
                    <SidebarItem tab="support" icon="fa-headset" label="Support Tickets" isActive={activeTab === 'support'} onClick={() => setActiveTab('support')} />
                    <SidebarItem tab="blog" icon="fa-pen-to-square" label="Blog Posts" isActive={activeTab === 'blog'} onClick={() => setActiveTab('blog')} />
                 </div>
               )}
            </div>

            {/* System Group */}
            <div className="px-3 pt-4">
               <button onClick={() => toggleGroup('System')} className="flex items-center justify-between w-full text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 hover:text-white">
                  <span>System</span>
                  <i className={`fa-solid fa-chevron-down transition-transform ${expandedGroups['System'] ? '' : '-rotate-90'}`}></i>
               </button>
               {expandedGroups['System'] && (
                 <div className="space-y-1">
                    <SidebarItem tab="compliance" icon="fa-file-shield" label="Compliance" isActive={activeTab === 'compliance'} onClick={() => setActiveTab('compliance')} />
                    <SidebarItem tab="notifications" icon="fa-bell" label="Notifications" isActive={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} />
                    <SidebarItem tab="reports" icon="fa-file-lines" label="Reports" isActive={activeTab === 'reports'} onClick={() => setActiveTab('reports')} />
                    <SidebarItem tab="settings" icon="fa-gear" label="Settings" isActive={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
                 </div>
               )}
            </div>
         </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-brand-black p-8">
         {renderContent()}
      </main>
    </div>
  );
}