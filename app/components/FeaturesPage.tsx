"use client";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function FeaturesPage() {
  const { t } = useTranslation();

  const features = [
    {
      image: "/images/f5.png",
      name: t("features.pain_free.name"),
      description: t("features.pain_free.description"),
    },
    {
      image: "/images/f8.png",
      name: t("features.fast_effective.name"),
      description: t("features.fast_effective.description"),
    },
    {
      image: "/images/f4.png",
      name: t("features.precision.name"),
      description: t("features.precision.description"),
    },
    {
      image: "/images/f3.png",
      name: t("features.all_skin.name"),
      description: t("features.all_skin.description"),
    },
    {
      image: "/images/f2.png",
      name: t("features.smoothness.name"),
      description: t("features.smoothness.description"),
    },
    {
      image: "/images/f1.png",
      name: t("features.cooling.name"),
      description: t("features.cooling.description"),
    },
  ];

  return (
    <div className="bg-white py-16 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl text-center text-gray-900 mb-16">
          {t("features.title")}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {features.map((f, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="relative w-30 h-30 mb-6 rounded-full overflow-hidden bg-gray-100">
                <Image
                  src={f.image}
                  alt={f.name}
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                {f.name}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
