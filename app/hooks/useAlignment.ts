"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function useAlignment() {
  const { i18n } = useTranslation();
  const [alignment, setAlignment] = useState<"text-left" | "text-right">("text-left");

  useEffect(() => {
    const rtlLangs = ["ar", "ku"]; // RTL languages
    const currentLang = i18n.language || "en";
    if (rtlLangs.includes(currentLang)) {
      setAlignment("text-right");
    } else {
      setAlignment("text-left");
    }
  }, [i18n.language]);

  return alignment;
}
