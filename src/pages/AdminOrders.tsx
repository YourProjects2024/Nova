import React, { useEffect, useMemo, useState } from 'react';
import { Lock, LogOut, RefreshCw, Save, Search, ShieldCheck, ShoppingBag } from 'lucide-react';
import { fetchOrders, OrderRecord, OrderStatus, updateOrder } from '../lib/orders';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

const ORDER_STATUSES: OrderStatus[] = ['paid', 'processing', 'shipped', 'delivered', 'cancelled'];

export const AdminOrders: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingOrderId, setSavingOrderId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState('');

  const filteredOrders = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return orders;

    return orders.filter((order) => {
      const customerName = `${order.customer.firstName} ${order.customer.lastName}`.toLowerCase();
      return (
        order.order_id.toLowerCase().includes(term) ||
        order.payment_id.toLowerCase().includes(term) ||
        customerName.includes(term) ||
        order.customer.email.toLowerCase().includes(term) ||
        order.customer.phone.includes(term)
      );
    });
  }, [orders, query]);

  const loadOrders = async () => {
    setLoading(true);
    setMessage('');
    const { data, error } = await fetchOrders();
    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setOrders((data as OrderRecord[]) || []);
  };

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => {
      const loggedIn = Boolean(data.session);
      setIsAuthenticated(loggedIn);
      if (loggedIn) loadOrders();
    });
  }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!supabase) return;

    setLoading(true);
    setMessage('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setIsAuthenticated(true);
    loadOrders();
  };

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setOrders([]);
  };

  const handleOrderChange = (id: string, updates: Partial<Pick<OrderRecord, 'status' | 'notes'>>) => {
    setOrders((current) =>
      current.map((order) => (order.id === id ? { ...order, ...updates } : order))
    );
  };

  const handleSaveOrder = async (order: OrderRecord) => {
    setSavingOrderId(order.id);
    setMessage('');
    const { error } = await updateOrder(order.id, {
      status: order.status,
      notes: order.notes,
    });
    setSavingOrderId(null);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(`Updated ${order.order_id}`);
    loadOrders();
  };

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-cream-50 px-4 py-16">
        <div className="max-w-xl mx-auto bg-white border border-sage-100 rounded-2xl p-8 text-center space-y-4">
          <Lock className="w-10 h-10 text-sage-600 mx-auto" />
          <h1 className="font-serif text-2xl font-bold text-sage-800">Supabase is not configured</h1>
          <p className="text-sm text-sage-600">
            Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to your environment before using the admin panel.
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream-50 px-4 py-16 flex items-center justify-center">
        <form onSubmit={handleLogin} className="w-full max-w-md bg-white border border-sage-100 rounded-2xl p-8 shadow-xs space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-sage-100 border border-sage-200 flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7 text-sage-700" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-sage-800">Admin Login</h1>
            <p className="text-xs text-sage-500">Sign in with your Supabase admin user.</p>
          </div>

          {message && (
            <div className="bg-rose-50 border border-rose-100 text-rose-700 rounded-xl p-3 text-xs">
              {message}
            </div>
          )}

          <div className="space-y-3">
            <input
              type="email"
              required
              placeholder="Admin email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full border border-sage-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-sage-500"
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full border border-sage-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-sage-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sage-700 hover:bg-sage-800 disabled:opacity-60 text-cream-50 rounded-xl px-5 py-3 font-bold text-sm transition-colors cursor-pointer"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <p className="text-gold-600 font-semibold tracking-widest text-xs uppercase">NEVA Admin</p>
            <h1 className="font-serif text-3xl font-bold text-sage-800">Orders</h1>
            <p className="text-sm text-sage-500">View customer details, payment IDs, products, and update fulfillment status.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={loadOrders}
              className="bg-white border border-sage-200 text-sage-800 rounded-xl px-4 py-2.5 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-sage-50 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="bg-sage-800 text-cream-50 rounded-xl px-4 py-2.5 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-sage-900 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white border border-sage-100 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-sage-400 absolute left-3 top-3.5" />
            <input
              type="search"
              placeholder="Search order, payment, customer, email, phone..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full border border-sage-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-sage-500"
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-sage-500">
            <ShoppingBag className="w-4 h-4 text-sage-600" />
            <span>{filteredOrders.length} orders shown</span>
          </div>
        </div>

        {message && (
          <div className="bg-sage-100 border border-sage-200 text-sage-800 rounded-xl p-3 text-sm">
            {message}
          </div>
        )}

        {loading ? (
          <div className="bg-white border border-sage-100 rounded-2xl p-10 text-center text-sage-500">
            Loading orders...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white border border-sage-100 rounded-2xl p-10 text-center space-y-2">
            <ShieldCheck className="w-10 h-10 text-sage-500 mx-auto" />
            <h2 className="font-serif text-xl font-bold text-sage-800">No orders found</h2>
            <p className="text-sm text-sage-500">New paid orders will appear here after checkout.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredOrders.map((order) => (
              <article key={order.id} className="bg-white border border-sage-100 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
                <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-5">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-serif text-xl font-bold text-sage-800">{order.order_id}</h2>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-gold-50 text-gold-700 border border-gold-100 px-2 py-1 rounded-full">
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-sage-500">
                      Payment: <span className="font-mono">{order.payment_id}</span>
                    </p>
                    <p className="text-xs text-sage-500">
                      Created: {new Date(order.created_at).toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 xl:min-w-[520px]">
                    <select
                      value={order.status}
                      onChange={(event) => handleOrderChange(order.id, { status: event.target.value as OrderStatus })}
                      className="border border-sage-200 rounded-xl px-3 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-sage-500 bg-white"
                    >
                      {ORDER_STATUSES.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Admin note"
                      value={order.notes ?? ''}
                      onChange={(event) => handleOrderChange(order.id, { notes: event.target.value })}
                      className="sm:col-span-2 border border-sage-200 rounded-xl px-3 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-sage-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleSaveOrder(order)}
                      disabled={savingOrderId === order.id}
                      className="sm:col-span-3 bg-sage-700 hover:bg-sage-800 disabled:opacity-60 text-cream-50 rounded-xl px-4 py-2.5 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      {savingOrderId === order.id ? 'Saving...' : 'Save Update'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-sm">
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-sage-400 uppercase tracking-wider">Customer</h3>
                    <p className="font-semibold text-sage-800">{order.customer.firstName} {order.customer.lastName}</p>
                    <p className="text-sage-600">{order.customer.email}</p>
                    <p className="text-sage-600">+91 {order.customer.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-sage-400 uppercase tracking-wider">Shipping</h3>
                    <p className="text-sage-600 leading-relaxed">
                      {order.customer.address}, {order.customer.city}, {order.customer.state} - {order.customer.zipCode}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-sage-400 uppercase tracking-wider">Total</h3>
                    <p className="font-bold text-sage-800 text-lg">₹{order.total}</p>
                    <p className="text-xs text-sage-500">Subtotal ₹{order.subtotal} + Shipping ₹{order.shipping_fee}</p>
                  </div>
                </div>

                <div className="border-t border-sage-100 pt-4 space-y-2">
                  <h3 className="text-xs font-bold text-sage-400 uppercase tracking-wider">Products</h3>
                  {order.items.map((item) => (
                    <div key={`${order.id}-${item.product.id}`} className="flex items-center justify-between gap-4 text-sm">
                      <div>
                        <p className="font-semibold text-sage-800">{item.product.name}</p>
                        <p className="text-xs text-sage-500">Qty {item.quantity} • {item.product.weight}</p>
                      </div>
                      <p className="font-bold text-sage-800">₹{item.product.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
