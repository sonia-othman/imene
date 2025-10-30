'use client';

import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';
import { useTranslation } from "react-i18next";

interface Review {
  text: string;
  author: string;
}

const FeedbackSliderEmbla = () => {
  const { t, i18n } = useTranslation();
  
  const isRTL = i18n.language === "ar" || i18n.language === "ku";

  const reviews: Review[] = t('feedback.reviews_data', { returnObjects: true }) as Review[];

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    loop: true,
    skipSnaps: false,
    dragFree: false,
    direction: isRTL ? 'rtl' : 'ltr'
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className={`flex gap-1 mb-4 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={20}
            className={i < rating 
              ? "fill-yellow-400 text-yellow-400" 
              : "text-gray-300"
            }
          />
        ))}
      </div>
    );
  };

  return (
    <section className="container mx-auto bg-gradient-to-b from-pink-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl md:text-5xl font-bold text-primary mb-6 ${isRTL ? 'leading-relaxed' : ''}`}>
            {t('feedback.title')}
            <br />
            <span className="text-primary">{t('feedback.subtitle')}</span>
          </h1>
          
          {/* Trustpilot Rating */}
          <div className="inline-flex items-center gap-4 bg-white rounded-2xl px-6 py-4 border border-gray-100 ">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-gray-600">{t('feedback.rating')}</span>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Star fill="currentColor" size={20} className="text-white"/>
              </div>
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <div className="text-sm text-gray-600">
                {t('feedback.basedOn')} {reviews.length} {t('feedback.reviews')}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Title */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold text-gray-700 ${isRTL ? 'leading-relaxed' : ''}`}>
            {t('feedback.customersSaying')}
          </h2>
        </div>

        {/* Embla Carousel */}
        <div className="relative">
          <div className="embla overflow-hidden" ref={emblaRef} dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="embla__container flex">
              {reviews.map((review, index) => (
                <div key={index} className="embla__slide flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4">
                  <div className={`bg-white rounded-2xl p-8 border border-gray-100 transition-all duration-300 h-full ${isRTL ? 'text-right' : 'text-left'}`}>
                    <StarRating rating={5} />
                    <p className={`text-gray-700 text-lg leading-relaxed mb-6 ${isRTL ? 'leading-loose' : ''}`}>
                      {review.text}
                    </p>
                    <div className={`border-t border-gray-100 pt-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                      <div className={`font-semibold text-gray-900 text-lg ${isRTL ? 'leading-relaxed' : ''}`}>
                        {review.author}
                      </div>
                   
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
      {/* Navigation Buttons */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => (isRTL ? scrollNext() : scrollPrev())}
            className="w-12 h-12 bg-white rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all duration-200"
            aria-label={isRTL ? "التالي" : "Previous"}
          >
            <ChevronLeft size={28} className="text-gray-700" />
          </button>

          <button
            onClick={() => (isRTL ? scrollPrev() : scrollNext())}
            className="w-12 h-12 bg-white rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all duration-200"
            aria-label={isRTL ? "السابق" : "Next"}
          >
            <ChevronRight size={28} className="text-gray-700" />
          </button>
        </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSliderEmbla;