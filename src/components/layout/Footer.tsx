import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const footerLinks = {
  Products: [
    { label: "Lipcare", path: "/shop?category=lipcare" },
    { label: "Face Care", path: "/shop?category=face" },
    { label: "Body Lotion", path: "/shop?category=body" },
    { label: "Natural Oils", path: "/shop?category=oils" },
    { label: "Soaps & Scrubs", path: "/shop?category=soaps" },
    { label: "Spa Services", path: "/spa" },
  ],
  Account: [
    { label: "My Account", path: "/account" },
    { label: "Track My Order", path: "/account/orders" },
    { label: "Wishlist", path: "/wishlist" },
    { label: "Cart", path: "/cart" },
  ],
  Info: [
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Delivery Info", path: "/delivery" },
    { label: "Return Policy", path: "/returns" },
    { label: "Privacy Policy", path: "/privacy" },
    { label: "FAQ", path: "/faq" },
  ],
};

const socialLinks = [
  { label: "IG", path: "https://instagram.com" },
  { label: "TK", path: "https://tiktok.com" },
  { label: "FB", path: "https://facebook.com" },
  { label: "YT", path: "https://youtube.com" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gnade-black pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-white/8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex flex-col leading-none mb-5">
              <span className="font-serif text-xl font-semibold tracking-[3px] text-white">
                GNADE
              </span>
              <span className="text-[9px] tracking-[1.5px] uppercase text-white/30 mt-0.5">
                Essential Skincare & Spa
              </span>
            </Link>

            <p className="text-[13px] text-white/40 leading-relaxed font-light mb-6 max-w-xs">
              Premium skincare crafted with natural ingredients. Trusted by
              thousands of customers across Nigeria.
            </p>

            {/* Tagline */}
            <p className="text-[11px] text-white/20 italic font-serif mb-8">
              "give your skin that irresistible glow..."
            </p>

            {/* Socials */}
            <div className="flex gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.path}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-[10px] font-semibold text-white/40 hover:border-white/40 hover:text-white/80 transition-all duration-200"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[10px] tracking-[2px] uppercase text-white/30 mb-5">
                {title}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-[12px] text-white/50 hover:text-white/80 transition-colors duration-200 font-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/25 tracking-[0.3px]">
            © {currentYear} GNADE Essential Skincare & Spa. All rights reserved.
          </p>

          <a
            href="https://valentine-azolibe.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] text-white/25 hover:text-white/50 transition-colors duration-200 tracking-[0.3px]"
          >
            Built by valentine-azolibe.vercel.app
            <ArrowRight size={10} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
