import { BezelCard } from "@/components/ui/BezelCard";

import { Button } from "@/components/ui/Button";

import { SiteImage } from "@/components/ui/SiteImage";

import { FadeIn } from "@/components/ui/FadeIn";

import { imageFallbacks, images } from "@/config/images";



export default function NotFound() {

  return (

    <section className="section-padding min-h-[70dvh]">

      <div className="container-main mx-auto max-w-xl">

        <FadeIn>

          <BezelCard padding="lg" className="text-center">

            <div className="relative mx-auto mb-8 aspect-[16/10] max-h-48 overflow-hidden rounded-[2rem] ring-1 ring-black/[0.06]">

              <SiteImage

                src={images.notFound.hero}

                fallback={imageFallbacks.notFound.hero}

                alt="Страница не найдена"

                fill

                sizes="480px"

                className="object-cover opacity-80"

              />

            </div>

            <p className="text-6xl font-bold tracking-tight text-accent">404</p>

            <h1 className="mt-4 text-2xl font-bold">Страница не найдена</h1>

            <p className="mt-3 text-muted">

              Возможно, ссылка устарела или страница была перемещена

            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">

              <Button href="/" showArrow>

                На главную

              </Button>

              <Button href="/goroda" variant="secondary">

                Выбрать город

              </Button>

            </div>

          </BezelCard>

        </FadeIn>

      </div>

    </section>

  );

}

