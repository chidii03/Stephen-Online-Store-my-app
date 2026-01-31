"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SearchBar from "@/app/Components/SearchBar";

type NavLink = {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
};

interface StorageItem {
  _id: string | number;
}

const categories = [
  {
    title: "Office Supplies",
    products: "800+ Items",
    icon: "bi-printer",
    subCategories: [
      {
        name: "Office Desk Accessories",
        items: [
          "Staplers and Punchers",
          "Cellotape and Tape Dispensers",
          "Office Desk Organisers",
          "Office Scissors and Paper Cutters",
          "Office Clipboards",
          "Measuring Rulers and Scales",
          "Pen Holders and Pencil Cups",
          "Office Writing Pads",
        ],
      },
      {
        name: "Pens, Pencils and Markers",
        items: [
          "Biro Pens",
          "Gel Pens and Rollerball Pens",
          "Office Highlighters",
          "HB Pencils and Erasers",
          "Permanent Markers",
          "Correction Fluid and Correction Tape",
          "Pen Refills",
          "Fancy and Fountain Pens",
        ],
      },
      {
        name: "Office Files and Document Storage",
        items: [
          "Office File Jackets",
          "Expanding File Folders",
          "Suspension Files",
          "Plastic Storage Boxes",
          "Office Labels and Price Tags",
          "Sectional File Folders",
          "Ring Binders",
        ],
      },
      {
        name: "Paper and Writing Materials",
        items: [
          "A4 Printing Paper",
          "Exercise Books and Notebooks",
          "Sticky Notes",
          "Office Envelopes",
          "Cardboard and Card Paper",
          "Loose Writing Sheets",
          "Legal Writing Pads",
          "Photo Printing Paper",
        ],
      },
      {
        name: "General Office Consumables",
        items: [
          "Paper Clips",
          "Rubber Bands",
          "Drawing Pins",
          "Office Glue and Adhesives",
          "Office Stamps and Ink Pads",
          "Office Batteries",
          "First Aid Boxes",
          "Office Scissors",
        ],
      },
      {
        name: "Calendars and Office Diaries",
        items: [
          "Wall Calendars",
          "Desk Calendars",
          "Office Diaries",
          "Academic Planners",
          "Whiteboards and Notice Boards",
        ],
      },
    ],
  },

  {
    title: "School Supplies",
    products: "450+ Items",
    icon: "bi-pencil-square",
    subCategories: [
      {
        name: "School Bags and Lunch Items",
        items: [
          "Primary School Backpacks",
          "Laptop School Bags",
          "Lunch Bags and Lunch Boxes",
          "Plastic Water Bottles",
          "Drawstring School Bags",
          "Side and Shoulder Bags",
        ],
      },
      {
        name: "Arts, Crafts and Drawing Materials",
        items: [
          "Crayons and Colour Pencils",
          "Washable Markers",
          "Drawing and Art Paper",
          "Glitter, Gum and Adhesives",
          "Drawing Books and Sketch Pads",
          "Water Colour Paint",
          "Poster and Acrylic Paint",
        ],
      },
      {
        name: "Classroom Teaching Materials",
        items: [
          "Whiteboards",
          "Notice Boards",
          "Educational Wall Charts",
          "Board Markers",
          "Board Borders and Trimmers",
          "Teacher Storage Organisers",
        ],
      },
      {
        name: "Learning and Instructional Materials",
        items: [
          "Scientific Calculators",
          "Mathematical Sets",
          "Flash Cards",
          "Teaching Aids",
          "World Globes",
          "Basic Science Kits",
        ],
      },
      {
        name: "Nursery and Creche Items",
        items: [
          "Educational Puzzles",
          "Building Blocks",
          "Children Story Books",
          "Finger Paint",
          "Alphabet Learning Toys",
        ],
      },
    ],
  },
  {
    title: "Ink & Toner",
    products: "1200+ Items",
    icon: "bi-droplet-fill",
    subCategories: [
      {
        name: "Printer Ink Cartridges",
        items: [
          "HP Ink Cartridges",
          "Epson Printer Ink",
          "Canon Printer Ink",
          "Brother Printer Ink",
          "Compatible Ink Cartridges",
        ],
      },
      {
        name: "Printer Toner Cartridges",
        items: [
          "HP Laser Toner",
          "Brother Laser Toner",
          "Canon Laser Toner",
          "Samsung Toner",
          "Xerox Toner",
        ],
      },
      {
        name: "Printer Consumables",
        items: [
          "Photo Printing Paper",
          "EcoTank Ink Bottles",
          "Original and Compatible Cartridges",
          "Printer Maintenance Kits",
        ],
      },
    ],
  },

  {
    title: "Furniture",
    products: "600+ Items",
    icon: "bi-lamp",
    subCategories: [
      {
        name: "Office Chairs",
        items: [
          "Executive Office Chairs",
          "Mesh Office Chairs",
          "Visitor Chairs",
          "Secretarial Chairs",
          "Drafting Chairs",
          "Gaming Chairs",
          "Heavy Duty Chairs",
        ],
      },
      {
        name: "Office Tables & Desks",
        items: [
          "Office Workstations",
          "Office Tables",
          "Computer Tables",
          "Conference Tables",
          "Training Tables",
          "Folding Tables",
          "Reception Counters",
        ],
      },
      {
        name: "Office Storage",
        items: [
          "Filing Cabinets",
          "Office Book Shelves",
          "Metal Cabinets",
          "Office Lockers",
          "Office Safes",
          "Drawer Units",
          "Steel Shelving",
        ],
      },
      {
        name: "Office Decor & Lighting",
        items: [
          "Table Lamps",
          "Standing Lamps",
          "Office Rugs",
          "Wall Clocks",
          "Artificial Flowers",
          "Picture Frames",
          "Office Mirrors",
        ],
      },
      {
        name: "Office Organization",
        items: [
          "Coat Hangers",
          "Document Racks",
          "Magazine Holders",
          "Garment Racks",
          "Wall File Holders",
        ],
      },
    ],
  },
  {
    title: "Computer & Accessories",
    products: "900+ Items",
    icon: "bi-laptop",
    subCategories: [
      {
        name: "Computer Accessories",
        items: [
          "Wireless Mouse",
          "USB Keyboards",
          "Web Cameras",
          "Microphones",
          "Computer Speakers",
          "Mouse Pads",
          "Drawing Tablets",
          "Game Controllers",
        ],
      },
      {
        name: "Storage Devices",
        items: [
          "External Hard Drives",
          "Portable SSDs",
          "Flash Drives",
          "Memory Cards",
          "Backup Drives",
          "Network Storage",
        ],
      },
      {
        name: "Laptops & Gadgets",
        items: [
          "Business Laptops",
          "Student Laptops",
          "Tablets",
          "Laptop Bags",
          "Privacy Screens",
          "Laptop Stands",
          "iPad Accessories",
        ],
      },
      {
        name: "Networking Equipment",
        items: [
          "Wi-Fi Routers",
          "Network Switches",
          "LAN Cables",
          "Wi-Fi Extenders",
          "Modems",
          "Network Adapters",
          "Fiber Optic Cables",
        ],
      },
      {
        name: "Computer Parts",
        items: [
          "SSD & HDD",
          "RAM",
          "Graphics Cards",
          "Processors",
          "Power Supply Units",
          "Motherboards",
          "System Units",
        ],
      },
    ],
  },
  {
    title: "Electronics",
    products: "500+ Items",
    icon: "bi-cpu",
    subCategories: [
      {
        name: "Audio Devices",
        items: [
          "Wireless Headsets",
          "Bluetooth Earphones",
          "Sound Systems",
          "Portable Speakers",
          "Public Address Systems",
          "Mixers",
        ],
      },
      {
        name: "Gaming Accessories",
        items: [
          "Game Controllers",
          "Gaming Headphones",
          "RGB Keyboards",
          "Gaming Mouse",
          "Gaming Monitors",
          "Steering Wheels",
        ],
      },
      {
        name: "Power Solutions",
        items: [
          "Power Banks",
          "Extension Boxes",
          "UPS Inverters",
          "Charging Cables",
          "USB Hubs",
          "Voltage Regulators",
          "Power Adapters",
        ],
      },
      {
        name: "Smart Devices",
        items: [
          "CCTV Cameras",
          "Smart Bulbs",
          "Smart Sockets",
          "Video Door Phones",
          "Smart Door Locks",
        ],
      },
    ],
  },
  {
    title: "Cleaning",
    products: "300+ Items",
    icon: "bi-wind",
    subCategories: [
      {
        name: "Cleaning Chemicals",
        items: [
          "Disinfectants",
          "Hand Sanitizers",
          "Floor Wash",
          "Glass Cleaners",
          "Liquid Soap",
          "Industrial Degreasers",
          "Laundry Soap",
        ],
      },
      {
        name: "Cleaning Tools",
        items: [
          "Brooms",
          "Mops",
          "Cleaning Cloths",
          "Waste Bins",
          "Tissue Paper",
          "Vacuum Cleaners",
          "Buckets",
        ],
      },
      {
        name: "Air & Ventilation",
        items: [
          "Air Fresheners",
          "Standing Fans",
          "Wall Fans",
          "Dehumidifiers",
          "Heaters",
        ],
      },
    ],
  },
  {
    title: "Breakroom",
    products: "400+ Items",
    icon: "bi-cup-hot",
    subCategories: [
      {
        name: "Drinks",
        items: [
          "Coffee",
          "Tea",
          "Bottled Water",
          "Soft Drinks",
          "Fruit Juice",
          "Energy Drinks",
          "Chocolate Drinks",
        ],
      },
      {
        name: "Snacks",
        items: [
          "Biscuits",
          "Chips",
          "Sweets",
          "Sugar & Sweeteners",
          "Creamers",
          "Light Snacks",
          "Protein Snacks",
        ],
      },
      {
        name: "Kitchen Appliances",
        items: [
          "Microwave Ovens",
          "Electric Kettles",
          "Coffee Machines",
          "Mini Refrigerators",
          "Toasters",
          "Water Dispensers",
        ],
      },
    ],
  },
  {
    title: "Mailing & Shipping",
    products: "250+ Items",
    icon: "bi-box-seam",
    subCategories: [
      {
        name: "Packaging Boxes",
        items: [
          "Carton Boxes",
          "Moving Cartons",
          "Storage Boxes",
          "Poster Tubes",
          "Heavy Duty Cartons",
        ],
      },
      {
        name: "Envelopes & Mailers",
        items: [
          "Bubble Envelopes",
          "Courier Bags",
          "Padded Envelopes",
          "Office Envelopes",
          "Document Envelopes",
        ],
      },
      {
        name: "Packaging Materials",
        items: [
          "Packing Tape",
          "Bubble Nylon",
          "Wrapping Paper",
          "Stretch Film",
          "Foam Packaging",
          "Tape Dispensers",
        ],
      },
    ],
  },
  {
    title: "Shop-Greener-Products",
    products: "150+ Items",
    icon: "bi-leaf",
    subCategories: [
      {
        name: "Eco Office Supplies",
        items: [
          "Recycled Paper",
          "Eco Pens",
          "Bamboo Desk Items",
          "Solar Chargers",
          "Eco Cleaning Products",
          "Recycled Envelopes",
        ],
      },
      {
        name: "Sustainable Living",
        items: [
          "Disposable Eco Plates",
          "Wooden Cutlery",
          "Organic Tea",
          "Recycled Tissue",
          "Solar Power Banks",
        ],
      },
    ],
  },
];
const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Shop",
    href: "#",
    dropdown: [
      { label: "Shop All", href: "/ShopAll" },
      { label: "Flash Sales", href: "/FlashSales" },
    ],
  },
  {
    label: "Pages",
    href: "#",
    dropdown: [
      { label: "Cart", href: "/cart" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "About Us", href: "/UI-Components/Pages/about" },
      { label: "Checkout", href: "/UI-Components/Pages/checkout" },
    ],
  },
  { label: "Contact Us", href: "/UI-Components/Pages/contact" },
];

