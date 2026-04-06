import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeader from "../ui/SectionHeader";

const concerns = [
  {
    label: "Acne & Breakouts",
    description: "Targeted formulas that clear and prevent breakouts",
    path: "/shop?concern=acne",
    image: "/images/concern-acne.jpg",
  },
  {
    label: "Dark Spots",
    description: "Brighten and fade hyperpigmentation effectively",
    path: "/shop?concern=dark-spots",
    image: "/images/concern-darkspots.jpg",
  },
  {
    label: "Dull Skin & Glow",
    description: "Restore radiance and natural luminosity",
    path: "/shop?concern=glow",
    image: "/images/concern-glow.jpg",
  },
  {
    label: "Dry & Dehydrated",
    description: "Deep hydration that lasts all day",
    path: "/shop?concern=dry",
    image: "/images/concern-dry.jpg",
  },
  {
    label: "Oily Skin",
    description: "Balance and control excess sebum production",
    path: "/shop?concern=oily",
    image: "/images/concern-oily.jpg",
  },
  {
    label: "Uneven Skin Tone",
    description: "Even out your complexion for a smooth finish",
    path: "/shop?concern=uneven",
    image: "/images/concern-uneven.jpg",
  },
];

const SkinConcernSection = () => {
  return (
    <section className="bg-gnade-cream py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Shop by"
          titleItalic="Skin Concern"
          viewAllPath="/shop"
          viewAllLabel="View All"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
          {concerns.map((concern) => (
            <Link
              key={concern.label}
              to={concern.path}
              className="group flex flex-col gap-3"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-gnade-pale">
                <img
                  src={concern.image}
                  alt={concern.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>

              {/* Label */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-medium text-gnade-black group-hover:text-gnade-dark transition-colors duration-200">
                    {concern.label}
                  </span>
                  <ArrowRight
                    size={11}
                    strokeWidth={1.5}
                    className="text-gnade-dark opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0"
                  />
                </div>
                <p className="text-[11px] text-gnade-black/40 leading-relaxed mt-0.5 font-light">
                  {concern.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkinConcernSection;
