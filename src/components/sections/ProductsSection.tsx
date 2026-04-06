import { Product } from "../../types";
import ProductCard from "../ui/ProductCard";
import SectionHeader from "../ui/SectionHeader";

interface ProductsSectionProps {
  title: string;
  titleItalic: string;
  products: Product[];
  viewAllPath?: string;
  viewAllLabel?: string;
  bg?: string;
}

const ProductsSection = ({
  title,
  titleItalic,
  products,
  viewAllPath,
  viewAllLabel,
  bg = "bg-white",
}: ProductsSectionProps) => {
  return (
    <section className={`${bg} py-16 px-6`}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title={title}
          titleItalic={titleItalic}
          viewAllPath={viewAllPath}
          viewAllLabel={viewAllLabel}
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
