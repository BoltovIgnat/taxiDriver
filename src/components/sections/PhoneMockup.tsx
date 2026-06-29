import { SiteImage } from "@/components/ui/SiteImage";
import { imageFallbacks, images } from "@/config/images";

const CHART = [40, 55, 48, 72, 65, 80, 95];

export function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[280px] sm:w-[300px]">
      <div className="rounded-[2.5rem] bg-[#1a1a1a] p-3 shadow-[0_32px_64px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
        <div className="overflow-hidden rounded-[2rem] bg-[#111]">
          {/* status bar */}
          <div className="flex items-center justify-between px-5 py-2 text-[10px] text-gray-500">
            <span>9:41</span>
            <span className="h-4 w-16 rounded-full bg-black" />
            <span>100%</span>
          </div>

          <div className="px-5 pb-6 pt-2">
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

            <div className="mt-6 rounded-2xl bg-[#1a1a1a] p-4 ring-1 ring-white/5">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Сегодня</p>
              <p className="mt-1 text-4xl font-extrabold tabular-nums tracking-tight text-accent">
                6 400 ₽
              </p>
              <p className="mt-1 text-xs text-green-400">+12% к вчера</p>
            </div>

            <div className="mt-4 flex h-20 items-end gap-1.5">
              {CHART.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-md bg-accent/80"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <p className="mt-2 text-center text-[10px] text-gray-500">Заработок за неделю</p>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-[#1a1a1a] p-3 text-center ring-1 ring-white/5">
                <p className="text-lg font-bold tabular-nums text-white">18</p>
                <p className="text-[10px] text-gray-500">заказов</p>
              </div>
              <div className="rounded-xl bg-[#1a1a1a] p-3 text-center ring-1 ring-white/5">
                <p className="text-lg font-bold tabular-nums text-white">7.2 ч</p>
                <p className="text-[10px] text-gray-500">на линии</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -right-4 -top-4 rounded-2xl bg-accent px-4 py-2 shadow-glow">
        <p className="text-xs font-bold text-on-accent">≈ 150 000 ₽/мес</p>
      </div>
    </div>
  );
}
