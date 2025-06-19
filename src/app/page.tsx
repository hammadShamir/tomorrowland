import Faqs from "@/components/Faqs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import IntroSection from "@/components/IntroSection";
import Reviews from "@/components/Reviews";
import UpcomingEvents from "@/components/UpcomingEvents";
import ValueProposition from "@/components/ValueProposition";
import Video from "@/components/Video"
import Whatsapp from "@/components/Whatsapp";

export default function Home() {

  return (
    <>
      <Header />
      <Video />
      <ValueProposition />
      <UpcomingEvents />
      <IntroSection />
      <Reviews />
      <Faqs />
      <Footer />
      <Whatsapp />
    </>
  );
}
