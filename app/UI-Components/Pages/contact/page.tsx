"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  Send,
  CheckCircle,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { toast } from "react-toastify";
import { API_URL } from "@/app/lib/api";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "General Inquiry",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    // Point this to your Render Backend
    const response = await fetch('/api/contact', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Message sent successfully!");
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "General Inquiry",
        message: "",
      });
    } else {
      toast.error(data.error || "Failed to send message.");
    }
  } catch {
    toast.error("Network error. Please check your connection.");
  } finally {
    setIsSubmitting(false);
  }
};

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      {/* Hero Section - Corporate Blue Gradient */}
      <div className="relative overflow-hidden bg-blue-950 py-24 border-b border-blue-800">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-blue-900 via-blue-950 to-slate-900"></div>

        <div className="relative max-w-7xl mx-auto px-4 text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-6 text-white">
            Get in <span className="text-blue-400">Touch</span>
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto font-light">
            Have questions? We&apos;re ready to assist you. Your message goes
            directly to our team via WhatsApp.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-8 uppercase border-l-4 border-blue-600 pl-4 text-slate-900">
                Contact Info
              </h2>
              <div className="grid gap-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 flex items-center justify-center rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-bold">
                      Call Us
                    </p>
                    <p className="text-lg font-semibold">+234 803 304 8352</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 flex items-center justify-center rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-bold">
                      Email Us
                    </p>
                    <p className="text-lg font-semibold">
                      steveobizz@yahoo.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Google Map */}
            <div className="w-full h-80 transition-all duration-500 border border-blue-600 rounded-lg p-2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.4214470216694!2d3.344405274993517!3d6.594411193399435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b92289694553d%3A0x67347a27442a8b34!2s69%20Obafemi%20Awolowo%20Way%2C%20Ikeja%20101233%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Form with Gradient Accent */}
          <div className="relative bg-slate-900 text-white p-10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-linear-to-br from-blue-900/40 to-transparent pointer-events-none"></div>
            {isSubmitted ? (
              <div className="relative z-10 text-center py-20">
                <CheckCircle className="w-20 h-20 text-blue-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4 uppercase">
                  Message Sent!
                </h3>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-blue-400 underline uppercase text-sm"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-blue-300">
                      Full Name
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-blue-900/20 border-b border-blue-800 p-2 focus:border-blue-400 outline-none text-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-blue-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-blue-900/20 border-b border-blue-800 p-2 focus:border-blue-400 outline-none text-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-blue-300">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full bg-blue-900/20 border-b border-blue-800 p-2 focus:border-blue-400 outline-none text-white transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-blue-300">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    onChange={handleChange}
                    required
                    className="w-full bg-blue-900/20 border-b border-blue-800 p-2 focus:border-blue-400 outline-none transition-all resize-none"
                    placeholder="How can we help?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white font-bold py-4 uppercase hover:bg-blue-500 transition-colors flex items-center justify-center gap-2 rounded-xl"
                >
                  {isSubmitting ? "Sending..." : "Send to WhatsApp"}{" "}
                  <Send size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* CTA Bottom Section with Requested Gradient */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10 bg-linear-to-br from-blue-900 via-blue-950 to-slate-900 rounded-3xl my-10 border border-blue-800/50">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Upgrade Your Office?
          </h2>
          <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied corporate clients who trust Steve
            O&apos;Bizz Store.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/UI-Components/Pages/about"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-blue-700 font-bold hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              <Sparkles className="w-5 h-5" /> Discover Our Story
            </Link>
            <Link
              href="/Help"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-800 text-white font-bold hover:bg-blue-900 transition-colors"
            >
              <HelpCircle className="w-5 h-5" /> Visit Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
