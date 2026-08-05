import Hero from "@/components/home/Hero";
import FavoritesSection from "@/components/home/FavoritesSection";
import PopularCards from "@/components/home/PopularCards";
import Specialties from "@/components/home/Specialties";

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-white">
        <Hero />

        <FavoritesSection />

        <PopularCards />

        <Specialties />
      </main>
    </>
  );
}