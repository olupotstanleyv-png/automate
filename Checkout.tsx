
import React, { useState } from 'react';
import { useCart, useOrders } from './store';
import { PageView, DeliveryMethod, PaymentMethodType, Order } from './types';

interface CheckoutProps {
  setPage: (page: PageView) => void;
  setLastOrder: (order: Order) => void;
}

export default function Checkout({ setPage, setLastOrder }: CheckoutProps) {
  const { cart, cartTotal, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Info, 2: Payment, 3: Success logic handled by parent
  const [loading, setLoading] = useState(false);
  const [processingStage, setProcessingStage] = useState(''); // Text for simulation stages

  // Form State
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('Shipping');
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '' });
  const [address, setAddress] = useState({ street: '', city: '', state: '', zip: '' });
  const [pickupTime, setPickupTime] = useState('');
  const [pickupBranch, setPickupBranch] = useState('Silicon Valley Main Hub');
  const [tableNumber, setTableNumber] = useState('');
  
  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('Credit Card');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '', name: '' });
  const [mobileMoney, setMobileMoney] = useState({ provider: 'MTN Mobile Money', number: '' });
  const [bankDetails, setBankDetails] = useState({ type: 'ACH', bankName: '', accountNo: '' });
  const [isPlaidConnected, setIsPlaidConnected] = useState(false);

  // Calculations
  const tax = cartTotal * 0.1; // 10% Tax
  const deliveryFee = deliveryMethod === 'Shipping' ? 25 : 0;
  const serviceCharge = deliveryMethod === 'DineIn' ? 15 : 0;
  const total = cartTotal + tax + deliveryFee + serviceCharge;

  const handlePlaceOrder = async () => {
    setLoading(true);
    let provider = '';

    // --- SIMULATE PAYMENT WORKFLOWS ---

    // A) Credit Card Flow
    if (paymentMethod === 'Credit Card') {
        provider = 'Visa'; // Mock detection
        setProcessingStage('Authenticating...');
        await new Promise(r => setTimeout(r, 1000));
        setProcessingStage('Verifying 3D Secure (OTP)...');
        await new Promise(r => setTimeout(r, 1500));
        setProcessingStage('Capturing Payment...');
        await new Promise(r => setTimeout(r, 1000));
    }

    // B) Mobile Money Flow
    else if (paymentMethod === 'Mobile Money') {
        provider = mobileMoney.provider;
        setProcessingStage(`Sending request to ${mobileMoney.provider}...`);
        await new Promise(r => setTimeout(r, 1000));
        setProcessingStage('Waiting for PIN approval on your phone...');
        // Simulate waiting for user to enter PIN on phone
        await new Promise(r => setTimeout(r, 2500));
        setProcessingStage('Transaction Approved!');
        await new Promise(r => setTimeout(r, 1000));
    }

    // C) Bank Account Flow
    else if (paymentMethod === 'Bank Transfer' || paymentMethod === 'EFT') {
        provider = isPlaidConnected ? 'Plaid Connected Bank' : `${bankDetails.type} - ${bankDetails.bankName}`;
        setProcessingStage('Connecting to Bank...');
        await new Promise(r => setTimeout(r, 1500));
        setProcessingStage('Verifying Account Balance...');
        await new Promise(r => setTimeout(r, 1500));
        if (bankDetails.type === 'ACH' || bankDetails.type === 'Direct Debit') {
            setProcessingStage('Payment Scheduled (Pending Settlement)');
        } else {
            setProcessingStage('Instant Transfer Successful');
        }
        await new Promise(r => setTimeout(r, 1000));
    }

    // D) PayPal Flow
    else if (paymentMethod === 'PayPal') {
        provider = 'PayPal';
        setProcessingStage('Creating PayPal Order (API)...');
        await new Promise(r => setTimeout(r, 1000));
        setProcessingStage('Redirecting to PayPal Secure...');
        await new Promise(r => setTimeout(r, 1500));
        setProcessingStage('Authenticating Payer...');
        await new Promise(r => setTimeout(r, 1000));
        setProcessingStage('Capturing Funds (Server-side)...');
        await new Promise(r => setTimeout(r, 1000));
    }

    // E) Offline Methods
    else {
        setProcessingStage('Finalizing Order...');
        await new Promise(r => setTimeout(r, 1000));
    }

    // Determine Payment Status based on method
    let payStatus: 'Paid' | 'Pending' = 'Paid';
    if (paymentMethod === 'COD' || paymentMethod === 'PayOnPickup') {
      payStatus = 'Pending';
    }
    // ACH usually takes days
    if ((paymentMethod === 'Bank Transfer' || paymentMethod === 'EFT') && bankDetails.type === 'Direct Debit') {
        payStatus = 'Pending';
    }

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      items: cart,
      subtotal: cartTotal,
      tax,
      deliveryFee,
      serviceCharge,
      total,
      deliveryMethod,
      shippingAddress: deliveryMethod === 'Shipping' ? address : undefined,
      pickupLocation: deliveryMethod === 'Pickup' ? pickupBranch : undefined,
      pickupTime: deliveryMethod === 'Pickup' ? pickupTime : undefined,
      tableNumber: deliveryMethod === 'DineIn' ? tableNumber : undefined,
      paymentMethod,
      paymentProvider: provider,
      paymentStatus: payStatus,
      status: deliveryMethod === 'DineIn' ? 'Confirmed' : 'Placed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    addOrder(newOrder);
    setLastOrder(newOrder);
    clearCart();
    setLoading(false);
    setPage('order-success');
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center animate-fade-in">
        <h2 className="text-2xl font-bold text-white">Cart is empty</h2>
        <button onClick={() => setPage('shop')} className="text-brand-gold mt-4 underline">Go to Shop</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in max-w-4xl">
      <h1 className="text-3xl font-bold text-white mb-8 border-l-4 border-brand-gold pl-4">Checkout</h1>

      {/* Steps Indicator */}
      <div className="flex items-center justify-center mb-10">
         <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-brand-gold text-brand-black' : 'bg-brand-surface text-gray-500'}`}>1</div>
         <div className={`w-20 h-1 ${step >= 2 ? 'bg-brand-gold' : 'bg-brand-surface'}`}></div>
         <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-brand-gold text-brand-black' : 'bg-brand-surface text-gray-500'}`}>2</div>
         <div className={`w-20 h-1 ${step >= 3 ? 'bg-brand-gold' : 'bg-brand-surface'}`}></div>
         <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 3 ? 'bg-brand-gold text-brand-black' : 'bg-brand-surface text-gray-500'}`}>3</div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Left Column: Form Steps */}
        <div className="md:col-span-2 space-y-6">
          
          {/* STEP 1: Delivery & Info */}
          {step === 1 && (
            <div className="bg-brand-surface p-6 rounded-xl border border-white/5 animate-fade-in">
              <h2 className="text-xl font-bold text-white mb-6">Delivery Method</h2>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                {['Shipping', 'Pickup', 'DineIn'].map((m) => (
                  <button
                    key={m}
                    onClick={() => setDeliveryMethod(m as DeliveryMethod)}
                    className={`p-4 rounded-lg border flex flex-col items-center gap-2 transition-all ${
                      deliveryMethod === m 
                      ? 'bg-brand-gold text-brand-black border-brand-gold' 
                      : 'bg-brand-dark text-gray-400 border-white/10 hover:border-brand-gold/50'
                    }`}
                  >
                    <i className={`fa-solid text-xl ${
                      m === 'Shipping' ? 'fa-truck' : 
                      m === 'Pickup' ? 'fa-shop' : 'fa-utensils'
                    }`}></i>
                    <span className="font-bold text-sm">{m === 'DineIn' ? 'Dine-In' : m}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-white font-bold border-b border-white/5 pb-2 mb-4">Contact Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Full Name" value={customer.name} onChange={e => setCustomer({...customer, name: e.target.value})} className="bg-brand-dark p-3 rounded border border-white/10 text-white focus:border-brand-gold focus:outline-none" />
                  <input type="email" placeholder="Email" value={customer.email} onChange={e => setCustomer({...customer, email: e.target.value})} className="bg-brand-dark p-3 rounded border border-white/10 text-white focus:border-brand-gold focus:outline-none" />
                  <input type="tel" placeholder="Phone" value={customer.phone} onChange={e => setCustomer({...customer, phone: e.target.value})} className="bg-brand-dark p-3 rounded border border-white/10 text-white focus:border-brand-gold focus:outline-none" />
                </div>

                {deliveryMethod === 'Shipping' && (
                  <>
                     <h3 className="text-white font-bold border-b border-white/5 pb-2 mb-4 mt-6">Shipping Address</h3>
                     <div className="space-y-4">
                        <input type="text" placeholder="Street Address" value={address.street} onChange={e => setAddress({...address, street: e.target.value})} className="w-full bg-brand-dark p-3 rounded border border-white/10 text-white focus:border-brand-gold focus:outline-none" />
                        <div className="grid grid-cols-3 gap-4">
                           <input type="text" placeholder="City" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} className="bg-brand-dark p-3 rounded border border-white/10 text-white focus:border-brand-gold focus:outline-none" />
                           <input type="text" placeholder="State" value={address.state} onChange={e => setAddress({...address, state: e.target.value})} className="bg-brand-dark p-3 rounded border border-white/10 text-white focus:border-brand-gold focus:outline-none" />
                           <input type="text" placeholder="ZIP Code" value={address.zip} onChange={e => setAddress({...address, zip: e.target.value})} className="bg-brand-dark p-3 rounded border border-white/10 text-white focus:border-brand-gold focus:outline-none" />
                        </div>
                     </div>
                  </>
                )}

                {deliveryMethod === 'Pickup' && (
                   <>
                      <h3 className="text-white font-bold border-b border-white/5 pb-2 mb-4 mt-6">Pickup Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <select value={pickupBranch} onChange={e => setPickupBranch(e.target.value)} className="bg-brand-dark p-3 rounded border border-white/10 text-white focus:border-brand-gold focus:outline-none">
                            <option>Silicon Valley Main Hub</option>
                            <option>LA Downtown Branch</option>
                            <option>Texas Service Center</option>
                         </select>
                         <input type="datetime-local" value={pickupTime} onChange={e => setPickupTime(e.target.value)} className="bg-brand-dark p-3 rounded border border-white/10 text-white focus:border-brand-gold focus:outline-none" />
                      </div>
                   </>
                )}

                {deliveryMethod === 'DineIn' && (
                   <>
                      <h3 className="text-white font-bold border-b border-white/5 pb-2 mb-4 mt-6">Dine-In Details</h3>
                      <input type="text" placeholder="Table Number (Scan QR)" value={tableNumber} onChange={e => setTableNumber(e.target.value)} className="w-full bg-brand-dark p-3 rounded border border-white/10 text-white focus:border-brand-gold focus:outline-none" />
                      <p className="text-xs text-gray-500">Service Charge applies for Lounge Dine-in service.</p>
                   </>
                )}

                <div className="flex justify-end mt-8">
                  <button 
                    onClick={() => setStep(2)}
                    className="bg-brand-gold text-brand-black font-bold py-3 px-8 rounded hover:bg-brand-gold-light transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Payment */}
          {step === 2 && (
             <div className="bg-brand-surface p-6 rounded-xl border border-white/5 animate-fade-in">
                <h2 className="text-xl font-bold text-white mb-6">Payment Method</h2>
                
                <div className="grid grid-cols-2 gap-3 mb-8">
                   {[
                      { id: 'Credit Card', icon: 'fa-credit-card', label: 'Card' },
                      { id: 'Mobile Money', icon: 'fa-mobile-screen', label: 'Mobile Money' },
                      { id: 'Bank Transfer', icon: 'fa-building-columns', label: 'Bank / ACH' },
                      { id: 'PayPal', icon: 'fa-paypal', label: 'PayPal' },
                   ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setPaymentMethod(opt.id as PaymentMethodType)}
                        className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all ${
                           paymentMethod === opt.id 
                           ? 'bg-brand-gold/10 border-brand-gold text-brand-gold' 
                           : 'bg-brand-dark border-white/5 text-gray-400 hover:bg-white/5'
                        }`}
                      >
                         <i className={`fa-brands ${opt.icon.startsWith('fa-') ? '' : 'fa-solid'} ${opt.icon} text-2xl mb-2`}></i>
                         <span className="font-bold text-sm">{opt.label}</span>
                      </button>
                   ))}
                </div>

                {/* 1. CREDIT CARD FORM */}
                {paymentMethod === 'Credit Card' && (
                   <div className="bg-brand-dark p-6 rounded-lg border border-white/10 mb-6 animate-fade-in">
                      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                         <i className="fa-solid fa-credit-card text-brand-gold"></i> Enter Card Details
                      </h3>
                      <div className="mb-4">
                         <label className="block text-xs text-gray-500 uppercase mb-1">Card Number</label>
                         <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-brand-surface p-3 rounded border border-white/10 text-white focus:border-brand-gold focus:outline-none" />
                         <div className="flex gap-2 mt-2">
                            <i className="fa-brands fa-cc-visa text-2xl text-white"></i>
                            <i className="fa-brands fa-cc-mastercard text-2xl text-white"></i>
                            <i className="fa-brands fa-cc-amex text-2xl text-white"></i>
                         </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-xs text-gray-500 uppercase mb-1">Expiry</label>
                            <input type="text" placeholder="MM/YY" className="w-full bg-brand-surface p-3 rounded border border-white/10 text-white focus:border-brand-gold focus:outline-none" />
                         </div>
                         <div>
                            <label className="block text-xs text-gray-500 uppercase mb-1">CVV</label>
                            <input type="text" placeholder="123" className="w-full bg-brand-surface p-3 rounded border border-white/10 text-white focus:border-brand-gold focus:outline-none" />
                         </div>
                      </div>
                      <div className="mt-4 flex items-center text-xs text-gray-400 gap-2">
                          <i className="fa-solid fa-lock text-green-500"></i> Payments are secured with 256-bit encryption and 3D Secure.
                      </div>
                   </div>
                )}

                {/* 2. MOBILE MONEY FORM */}
                {paymentMethod === 'Mobile Money' && (
                    <div className="bg-brand-dark p-6 rounded-lg border border-white/10 mb-6 animate-fade-in">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                             <i className="fa-solid fa-mobile-screen text-brand-gold"></i> Mobile Money
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs text-gray-500 uppercase mb-1">Select Provider</label>
                                <select 
                                    value={mobileMoney.provider} 
                                    onChange={e => setMobileMoney({...mobileMoney, provider: e.target.value})}
                                    className="w-full bg-brand-surface p-3 rounded border border-white/10 text-white focus:border-brand-gold focus:outline-none"
                                >
                                    <option value="MTN Mobile Money">MTN Mobile Money</option>
                                    <option value="Airtel Money">Airtel Money</option>
                                    <option value="M-Pesa">M-Pesa</option>
                                    <option value="Vodafone Cash">Vodafone Cash</option>
                                    <option value="Tigo">Tigo</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 uppercase mb-1">Phone Number</label>
                                <input 
                                    type="tel" 
                                    placeholder="+1 234 567 890" 
                                    value={mobileMoney.number}
                                    onChange={e => setMobileMoney({...mobileMoney, number: e.target.value})}
                                    className="w-full bg-brand-surface p-3 rounded border border-white/10 text-white focus:border-brand-gold focus:outline-none" 
                                />
                            </div>
                            <div className="bg-brand-surface p-3 rounded border border-white/5 text-xs text-gray-400">
                                <i className="fa-solid fa-circle-info mr-2"></i> You will receive a prompt (STK Push) on your phone to enter your PIN.
                            </div>
                        </div>
                    </div>
                )}

                {/* 3. BANK TRANSFER FORM */}
                {(paymentMethod === 'Bank Transfer' || paymentMethod === 'EFT') && (
                    <div className="bg-brand-dark p-6 rounded-lg border border-white/10 mb-6 animate-fade-in">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                             <i className="fa-solid fa-building-columns text-brand-gold"></i> Bank Transfer / EFT
                        </h3>
                        
                        <div className="flex gap-4 mb-4">
                             {['ACH', 'SEPA', 'EFT'].map(t => (
                                 <button 
                                     key={t}
                                     onClick={() => setBankDetails({...bankDetails, type: t})}
                                     className={`flex-1 py-2 rounded text-xs font-bold border ${bankDetails.type === t ? 'bg-white text-black border-white' : 'bg-transparent text-gray-500 border-gray-700'}`}
                                 >
                                     {t}
                                 </button>
                             ))}
                        </div>

                        {!isPlaidConnected ? (
                            <div className="text-center py-6">
                                <button 
                                    onClick={() => { setLoading(true); setTimeout(() => { setIsPlaidConnected(true); setLoading(false); }, 1500); }}
                                    className="bg-brand-surface hover:bg-white/10 text-white font-bold py-3 px-6 rounded-lg border border-white/20 transition-all w-full flex items-center justify-center gap-2"
                                >
                                    {loading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <i className="fa-solid fa-link"></i>}
                                    Connect Bank Account (Plaid)
                                </button>
                                <p className="text-xs text-gray-500 mt-2">Securely link your account via Plaid</p>
                            </div>
                        ) : (
                             <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg flex justify-between items-center">
                                 <div className="flex items-center gap-3">
                                     <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-black"><i className="fa-solid fa-check"></i></div>
                                     <div>
                                         <div className="text-white font-bold">Chase Checking (...8841)</div>
                                         <div className="text-xs text-green-500">Connected & Verified</div>
                                     </div>
                                 </div>
                                 <button onClick={() => setIsPlaidConnected(false)} className="text-xs text-red-500 hover:underline">Disconnect</button>
                             </div>
                        )}
                    </div>
                )}

                {/* 4. PAYPAL FORM */}
                {paymentMethod === 'PayPal' && (
                     <div className="bg-brand-dark p-6 rounded-lg border border-white/10 mb-6 animate-fade-in text-center">
                        <i className="fa-brands fa-paypal text-5xl text-blue-500 mb-4"></i>
                        <p className="text-gray-300 mb-6">You will be redirected to PayPal to complete your purchase securely. You can pay with Balance, Card, or Pay Later.</p>
                        <button className="bg-[#FFC439] hover:bg-[#F4BB37] text-black font-bold py-3 px-8 rounded-full w-full flex items-center justify-center gap-2">
                             <span className="italic font-serif font-black">Pay</span>Pal
                        </button>
                     </div>
                )}


                <div className="flex justify-between mt-8">
                   <button onClick={() => setStep(1)} className="text-gray-400 hover:text-white">Back</button>
                   <button 
                     onClick={handlePlaceOrder}
                     disabled={loading}
                     className="bg-brand-gold text-brand-black font-bold py-3 px-8 rounded hover:bg-brand-gold-light transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed w-full md:w-auto justify-center"
                   >
                     {loading && <i className="fa-solid fa-circle-notch fa-spin"></i>}
                     {loading ? (processingStage || 'Processing...') : `Pay $${total.toLocaleString()}`}
                   </button>
                </div>
             </div>
          )}

        </div>

        {/* Right Column: Order Summary */}
        <div className="md:col-span-1">
           <div className="bg-brand-surface p-6 rounded-xl border border-white/5 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
              <div className="space-y-4 max-h-60 overflow-y-auto custom-scrollbar mb-4">
                 {cart.map(item => (
                    <div key={item.id} className="flex gap-3 text-sm">
                       <div className="w-12 h-12 bg-brand-dark rounded shrink-0">
                          <img src={item.image} className="w-full h-full object-cover rounded" alt="" />
                       </div>
                       <div className="flex-1">
                          <div className="text-white font-bold">{item.name}</div>
                          <div className="text-gray-500">x{item.quantity}</div>
                       </div>
                       <div className="text-gray-300 font-mono">${(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                 ))}
              </div>
              
              <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
                 <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>${cartTotal.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-gray-400">
                    <span>Tax (10%)</span>
                    <span>${tax.toLocaleString()}</span>
                 </div>
                 {deliveryFee > 0 && (
                    <div className="flex justify-between text-gray-400">
                       <span>Delivery Fee</span>
                       <span>${deliveryFee.toLocaleString()}</span>
                    </div>
                 )}
                 {serviceCharge > 0 && (
                    <div className="flex justify-between text-gray-400">
                       <span>Service Charge</span>
                       <span>${serviceCharge.toLocaleString()}</span>
                    </div>
                 )}
                 <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-white/10 mt-2">
                    <span>Total</span>
                    <span>${total.toLocaleString()}</span>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}

export function OrderSuccess({ order, setPage }: { order: Order | null, setPage: (p: PageView) => void }) {
  if (!order) return <div className="text-center p-20 text-white">No order details found.</div>;

  return (
    <div className="container mx-auto px-4 py-20 animate-fade-in max-w-2xl text-center">
       <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-4xl text-black mx-auto mb-6 shadow-lg shadow-green-500/20">
          <i className="fa-solid fa-check"></i>
       </div>
       <h1 className="text-4xl font-bold text-white mb-2">Order Confirmed!</h1>
       <p className="text-gray-400 mb-8">Thank you for your purchase. Your order ID is <span className="text-brand-gold font-mono">{order.id}</span>.</p>

       <div className="bg-brand-surface p-8 rounded-xl border border-white/5 text-left mb-8">
          <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/5">
             <div>
                <div className="text-xs text-gray-500 uppercase">Total Amount</div>
                <div className="text-2xl font-bold text-white">${order.total.toLocaleString()}</div>
             </div>
             <div>
                <div className="text-xs text-gray-500 uppercase text-right">Payment Status</div>
                <div className="text-green-500 font-bold text-right">{order.paymentStatus}</div>
                {order.paymentProvider && <div className="text-xs text-gray-400 text-right mt-1">via {order.paymentProvider}</div>}
             </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 mb-6">
             <div>
                <h4 className="text-sm font-bold text-white mb-2">Delivery Details</h4>
                <div className="text-sm text-gray-400">
                   <div className="font-bold text-brand-gold mb-1">{order.deliveryMethod}</div>
                   {order.shippingAddress && (
                      <p>{order.shippingAddress.street}, {order.shippingAddress.city}</p>
                   )}
                   {order.pickupLocation && (
                      <p>Pick up at: {order.pickupLocation}</p>
                   )}
                   {order.tableNumber && (
                      <p>Dine-in: {order.tableNumber}</p>
                   )}
                </div>
             </div>
             <div>
                <h4 className="text-sm font-bold text-white mb-2">What's Next?</h4>
                <p className="text-sm text-gray-400">
                   {order.deliveryMethod === 'Shipping' ? (
                       order.trackingNumber ? <span>Tracking #: <span className="font-mono text-brand-gold">{order.trackingNumber}</span></span> : 'You will receive a tracking number once shipped.'
                   ) : 
                    order.deliveryMethod === 'Pickup' ? 'We will notify you when your order is ready for pickup.' :
                    'Your order has been sent to the kitchen.'}
                </p>
             </div>
          </div>
          
          <button className="w-full py-3 border border-white/10 rounded hover:bg-white/5 text-gray-300 transition-colors flex items-center justify-center gap-2">
             <i className="fa-solid fa-file-arrow-down"></i> Download Invoice
          </button>
       </div>

       <button onClick={() => setPage('shop')} className="bg-brand-gold text-brand-black font-bold py-3 px-8 rounded hover:bg-brand-gold-light transition-colors">
          Continue Shopping
       </button>
    </div>
  );
}
