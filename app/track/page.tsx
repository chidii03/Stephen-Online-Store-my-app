"use client";
import { useState } from "react";
import { fetchTrackingInfo, OrderResponse } from "@/app/lib/api";
import { Package, Truck, CheckCircle, Loader } from "lucide-react";

export default function TrackOrder() {
  const [id, setId] = useState("");
  const [data, setData] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    if(!id) return;
    setLoading(true);
    setTimeout(async () => {
        const result = await fetchTrackingInfo(id.trim());
        setData(result);
        setLoading(false);
    }, 800);
  };

  const getStep = (status: string) => {
    if (status === 'DELIVERED') return 4;
    if (status === 'SHIPPED') return 3;
    if (status === 'PAID') return 2;
    return 1;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-10">
        <h1 className="Unbounded text-3xl md:text-5xl font-black mb-4">Track Order</h1>
        <p className="text-gray-500">Real-time package status updates</p>
      </div>

      <div className="w-full max-w-xl">
        <div className="bg-white p-2 rounded-full shadow-lg border border-gray-100 flex pl-6 mb-10">
            <input 
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Tracking ID (e.g., ORD-8291)"
                className="flex-1 outline-none text-lg font-medium uppercase placeholder:normal-case placeholder:font-normal"
            />
            <button 
                onClick={handleTrack}
                disabled={loading}
                className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-all disabled:opacity-50"
            >
                {loading ? "Locating..." : "Track"}
            </button>
        </div>

        {data && (
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden animate-in slide-in-from-bottom-4 duration-500 border border-gray-100">
                <div className="bg-(--prim-color) p-6 text-white flex justify-between items-center">
                    <div>
                        <p className="text-xs opacity-80 uppercase tracking-widest mb-1">Status</p>
                        <h2 className="text-2xl font-bold Unbounded">{data.status}</h2>
                    </div>
                    <div className="text-right">
                        <p className="text-xs opacity-80 uppercase tracking-widest mb-1">Amount</p>
                        <p className="text-xl font-bold">₦{data.total_amount.toLocaleString()}</p>
                    </div>
                </div>

                <div className="p-8">
                    {/* Visual Timeline */}
                    <div className="relative flex justify-between mb-8 z-10">
                        {/* Line */}
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-10 -translate-y-1/2"></div>
                        <div className={`absolute top-1/2 left-0 h-1 bg-(--prim-color) -z-10 -translate-y-1/2 transition-all duration-1000`} style={{width: `${(getStep(data.status)-1)*33}%`}}></div>

                        {[
                            { icon: Loader, label: "Pending" }, 
                            { icon: CheckCircle, label: "Paid" }, 
                            { icon: Truck, label: "Shipped" }, 
                            { icon: Package, label: "Delivered" }
                        ].map((step, index) => {
                            const active = index + 1 <= getStep(data.status);
                            return (
                                <div key={index} className="flex flex-col items-center bg-white px-2">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${active ? 'border-(--prim-color) bg-(--prim-color) text-white' : 'border-gray-200 text-gray-300'}`}>
                                        <step.icon size={18} />
                                    </div>
                                    <span className={`text-xs mt-2 font-bold ${active ? 'text-black' : 'text-gray-300'}`}>{step.label}</span>
                                </div>
                            )
                        })}
                    </div>

                    <div className="bg-gray-50 rounded-xl p-5 space-y-3">
                        <div className="flex justify-between border-b pb-2 border-gray-200">
                            <span className="text-gray-500">Customer</span>
                            <span className="font-medium">{data.customer_name}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2 border-gray-200">
                            <span className="text-gray-500">Date</span>
                            <span className="font-medium">{new Date(data.created_at || '').toLocaleDateString()}</span>
                        </div>
                         <div className="flex justify-between">
                            <span className="text-gray-500">Delivery To</span>
                            <span className="font-medium text-right max-w-50">{data.address}</span>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}