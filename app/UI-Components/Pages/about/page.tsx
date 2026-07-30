import {
  MapPin,
  Clock,
  Truck,
  Star,
  Heart,
  CheckCircle2,
  Building2,
  Award,
  ArrowRight,
  HelpCircle,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  const features = [
    {
      title: "Authentic Products",
      desc: "Direct distributors for HP, Canon, Sharp & more.",
      icon: <CheckCircle2 className="w-6 h-6" />,
    },
    {
      title: "Corporate Accounts",
      desc: "Credit facilities and dedicated account managers.",
      icon: <Building2 className="w-6 h-6" />,
    },
    {
      title: "Nationwide Logistics",
      desc: "Reliable delivery to 36 states in Nigeria.",
      icon: <Truck className="w-6 h-6" />,
    },
    {
      title: "After-Sales Support",
      desc: "Installation, servicing, and warranty handling.",
      icon: <Award className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section - Switched to Blue */}

      <div className="relative overflow-hidden bg-gray-900 py-24 md:py-32">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-primary-900/90 via-gray-900/90 to-blue-900/90"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Our Story of <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-400 to-blue-500">
              Excellence
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Since 2010, Steve O&apos;Bizz Store has been Nigeria&apos;s trusted
            partner for premium office supplies, corporate solutions, and
            business essentials.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-10 rounded-3xl border border-blue-100">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm mb-6">
              <Heart className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              To provide Nigerian businesses with premium quality office
              supplies and innovative solutions that drive productivity and
              eliminate downtime.
            </p>
          </div>

          <div className="bg-slate-900 p-10 rounded-3xl text-white">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-sm mb-6">
              <Star className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-blue-400">
              Our Vision
            </h2>
            <p className="text-lg text-blue-100/80 leading-relaxed">
              To become Africa&apos;s most trusted partner for corporate
              supplies by setting new standards in product authenticity and
              service delivery.
            </p>
          </div>
        </div>
      </div>

      {/* Store Showcase with Video */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Experience Our Store
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Take a virtual tour of our Ikeja showroom and warehouse
              facilities.
            </p>
          </div>

          {/* Changed h-auto to a defined height on mobile so the absolute video has a container to fill */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* VIDEO SLOT: Main Showroom Tour */}
            <div className="md:col-span-8 relative rounded-3xl overflow-hidden bg-black shadow-2xl min-h-75 md:h-137.5">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              >
                <source src="/videos/steveobizz.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex items-end p-6 md:p-10">
                <div>
                  <span className="px-3 py-1 bg-blue-600 text-white text-[10px] md:text-xs font-bold rounded-full uppercase tracking-widest mb-3 inline-block">
                    Live Tour
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                    Main Showroom & <br className="md:hidden" /> Customer
                    Experience Center
                  </h3>
                </div>
              </div>
            </div>

            {/* Side Images - Matching the height on mobile */}
            <div className="md:col-span-4 flex flex-col gap-6">
              <div className="h-64 md:flex-1 rounded-3xl overflow-hidden bg-gray-200 relative group">
                <Image
                  src="/categories/images/shop1.jpeg"
                  alt="Warehouse"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
                <div className="absolute bottom-4 left-6 text-white font-bold">
                  Bulk Storage Facility
                </div>
              </div>

              <div className="h-64 md:flex-1 rounded-3xl overflow-hidden bg-gray-200 relative group">
                <Image
                  src="/categories/images/shop2.jpeg"
                  alt="Consultation"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
                <div className="absolute bottom-4 left-6 text-white font-bold">
                  Corporate Consultation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Leading Companies Trust Us - Enhanced UI */}
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Why Leading Companies Trust Us
            </h2>
            <p className="text-gray-600 mt-4">
              We don&apos;t just sell products; we provide the reliability that
              keeps your business running smoothly.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Google Map Section - Fixed as requested */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Find Our Store
            </h3>
            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <p className="text-gray-600 font-medium">
                  No 69 Obafemi Awolowo Way, Ikeja, Lagos
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-gray-900 font-bold">
                    Mon - Fri: 8:00 AM - 6:00 PM
                  </p>
                  <p className="text-gray-500 text-sm">
                    Closed on Weekends & Public Holidays
                  </p>
                </div>
              </div>
            </div>
            <a
              href="https://maps.google.com"
              className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-4 transition-all"
            >
              Open in Google Maps <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="w-full h-80 transition-all duration-500 border border-blue-600 rounded-lg p-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.362841151676!2d3.3444044758735237!3d6.601777022247963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b9228fa297707%3A0x13da58c094453be!2s69%20Obafemi%20Awolowo%20Way%2C%20Ikeja%20101233%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* CTA Section - Blue & Updated Links */}
      <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8">
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
              href="/UI-Components/Pages/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-blue-700 font-bold hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              <MessageSquare className="w-5 h-5" /> Contact Support
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
