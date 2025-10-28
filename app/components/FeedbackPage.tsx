'use client';

import { Star } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';

interface Review {
  id: number;
  rating: number;
  text: string;
  author: string;
  location: string;
}

const FeedbackSliderEmbla = () => {
  const reviews: Review[] = [
    {
      id: 1,
      rating: 5,
      text: "My buying experience is so nice, and received me very politely. Riding experience is also very good. Very good performance. I never experienced such a kind of performance. Very good service.",
      author: "Karan",
      location: "Sulaimaniyah"
    },
    {
      id: 2,
      rating: 5,
      text: "I love my e-bike and the customer service is excellent. They respond in a timely manner with loads of information about e-bikes, accessories and maintenance information.",
      author: "Catherine",
      location: "Kirkuk"
    },
    {
      id: 3,
      rating: 5,
      text: "Visited to EO store. Prod particularly welds, looks wife and I took small test parking lot area. We boe with customization after we met in the options satisfied.",
      author: "Peter",
      location: "Duhok"
    },
    {
      id: 4,
      rating: 5,
      text: "Amazing quality and excellent customer support. The bike exceeded my expectations in every way possible.",
      author: "Sarah",
      location: "Hawler"
    },
      {
      id: 5,
      rating: 5,
      text: "Amazing quality and excellent customer support. The bike exceeded my expectations in every way possible.",
      author: "Sarah",
      location: "Halabja"
    }
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    loop: true,
    skipSnaps: false,
    dragFree: false
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex gap-1 mb-4">
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
    <section className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Read reviews,
            <br />
            <span className="text-primary">ride with confidence.</span>
          </h1>
          
          {/* Trustpilot Rating */}
          <div className="inline-flex items-center gap-4 bg-white rounded-2xl px-6 py-4  border border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-gray-600">4.2/5</span>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm"><Star  fill="currentColor" size={20}/></span>
              </div>
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="text-left">
              <div className="font-semibold text-gray-600">Trustpilot</div>
            <div className="text-sm text-gray-600">
            Based on {reviews.length} reviews
            </div>
            </div>
          </div>
        </div>

        {/* Reviews Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-700">
            What our customers saying
          </h2>
        </div>

        {/* Embla Carousel */}
        <div className="relative">
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex">
              {reviews.map((review) => (
                <div key={review.id} className="embla__slide flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4">
                  <div className="bg-white rounded-2xl p-8 border border-gray-100  transition-all duration-300 h-full">
                    <StarRating rating={review.rating} />
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                      {review.text}
                    </p>
                    <div className="border-t border-gray-100 pt-4">
                      <div className="font-semibold text-gray-900 text-lg">
                        {review.author}
                      </div>
                      <div className="text-gray-600 text-sm">
                        {review.location}
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
              onClick={scrollPrev}
              className="w-12 h-12 bg-white rounded-full  border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={scrollNext}
              className="w-12 h-12 bg-white rounded-full  border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

      
      </div>
    </section>
  );
};

export default FeedbackSliderEmbla;