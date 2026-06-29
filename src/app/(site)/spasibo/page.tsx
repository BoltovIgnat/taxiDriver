import { BezelCard } from "@/components/ui/BezelCard";

import { Button } from "@/components/ui/Button";

import { SiteImage } from "@/components/ui/SiteImage";

import { FadeIn } from "@/components/ui/FadeIn";

import { imageFallbacks, images } from "@/config/images";



export default function SpasiboPage() {

  return (

    <section className="section-padding min-h-[60dvh]">

      <div className="container-main mx-auto max-w-lg">

        <FadeIn>

          <BezelCard padding="lg" className="text-center">

            <div className="relative mx-auto mb-6 h-32 w-32 overflow-hidden rounded-[2rem] ring-1 ring-black/[0.06]">

              <SiteImage

                src={images.spasibo.hero}

                fallback={imageFallbacks.spasibo.hero}

                alt="Заявка принята"

                fill

                sizes="128px"

                className="object-cover"

              />

            </div>

            <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-2xl text-accent">

              <i className="ri-check-line" aria-hidden />

            </span>

            <h1 className="text-3xl font-bold">Спасибо за заявку!</h1>

            <p className="mt-4 text-lg leading-relaxed text-muted">

              Мы получили ваши данные и перезвоним в течение 15 минут в рабочее время.

            </p>

            <Button href="/" className="mt-8" showArrow>

              На главную

            </Button>

          </BezelCard>

        </FadeIn>

      </div>

    </section>

  );

}

