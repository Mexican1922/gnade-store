const announcements = [
  "Free delivery on orders above ₦20,000",
  "Pay with Paystack — card, transfer & USSD",
  "Lagos delivery: 24–48hrs",
  "Nationwide delivery: 3–5 working days",
  "Authentic natural skincare products",
];

const AnnouncementBar = () => {
  const track = [...announcements, ...announcements];

  return (
    <div className="bg-gnade-dark overflow-hidden py-2">
      <div className="flex animate-marquee whitespace-nowrap">
        {track.map((item, i) => (
          <span
            key={i}
            className="text-white/80 text-[11px] tracking-[1.5px] uppercase px-10"
          >
            {item}
            <span className="mx-8 text-white/30">·</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;
