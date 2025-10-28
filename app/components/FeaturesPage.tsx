import Image from "next/image";
export default function FeaturesPage() {
  const ingredients = [
    {
      image: "/images/f5.png",
      name: "Pain-Free Treatment",
      description: "Enjoy smooth skin with gentle pulses designed for maximum comfort."
    },
    {
      image: "/images/f8.png",
      name: "Fast & Effective",
      description: "Covers large areas quickly while delivering lasting results."
    },
    {
      image: "/images/f4.png",
      name: "Precision Targeting",
      description: "Targets only hair follicles safe for surrounding skin."
    },
    {
      image: "/images/f3.png",
      name: "Suitable for All Skin Types",
      description: "Advanced technology adapts to every skin tone safely."
    },
    {
      image: "/images/f2.png",
      name: "Long-Lasting Smoothness",
      description: "Reduces hair growth permanently with consistent sessions."
    },
    {
      image: "/images/f1.png",
      name: "Smart Cooling System",
      description: "Keeps your skin cool and protected throughout the treatment."
    }
  ];

  return (
    <div className="  bg-white py-16 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl  text-center text-gray-900 mb-16">
          FEUTURES
        </h1>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Circular Image */}
              <div className="relative w-25 h-25 mb-6 rounded-full overflow-hidden bg-gray-100">
                <Image 
                  src={ingredient.image} 
                  alt={ingredient.name}
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Ingredient Name */}
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                {ingredient.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                {ingredient.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}