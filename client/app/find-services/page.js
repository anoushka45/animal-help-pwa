'use client'

import { useEffect, useState, useRef } from 'react'
import Script from 'next/script'
import {
  Hospital,
  Dog,
  ShoppingCart,
  Stethoscope,
  Landmark,
} from 'lucide-react'

const SERVICE_TYPES = {
  veterinary_care: { label: 'Animal Hospitals', icon: <Stethoscope size={20} /> },
  pet_store: { label: 'Pet Stores', icon: <ShoppingCart size={20} /> },
  hospital: { label: 'Clinics', icon: <Hospital size={20} /> },
  ngo: { label: 'NGOs', icon: <Landmark size={20} /> },
  pharmacy: { label: 'Pharmacies', icon: <Dog size={20} /> },
}

export default function FindServices() {
  const [location, setLocation] = useState(null)
  const [selectedType, setSelectedType] = useState('veterinary_care')
  const [mapLoaded, setMapLoaded] = useState(false)
  const mapRef = useRef(null)
  const markersRef = useRef([])

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        },
        (err) => console.error('Location access denied:', err)
      )
    }
  }, [])

  // Poll for Google Maps API readiness
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google && window.google.maps) {
        clearInterval(interval)
        setMapLoaded(true)
      }
    }, 300)

    setTimeout(() => clearInterval(interval), 8000) // stop after 8s
    return () => clearInterval(interval)
  }, [])

  // Initialize map once everything is ready
  useEffect(() => {
    if (location && mapLoaded && window.google) {
      initMap()
    }
  }, [location, selectedType, mapLoaded])

  const initMap = () => {
    const mapContainer = document.getElementById('map')
    if (!mapContainer || !window.google || !window.google.maps) return

    // clear previous markers
    markersRef.current.forEach((marker) => marker.setMap(null))
    markersRef.current = []

    const map = new google.maps.Map(mapContainer, {
      center: location,
      zoom: 14,
    })

    mapRef.current = map

    const service = new google.maps.places.PlacesService(map)
    const infowindow = new google.maps.InfoWindow()

    const request = {
      location,
      radius: 2000,
      type: selectedType,
    }

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        results.forEach((place) => {
          const marker = new google.maps.Marker({
            map,
            position: place.geometry.location,
            title: place.name,
          })

          marker.addListener('click', () => {
            const detailsRequest = {
              placeId: place.place_id,
              fields: [
                'name',
                'formatted_address',
                'rating',
                'reviews',
                'opening_hours',
                'website',
              ],
            }

            service.getDetails(detailsRequest, (details, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                const content = `
                  <div style="max-width: 250px;">
                    <strong>${details.name}</strong><br/>
                    ${details.formatted_address}<br/>
                    ${details.rating ? `⭐ ${details.rating}/5` : ''}
                    <br/>
                    ${
                      details.opening_hours
                        ? `<em>Hours: ${details.opening_hours.weekday_text?.join('<br/>') ?? ''}</em>`
                        : ''
                    }
                    ${
                      details.website
                        ? `<br/><a href="${details.website}" target="_blank" rel="noopener noreferrer" style="color:blue;">Website</a>`
                        : ''
                    }
                  </div>
                `
                infowindow.setContent(content)
                infowindow.open(map, marker)
              }
            })
          })

          markersRef.current.push(marker)
        })
      }
    })
  }

  return (
    <>
      {/* Google Maps Script */}
      <Script
        // src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBCM2ot11FNw8A4nm1C8lKh0UIytdeEbQ4&libraries=places`}
        strategy="afterInteractive"
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-200 px-4 md:px-10 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          🗺️ Services and Resources
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar - Service Types */}
          <div className="md:col-span-1 bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Select Service Type</h2>
            <div className="flex flex-col gap-3">
              {Object.entries(SERVICE_TYPES).map(([key, { label, icon }]) => (
                <button
                  key={key}
                  onClick={() => setSelectedType(key)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition 
                    ${selectedType === key ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Map Section */}
          <div className="md:col-span-3">
            <div className="relative w-full h-[500px] rounded-xl border border-gray-100 shadow overflow-hidden">
              <div id="map" className="absolute top-0 left-0 right-0 bottom-0 z-0" />

              {/* Fallback Overlay */}
              {(!mapLoaded || !location || typeof window.google === 'undefined') && (
                <div className="absolute inset-0 bg-white bg-opacity-90 z-10 flex flex-col items-center justify-center text-center p-6">
                  <p className="text-gray-700 mb-4">
                    {!location
                      ? '📍 Waiting for location access...'
                      : !mapLoaded
                      ? '🗺️ Loading map...'
                      : '❌ Failed to load map. Please try again.'}
                  </p>
                  <button
                    onClick={() => {
                      if (location && window.google) {
                        initMap()
                      }
                    }}
                    disabled={!location || !window.google}
                    className="bg-purple-600 text-white px-4 py-2 rounded-md shadow hover:bg-purple-700 disabled:opacity-50"
                  >
                    🔄 Try Again
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-20 space-y-20">
  {/* Activists */}
  <section>
    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
      🐾 Prominent Animal Rights Activists and Organizations
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
          name: 'Maneka Gandhi',
          role: 'Founder, People for Animals',
          location: 'New Delhi, India',
          bio: 'Prominent activist and former Union Minister known for legal advocacy in animal welfare.',
          image: 'https://images.unsplash.com/photo-1566435722960-3c645c72a461?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW5kaWFuJTIwY2F0c3xlbnwwfHwwfHx8MA%3D%3D',
          link: 'https://en.wikipedia.org/wiki/Maneka_Gandhi',
        },
        {
          name: 'Anjali Gopalan',
          role: 'Founder, Naz Foundation',
          location: 'Delhi, India',
          bio: 'While known for HIV advocacy, she promotes compassionate treatment of animals in urban areas.',
          image: 'https://images.unsplash.com/photo-1566435722960-3c645c72a461?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW5kaWFuJTIwY2F0c3xlbnwwfHwwfHx8MA%3D%3D',
          link: 'https://en.wikipedia.org/wiki/Anjali_Gopalan',
        },
        {
          name: 'Norma Alvares',
          role: 'Animal Welfare Board Member',
          location: 'Goa, India',
          bio: 'Lawyer and activist actively working in policy for animal protection in India.',
          image: 'https://images.unsplash.com/photo-1566435722960-3c645c72a461?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW5kaWFuJTIwY2F0c3xlbnwwfHwwfHx8MA%3D%3D',
          link: 'https://en.wikipedia.org/wiki/Norma_Alvares',
        },
        {
          name: 'Rukmini Devi Arundale',
          role: 'Founder, Theosophical Society India',
          location: 'Tamil Nadu, India',
          bio: 'One of the earliest voices for animal rights in India, known for promoting vegetarianism and legislation.',
          image: 'https://images.unsplash.com/photo-1566435722960-3c645c72a461?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW5kaWFuJTIwY2F0c3xlbnwwfHwwfHx8MA%3D%3D',
          link: 'https://en.wikipedia.org/wiki/Rukmini_Devi_Arundale',
        },
      ].map((person, i) => (
        <div key={i} className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">
          <img src={person.image} alt={person.name} className="w-full h-40 object-cover" />
          <div className="p-4 space-y-1">
            <h3 className="text-lg font-semibold text-blue-700">{person.name}</h3>
            <p className="text-sm text-gray-600 italic">{person.role}</p>
            <p className="text-sm text-gray-500">{person.location}</p>
            <p className="text-sm text-gray-700">{person.bio}</p>
            <a
              href={person.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 underline inline-block mt-1"
            >
              Read more
            </a>
          </div>
        </div>
      ))}
    </div>
  </section>

  {/* Lawyers */}
  <section>
    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
      ⚖️ Notable Animal Rights Lawyers
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
          name: 'Raj Panjwani',
          role: 'Senior Advocate, Supreme Court',
          location: 'Delhi, India',
          bio: 'Known for PILs and legal interventions in landmark animal welfare cases.',
          image: 'https://images.unsplash.com/photo-1566435722960-3c645c72a461?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW5kaWFuJTIwY2F0c3xlbnwwfHwwfHx8MA%3D%3D',
          link: 'https://www.livelaw.in/news-updates/animal-rights-advocate-raj-panjwani-legal-reforms-218921',
        },
        {
          name: 'Alokparna Sengupta',
          role: 'Director, HSI India',
          location: 'Hyderabad, India',
          bio: 'Combines legal strategy with activism to advance humane animal laws.',
          image: 'https://images.unsplash.com/photo-1566435722960-3c645c72a461?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW5kaWFuJTIwY2F0c3xlbnwwfHwwfHx8MA%3D%3D',
          link: 'https://www.hsi.org/team/alokparna-sengupta/',
        },
        {
          name: 'Aparna Bhat',
          role: 'Supreme Court Advocate',
          location: 'India',
          bio: 'Known for work in social justice and defending laws protecting animals and women.',
          image: 'https://images.unsplash.com/photo-1566435722960-3c645c72a461?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW5kaWFuJTIwY2F0c3xlbnwwfHwwfHx8MA%3D%3D',
          link: 'https://en.wikipedia.org/wiki/Aparna_Bhat',
        },
        {
          name: 'Anjali Sharma',
          role: 'Animal Rights Lawyer',
          location: 'India',
          bio: 'Part of various landmark animal cruelty and wildlife conservation cases.',
          image: 'https://images.unsplash.com/photo-1566435722960-3c645c72a461?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW5kaWFuJTIwY2F0c3xlbnwwfHwwfHx8MA%3D%3D',
          link: 'https://www.barandbench.com/news/environmental-and-animal-rights-lawyers',
        },
      ].map((person, i) => (
        <div key={i} className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">
          <img src={person.image} alt={person.name} className="w-full h-40 object-cover" />
          <div className="p-4 space-y-1">
            <h3 className="text-lg font-semibold text-blue-700">{person.name}</h3>
            <p className="text-sm text-gray-600 italic">{person.role}</p>
            <p className="text-sm text-gray-500">{person.location}</p>
            <p className="text-sm text-gray-700">{person.bio}</p>
            <a
              href={person.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 underline inline-block mt-1"
            >
              Learn more
            </a>
          </div>
        </div>
      ))}
    </div>
  </section>
</div>
      </div>
    </>
  )
}
