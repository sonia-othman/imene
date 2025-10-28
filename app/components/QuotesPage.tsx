import Image from "next/image";
import Link from "next/link";

export default function QuotesPage() {
  return (
    <div className="container mx-auto bg-gray-50 flex items-center justify-center px-4 md:px-8 py-16">
      <div className="container mx-auto max-w-4xl text-center">
        

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-primary mb-8 leading-tight">
          Smooth, confident, and pain-free, your beauty perfected.
        </h1>

        {/* Description */}
        <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-3xl mx-auto mb-12">
          Experience gentle, fast, and effective laser treatments designed for all skin types. Say goodbye to unwanted hair and hello to long-lasting smoothness, with advanced cooling technology that keeps every session comfortable and safe.
        </p>

        {/* CTA Button */}
        <Link href="/shop" className="bg-primary text-white px-10 py-4 rounded-full text-sm tracking-wider uppercase hover:bg-pink-200 transition-colors  border outline ">
          Shop Now
        </Link>
      </div>
    </div>
  );
}