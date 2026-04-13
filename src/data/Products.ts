import { Product } from "../types";

export const newProducts: Product[] = [
  {
    id: 1,
    slug: "glossy-lip-butter-rose",
    name: "Glossy Lip Butter Rose",
    category: "Lipcare",
    price: 3500,
    image: "/images/glossy.jpg",
    hoverImage: "/images/model-lipstick.jpg",
    badge: "Best Seller",
    stockCount: 8,
    inStock: true,
    description:
      "A deeply nourishing lip butter infused with rose extract and shea butter. Leaves your lips soft, hydrated and with a gorgeous glossy finish that lasts all day.",
    usage:
      "Apply generously to lips as needed throughout the day. Can be worn alone or over lip colour for extra shine and moisture.",
    ingredients: [
      "Shea Butter",
      "Rose Extract",
      "Vitamin E",
      "Jojoba Oil",
      "Beeswax",
      "Sweet Almond Oil",
    ],
    images: ["/images/glossy.jpg", "/images/model-lipstick.jpg"],
  },
  {
    id: 2,
    slug: "brightening-vitamin-c-serum",
    name: "Brightening Vitamin C Serum",
    category: "Face Care",
    price: 6500,
    originalPrice: 7200,
    image: "/images/vit-serum.jpg",
    hoverImage: "/images/model-serum.jpg",
    badge: "Sale",
    inStock: true,
    description:
      "A powerful brightening serum packed with stabilised Vitamin C, Niacinamide and Hyaluronic Acid. Fades dark spots, evens skin tone and boosts radiance with consistent use.",
    usage:
      "Apply 3-4 drops to clean face morning and evening before moisturiser. Always follow with SPF in the morning.",
    ingredients: [
      "Vitamin C (Ascorbic Acid)",
      "Niacinamide",
      "Hyaluronic Acid",
      "Ferulic Acid",
      "Aloe Vera",
      "Glycerin",
    ],
    images: ["/images/vit-serum.jpg", "/images/model-serum.jpg"],
  },
  {
    id: 3,
    slug: "shea-aloe-body-lotion",
    name: "Shea & Aloe Body Lotion",
    category: "Body Care",
    price: 4200,
    image: "/images/shea-butter.jpg",
    hoverImage: "/images/model-lotion.jpg",
    badge: "New",
    stockCount: 10,
    inStock: true,
    description:
      "A rich yet lightweight body lotion combining the deep moisturising power of shea butter with the soothing properties of aloe vera. Absorbs quickly without greasiness.",
    usage:
      "Apply to body after shower while skin is slightly damp for best absorption. Focus on dry areas like elbows and knees.",
    ingredients: [
      "Shea Butter",
      "Aloe Vera",
      "Glycerin",
      "Coconut Oil",
      "Vitamin E",
      "Chamomile Extract",
    ],
    images: ["/images/shea-butter.jpg", "/images/model-lotion.jpg"],
  },
  {
    id: 4,
    slug: "glow-drops-face-oil",
    name: "Glow Drops Face Oil",
    category: "Natural Oils",
    price: 5800,
    image: "/images/drop.jpg",
    hoverImage: "/images/model-oil.jpg",
    badge: "Out of Stock",
    inStock: false,
    description:
      "A luxurious facial oil blend of rosehip, marula and squalane oils. Delivers deep nourishment, reduces fine lines and gives skin an irresistible natural glow.",
    usage:
      "Press 2-3 drops into clean skin morning or evening. Can be mixed with moisturiser or worn alone as the last step in your routine.",
    ingredients: [
      "Rosehip Oil",
      "Marula Oil",
      "Squalane",
      "Sea Buckthorn",
      "Vitamin C",
      "Frankincense",
    ],
    images: ["/images/drop.jpg", "/images/model-oil.jpg"],
  },
];

export const bestSellers: Product[] = [
  {
    id: 5,
    slug: "matte-lip-colour-set",
    name: "Matte Lip Colour Set",
    category: "Lipcare",
    price: 4500,
    image: "/images/lip-stick.jpg",
    hoverImage: "/images/lippy.jpg",
    badge: "Best Seller",
    inStock: true,
    description:
      "A collection of 6 richly pigmented matte lip colours in shades curated for melanin-rich skin. Long lasting formula that does not dry out your lips.",
    usage:
      "Apply directly to lips. For precise application use a lip liner first. Blot and reapply for longer wear.",
    ingredients: [
      "Castor Oil",
      "Candelilla Wax",
      "Shea Butter",
      "Vitamin E",
      "Mica Pigments",
    ],
    images: ["/images/lip-stick.jpg", "/images/lippy.jpg"],
  },
  {
    id: 6,
    slug: "deep-cleanse-facial-kit",
    name: "Deep Cleanse Facial Kit",
    category: "Spa",
    price: 12000,
    originalPrice: 15000,
    image: "/images/spa-kit.jpg",
    hoverImage: "/images/spa.jpg",
    badge: "Best Seller",
    inStock: true,
    description:
      "A complete facial cleansing kit including cleanser, toner and mask. Deep cleans pores, removes impurities and leaves skin refreshed and balanced.",
    usage:
      "Use 2-3 times per week. Cleanse, tone then apply mask for 10-15 minutes. Rinse thoroughly and follow with moisturiser.",
    ingredients: [
      "Kaolin Clay",
      "Tea Tree Oil",
      "Witch Hazel",
      "Salicylic Acid",
      "Aloe Vera",
    ],
    images: ["/images/spa.jpg", "/images/spa-kit.jpg"],
  },
  {
    id: 7,
    slug: "turmeric-glow-body-scrub",
    name: "Turmeric Glow Body Scrub",
    category: "Body Care",
    price: 3200,
    image: "/images/tumeric.jpg",
    hoverImage: "/images/tumeric-brush.jpg",
    badge: "Best Seller",
    stockCount: 5,
    inStock: true,
    description:
      "An exfoliating body scrub infused with turmeric, raw sugar and coconut oil. Removes dead skin cells, brightens skin tone and leaves your body feeling silky smooth.",
    usage:
      "Apply to damp skin in circular motions. Focus on rough areas. Rinse thoroughly. Use 2-3 times per week for best results.",
    ingredients: [
      "Turmeric Extract",
      "Raw Sugar",
      "Coconut Oil",
      "Honey",
      "Lemon Extract",
      "Vitamin C",
    ],
    images: ["/images/tumeric-brush.jpg", "/images/tumeric.jpg"],
  },
  {
    id: 8,
    slug: "black-soap-honey-bar",
    name: "Black Soap & Honey Bar",
    category: "Soaps",
    price: 1800,
    image: "/images/black-soap.jpg",
    hoverImage: "/images/black-honey.jpg",
    inStock: true,
    description:
      "Authentic African black soap enriched with raw honey and shea butter. Gently cleanses, controls acne, fades blemishes and leaves skin soft and balanced.",
    usage:
      "Lather in hands or with a washcloth. Apply to face or body. Rinse thoroughly. Follow with moisturiser. Use daily.",
    ingredients: [
      "African Black Soap Base",
      "Raw Honey",
      "Shea Butter",
      "Plantain Ash",
      "Cocoa Pod Ash",
      "Palm Kernel Oil",
    ],
    images: ["/images/black-soap.jpg", "/images/black-honey.jpg"],
  },
];

export const allProducts: Product[] = [...newProducts, ...bestSellers];
