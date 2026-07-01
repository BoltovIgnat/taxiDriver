/** Локальные пути — hero-фото в public/images/ */

export const images = {
  home: {
    heroDesktop: "/images/home/hero-desktop.png",
    /** Яндекс.Такси, Москва — Wikimedia (Elena Yastrebova, CC0) */
    heroHome: "/images/home/hero-home.jpg",
    heroDriverRu: "/images/home/hero-driver-ru.png",
    heroHomeRemote:
      "https://images.pexels.com/photos/5835448/pexels-photo-5835448.jpeg?auto=compress&cs=tinysrgb&w=1920",
    heroMobile: "/images/home/hero-mobile.jpg",
    steps: "/images/home/steps.jpg",
    cityCard: "/images/home/city-card.png",
    driverPortrait: "/images/home/hero-driver-ru.png",
    reviewsBg: "/images/home/reviews-bg.jpg",
  },
  goroda: {
    /** Wikimedia: Yandex.Taxi on Moscow streets (CC0) */
    hero: "/images/goroda/hero.jpg",
    cityCard: "/images/goroda/city-card.png",
  },
  city: {
    /** Wikimedia: Yandex taxi car Moscow (CC BY 2.0) */
    hero: "/images/city/hero.jpg",
    conditions: "/images/city/conditions.jpg",
  },
  calculator: {
    /** Wikimedia: Uber taxi Moscow */
    hero: "/images/calculator/hero.jpg",
  },
  usloviya: {
    /** Wikimedia: Metrocab taxi Moscow */
    hero: "/images/usloviya/hero.jpg",
  },
  kakNachat: {
    /** Wikimedia: Yandex taxi car Moscow */
    hero: "/images/kak-nachat/hero.jpg",
  },
  tarify: {
    /** Wikimedia: Yandex.Taxi, Москва (CC BY 2.0) */
    hero: "/images/tarify/hero.jpg",
    svoeAvto: "/images/tarify/svoe-avto.png",
    arenda: "/images/tarify/arenda.png",
    bezZaloga: "/images/tarify/bez-zaloga.png",
  },
  reviews: {
    /** Wikimedia: Yandex taxi car Moscow */
    hero: "/images/reviews/hero.jpg",
  },
  faq: {
    hero: "/images/faq/hero.png",
  },
  kontakty: {
    hero: "/images/kontakty/hero.png",
  },
  spasibo: {
    hero: "/images/spasibo/hero.png",
  },
  blog: {
    hero: "/images/blog/hero.png",
    article: "/images/blog/article-cover.png",
  },
  oServise: {
    hero: "/images/o-servise/hero.png",
  },
  notFound: {
    hero: "/images/404/hero.png",
  },
} as const;

export const placeholders = {
  hero: "/images/placeholders/hero.svg",
  cityCard: "/images/placeholders/city-card.svg",
  generic: "/images/placeholders/generic.svg",
} as const;

/** Запасные локальные PNG, если JPG недоступен */
export const imageFallbacks = {
  home: {
    heroDesktop: placeholders.hero,
    heroHome:
      "https://images.pexels.com/photos/5835448/pexels-photo-5835448.jpeg?auto=compress&cs=tinysrgb&w=1920",
    heroDriverRu: placeholders.generic,
    heroMobile: placeholders.hero,
    steps: placeholders.hero,
    cityCard: placeholders.cityCard,
    driverPortrait: placeholders.generic,
    reviewsBg: placeholders.generic,
  },
  goroda: {
    hero: "/images/goroda/hero.png",
    cityCard: placeholders.cityCard,
  },
  city: {
    hero: "/images/city/hero.png",
    conditions: placeholders.generic,
  },
  calculator: {
    hero: "/images/calculator/hero.png",
  },
  usloviya: {
    hero: "/images/usloviya/hero.png",
  },
  kakNachat: {
    hero: "/images/kak-nachat/hero.png",
  },
  tarify: {
    hero: "/images/tarify/hero.png",
    svoeAvto: placeholders.hero,
    arenda: placeholders.hero,
    bezZaloga: placeholders.hero,
  },
  reviews: {
    hero: "/images/reviews/hero.png",
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