export default function BottomNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {},
  );
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [isFixed, setIsFixed] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsFixed(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);

    const loadCounts = () => {
      const cartData = localStorage.getItem("cart");
      const wishlistData = localStorage.getItem("wishlist");
      const cart: StorageItem[] = cartData ? JSON.parse(cartData) : [];
      const wishlist: StorageItem[] = wishlistData
        ? JSON.parse(wishlistData)
        : [];
      setCartCount(new Set(cart.map((i) => i._id)).size);
      setWishlistCount(new Set(wishlist.map((i) => i._id)).size);
    };

    loadCounts();
    window.addEventListener("storage", loadCounts);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", loadCounts);
    };
  }, []);

  const toggleMobileDropdown = (label: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setIsCatOpen(false);
    setOpenDropdowns({});
  };

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  return (
    <div
      className={`w-full bg-white transition-all duration-300 border-b border-gray-100 ${isFixed ? "fixed top-0 left-0 z-50 shadow-md" : "relative"}`}
    >
      <div className="flex items-center justify-between px-[5%] lg:px-[10%] h-16 lg:h-20 max-w-360 mx-auto relative">
        {/* --- DESKTOP NAVIGATION --- */}
        <nav className="hidden lg:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <div key={link.label} className="relative group py-5">
              <Link
                href={link.href}
                className="flex items-center gap-1 text-[16px] Unbounded font-bold text-gray-900 hover:text-(--prim-color) transition-colors"
              >
                {link.label}{" "}
                {link.dropdown && <i className="ri-arrow-down-s-line"></i>}
              </Link>
              {link.dropdown && (
                <div className="absolute left-0 top-[90%] hidden group-hover:block bg-white shadow-2xl p-2 border border-gray-100 rounded-xl min-w-45 z-50 animate-in fade-in slide-in-from-top-1">
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={closeMenus}
                      className="block px-4 py-2 rounded-lg hover:bg-gray-50 text-xs font-semibold text-gray-600 hover:text-(--prim-color) Unbounded"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* --- MEGA DROPDOWN (CENTERED LOGIC) --- */}
        <div
          className="hidden lg:block py-6"
          onMouseEnter={() => setIsCatOpen(true)}
          onMouseLeave={() => setIsCatOpen(false)}
        >
          <button className="flex items-center gap-2 font-black Unbounded text-gray-900 tracking-tight text-sm uppercase cursor-pointer">
            Shop by Category
            <i
              className={`bi bi-chevron-down transition-transform duration-300 ${isCatOpen ? "rotate-180 text-(--prim-color)" : ""}`}
            ></i>
          </button>

          <div
            className={`absolute left-1/2 -translate-x-1/2 top-full w-[95vw] xl:w-300 z-10000 transition-all duration-300 ease-out ${isCatOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
          >
            <div className="bg-white border border-gray-100 shadow-[0_30px_70px_rgba(0,0,0,0.2)] rounded-4xl overflow-hidden flex h-[75vh] max-h-175 mt-2">
              <div className="w-[28%] bg-gray-50/50 p-4 overflow-y-auto border-r border-gray-100">
                {categories.map((cat, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setActiveCategory(cat)}
                    className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer mb-1.5 transition-all ${activeCategory.title === cat.title ? "bg-white shadow-sm text-(--prim-color)" : "text-gray-500 hover:bg-gray-100"}`}
                  >
                    <i className={`bi ${cat.icon} text-lg`}></i>
                    <div className="flex flex-col overflow-hidden">
                      <span className="font-bold text-[13px] uppercase leading-tight truncate tracking-tight">
                        {cat.title}
                      </span>
                      <span className="text-[10px] opacity-50 font-bold">
                        {cat.products}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-[72%] bg-white p-10 overflow-y-auto">
                <div className="flex justify-between items-center mb-10 border-b border-gray-50 pb-6">
                  <h2 className="text-3xl font-black Unbounded text-gray-900 uppercase tracking-tighter">
                    {activeCategory.title}
                  </h2>
                  <Link
                    href={`/shop/${slugify(activeCategory.title)}`}
                    onClick={closeMenus}
                    className="bg-(--prim-color) text-white px-6 py-2.5 rounded-full font-bold text-[11px] uppercase tracking-widest hover:brightness-90 whitespace-nowrap"
                  >
                    Shop Now
                  </Link>
                </div>

                <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-12">
                  {activeCategory.subCategories.map((sub, idx) => (
                    <div key={idx} className="flex flex-col gap-4">
                      <Link
                        href={`/shop/${slugify(activeCategory.title)}/${slugify(sub.name)}`}
                        onClick={closeMenus}
                        className="text-[12px] font-black text-gray-400 uppercase tracking-[0.15em] border-l-4 border-(--prim-color) pl-3 hover:text-black transition-colors"
                      >
                        {sub.name}
                      </Link>

                      <div className="flex flex-col gap-2.5">
                        {sub.items.map((item, itemIdx) => (
                          <Link
                            key={itemIdx}
                            href={`/shop/${slugify(activeCategory.title)}/${slugify(sub.name)}/${slugify(item)}`}
                            onClick={closeMenus}
                            className="text-[14px] text-gray-600 font-bold hover:text-(--prim-color) transition-all hover:translate-x-1"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- MOBILE VIEW --- */}
        <div className="lg:hidden flex items-center justify-between w-full py-4 gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full"
          >
            <i
              className={
                mobileMenuOpen
                  ? "ri-close-line text-2xl"
                  : "ri-menu-2-line text-2xl"
              }
            ></i>
          </button>

          <SearchBar variant="mobile" />

          <div className="flex items-center space-x-3 shrink-0">
            <Link href="/wishlist" className="relative">
              <i className="bi bi-heart text-xl text-gray-700"></i>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-(--prim-color) text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative">
              <i className="bi bi-cart3 text-xl text-gray-700"></i>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-(--prim-color) text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* --- MOBILE/TABLET SIDEBAR --- */}
      <div
        className={`fixed inset-0 z-10000 lg:hidden transition-transform duration-500 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        <div className="relative w-[85%] max-w-sm h-full bg-white overflow-y-auto">
          <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
            <span className="font-black Unbounded text-lg uppercase tracking-tighter">
              Navigation
            </span>
            <button onClick={() => setMobileMenuOpen(false)}>
              <i className="bi bi-x-lg text-xl"></i>
            </button>
          </div>

          <nav className="p-6 space-y-4">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleMobileDropdown(link.label)}
                      className="flex items-center justify-between w-full Unbounded font-bold text-gray-900 py-2"
                    >
                      {link.label}{" "}
                      <i
                        className={`ri-arrow-down-s-line transition-transform ${openDropdowns[link.label] ? "rotate-180" : ""}`}
                      ></i>
                    </button>
                    <div
                      className={`pl-4 space-y-2 overflow-hidden transition-all ${openDropdowns[link.label] ? "max-h-60 mt-2" : "max-h-0"}`}
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={closeMenus}
                          className="block font-semibold text-gray-600 hover:text-(--prim-color) Unbounded py-1"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    onClick={closeMenus}
                    className="block text-[16px] Unbounded font-bold text-gray-900 hover:text-(--prim-color)"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="px-6 py-4 border-t">
            <h3 className="text-xs font-black Unbounded text-gray-400 uppercase tracking-widest mb-4">
              Shop Categories
            </h3>
            <div className="space-y-2">
              {categories.map((cat, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setOpenDropdowns((p) => ({
                        ...p,
                        [cat.title]: !p[cat.title],
                      }))
                    }
                    className={`flex items-center justify-between w-full p-4 transition-colors ${openDropdowns[cat.title] ? "bg-(--prim-color) text-white" : "bg-white"}`}
                  >
                    <div className="flex items-center gap-3">
                      <i className={`bi ${cat.icon}`}></i>
                      <span className="font-bold text-sm uppercase whitespace-nowrap">
                        {cat.title}
                      </span>
                    </div>
                    <i
                      className={`bi bi-chevron-down transition-transform ${openDropdowns[cat.title] ? "rotate-180" : ""}`}
                    ></i>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      openDropdowns[cat.title]
                        ? "max-h-[60vh] overflow-y-auto bg-gray-50/50"
                        : "max-h-0 overflow-hidden"
                    }`}
                  >
                    <div className="p-4 space-y-6">
                      <Link
                        href={`/shop/${slugify(cat.title)}`}
                        onClick={closeMenus}
                        className="block w-full text-center bg-black text-white py-3 rounded-xl font-bold text-xs uppercase"
                      >
                        Shop All {cat.title}
                      </Link>

                      {cat.subCategories.map((sub, sIdx) => (
                        <div key={sIdx} className="space-y-3">
                          <Link
                            href={`/shop/${slugify(cat.title)}/${slugify(sub.name)}`}
                            onClick={closeMenus}
                            className="text-[10px] font-black text-(--prim-color) uppercase tracking-widest block hover:underline"
                          >
                            {sub.name}
                          </Link>
                          <div className="flex flex-col gap-3 pl-4 border-l border-gray-200">
                            {sub.items.map((it, itIdx) => (
                              <Link
                                key={itIdx}
                                href={`/shop/${slugify(cat.title)}/${slugify(sub.name)}/${slugify(it)}`}
                                onClick={closeMenus}
                                className="text-sm font-bold text-gray-500 hover:text-black transition-colors"
                              >
                                {it}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .overflow-y-auto {
          scrollbar-width: thin;
        }
        @font-face {
          font-family: "Unbounded";
          src: url("https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;900&display=swap");
        }
        .Unbounded {
          font-family: "Unbounded", sans-serif;
        }
      `}</style>
    </div>
  );
}
