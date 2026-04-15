import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import SearchModal from "../ui/SearchModal";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "Skincare", path: "/shop?category=skincare" },
  { label: "Lipcare", path: "/shop?category=lipcare" },
  { label: "Spa", path: "/spa" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const { totalItems } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${
          scrolled ? "shadow-sm" : "border-b border-black/8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none select-none">
            <span className="font-serif text-xl font-semibold tracking-[3px] text-gnade-dark">
              GNADE
            </span>
            <span className="text-[9px] tracking-[1.5px] uppercase text-gnade-dark/50 font-sans">
              Essential Skincare & Spa
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8 list-none">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.path}
                  className="relative text-[12.5px] tracking-[0.3px] text-gnade-black hover:text-gnade-dark transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[1px] after:bg-gnade-dark after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="w-8 h-8 flex items-center justify-center rounded-full border border-black/10 hover:bg-gnade-pale hover:border-gnade-dark/20 transition-all duration-200"
            >
              <Search size={14} strokeWidth={1.5} />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative w-8 h-8 flex items-center justify-center rounded-full border border-black/10 hover:bg-gnade-pale hover:border-gnade-dark/20 transition-all duration-200"
            >
              <Heart size={14} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gnade-pink text-gnade-dark text-[8px] font-semibold rounded-full flex items-center justify-center leading-none">
                  {wishlistCount > 9 ? "9+" : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              aria-label="Cart"
              className="relative w-8 h-8 flex items-center justify-center rounded-full border border-black/10 hover:bg-gnade-pale hover:border-gnade-dark/20 transition-all duration-200"
            >
              <ShoppingBag size={14} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gnade-dark text-white text-[8px] font-semibold rounded-full flex items-center justify-center leading-none">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>

            {/* Mobile hamburger */}
            <button
              aria-label="Toggle menu"
              className="md:hidden w-8 h-8 flex items-center justify-center"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X size={18} strokeWidth={1.5} />
              ) : (
                <Menu size={18} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-black/8 px-6 py-4 sticky top-16 z-40 mobile-menu-enter">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-[14px] text-gnade-black border-b border-black/5 last:border-none hover:text-gnade-dark hover:pl-2 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {/* Search Modal */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;
