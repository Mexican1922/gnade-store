import { Link } from "react-router-dom";

interface SectionHeaderProps {
  title: string;
  titleItalic?: string;
  viewAllPath?: string;
  viewAllLabel?: string;
}

const SectionHeader = ({
  title,
  titleItalic,
  viewAllPath,
  viewAllLabel = "View All",
}: SectionHeaderProps) => {
  return (
    <div className="flex items-baseline justify-between mb-10">
      <h2 className="font-serif text-3xl md:text-4xl font-semibold text-gnade-black">
        {title}{" "}
        {titleItalic && (
          <em className="italic text-gnade-light">{titleItalic}</em>
        )}
      </h2>
      {viewAllPath && (
        <Link
          to={viewAllPath}
          className="text-[11px] tracking-[1.5px] uppercase text-gnade-dark border-b border-gnade-dark pb-0.5 hover:opacity-70 transition-opacity duration-200"
        >
          {viewAllLabel}
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;