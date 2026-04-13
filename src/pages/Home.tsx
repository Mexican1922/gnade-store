import { useState, useEffect } from "react";
import HeroSlider from "../components/layout/HeroSlider";
import MarqueeStrip from "../components/layout/MarqueeStrip";
import CategoriesSection from "../components/sections/CategoriesSection";
import ProductsSection from "../components/sections/ProductsSection";
import EditorialBanner from "../components/sections/EditorialBanner";
import SkinConcernSection from "../components/sections/SkinConcernSection";
import EmpathySection from "../components/sections/EmpathySection";
import HowItWorksSection from "../components/sections/HowItWorksSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import NewsletterSection from "../components/sections/NewsletterSection";
import ScrollReveal from "../components/ui/ScrollReveal";
import { productsAPI } from "../services/api";
import { Product } from "../types";
import { toProduct } from "../utils/adapters";

const Home = () => {
  const [newProductsItems, setNewProductsItems] = useState<Product[]>([]);
  const [bestSellersItems, setBestSellersItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        setLoading(true);
        const [newRes, bestRes] = await Promise.all([
          productsAPI.getAll({ tag: "new" }),
          productsAPI.getAll({ tag: "bestseller" }),
        ]);

        setNewProductsItems(newRes.map(toProduct).slice(0, 4));
        setBestSellersItems(bestRes.map(toProduct).slice(0, 4));
      } catch (err) {
        console.error("Failed to fetch home products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeProducts();
  }, []);
  return (
    <>
      <HeroSlider />
      <ScrollReveal yOffset={20}>
        <MarqueeStrip />
      </ScrollReveal>
      
      <ScrollReveal delay={0.1}>
        <CategoriesSection />
      </ScrollReveal>

      {loading ? (
        <section className="bg-white py-16 px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[300px]">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-6 w-32 bg-gnade-pale rounded mb-2"></div>
              <div className="h-4 w-24 bg-gnade-pale rounded"></div>
            </div>
          </div>
        </section>
      ) : (
        <ScrollReveal>
          <ProductsSection
            title="New"
            titleItalic="in Stock"
            products={newProductsItems}
            viewAllPath="/shop?tag=new"
            viewAllLabel="Shop Latest"
            bg="bg-white"
          />
        </ScrollReveal>
      )}

      <ScrollReveal>
        <EditorialBanner />
      </ScrollReveal>

      <ScrollReveal>
        <SkinConcernSection />
      </ScrollReveal>

      {loading ? (
        <section className="bg-gnade-cream py-16 px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[300px]">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-6 w-32 bg-white rounded mb-2"></div>
              <div className="h-4 w-24 bg-white rounded"></div>
            </div>
          </div>
        </section>
      ) : (
        <ScrollReveal>
          <ProductsSection
            title="Best"
            titleItalic="Sellers"
            products={bestSellersItems}
            viewAllPath="/shop?tag=bestseller"
            viewAllLabel="More Products"
            bg="bg-gnade-cream"
          />
        </ScrollReveal>
      )}

      <ScrollReveal>
        <EmpathySection />
      </ScrollReveal>

      <ScrollReveal>
        <HowItWorksSection />
      </ScrollReveal>

      <ScrollReveal>
        <TestimonialsSection />
      </ScrollReveal>

      <ScrollReveal>
        <NewsletterSection />
      </ScrollReveal>
    </>
  );
};

export default Home;
