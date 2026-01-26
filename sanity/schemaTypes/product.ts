import { defineType, defineField } from "sanity";

// Extracted Data from your Navbar for Dropdowns
const categories = [
  { title: "Office Supplies", value: "Office Supplies" },
  { title: "School Supplies", value: "School Supplies" },
  { title: "Ink & Toner", value: "Ink & Toner" },
  { title: "Furniture", value: "Furniture" },
  { title: "Computer & Accessories", value: "Computer & Accessories" },
  { title: "Electronics", value: "Electronics" },
  { title: "Cleaning", value: "Cleaning" },
  { title: "Breakroom", value: "Breakroom" },
  { title: "Mailing & Shipping", value: "Mailing & Shipping" },
  { title: "Shop-Greener-Products", value: "Shop-Greener-Products" },
];

const subCategories = [
  // Office Supplies
  { title: "Office Desk Accessories", value: "Office Desk Accessories" },
  { title: "Pens, Pencils and Markers", value: "Pens, Pencils and Markers" },
  {
    title: "Office Files and Document Storage",
    value: "Office Files and Document Storage",
  },
  {
    title: "Paper and Writing Materials",
    value: "Paper and Writing Materials",
  },
  { title: "General Office Consumables", value: "General Office Consumables" },
  {
    title: "Calendars and Office Diaries",
    value: "Calendars and Office Diaries",
  },

  // School Supplies
  {
    title: "Arts, Crafts and Drawing Materials",
    value: "Arts, Crafts and Drawing Materials",
  },
  {
    title: "Classroom Teaching Materials",
    value: "Classroom Teaching Materials",
  },
  {
    title: "Learning and Instructional Materials",
    value: "Learning and Instructional Materials",
  },
  { title: "Nursery and Creche Items", value: "Nursery and Creche Items" },

  // Ink & Toner
  { title: "Printer Ink Cartridges", value: "Printer Ink Cartridges" },
  { title: "Printer Toner Cartridges", value: "Printer Toner Cartridges" },
  { title: "Printer Consumables", value: "Printer Consumables" },

  // Furniture
  { title: "Office Chairs", value: "Office Chairs" },
  { title: "Office Tables & Desks", value: "Office Tables & Desks" },
  { title: "Office Storage", value: "Office Storage" },
  { title: "Office Decor & Lighting", value: "Office Decor & Lighting" },
  { title: "Office Organization", value: "Office Organization" },

  // Computer & Accessories
  { title: "Computer Accessories", value: "Computer Accessories" },
  { title: "Storage Devices", value: "Storage Devices" },
  { title: "Laptops & Gadgets", value: "Laptops & Gadgets" },
  { title: "Networking Equipment", value: "Networking Equipment" },
  { title: "Computer Parts", value: "Computer Parts" },

  // Electronics
  { title: "Audio Devices", value: "Audio Devices" },
  { title: "Gaming Accessories", value: "Gaming Accessories" },
  { title: "Power Solutions", value: "Power Solutions" },
  { title: "Smart Devices", value: "Smart Devices" },

  // Cleaning
  { title: "Cleaning Chemicals", value: "Cleaning Chemicals" },
  { title: "Cleaning Tools", value: "Cleaning Tools" },
  { title: "Air & Ventilation", value: "Air & Ventilation" },

  // Breakroom
  { title: "Drinks", value: "Drinks" },
  { title: "Snacks", value: "Snacks" },
  { title: "Kitchen Appliances", value: "Kitchen Appliances" },

  // Mailing & Shipping
  { title: "Packaging Boxes", value: "Packaging Boxes" },
  { title: "Envelopes & Mailers", value: "Envelopes & Mailers" },
  { title: "Packaging Materials", value: "Packaging Materials" },

  // Shop-Greener-Products
  { title: "Eco Office Supplies", value: "Eco Office Supplies" },
  { title: "Sustainable Living", value: "Sustainable Living" },
];

