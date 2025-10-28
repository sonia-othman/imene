import { Droplets, Truck, BadgeCheck } from 'lucide-react';

export default function BenefitPage() {
  const benefits = [
    {
      icon: Droplets,
      title: "Best Product",
      description: "All items in perfect and the highest quality ingredients and tested by millions usage around",
      bgColor: "bg-primary"
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "enjoy the convenience of free shipping on all orders, no HOLD the new as purchases",
      bgColor: "bg-primary"
    },
    {
      icon: BadgeCheck,
      title: "Guarantee",
      description: "you will extremely happy with your purchase we offer a 100% satisfaction guarantee",
      bgColor: "bg-primary"
    }
  ];

  return (
    <div className="container mx-auto bg-white flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        <h2 className="text-4xl md:text-5xl text-center mb-16 text-gray-800 tracking-wide">
          OUR BENEFITS
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className={`${benefit.bgColor} rounded-full p-6 mb-6`}>
                  <Icon className="w-12 h-12 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl md:text-2xl  mb-3 text-gray-800">
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