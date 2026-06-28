/** Локальные пути — положите сгенерированные картинки в public/images/ */

export const images = {

  home: {

    heroDesktop: "/images/home/hero-desktop.png",

    heroMobile: "/images/home/hero-mobile.jpg",

    steps: "/images/home/steps.jpg",

    cityCard: "/images/home/city-card.jpg",

    reviewsBg: "/images/home/reviews-bg.jpg",

  },

  goroda: {

    hero: "/images/goroda/hero.jpg",

    cityCard: "/images/goroda/city-card.jpg",

  },

  city: {

    hero: "/images/city/hero.jpg",

    conditions: "/images/city/conditions.jpg",

  },

  calculator: {

    hero: "/images/calculator/hero.jpg",

  },

  usloviya: {

    hero: "/images/usloviya/hero.jpg",

  },

  kakNachat: {

    hero: "/images/kak-nachat/hero.jpg",

  },

  tarify: {

    hero: "/images/tarify/hero.jpg",

    svoeAvto: "/images/tarify/svoe-avto.jpg",

    arenda: "/images/tarify/arenda.jpg",

    bezZaloga: "/images/tarify/bez-zaloga.jpg",

  },

  reviews: {

    hero: "/images/reviews/hero.jpg",

  },

  faq: {

    hero: "/images/faq/hero.jpg",

  },

  kontakty: {

    hero: "/images/kontakty/hero.jpg",

  },

  spasibo: {

    hero: "/images/spasibo/hero.jpg",

  },

  blog: {

    hero: "/images/blog/hero.jpg",

    article: "/images/blog/article-cover.jpg",

  },

  oServise: {

    hero: "/images/o-servise/hero.jpg",

  },

  notFound: {

    hero: "/images/404/hero.jpg",

  },

} as const;



/** Локальные SVG-заглушки — работают без интернета */

export const placeholders = {

  hero: "/images/placeholders/hero.svg",

  cityCard: "/images/placeholders/city-card.svg",

  generic: "/images/placeholders/generic.svg",

} as const;



/** Fallback, пока JPG из Lovart не добавлены в public/images/ */

export const imageFallbacks = {

  home: {

    heroDesktop: placeholders.hero,

    heroMobile: placeholders.hero,

    steps: placeholders.hero,

    cityCard: placeholders.cityCard,

    reviewsBg: placeholders.generic,

  },

  goroda: {

    hero: placeholders.cityCard,

    cityCard: placeholders.cityCard,

  },

  city: {

    hero: placeholders.hero,

    conditions: placeholders.generic,

  },

  calculator: {

    hero: placeholders.generic,

  },

  usloviya: {

    hero: placeholders.generic,

  },

  kakNachat: {

    hero: placeholders.hero,

  },

  tarify: {

    hero: placeholders.hero,

    svoeAvto: placeholders.hero,

    arenda: placeholders.hero,

    bezZaloga: placeholders.hero,

  },

  reviews: {

    hero: placeholders.generic,

  },

  faq: {

    hero: placeholders.generic,

  },

  kontakty: {

    hero: placeholders.generic,

  },

  spasibo: {

    hero: placeholders.generic,

  },

  blog: {

    hero: placeholders.generic,

    article: placeholders.generic,

  },

  oServise: {

    hero: placeholders.generic,

  },

  notFound: {

    hero: placeholders.hero,

  },

} as const;

