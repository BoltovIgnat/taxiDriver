import { SiteImage } from "@/components/ui/SiteImage";
import { imageFallbacks, images } from "@/config/images";

const CHART = [38, 52, 61, 55, 78, 70, 88];

export function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[272px] sm:w-[300px]">
      <div className="rounded-[2.75rem] bg-[#1a1a1a] p-3 shadow-[0_32px_64px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
        <div className="overflow-hidden rounded-[2.25rem] bg-[#111]">
          <div className="flex items-center justify-between px-5 py-2.5 text-[10px] text-gray-500">
            <span>9:41</span>
            <span className="h-4 w-[4.5rem] rounded-full bg-black" />
            <span>100%</span>
          </div>

          <div className="px-4 pb-7 pt-1 sm:px-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-accent">
                  <SiteImage
                    src={images.home.driverPortrait}
                    fallback={imageFallbacks.home.driverPortrait}
                    alt="Водитель"
                    fill
                    sizes="44px"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Алексей</p>
                  <p className="flex items-center gap-1 text-xs text-gray-400">
                    <i className="ri-star-fill text-accent" aria-hidden />
                    4.98 · Pro
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-green-500/15 px-2.5 py-1 text-[10px] font-semibold text-green-400">
                На линии
              </span>
            </div>

            <div className="mt-5 rounded-2xl bg-[#1a1a1a] p-4 ring-1 ring-white/5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                За смену
              </p>
              <p className="mt-1 text-[2rem] font-extrabold leading-none tabular-nums tracking-tight text-accent sm:text-[2.125rem]">
                6 400 ₽
              </p>
              <p className="mt-2 text-xs text-green-400">+12% к вчера</p>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <div className="rounded-2xl bg-[#1a1a1a] p-3.5 ring-1 ring-white/5">
                <p className="text-[10px] font-medium uppercase tracking-wide text-gray-500">
                  Этот месяц
                </p>
                <p className="mt-1.5 text-lg font-extrabold tabular-nums leading-tight text-white sm:text-xl">
                  87 650 ₽
                </p>
              </div>
              <div className="rounded-2xl bg-accent/10 p-3.5 ring-1 ring-accent/40">
                <p className="text-[10px] font-medium uppercase tracking-wide text-accent/80">
                  Прошлый месяц
                </p>
                <p className="mt-1.5 text-lg font-extrabold tabular-nums leading-tight text-accent sm:text-xl">
                  150 240 ₽
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-[#1a1a1a] p-3.5 ring-1 ring-white/5">
              <div className="flex h-16 items-end gap-1.5">
                {CHART.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md bg-accent/75"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <p className="mt-2 text-center text-[10px] text-gray-500">Заработок за неделю</p>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <div className="rounded-xl bg-[#1a1a1a] p-3 text-center ring-1 ring-white/5">
                <p className="text-lg font-bold tabular-nums text-white">18</p>
                <p className="text-[10px] text-gray-500">заказов за смену</p>
              </div>
              <div className="rounded-xl bg-[#1a1a1a] p-3 text-center ring-1 ring-white/5">
                <p className="text-lg font-bold tabular-nums text-white">7.2 ч</p>
                <p className="text-[10px] text-gray-500">на линии</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
