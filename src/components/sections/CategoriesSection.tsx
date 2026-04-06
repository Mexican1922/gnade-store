import SectionHeader from "../ui/SectionHeader";
import CategoryCircle from "../ui/CategoryCircle";

const categories = [
  {
    label: "Lipcare",
    image: "/images/cat-lipcare.jpg",
    path: "/shop?category=lipcare",
  },
  {
    label: "Face Care",
    image: "/images/cat-face.jpg",
    path: "/shop?category=face",
  },
  {
    label: "Body Lotion",
    image: "/images/cat-body.jpg",
    path: "/shop?category=body",
  },
  {
    label: "Natural Oils",
    image: "/images/cat-oils.jpg",
    path: "/shop?category=oils",
  },
  {
    label: "Soaps",
    image: "/images/cat-soaps.jpg",
    path: "/shop?category=soaps",
  },
  { label: "Spa", image: "/images/cat-spa.jpg", path: "/spa" },
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
