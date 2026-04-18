import SectionHeader from "../ui/SectionHeader";
import CategoryCircle from "../ui/CategoryCircle";

const categories = [
  {
    label: "Lipcare",
    image: "/images/cat-lipcare.webp",
    path: "/shop?category=lipcare",
  },
  {
    label: "Face Care",
    image: "/images/cat-face.webp",
    path: "/shop?category=face",
  },
  {
    label: "Body Lotion",
    image: "/images/cat-body.webp",
    path: "/shop?category=body",
  },
  {
    label: "Natural Oils",
    image: "/images/cat-oils.webp",
    path: "/shop?category=oils",
  },
  {
    label: "Soaps",
    image: "/images/cat-soaps.webp",
    path: "/shop?category=soaps",
  },
  { label: "Spa", image: "/images/cat-spa.webp", path: "/spa" },
];

const CategoriesSection = () => {
  return (
    <section className="bg-gnade-pale py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Shop by"
          titleItalic="Category"
          viewAllPath="/shop"
        />
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {categories.map((cat) => (
            <CategoryCircle
              key={cat.label}
              label={cat.label}
              image={cat.image}
              path={cat.path}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
