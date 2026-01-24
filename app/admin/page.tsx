"use client";
import { useEffect, useState, useCallback } from "react";
import {
  fetchAdminOrders,
  updateOrderStatus,
  adminLogin,
  OrderResponse,
} from "@/app/lib/api";
import {
  X,
  LayoutDashboard,
  Package,
  LogOut,
  RefreshCw,
  Eye,
  CheckCircle,
  Truck,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(
    null,
  );

  const loadOrders = useCallback(async () => {
    const data = await fetchAdminOrders();
    setOrders(data);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isAuthenticated) loadOrders();
  }, [isAuthenticated, loadOrders]);

  const handleLogin = async () => {
    const res = await adminLogin(password);
    if (res.success) setIsAuthenticated(true);
    else toast.error("Invalid Credentials");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mb-5">
        <div className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/20 shadow-2xl w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="text-center mb-5">
            <div className="bg-(--prim-color) w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-lg shadow-(--prim-color)/40">
              <LayoutDashboard className="text-white" size={32} />
            </div>
            <h2 className="text-3xl font-black text-(--prim-color) Unbounded uppercase tracking-tighter">
              {" "}
              Steve O HQ
            </h2>
            <p className="mt-2 font-black Unbounded">
              Secure administrative gateway
            </p>
          </div>
          <input
            type="password"
            placeholder="Access Key"
            className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white mb-6 focus:ring-2 focus:ring-(--prim-color) outline-none transition-all"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-(--prim-color) text-white py-4 rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-(--prim-color)/20 uppercase tracking-widest text-sm"
          >
            Enter Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">
      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 overflow-x-hidden">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black Unbounded text-black uppercase tracking-tighter">
              Command Center
            </h1>
            <p className="text-gray-500 font-medium flex pl-3">
              Manage and track store performance
            </p>
          </div>

          <div className="Unbounded items-center flex justify-center gap-2">
            <button
              onClick={loadOrders}
              className="bg-black text-white border border-gray-200 px-6 py-3 rounded-xl flex items-center gap-2 font-bold text-sm hover:shadow-md transition-all active:scale-95"
            >
              <RefreshCw size={16} /> Sync
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 border text-white border-gray-200 px-6 py-3 rounded-xl flex items-center gap-2 font-bold text-sm hover:bg-red-700 transition-all active:scale-95"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </header>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            {
              label: "Total Orders",
              value: orders.length,
              icon: Package,
              color: "bg-blue-500",
            },
            {
              label: "Revenue",
              value: `₦${orders.reduce((a, b) => a + b.amount, 0).toLocaleString()}`,
              icon: CheckCircle,
              color: "bg-green-500",
            },
            {
              label: "Pending",
              value: orders.filter((o) => o.status === "PAID").length,
              icon: Truck,
              color: "bg-orange-500",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5"
            >
              <div className={`${stat.color} p-4 rounded-xl text-white`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                  {stat.label}
                </p>
                <p className="text-2xl font-black Unbounded">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-black text-white text-[10px] uppercase tracking-[0.2em] whitespace-nowrap">
                <tr>
                  <th className="p-5">Track ID</th>
                  <th className="p-5">Customer Details</th>
                  <th className="p-5">Location</th>
                  <th className="p-5">Amount</th>
                  <th className="p-5">Status</th>
                  <th className="p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {orders.map((order) => (
                  <tr
                    key={order.order_id}
                    className="hover:bg-gray-50/80 transition-colors"
                  >
                    <td className="p-5 font-black text-(--prim-color)">
                      {order.order_id}
                    </td>
                    <td className="p-5">
                      <div className="font-black text-gray-900 uppercase text-xs">
                        {order.customer_name}
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 text-[11px] mt-1">
                        <Mail size={10} /> {order.customer_email}
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 text-[11px]">
                        <Phone size={10} /> {order.customer_phone}
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-1 font-bold text-gray-700 uppercase text-[11px]">
                        <MapPin size={10} /> {order.state}
                      </div>
                      <div className="text-gray-400 text-[10px] truncate max-w-37.5">
                        {order.address}
                      </div>
                    </td>
                    <td className="p-5 font-black text-lg">
                      ₦{order.amount.toLocaleString()}
                    </td>
                    <td className="p-5">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${
                          order.status === "PAID"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 bg-gray-100 rounded-lg hover:bg-black hover:text-white transition-all"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() =>
                            updateOrderStatus(order.order_id, "SHIPPED").then(
                              loadOrders,
                            )
                          }
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg font-bold text-[10px] uppercase px-3"
                        >
                          Ship
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Order Detail Modal (Keep as is but style to match) */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-100 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl">
            {/* ... Modal Content Styled Similar to Above ... */}
            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                <h2 className="Unbounded font-black text-2xl uppercase">
                  Order Details
                </h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 bg-gray-100 rounded-full"
                >
                  <X />
                </button>
              </div>
              {/* Items detail list would go here */}
              <div className="p-6 bg-gray-50 rounded-2xl mb-6">
                <p className="text-xs uppercase font-black text-gray-400 mb-2 tracking-widest">
                  Shipping To
                </p>
                <p className="font-bold text-gray-900">
                  {selectedOrder.customer_name}
                </p>
                <p className="text-gray-600 text-sm">
                  {selectedOrder.address}, {selectedOrder.state}
                </p>
              </div>
              <button
                onClick={() =>
                  updateOrderStatus(selectedOrder.order_id, "DELIVERED").then(
                    () => {
                      loadOrders();
                      setSelectedOrder(null);
                    },
                  )
                }
                className="w-full bg-green-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest"
              >
                Mark as Delivered
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
