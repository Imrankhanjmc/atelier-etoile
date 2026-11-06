import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Package, MapPin, Ruler, LogOut, ArrowRight, ExternalLink } from 'lucide-react';
import { orderService } from '../services/orderService';
import { formatPrice } from '../utils/currency';
import Breadcrumb from '../components/common/Breadcrumb';

export const AccountPage = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState({ name: 'Vikramaditya S.', email: 'patron@atelieroile.com' });
  const [activeTab, setActiveTab] = useState('orders');
  const navigate = useNavigate();

  useEffect(() => {
    orderService.getOrderHistory().then(setOrders);
    const savedUser = localStorage.getItem('atelier_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {}
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('atelier_token');
    localStorage.removeItem('atelier_user');
    navigate('/login');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumb items={[{ label: 'Client Account' }]} />

      {/* Account Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-stone-900 text-white flex items-center justify-center font-serif text-xl">
            {user.name.charAt(0)}
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-mono block">
              Patron Profile
            </span>
            <h1 className="font-serif text-2xl text-stone-900 font-medium">
              {user.name}
            </h1>
            <p className="text-xs text-stone-500 font-mono">{user.email}</p>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="inline-flex items-center gap-1.5 px-4 py-2 border border-stone-300 text-stone-700 hover:text-stone-950 text-xs font-semibold uppercase tracking-wider self-start sm:self-auto hover:bg-stone-50 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" /> Sign Out
        </button>
      </div>

      {/* Account Navigation Tabs */}
      <div className="flex border-b border-stone-200 gap-6 text-xs uppercase tracking-wider font-semibold">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 border-b-2 -mb-px transition-colors ${
            activeTab === 'orders' ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-400 hover:text-stone-700'
          }`}
        >
          Orders & Dispatches ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-3 border-b-2 -mb-px transition-colors ${
            activeTab === 'addresses' ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-400 hover:text-stone-700'
          }`}
        >
          Saved Addresses
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 border-b-2 -mb-px transition-colors ${
            activeTab === 'profile' ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-400 hover:text-stone-700'
          }`}
        >
          Tailoring Preferences
        </button>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="py-16 text-center bg-stone-50 border border-stone-200 p-8 space-y-3">
                <Package className="w-10 h-10 text-stone-400 mx-auto" />
                <h3 className="font-serif text-lg text-stone-800">No Dispatches on File</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  When you acquire pieces from our collections, your simulated order tracking details will be archived here.
                </p>
                <Link
                  to="/shop"
                  className="inline-block mt-2 px-6 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-wider font-semibold"
                >
                  Explore Collections
                </Link>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.orderId} className="border border-stone-200 bg-white p-6 space-y-4 shadow-2xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-100 gap-2 text-xs">
                    <div>
                      <span className="text-stone-400 block font-mono text-[11px]">
                        ORDER PLACED: {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                      <strong className="font-serif text-base text-stone-900">
                        {order.orderId}
                      </strong>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 font-mono text-[11px] border border-emerald-200 font-medium inline-block">
                        {order.status}
                      </span>
                      <p className="text-stone-500 text-[11px] mt-0.5">{order.deliveryEstimate}</p>
                    </div>
                  </div>

                  <div className="divide-y divide-stone-100">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex gap-4 py-2 first:pt-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-16 object-cover bg-stone-100 shrink-0"
                        />
                        <div className="flex-1 min-w-0 text-xs">
                          <h4 className="font-medium text-stone-900 truncate">{item.name}</h4>
                          <p className="text-stone-500 text-[11px]">
                            Size: {item.size} · Color: {item.color} · Qty: {item.quantity}
                          </p>
                          <span className="font-mono text-stone-900 tabular-nums">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-500">
                      Total: <strong className="font-mono text-stone-900 font-semibold">{formatPrice(order.pricing?.grandTotal)}</strong>
                    </span>
                    <Link
                      to={`/order-success/${order.orderId}`}
                      state={{ order }}
                      className="text-stone-900 font-semibold hover:underline flex items-center gap-1"
                    >
                      View Receipt <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-6 border border-stone-200 bg-white space-y-3 relative">
              <span className="px-2 py-0.5 bg-stone-100 text-stone-700 text-[10px] uppercase font-mono font-semibold">
                Primary Residence
              </span>
              <div className="text-stone-700 space-y-1">
                <h4 className="font-semibold text-stone-900 text-sm">{user.name}</h4>
                <p>Apartment 14B, Palais Towers, Altamount Road</p>
                <p>Mumbai, Maharashtra - 400026</p>
                <p className="font-mono text-stone-500">+91 98200 12345</p>
              </div>
            </div>

            <div className="p-6 border border-stone-200 bg-white space-y-3">
              <span className="px-2 py-0.5 bg-stone-100 text-stone-700 text-[10px] uppercase font-mono font-semibold">
                Secondary Studio / Office
              </span>
              <div className="text-stone-700 space-y-1">
                <h4 className="font-semibold text-stone-900 text-sm">{user.name}</h4>
                <p>Suite 401, The Mill Atelier Compound, Lower Parel</p>
                <p>Mumbai, Maharashtra - 400013</p>
                <p className="font-mono text-stone-500">+91 98200 12345</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="border border-stone-200 bg-white p-6 space-y-4 max-w-xl text-xs text-stone-700">
            <h3 className="font-serif text-lg text-stone-900 pb-2 border-b border-stone-100">
              Personal Sizing Preferences
            </h3>
            <p className="text-stone-500">
              Stored metrics allow our stylists to pre-filter your recommended silhouettes across tailored shirts, suits, and footwear.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2 font-mono">
              <div className="p-3 bg-stone-50 border border-stone-200">
                <span className="text-[10px] text-stone-400 uppercase block font-sans">Chest / Bust</span>
                <strong className="text-sm text-stone-900">38 in / 96 cm</strong>
              </div>
              <div className="p-3 bg-stone-50 border border-stone-200">
                <span className="text-[10px] text-stone-400 uppercase block font-sans">Waist</span>
                <strong className="text-sm text-stone-900">32 in / 81 cm</strong>
              </div>
              <div className="p-3 bg-stone-50 border border-stone-200">
                <span className="text-[10px] text-stone-400 uppercase block font-sans">Shoe Size</span>
                <strong className="text-sm text-stone-900">EU 42 / UK 8</strong>
              </div>
              <div className="p-3 bg-stone-50 border border-stone-200">
                <span className="text-[10px] text-stone-400 uppercase block font-sans">Shirt Collar</span>
                <strong className="text-sm text-stone-900">40 cm (15.7 in)</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
