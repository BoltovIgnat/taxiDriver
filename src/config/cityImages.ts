/** Локальные hero/карточки городов — public/images/cities/{slug}.jpg */

export const cityCardImages: Record<string, string> = {
  moskva: "/images/cities/moskva.jpg",
  "sankt-peterburg": "/images/cities/sankt-peterburg.jpg",
  kazan: "/images/cities/kazan.jpg",
  novosibirsk: "/images/cities/novosibirsk.jpg",
  ekaterinburg: "/images/cities/ekaterinburg.jpg",
  "nizhniy-novgorod": "/images/cities/nizhniy-novgorod.jpg",
  krasnodar: "/images/cities/krasnodar.jpg",
  "rostov-na-donu": "/images/cities/rostov-na-donu.jpg",
  samara: "/images/cities/samara.jpg",
  ufa: "/images/cities/ufa.jpg",
  voronezh: "/images/cities/voronezh.jpg",
  perm: "/images/cities/perm.jpg",
  volgograd: "/images/cities/volgograd.jpg",
  chelyabinsk: "/images/cities/chelyabinsk.jpg",
  omsk: "/images/cities/omsk.jpg",
  krasnoyarsk: "/images/cities/krasnoyarsk.jpg",
  tyumen: "/images/cities/tyumen.jpg",
  izhevsk: "/images/cities/izhevsk.jpg",
  barnaul: "/images/cities/barnaul.jpg",
  irkutsk: "/images/cities/irkutsk.jpg",
  khabarovsk: "/images/cities/khabarovsk.jpg",
  vladivostok: "/images/cities/vladivostok.jpg",
  sochi: "/images/cities/sochi.jpg",
  tolyatti: "/images/cities/tolyatti.jpg",
  anapa: "/images/cities/anapa.jpg",
};

export function getCityCardImage(slug: string) {
  const src = cityCardImages[slug] ?? "/images/cities/regional.jpg";
  return {
    src,
    fallback: `/images/cities/${slug}.png`,
  };
}

export function getCityPhoto(slug: string, cityName: string) {
  const { src } = getCityCardImage(slug);
  return {
    src,
    alt: `Работа водителем такси в ${cityName}`,
  };
}