const subNames = [
  // Office Desk Accessories
  "Staplers and Punchers",
  "Cellotape and Tape Dispensers",
  "Office Desk Organisers",
  "Office Scissors and Paper Cutters",
  "Office Clipboards",
  "Measuring Rulers and Scales",
  "Pen Holders and Pencil Cups",
  "Office Writing Pads",

  // Pens, Pencils and Markers
  "Biro Pens",
  "Gel Pens and Rollerball Pens",
  "Office Highlighters",
  "HB Pencils and Erasers",
  "Permanent Markers",
  "Correction Fluid and Correction Tape",
  "Pen Refills",
  "Fancy and Fountain Pens",

  // Office Files and Document Storage
  "Office File Jackets",
  "Expanding File Folders",
  "Suspension Files",
  "Plastic Storage Boxes",
  "Office Labels and Price Tags",
  "Sectional File Folders",
  "Ring Binders",

  // Paper and Writing Materials
  "A4 Printing Paper",
  "Exercise Books and Notebooks",
  "Sticky Notes",
  "Office Envelopes",
  "Cardboard and Card Paper",
  "Loose Writing Sheets",
  "Legal Writing Pads",
  "Photo Printing Paper",

  // General Office Consumables
  "Paper Clips",
  "Rubber Bands",
  "Drawing Pins",
  "Office Glue and Adhesives",
  "Office Stamps and Ink Pads",
  "Office Batteries",
  "First Aid Boxes",
  "Office Scissors",

  // Calendars and Office Diaries
  "Wall Calendars",
  "Desk Calendars",
  "Office Diaries",
  "Academic Planners",
  "Whiteboards and Notice Boards",

  // School Bags and Lunch Items
  "Primary School Backpacks",
  "Laptop School Bags",
  "Lunch Bags and Lunch Boxes",
  "Plastic Water Bottles",
  "Drawstring School Bags",
  "Side and Shoulder Bags",

  // Arts, Crafts and Drawing Materials
  "Crayons and Colour Pencils",
  "Washable Markers",
  "Drawing and Art Paper",
  "Glitter, Gum and Adhesives",
  "Drawing Books and Sketch Pads",
  "Water Colour Paint",
  "Poster and Acrylic Paint",

  // Classroom Teaching Materials
  "Whiteboards",
  "Notice Boards",
  "Educational Wall Charts",
  "Board Markers",
  "Board Borders and Trimmers",
  "Teacher Storage Organisers",

  // Learning and Instructional Materials
  "Scientific Calculators",
  "Mathematical Sets",
  "Flash Cards",
  "Teaching Aids",
  "World Globes",
  "Basic Science Kits",

  // Nursery and Creche Items
  "Educational Puzzles",
  "Building Blocks",
  "Children Story Books",
  "Finger Paint",
  "Alphabet Learning Toys",

  // Printer Ink Cartridges
  "HP Ink Cartridges",
  "Epson Printer Ink",
  "Canon Printer Ink",
  "Brother Printer Ink",
  "Compatible Ink Cartridges",

  // Printer Toner Cartridges
  "HP Laser Toner",
  "Brother Laser Toner",
  "Canon Laser Toner",
  "Samsung Toner",
  "Xerox Toner",

  // Printer Consumables
  "Photo Printing Paper",
  "EcoTank Ink Bottles",
  "Original and Compatible Cartridges",
  "Printer Maintenance Kits",

  // Office Chairs
  "Executive Office Chairs",
  "Mesh Office Chairs",
  "Visitor Chairs",
  "Secretarial Chairs",
  "Drafting Chairs",
  "Gaming Chairs",
  "Heavy Duty Chairs",

  // Office Tables & Desks
  "Office Workstations",
  "Office Tables",
  "Computer Tables",
  "Conference Tables",
  "Training Tables",
  "Folding Tables",
  "Reception Counters",

  // Office Storage
  "Filing Cabinets",
  "Office Book Shelves",
  "Metal Cabinets",
  "Office Lockers",
  "Office Safes",
  "Drawer Units",
  "Steel Shelving",

  // Office Decor & Lighting
  "Table Lamps",
  "Standing Lamps",
  "Office Rugs",
  "Wall Clocks",
  "Artificial Flowers",
  "Picture Frames",
  "Office Mirrors",

  // Office Organization
  "Coat Hangers",
  "Document Racks",
  "Magazine Holders",
  "Garment Racks",
  "Wall File Holders",

  // Computer Accessories
  "Wireless Mouse",
  "USB Keyboards",
  "Web Cameras",
  "Microphones",
  "Computer Speakers",
  "Mouse Pads",
  "Drawing Tablets",
  "Game Controllers",

  // Storage Devices
  "External Hard Drives",
  "Portable SSDs",
  "Flash Drives",
  "Memory Cards",
  "Backup Drives",
  "Network Storage",

  // Laptops & Gadgets
  "Business Laptops",
  "Student Laptops",
  "Tablets",
  "Laptop Bags",
  "Privacy Screens",
  "Laptop Stands",
  "iPad Accessories",

  // Networking Equipment
  "Wi-Fi Routers",
  "Network Switches",
  "LAN Cables",
  "Wi-Fi Extenders",
  "Modems",
  "Network Adapters",
  "Fiber Optic Cables",

  // Computer Parts
  "SSD & HDD",
  "RAM",
  "Graphics Cards",
  "Processors",
  "Power Supply Units",
  "Motherboards",
  "System Units",

  // Audio Devices
  "Wireless Headsets",
  "Bluetooth Earphones",
  "Sound Systems",
  "Portable Speakers",
  "Public Address Systems",
  "Mixers",

  // Gaming Accessories
  "Game Controllers",
  "Gaming Headphones",
  "RGB Keyboards",
  "Gaming Mouse",
  "Gaming Monitors",
  "Steering Wheels",

  // Power Solutions
  "Power Banks",
  "Extension Boxes",
  "UPS Inverters",
  "Charging Cables",
  "USB Hubs",
  "Voltage Regulators",
  "Power Adapters",

  // Smart Devices
  "CCTV Cameras",
  "Smart Bulbs",
  "Smart Sockets",
  "Video Door Phones",
  "Smart Door Locks",

  // Cleaning Chemicals
  "Disinfectants",
  "Hand Sanitizers",
  "Floor Wash",
  "Glass Cleaners",
  "Liquid Soap",
  "Industrial Degreasers",
  "Laundry Soap",

  // Cleaning Tools
  "Brooms",
  "Mops",
  "Cleaning Cloths",
  "Waste Bins",
  "Tissue Paper",
  "Vacuum Cleaners",
  "Buckets",

  // Air & Ventilation
  "Air Fresheners",
  "Standing Fans",
  "Wall Fans",
  "Dehumidifiers",
  "Heaters",

  // Drinks
  "Coffee",
  "Tea",
  "Bottled Water",
  "Soft Drinks",
  "Fruit Juice",
  "Energy Drinks",
  "Chocolate Drinks",

  // Snacks
  "Biscuits",
  "Chips",
  "Sweets",
  "Sugar & Sweeteners",
  "Creamers",
  "Light Snacks",
  "Protein Snacks",

  // Kitchen Appliances
  "Microwave Ovens",
  "Electric Kettles",
  "Coffee Machines",
  "Mini Refrigerators",
  "Toasters",
  "Water Dispensers",

  // Packaging Boxes
  "Carton Boxes",
  "Moving Cartons",
  "Storage Boxes",
  "Poster Tubes",
  "Heavy Duty Cartons",

  // Envelopes & Mailers
  "Bubble Envelopes",
  "Courier Bags",
  "Padded Envelopes",
  "Office Envelopes",
  "Document Envelopes",

  // Packaging Materials
  "Packing Tape",
  "Bubble Nylon",
  "Wrapping Paper",
  "Stretch Film",
  "Foam Packaging",
  "Tape Dispensers",

  // Eco Office Supplies
  "Recycled Paper",
  "Eco Pens",
  "Bamboo Desk Items",
  "Solar Chargers",
  "Eco Cleaning Products",
  "Recycled Envelopes",

  // Sustainable Living
  "Disposable Eco Plates",
  "Wooden Cutlery",
  "Organic Tea",
  "Recycled Tissue",
  "Solar Power Banks",
];

