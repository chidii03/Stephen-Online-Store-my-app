// app/legal-notice/page.tsx
import { Landmark, Database, Cookie, Eye, Lock, Mail, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const metadata = { title: "Legal Notice | Steve O Bizz Store" };

const Section = ({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-[#4b70f5]/20">
      <div className="w-9 h-9 rounded-xl bg-[#4b70f5]/10 flex items-center justify-center shrink-0">
        <Icon size={17} className="text-[#4b70f5]" />
      </div>
      <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">{title}</h2>
    </div>
    <div className="text-gray-600 leading-relaxed space-y-3 pl-1">{children}</div>
  </div>
);

export default function LegalNotice() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-linear-to-br from-[#4b70f5] to-[#2952e3] text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">        
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center">
              <Landmark size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tighter">Legal Notice</h1>
            </div>
          </div>
          <p className="text-white/75 max-w-xl leading-relaxed">
            Important legal information about who we are, how we handle your data, and your rights as a consumer and website visitor.
          </p>
        </div>
      </div>

      {/* Business identity banner */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: "Business Name",    value: "Steve O Bizz Store",          icon: Landmark  },
              { label: "Business Country", value: "Federal Republic of Nigeria",  icon: MapPin    },
              { label: "Contact Email",    value: "steveobizz@yahoo.com",    icon: Mail      },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#4b70f5]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <item.icon size={16} className="text-[#4b70f5]" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400">{item.label}</p>
                  <p className="font-bold text-gray-800 text-sm mt-0.5">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-14">

        <Section icon={Landmark} title="Publisher Information">
          <p>
            This website is owned and operated by <strong className="text-gray-900">Steve O Bizz Store</strong>, a retail business registered and operating under the laws of the Federal Republic of Nigeria.
          </p>
          <p>All correspondence regarding the legal operation of this website should be directed to:</p>
          <div className="bg-[#4b70f5]/5 border border-[#4b70f5]/20 rounded-2xl p-5 mt-2">
            <p className="font-bold text-gray-900">Steve O Bizz Store</p>
            <p className="text-sm">
              Email:{" "}
              <a href="mailto:steveobizz@yahoo.com" className="text-[#4b70f5]">
                steveobizz@yahoo.com
              </a>
            </p>
          </div>
        </Section>

        <Section icon={Database} title="Data Collection & Use">
          <p>When you place an order, contact us, or subscribe to our newsletter, we collect personal information including but not limited to:</p>
          <ul className="space-y-2 mt-2">
            {[
              "Full name and contact details (email address, phone number)",
              "Delivery address and state",
              "Purchase and transaction history",
              "Technical data (IP address, browser type, device information) via server logs",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-[#4b70f5] font-bold mt-0.5">•</span> {item}
              </li>
            ))}
          </ul>
          <p className="mt-4">
            This data is used exclusively to <strong className="text-gray-900">process orders</strong>, provide customer support, send transactional emails, and improve our services. We do not sell, rent, or trade your personal information to third parties.
          </p>
        </Section>

        <Section icon={Lock} title="Data Storage & Security">
          <p>
            Customer data is stored securely in our database (<strong className="text-gray-900">Turso — LibSQL</strong>) hosted on compliant cloud infrastructure. All data in transit is encrypted using industry-standard <strong className="text-gray-900">TLS/HTTPS</strong> protocols.
          </p>
          <p>Payment processing is handled exclusively by <strong className="text-gray-900">Paystack</strong> — a PCI DSS-compliant payment processor. We do not store, process, or have access to your card details at any point.</p>
          <div className="bg-green-50 border border-green-100 rounded-xl p-4 mt-3 flex items-start gap-3">
            <Lock size={16} className="text-green-600 mt-0.5 shrink-0" />
            <p className="text-sm text-green-800">
              All transactions are secured with 256-bit SSL encryption. Look for the padlock in your browser&apos;s address bar.
            </p>
          </div>
        </Section>

        <Section icon={Cookie} title="Cookies Policy">
          <p>Our website uses cookies to ensure proper functionality and improve your browsing experience. We use the following types of cookies:</p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#4b70f5] text-white">
                  <th className="p-4 text-left font-bold rounded-tl-xl">Cookie Type</th>
                  <th className="p-4 text-left font-bold">Purpose</th>
                  <th className="p-4 text-left font-bold rounded-tr-xl">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["Essential",    "Session management, cart functionality",    "Session"],
                  ["Functional",   "Remembering preferences and settings",       "30 days"],
                  ["Analytical",   "Anonymous usage statistics (no personal data)", "90 days"],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    {row.map((cell, j) => (
                      <td key={j} className="p-4 text-gray-700">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm">
            You can manage or disable cookies through your browser settings. Note that disabling essential cookies may affect your ability to use certain features of our Store.
          </p>
        </Section>

        <Section icon={Eye} title="Your Rights">
          <p>As a customer and website visitor, you have the following rights regarding your personal data:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {[
              { right: "Right of Access",      desc: "Request a copy of all personal data we hold about you." },
              { right: "Right to Rectification", desc: "Request correction of inaccurate or incomplete data." },
              { right: "Right to Erasure",      desc: "Request deletion of your personal data, subject to legal obligations." },
              { right: "Right to Portability",  desc: "Request your data in a structured, machine-readable format." },
              { right: "Right to Object",       desc: "Object to processing of your data for marketing purposes." },
              { right: "Right to Withdraw",     desc: "Withdraw consent at any time without affecting prior processing." },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                <p className="font-black text-gray-900 text-sm mb-1">{item.right}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          
        </Section>

        <Section icon={Landmark} title="Disclaimer of Warranties">
          <p>
            The Steve O Bizz Store website and its contents are provided on an <strong className="text-gray-900">&quot;as is&quot; and &quot;as available&quot;</strong> basis without any warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
          </p>
          <p>
            We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components. We reserve the right to modify, suspend, or discontinue any part of the website at any time without notice.
          </p>
        </Section>

        <Section icon={Mail} title="Third-Party Services">
          <p>Our Store integrates with the following third-party services. Each is subject to their own privacy policy and terms of service:</p>
          <div className="mt-4 space-y-3">
            {[
              { name: "Paystack",  purpose: "Payment processing",    link: "https://paystack.com/terms"          },
              { name: "Vercel",    purpose: "Website hosting",       link: "https://vercel.com/legal/privacy-policy" },
              { name: "Turso",     purpose: "Database services",     link: "https://turso.tech/privacy-policy"   },
              { name: "Nodemailer/Gmail", purpose: "Transactional email", link: "https://policies.google.com/privacy" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div>
                  <p className="font-black text-gray-900 text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.purpose}</p>
                </div>
                <a href={item.link} target="_blank" rel="noreferrer"
                  className="text-xs text-[#4b70f5] font-semibold underline hover:text-[#2952e3] transition-colors">
                  Privacy Policy →
                </a>
              </div>
            ))}
          </div>
        </Section>

        {/* CTA */}
        <div className="bg-linear-to-br from-[#4b70f5] to-[#2952e3] rounded-3xl p-8 text-white">
          <h3 className="text-xl font-black uppercase tracking-tight mb-2">Have Legal Questions?</h3>
          <p className="text-white/75 text-sm mb-6">
            If you have concerns about how your data is handled or wish to exercise your rights, our team is here to assist.
          </p>
        </div>
      </div>
    </div>
  );
}