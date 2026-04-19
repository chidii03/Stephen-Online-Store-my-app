// app/return-policy/page.tsx
import Link from "next/link";
import { ArrowLeft, RefreshCw, Clock, Package, AlertCircle, CheckCircle, XCircle, Phone, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const metadata = { title: "Return Policy | Steve O Bizz Store" };

const Section = ({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-xl bg-[#4b70f5]/10 flex items-center justify-center shrink-0">
        <Icon size={20} className="text-[#4b70f5]" />
      </div>
      <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">{title}</h2>
    </div>
    <div className="pl-13 ml-13">{children}</div>
  </div>
);

export default function ReturnPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-linear-to-br from-[#4b70f5] to-[#2952e3] text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-semibold mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Store
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center">
              <RefreshCw size={28} />
            </div>
            <div>
              <p className="text-white/60 text-sm font-semibold uppercase tracking-widest">Steve O Bizz Store</p>
              <h1 className="text-4xl font-black uppercase tracking-tighter">Return Policy</h1>
            </div>
          </div>
          <p className="text-white/75 max-w-xl leading-relaxed">
            We want you to be completely satisfied with every purchase. If something isn&apos;t right, we&apos;re here to make it right.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-2 text-sm font-semibold">
            <Clock size={14} /> Last updated: April 2025
          </div>
        </div>
      </div>

      {/* Quick Summary Cards */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: CheckCircle, label: "Return Window",  value: "7 Days",         color: "text-green-600",  bg: "bg-green-50"  },
              { icon: Package,     label: "Exchange Period", value: "14 Days",        color: "text-[#4b70f5]",  bg: "bg-[#4b70f5]/10" },
              { icon: Clock,       label: "Refund Time",    value: "5–10 Business Days", color: "text-orange-600", bg: "bg-orange-50" },
            ].map((c, i) => (
              <div key={i} className={`${c.bg} rounded-2xl p-5 flex items-center gap-4`}>
                <c.icon size={28} className={c.color} />
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500">{c.label}</p>
                  <p className={`text-lg font-black ${c.color}`}>{c.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-14">

        <Section icon={CheckCircle} title="Eligible Returns">
          <p className="text-gray-600 leading-relaxed mb-4">
            We accept returns on items that meet <strong className="text-gray-900">all</strong> of the following conditions:
          </p>
          <ul className="space-y-3">
            {[
              "Item returned within 7 days of confirmed delivery",
              "Item is unused, unworn, and in its original condition",
              "Original packaging, tags, and accessories are intact",
              "Item is not from our non-returnable category (see below)",
              "Proof of purchase (order ID or receipt) is provided",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700">
                <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section icon={XCircle} title="Non-Returnable Items">
          <p className="text-gray-600 leading-relaxed mb-4">
            The following items cannot be returned or exchanged for hygiene, safety, or customisation reasons:
          </p>
          <ul className="space-y-3">
            {[
              "Perishable goods (food, beverages, or health products)",
              "Intimate apparel, underwear, or swimwear",
              "Personalised or custom-made products",
              "Digital products and downloadable software",
              "Items purchased during final-sale or clearance events",
              "Items that have been used, damaged by the customer, or altered",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700">
                <XCircle size={16} className="text-red-400 mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section icon={RefreshCw} title="How to Initiate a Return">
          <ol className="space-y-6">
            {[
              { step: "1", title: "Contact Support", desc: "Email us at support@steveobizzstore.com or WhatsApp us within 7 days of delivery. Include your Order ID and reason for return." },
              { step: "2", title: "Receive Approval", desc: "Our team will review your request within 24–48 hours and send a Return Merchandise Authorisation (RMA) number if approved." },
              { step: "3", title: "Ship the Item", desc: "Pack the item securely in its original packaging and ship to the address provided. Include your RMA number on the outside of the package." },
              { step: "4", title: "Inspection & Refund", desc: "Once we receive and inspect the item (2–3 business days), we will process your refund or exchange within 5–10 business days." },
            ].map((s) => (
              <li key={s.step} className="flex gap-5">
                <div className="w-10 h-10 rounded-full bg-[#4b70f5] text-white font-black flex items-center justify-center text-sm shrink-0">
                  {s.step}
                </div>
                <div>
                  <p className="font-black text-gray-900 mb-1">{s.title}</p>
                  <p className="text-gray-600 leading-relaxed text-sm">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section icon={AlertCircle} title="Damaged or Wrong Items">
          <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
            <p className="text-gray-700 leading-relaxed">
              If you received a <strong className="text-red-600">damaged, defective, or incorrect item</strong>, please contact us within <strong>48 hours</strong> of delivery. 
              Send clear photos of the item and packaging to{" "}
              <a href="mailto:support@steveobizzstore.com" className="text-[#4b70f5] font-semibold underline">support@steveobizzstore.com</a>.
              We will arrange a <strong>free replacement or full refund</strong> at no cost to you.
            </p>
          </div>
        </Section>

        <Section icon={Clock} title="Refund Methods & Timeline">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#4b70f5] text-white">
                  <th className="p-4 text-left font-bold rounded-tl-xl">Payment Method</th>
                  <th className="p-4 text-left font-bold">Refund Method</th>
                  <th className="p-4 text-left font-bold rounded-tr-xl">Processing Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["Paystack (Card)",     "Original Card",      "5–10 Business Days"],
                  ["Paystack (Transfer)", "Bank Transfer",      "3–5 Business Days"],
                  ["Paystack (USSD)",     "Bank Transfer",      "3–5 Business Days"],
                ].map((row, i) => (
                  <tr key={i} className="bg-gray-50 hover:bg-gray-100 transition-colors">
                    {row.map((cell, j) => (
                      <td key={j} className="p-4 text-gray-700 font-medium">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Contact */}
        <div className="bg-linear-to-br from-[#4b70f5] to-[#2952e3] rounded-3xl p-8 text-white mt-10">
          <h3 className="text-xl font-black uppercase tracking-tight mb-2">Need Help?</h3>
          <p className="text-white/75 mb-6 text-sm">Our support team is available Monday–Saturday, 9am–6pm WAT.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="mailto:support@steveobizzstore.com"
              className="flex items-center gap-3 bg-white/15 hover:bg-white/25 rounded-xl px-5 py-3 transition-all font-semibold text-sm">
              <Mail size={16} /> support@steveobizzstore.com
            </a>
            <a href="https://wa.me/2348000000000"
              className="flex items-center gap-3 bg-white/15 hover:bg-white/25 rounded-xl px-5 py-3 transition-all font-semibold text-sm">
              <Phone size={16} /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Steve O Bizz Store. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-[#4b70f5] transition-colors">Terms & Conditions</Link>
            <Link href="/legal-notice" className="hover:text-[#4b70f5] transition-colors">Legal Notice</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}