import { SiteImage } from "@/components/ui/SiteImage";
import { imageFallbacks, images } from "@/config/images";
import { formatRub, OFFER } from "@/data/siteCopy";

const { phoneMockup: mockup } = OFFER;
const WEEK_MAX = Math.max(...mockup.weekDays.map((day) => day.amount));
const CHART_HEIGHT_PX = 44;

export function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[248px] sm:w-[268px]">
      <div className="rounded-[2.75rem] bg-[#1a1a1a] p-3 shadow-[0_32px_64px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
        <div className="overflow-hidden rounded-[2.25rem] bg-[#111]">
          <div className="flex items-center justify-between px-5 py-2.5 text-[10px] text-gray-500">
            <span>9:41</span>
            <span className="h-4 w-[4.5rem] rounded-full bg-black" />
            <span>100%</span>
          </div>

          <div className="px-4 pb-7 pt-1 sm:px-5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-accent">
                  <SiteImage
                    src={images.home.driverPortrait}
                    fallback={imageFallbacks.home.driverPortrait}
                    alt="Водитель"
                    fill
                    sizes="40px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">Алексей</p>
                  <p className="flex items-center gap-1 text-[11px] text-gray-400">
                    <i className="ri-star-fill text-accent" aria-hidden />
                    4.98 · Pro
                  </p>
                </div>
              </div>
              <span className="shrink-0 rounded-full bg-green-500/15 px-2 py-0.5 text-[9px] font-semibold text-green-400">
                На линии
              </span>
            </div>

            <div className="mt-4 rounded-2xl bg-[#1a1a1a] p-3.5 ring-1 ring-white/5">
              <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-500">
                За смену
              </p>
              <p className="mt-1 text-[1.75rem] font-extrabold leading-none tabular-nums tracking-tight text-accent">
                {formatRub(mockup.shiftToday)}
              </p>
              <p className="mt-1.5 text-[11px] text-green-400">+12% к вчера</p>
            </div>

            <div className="mt-2.5 grid grid-cols-2 gap-2">
              <div className="min-w-0 rounded-2xl bg-[#1a1a1a] p-3 ring-1 ring-white/5">
                <p className="text-[9px] font-medium uppercase leading-tight tracking-wide text-gray-500">
                  Этот месяц
                </p>
                <p className="mt-1 text-[11px] font-extrabold tabular-nums leading-tight text-white sm:text-[13px]">
                  {formatRub(mockup.monthCurrent)}
                </p>
              </div>
              <div className="min-w-0 rounded-2xl bg-accent/10 p-3 ring-1 ring-accent/40">
                <p className="text-[9px] font-medium uppercase leading-tight tracking-wide text-accent/80">
                  Пр. месяц
                </p>
                <p className="mt-1 text-[11px] font-extrabold tabular-nums leading-tight text-accent sm:text-[13px]">
                  {formatRub(mockup.monthPrevious)}
                </p>
              </div>
            </div>

            <div className="mt-3 rounded-2xl bg-[#1a1a1a] p-3 ring-1 ring-white/5">
              <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-500">
                Заработок за неделю
              </p>
              <p className="mt-1 text-base font-extrabold tabular-nums leading-none text-white">
                {formatRub(mockup.weekTotal)}
              </p>
              <div className="mt-3 flex h-12 items-end justify-between gap-1">
                {mockup.weekDays.map((day) => {
                  const barHeight = Math.max(
                    14,
                    Math.round((day.amount / WEEK_MAX) * CHART_HEIGHT_PX),
                  );
                  return (
                    <div
                      key={day.label}
                      className="flex flex-1 flex-col items-center gap-1"
                    >
                      <div
                        className="w-full rounded-t-[3px]"
                        style={{
                          height: barHeight,
                          backgroundColor: day.today
                            ? "#ffdd2d"
                            : "rgba(255, 221, 45, 0.5)",
                          boxShadow: day.today
                            ? "0 0 10px rgba(255, 221, 45, 0.4)"
                            : undefined,
                        }}
                        title={formatRub(day.amount)}
                      />
                      <span
                        className={
                          day.today
                            ? "text-[8px] font-bold text-[#ffdd2d]"
                            : "text-[8px] text-gray-500"
                        }
                      >
                        {day.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-2.5 grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-[#1a1a1a] p-2.5 text-center ring-1 ring-white/5">
                <p className="text-base font-bold tabular-nums text-white">18</p>
                <p className="text-[9px] leading-tight text-gray-500">заказов за смену</p>
              </div>
              <div className="rounded-xl bg-[#1a1a1a] p-2.5 text-center ring-1 ring-white/5">
                <p className="text-base font-bold tabular-nums text-white">7.2 ч</p>
                <p className="text-[9px] leading-tight text-gray-500">на линии</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
