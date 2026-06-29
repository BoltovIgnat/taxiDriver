import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

import { IncomeCalculator } from "@/components/calculator/IncomeCalculator";

import { PageHero } from "@/components/sections/PageHero";

import { imageFallbacks, images } from "@/config/images";



export const metadata: Metadata = {

  title: "Сколько можно заработать водителем такси",

  description: "Калькулятор дохода водителя такси по городам России. Рассчитайте заработок и оставьте заявку.",

};



export default function CalculatorPage() {

  return (

    <>

      <Breadcrumbs

        items={[

          { label: "Главная", href: "/" },

          { label: "Сколько можно заработать" },

        ]}

      />

      <PageHero

        eyebrow="Доход"

        title="Сколько можно заработать"

        subtitle="Прикиньте заработок в вашем городе — калькулятор учитывает часы, дни и тип авто"

        imageSrc={images.calculator.hero}

        imageFallback={imageFallbacks.calculator.hero}

        imageAlt="Калькулятор дохода водителя"

      />

      <IncomeCalculator showForm showHeader={false} />

    </>

  );

}