export default defineType({
  name: "product",
  title: "Product",
  type: "document",

  fields: [
    // PRODUCT IMAGES
    defineField({
      name: "image",
      title: "Product Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (Rule) => Rule.min(1).required(),
    }),
    // PRODUCT NAME
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    // SLUG
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 90,
      },
      validation: (Rule) => Rule.required(),
    }),

    // PRICE
    defineField({
      name: "price",
      title: "Price (₦)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),

    // LESS PRICE
    defineField({
      name: "lessprice",
      title: "lessPrice (₦)",
      type: "number",
    }),

    defineField({
      name: "ctg",
      title: "ctg",
      type: "string",
    }),

    defineField({
      name: "sale",
      title: "sale",
      type: "string",
    }),

    {
      name: "review",
      title: "Review Count",
      type: "number",
      description: "Number of reviews ",
    },

    {
      name: "soldCurrent",
      title: "Sold (Current)",
      type: "number",
      description: "Items sold so far",
    },

    {
      name: "soldTotal",
      title: "Sold (Total)",
      type: "number",
      description: "Total stock or target ",
    },
    // PRODUCT DESCRIPTION
    defineField({
      name: "details",
      title: "Product Details",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),

    // --- CATEGORY SECTION (KEEP AS-IS) ---
    // defineField({
    //   name: "category",
    //   title: "Main Category",
    //   type: "string",
    //   options: { list: categories },
    // }),

    defineField({
      name: "subCategory",
      title: "Sub Category",
      type: "string",
      options: { list: subCategories },
    }),

    defineField({
      name: "subName",
      title: "Sub Name (Item Group)",
      description: "e.g., 'Biro Pens' or 'A4 Printing Paper'",
      type: "string",
      options: {
        list: subNames.map((name) => ({ title: name, value: name })),
      },
    }),

    // ----------------------------------
    // 🔽 RENAMED FIELDS (NO DUPLICATES)

    // Secondary / Display Images (for promos, sections, etc.)
    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image" }],
    }),

    defineField({
      name: "rating",
      title: "Rating (1–5)",
      type: "number",
    }),

    defineField({
      name: "soldCurrentCount",
      title: "Sold (Current)",
      type: "number",
    }),

    defineField({
      name: "soldTotalCount",
      title: "Sold (Total)",
      type: "number",
    }),

    defineField({
      name: "saleLabel",
      title: "Sale Label (e.g. -50%)",
      type: "string",
    }),

    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
    }),

    // STOCK STATUS
    defineField({
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      initialValue: true,
    }),

    defineField({
      name: "isbanner",
      title: "Banner",
      type: "boolean",
      initialValue: false,
    }),
    // FEATURE FLAGS (FOR SECTIONS)
    defineField({
      name: "isBestDeal",
      title: "Best Deal",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "title",
      title: "title",
      type: "string",
      description: "Controls title of products in Best Deals section",
    }),

    defineField({
      name: "isBestOffer",
      title: "Best Offer ",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "isHero",
      title: "Hero ",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "Hero_order",
      title: "Hero_order",
      type: "number",
      description: "Controls order of products in Hero section",
    }),

    defineField({
      name: "small_text",
      title: "small_text",
      type: "string",
      description: "Controls title of products in Hero section",
    }),

    defineField({
      name: "ispromo_banner",
      title: "Banner ",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "banner_text",
      title: "banner_text",
      type: "string",
      description: "Controls samll text of products in Promo banner section",
    }),

    defineField({
      name: "description",
      title: "description",
      type: "string",
      description: "Controls description of products in Promo banner section",
    }),

    defineField({
      name: "promobanner_order",
      title: "promobanner_order",
      type: "number",
      description: "Controls order of products in Promo banner section",
    }),

    defineField({
      name: "bestDealOrder",
      title: "Best Deal Order",
      type: "number",
      description: "Controls order of products in Best Deals section",
    }),

    defineField({
      name: "isBestSales",
      title: "Best Sales",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "BestSales",
      title: "Best Sales",
      type: "number",
      description: "best sales product",
    }),

    defineField({
      name: "isArrivals",
      title: "New Arrival",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isHotDeal",
      title: "Hot Deals Product",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "HotDealOrder",
      title: "Hot Deal Order",
      type: "number",
      description: "Controls order of products in Hot Deals section",
    }),
    defineField({
      name: "isShortProducts",
      title: "Short Products",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isTopSelling",
      title: "Top Selling",
      type: "boolean",
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: "name",
      media: "image.0",
      price: "price",
    },
    prepare(selection) {
      const { title, media, price } = selection;
      return {
        title,
        media,
        subtitle: `₦${price}`,
      };
    },
  },
});
export { categories, subCategories, subNames };
