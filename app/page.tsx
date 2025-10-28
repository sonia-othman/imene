import Image from "next/image";
import LandingPage from "./components/landingpage";
import FeaturesPage from "./components/FeaturesPage";
import QuotesPage from "./components/QuotesPage";
import BenefitPage from "./components/BenefitPage";
import LasersPage from "./components/LasersPage";
import FeedbackSection from "./components/FeedbackPage";

export default function Home() {
  return (
    <div className=" min-h-screen">
      <LandingPage />
      <BenefitPage />
      <LasersPage />
      <QuotesPage />
      <FeedbackSection />
      <FeaturesPage />


    </div>
  );
}
