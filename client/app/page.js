import Carousel from "./components/carousel";
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
      <div className="flex flex-col items-center text-center space-y-3 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
        <PawPrint className="w-10 h-10 text-pink-500" />
        <h3 className="text-xl font-semibold text-gray-800">Animal Adoption</h3>
        <p className="text-gray-600 text-sm">
          Browse or list animals ready for adoption with ease and trust.
        </p>
      </div>

      {/* Feature 2: Find Services */}
      <div className="flex flex-col items-center text-center space-y-3 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
        <Search className="w-10 h-10 text-blue-500" />
        <h3 className="text-xl font-semibold text-gray-800">Find Services</h3>
        <p className="text-gray-600 text-sm">
          Locate nearby NGOs, clinics, and shelters to help injured or stray animals.
        </p>
      </div>

      {/* Feature 3: Compassion */}
      <div className="flex flex-col items-center text-center space-y-3 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
        <Heart className="w-10 h-10 text-red-500" />
        <h3 className="text-xl font-semibold text-gray-800">Compassion First</h3>
        <p className="text-gray-600 text-sm">
          Built with care for communities who want to make a difference.
        </p>
      </div>

      {/* Feature 4: Feeding Hotspots */}
      <div className="flex flex-col items-center text-center space-y-3 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
        <MapPin className="w-10 h-10 text-yellow-500" />
        <h3 className="text-xl font-semibold text-gray-800">Feeding Hotspots</h3>
        <p className="text-gray-600 text-sm">
          Discover and mark common areas where community animals are regularly fed.
        </p>
      </div>

      {/* Feature 5: Report Incidents */}
      <div className="flex flex-col items-center text-center space-y-3 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
        <AlertTriangle className="w-10 h-10 text-orange-500" />
        <h3 className="text-xl font-semibold text-gray-800">Report Incidents</h3>
        <p className="text-gray-600 text-sm">
          Quickly report cruelty, injury, or emergency cases to the right people.
        </p>
      </div>

      {/* Feature 6: Volunteer/Donate */}
      <div className="flex flex-col items-center text-center space-y-3 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
        <HelpingHand className="w-10 h-10 text-green-500" />
        <h3 className="text-xl font-semibold text-gray-800">Volunteer or Donate</h3>
        <p className="text-gray-600 text-sm">
          Join hands to support animal care — contribute time, skills, or resources.
        </p>
      </div>
    </div>
  </div>
</section>

    </main>
  );
}
