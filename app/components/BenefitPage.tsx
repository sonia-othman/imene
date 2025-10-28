"use client";
import { Droplets, Truck, BadgeCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function BenefitPage() {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: Droplets,
      title: t("benefits.bestProduct.title"),
      description: t("benefits.bestProduct.description"),
      bgColor: "bg-primary",
    },
    {
      icon: Truck,
      title: t("benefits.freeShipping.title"),
      description: t("benefits.freeShipping.description"),
      bgColor: "bg-primary",
    },
    {
      icon: BadgeCheck,
      title: t("benefits.guarantee.title"),
      description: t("benefits.guarantee.description"),
      bgColor: "bg-primary",
    },
  ];

  return (
    <div className="container mx-auto bg-white flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        <h2 className="text-4xl md:text-5xl text-center mb-16 text-gray-800 tracking-wide">
          {t("benefits.sectionTitle")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className={`${benefit.bgColor} rounded-full p-6 mb-6`}>
                  <Icon className="w-12 h-12 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl md:text-2xl mb-3 text-gray-800">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
