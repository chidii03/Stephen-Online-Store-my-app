import Hero from "./Hero/Hero";
import Category from "./Categories/Category";
import Banners from "./Promotion-Banner/Banners";
import Deals from "./Deals/Deals";
import Offers from "./Offers-Banner/Offers";
import TopSelling from "./TopSelling/TopSelling";
import HotDeals from "./Hot-Deals/HotDeals";
import BestSales from "./BestSales/BestSales";
import Banner from "./Banner/Banner";
import ShortProducts from "./Short-Products/Products";
import Partners from "./Partner/Partners";
import Arrivals from "./New-arrivals/Arrivals";
import Newsletter from "@/app/Components/Newsletter";
import Benefits from "./Benefits/Benefits";

export default function Index() {
  return (
    <main className="animate-fadeIn">
      <>
        <Hero />
        <Category />
        <Banners />
        <Deals />
        <Offers />
        <TopSelling />
        <HotDeals />
        <BestSales />
        <Banner />
        <ShortProducts />
        <Arrivals/>
        <Benefits/>
        <Partners />
        <Newsletter/>
      </>
    </main>
  );
}
