import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { PhoneMockup } from "@/components/sections/PhoneMockup";
import { SiteImage } from "@/components/ui/SiteImage";
import { imageFallbacks, images } from "@/config/images";
import { formatRub, OFFER } from "@/data/siteCopy";

export function HomeHero() {
  return (
    <section className="hero-dark overflow-hidden pb-16 pt-8 md:pb-24 md:pt-12 lg:pb-28">
      <div className="container-main relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem]">
              <span>Зарабатывайте </span>
              <span className="text-accent">от {formatRub(OFFER.heroFromMonthly)}</span>
              <span> в месяц водителем такси</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-400 lg:text-xl">
              Выплаты каждый день на карту. Аренда без залога или работа на своём авто — в Москве и других городах России.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="#calculator" className="!px-8 !py-4 !text-base !font-bold">
                Стать водителем
              </Button>
              <Button href="#calculator" variant="secondary" className="!border !border-white/20 !bg-transparent !text-white hover:!bg-white/10">
                Рассчитать доход
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: "5 000+", label: "водителей" },
                { value: "24/7", label: "выплаты" },
                { value: "1 день", label: "подключение" },
                { value: "4.9", label: "рейтинг" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-2xl font-extrabold tabular-nums text-accent">{item.value}</p>
                  <p className="text-xs uppercase tracking-wide text-gray-500">{item.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={120} className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px] min-h-[460px] sm:min-h-[540px]">
              {/* Москва — такси на улице */}
              <div className="absolute inset-x-0 bottom-0 top-12 overflow-hidden rounded-3xl ring-1 ring-white/10">
                <SiteImage
                  src={images.home.heroHome}
                  fallback={imageFallbacks.home.heroHome}
                  alt="Такси в Москве"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#111] via-[#111]/50 to-[#111]/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111]/90 via-transparent to-transparent" />
              </div>

              {/* Портрет водителя — крупно, лицо в кадре */}
              <div className="absolute -left-2 top-0 z-[2] aspect-[3/4] w-[46%] overflow-hidden rounded-3xl shadow-glow ring-[3px] ring-accent sm:-left-4 sm:w-[50%]">
                <SiteImage
                  src={images.home.heroDriverRu}
                  fallback={imageFallbacks.home.heroDriverRu}
                  alt="Водитель такси — Алексей, Москва"
                  fill
                  priority
                  sizes="240px"
                  className="object-cover object-top"
                />
              </div>

              {/* Мокап приложения */}
              <div className="relative z-10 ml-auto w-[60%] pt-2 sm:w-[58%] sm:pt-4">
                <PhoneMockup />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
