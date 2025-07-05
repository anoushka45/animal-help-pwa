import Carousel from "./components/carousel";
import Image from 'next/image'

import {
  PawPrint,
  Search,
  Heart,  
  MapPin,
  AlertTriangle,
  HelpingHand
} from "lucide-react";

export default function Home() {
  return (
    <main className="">
      <Carousel />

      <section className="text-center space-y-4 mt-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Animal<span className="text-purple-700">Aid</span> 
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A platform dedicated to supporting, rescuing, and finding loving homes for animals in need.
        </p>
      </section>

      <section className="py-6">
  <div className="max-w-6xl mx-auto px-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Feature 1: Adoption */}
      <div className="flex flex-col items-center text-center space-y-3 p-6 bg-gradient-to-b from-blue-50 to-white rounded-xl shadow-sm hover:shadow-md transition">
        <PawPrint className="w-10 h-10 text-pink-500" />
        <h3 className="text-xl font-semibold text-gray-800">Animal Adoption</h3>
        <p className="text-gray-600 text-sm">
          Browse or list animals ready for adoption with ease and trust.
        </p>
      </div>

      {/* Feature 2: Find Services */}
      <div className="flex flex-col items-center text-center space-y-3 p-6 bg-gradient-to-b from-blue-50 to-white rounded-xl shadow-sm hover:shadow-md transition">
        <Search className="w-10 h-10 text-blue-500" />
        <h3 className="text-xl font-semibold text-gray-800">Find Services</h3>
        <p className="text-gray-600 text-sm">
          Locate nearby NGOs, clinics, and shelters to help injured or stray animals.
        </p>
      </div>

      {/* Feature 3: Compassion */}
      <div className="flex flex-col items-center text-center space-y-3 p-6 bg-gradient-to-b from-blue-50 to-white rounded-xl shadow-sm hover:shadow-md transition">
        <Heart className="w-10 h-10 text-red-500" />
        <h3 className="text-xl font-semibold text-gray-800">Compassion First</h3>
        <p className="text-gray-600 text-sm">
          Built with care for communities who want to make a difference.
        </p>
      </div>

      {/* Feature 4: Feeding Hotspots */}
      <div className="flex flex-col items-center text-center space-y-3 p-6 bg-gradient-to-b from-blue-50 to-white rounded-xl shadow-sm hover:shadow-md transition">
        <MapPin className="w-10 h-10 text-yellow-500" />
        <h3 className="text-xl font-semibold text-gray-800">Feeding Hotspots</h3>
        <p className="text-gray-600 text-sm">
          Discover and mark common areas where community animals are regularly fed.
        </p>
      </div>

      {/* Feature 5: Report Incidents */}
      <div className="flex flex-col items-center text-center space-y-3 p-6 bg-gradient-to-b from-blue-50 to-white rounded-xl shadow-sm hover:shadow-md transition">
        <AlertTriangle className="w-10 h-10 text-orange-500" />
        <h3 className="text-xl font-semibold text-gray-800">Report Incidents</h3>
        <p className="text-gray-600 text-sm">
          Quickly report cruelty, injury, or emergency cases to the right people.
        </p>
      </div>

      {/* Feature 6: Volunteer/Donate */}
      <div className="flex flex-col items-center text-center space-y-3 p-6 bg-gradient-to-b from-blue-50 to-white rounded-xl shadow-sm hover:shadow-md transition">
        <HelpingHand className="w-10 h-10 text-green-500" />
        <h3 className="text-xl font-semibold text-gray-800">Volunteer or Donate</h3>
        <p className="text-gray-600 text-sm">
          Join hands to support animal care — contribute time, skills, or resources.
        </p>
      </div>
    </div>
  </div>
</section>

<section className="relative bg-gradient-to-r from-green-200 to-indigo-700 text-white py-20 mt-10   overflow-hidden shadow-xl">
  <div className="absolute inset-0 bg-[url('/texture.svg')] opacity-10 pointer-events-none"></div>

  <div className="max-w-4xl mx-auto text-center space-y-6 px-6 relative z-10">
    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
      Be the Change <span className="inline-block animate-wiggle">🐶</span>
    </h2>
    <p className="text-lg md:text-xl text-purple-100 max-w-xl mx-auto">
      Make a real difference in an animal's life — your actions matter more than you know.
    </p>

    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
      <a
        href="/signup"
        className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-purple-100 transition-all duration-200"
      >
        Join Us
      </a>
      <a
        href="/dashboard/add-adoption"
        className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-700 transition-all duration-200"
      >
        List an Animal
      </a>
    </div>
  </div>
</section>

{/* How It Works Section */}
<section className="py-12 bg-white">
  <div className="max-w-5xl mx-auto px-4 text-center">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">How It Works</h2>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
      <div>
        <div className="text-purple-600 text-4xl font-bold mb-2">1</div>
        <h4 className="text-lg font-semibold text-gray-700">Find or List</h4>
        <p className="text-sm text-gray-500">Post or browse animals for adoption or help.</p>
      </div>
      <div>
        <div className="text-purple-600 text-4xl font-bold mb-2">2</div>
        <h4 className="text-lg font-semibold text-gray-700">Connect</h4>
        <p className="text-sm text-gray-500">Reach out to rescuers, NGOs, or adopters easily.</p>
      </div>
      <div>
        <div className="text-purple-600 text-4xl font-bold mb-2">3</div>
        <h4 className="text-lg font-semibold text-gray-700">Make Impact</h4>
        <p className="text-sm text-gray-500">Support animals and be a hero in their story.</p>
      </div>
    </div>
  </div>

 <div className="mt-8 flex justify-center">
        <Image
          src="/pets.jpg" // Update this to your image path
          alt="How it works illustration"
          width={500}
          height={350}
        />
      </div>

</section>



    </main>
  );
}
