const items = [
  "Give your skin that irresistible glow",
  "Natural beauty powered by nature",
  "Skincare you can trust",
  "Glow from within",
  "Premium natural ingredients",
  "Crafted for your skin",
];

const MarqueeStrip = () => {
  const track = [...items, ...items];

  return (
    <div className="bg-gnade-dark overflow-hidden py-3">
      <div className="flex animate-marquee whitespace-nowrap">
        {track.map((item, i) => (
          <span
            key={i}
            className="font-serif text-[15px] italic text-white/80 px-8"
          >
            {item}
            <span className="mx-6 text-gnade-light not-italic text-[11px]">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeStrip;
