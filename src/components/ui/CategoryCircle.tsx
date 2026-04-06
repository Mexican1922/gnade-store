import { Link } from "react-router-dom";

interface CategoryCircleProps {
  label: string;
  image: string;
  path: string;
}

const CategoryCircle = ({ label, image, path }: CategoryCircleProps) => {
  return (
    <Link
      to={path}
      className="flex flex-col items-center gap-3 group cursor-pointer"
    >
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-transparent group-hover:border-gnade-light transition-all duration-300 shadow-sm group-hover:shadow-md">
        <img
          src={image}
          alt={label}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <span className="text-[12px] font-medium tracking-[0.5px] text-gnade-black group-hover:text-gnade-dark transition-colors duration-200">
        {label}
      </span>
    </Link>
  );
};

export default CategoryCircle;