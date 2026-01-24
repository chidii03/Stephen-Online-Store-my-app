## Steve Obizz Stationey Store 🛒

A full-stack, modern e-commerce platform built for speed and scalability. This project specializes in Office Supplies, School Supplies, Electronics, and Furniture, featuring a dynamic product catalog managed via a Headless CMS (Sanity).

## 🚀 Project Overview

The Steve Obizz Store was designed to solve specific UI/UX challenges found in traditional e-commerce templates. It features a highly responsive "Mega Menu" navigation, dynamic routing for deep categorization (Category > SubCategory > Item), and a simplified backend workflow for easy product management.

## Key Features

Dynamic Mega Menu: A complex, hover-activated dropdown that organizes 800+ items without cluttering the UI.

Deep Linking & Routing: Supports URLs like /shop/office-supplies/pens/biro-pens.

Responsive Design: optimized for mobile, tablet, and desktop. Special attention was paid to breadcrumbs and long titles on small screens.

Headless Backend: Products are stored in Sanity.io, allowing for real-time updates without redeploying the frontend.

Smart Search: (In Progress) fast, client-side filtering.

## 🛠 Tech Stack

# Frontend

Framework: Next.js 15+ (App Router)

Styling: Tailwind CSS

Icons: Bootstrap Icons (bi-) & Remix Icons (ri-)

Fonts: Unbounded (Google Fonts) for headings, standard sans for body.

# Backend & Database

CMS: Sanity.io

Query Language: GROQ (Graph-Relational Object Queries)

Data Structure: Schema-less documents tailored for high flexibility.

## ⚙️ Architecture & Evolution

1. The Frontend Journey
   We started by building a high-fidelity UI focusing on user experience.

The Navbar Challenge: We initially hardcoded categories in BottomNav.tsx. As the catalog grew to 10+ categories and 50+ subcategories, we created a "Fixed on Scroll" feature and a Mobile Drawer to handle navigation gracefully.

UI Breakage: Long text strings (e.g., "Office Files and Document Storage") broke the mobile layout. We solved this by implementing CSS truncation (text-overflow: ellipsis) and responsive font sizing (text-2xl md:text-5xl) in the dynamic product pages.

2. The Backend Transition (Sanity)
   We moved through two major phases of database design:

Phase 1 (Relational approach): Initially, we considered creating separate Documents for Category and referencing them in Product.

Problem: This required the admin to jump between multiple tabs in Sanity Studio just to add one product. It was too slow for data entry.

Phase 2 (The "Dropdown" Solution - Current): We refactored product.ts to use String Dropdowns (options: { list: [...] }).

Solution: We extracted the hardcoded data from the Navbar and injected it directly into the Sanity Schema.

# Benefit: The admin can now select "Office Supplies" -> "Pens" -> "Biro Pens" directly inside the Product form. No extra clicks. No breaking references.

## 📂 Project Structure

Bash
├── app/
│ ├── Components/
│ │ ├── BottomNav.tsx # The Mega Menu & Mobile Logic
│ │ ├── ProductCard.tsx # Reusable UI for displaying items
│ │ └── ...
│ ├── shop/
│ │ └── [...slug]/ # Dynamic Route Catch-all
│ │ └── page.tsx # Handles /shop/category/subcategory
│ ├── layout.tsx # Global font & style imports
│ └── page.tsx # Homepage
├── sanity/
│ ├── schemaTypes/
│ │ └── product.ts # The Master Schema (Dropdowns & Fields)
│ └── ...
├── public/ # Static assets
└── ...

## 🔌 Installation & Setup

# Clone the repository:

Bash
git clone https://github.com/your-username/steve-obizz-store.git
cd steve-obizz-store
Install Dependencies:

Bash

# npm install

# or

yarn install
Environment Variables: Create a .env.local file in the root:

# Code snippet

NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
Run Development Server:

Bash
npm run dev
Open http://localhost:3000 to view the store.

📝 Managing Products (Sanity Studio)
Start the Studio: Usually runs on a separate route or locally via:

Bash
npx sanity start
(Or access via localhost:3000/studio if configured in Next.js).

# Add a Product:

Go to Product.

Name: Enter the specific item name (e.g., "HP Deskjet 2300").

Slug: Click "Generate" (creates hp-deskjet-2300).

Category (Dropdown): Select Main Category (e.g., "Electronics").

Sub Category (Dropdown): Select Sub (e.g., "Printers").

Sub Name (Dropdown): Select specific group (e.g., "Inkjet Printers").

Images: Upload one or multiple.

Frontend Sync: The frontend query uses lower(category) == $currentSlug. Ensure your URLs match the dropdown values (handled automatically by the Navbar logic).

🚑 Troubleshooting Common Issues
Breadcrumbs overlapping on mobile:

Fix: Ensure whitespace-nowrap and truncate classes are applied to the breadcrumb spans.

"No Products Found":

Check: Did you capitalize the slug in the URL manually? The query expects the URL slug to be lowercase (e.g., office-supplies) but the Database value is Title Case (Office Supplies). The code handles this via currentSlugRaw.replace(/-/g, " ").toLowerCase().

Sanity CORS Error:

Fix: Go to Sanity Dashboard > API > CORS Origins and add http://localhost:3000.

## 🔮 Future Roadmap

Cart Functionality: Implementing Context API / Redux for state management.

Checkout: Integration with Stripe or Paystack.

User Auth: Login/Register for order tracking.

Search Bar: Full-text search using Sanity GROQ.

# Author: Stephen Okwu

What's App :+234 807 937 9510
Instagram:https://instagram.com/nexelitee
Twitter: https://twitter.com/chidi_03
License: MIT
