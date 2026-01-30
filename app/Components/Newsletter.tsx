"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "@/app/lib/api";

const Newsletter = () => {
  const POPUP_DELAY_MS = 10000;
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), POPUP_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
  if (showPopup) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
  return () => {
    document.body.style.overflow = "";
  };
}, [showPopup]);


  // Strict Email Regex
  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Welcome to the family! Check your inbox.");
        setEmail("");
        setShowPopup(false);
      } else {
        toast.error(data.error || "Subscription failed");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="overflow-hidden">
      <div className="max-w-292.5 mx-auto px-4 sm:px-8 xl:px-0 pb-3">
        <div className="relative z-1 overflow-hidden rounded-xl bg-blue-900">
          {" "}
          {/* Added Fallback BG */}
          <Image
            src="/categories/images/newsletter-bg.jpg"
            alt="background"
            className="absolute -z-1 w-full h-full left-0 top-0 object-cover "
            width={1170}
            height={200}
          />
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-8 px-4 sm:px-7.5 xl:pl-12.5 xl:pr-14 py-11">
            <div className="max-w-122.75 w-full">
              <h2 className="text-white font-bold text-lg sm:text-xl xl:text-heading-4 mb-3">
                Don&apos;t Miss Out on Latest Trends
              </h2>
              <p className="text-gray-200">
                Get exclusive discounts and early access to new arrivals.
              </p>
            </div>

            <div className="max-w-119.25 w-full">
              <form onSubmit={handleSubscribe}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white text-black border border-transparent outline-none rounded-md py-3 px-5 focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex justify-center items-center py-3 px-7 text-white bg-blue-600 font-medium rounded-md hover:bg-blue-700"
                  >
                    {loading ? "Sending..." : "Subscribe"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {showPopup && (
          <div
            className="fixed inset-0 z-1000 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
            onClick={() => setShowPopup(false)} // 👈 close on outside click
          >
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full grid md:grid-cols-2 overflow-hidden relative animate-fadeIn"
              onClick={(e) => e.stopPropagation()} // 👈 prevent close when clicking inside
            >
              <button
                onClick={() => setShowPopup(false)}
                disabled={loading}
                className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 transition"
              >
                ✕
              </button>

              {/* Image */}
              <div className="hidden md:block">
                <Image
                  src="https://img.freepik.com/premium-photo/pattern-computer-background_135892-134.jpg"
                  alt="Special offer"
                  width={500}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col justify-center">
                <h2 className="text-3xl font-extrabold text-blue-600 mb-3">
                  Shop & Save 🛍️
                </h2>

                <p className="text-lg font-semibold mb-2">
                  Enjoy <span className="text-blue-600">30% OFF</span> your
                  first order
                </p>

                <p className="text-gray-600 mb-6">
                  Subscribe now and receive exclusive deals, early product
                  drops, and special offers directly to your inbox.
                </p>

                <form onSubmit={handleSubscribe} className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-500 transition"
                  >
                    {loading ? "Sending..." : "Get 30% Off"}
                  </button>
                </form>

                <p className="text-xs text-gray-400 mt-4">
                  Offer valid for new subscribers only
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
