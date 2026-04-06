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
import { newProducts, bestSellers } from "../data/products";

const Home = () => {
  return (
    <>
      <HeroSlider />
      <MarqueeStrip />
      <CategoriesSection />
      <ProductsSection
        title="New"
        titleItalic="in Stock"
        products={newProducts}
        viewAllPath="/shop"
        viewAllLabel="Shop Latest"
        bg="bg-white"
      />
      <EditorialBanner />
      <SkinConcernSection />
      <ProductsSection
        title="Best"
        titleItalic="Sellers"
        products={bestSellers}
        viewAllPath="/shop"
        viewAllLabel="More Products"
        bg="bg-gnade-cream"
      />
      <EmpathySection />
      <HowItWorksSection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
};

export default Home;
