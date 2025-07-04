'use client'

import { useEffect, useState, useRef } from 'react'
import Script from 'next/script'

const SERVICE_TYPES = {
  veterinary_care: 'Animal Hospitals',
  pet_store: 'Pet Stores',
  hospital: 'Clinics',
  ngo: 'NGOs',
  pharmacy: 'Pharmacies',
}

export default function FindServices() {
  const [location, setLocation] = useState(null)
  const [selectedType, setSelectedType] = useState('veterinary_care')
  const [mapLoaded, setMapLoaded] = useState(false)
  const mapRef = useRef(null)
  const markersRef = useRef([])

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          })
        },
        (err) => {
          console.error('Location access denied:', err)
        }
      )
    }
  }, [])

  // Load map & places when ready
  useEffect(() => {
    if (location && mapLoaded && window.google) {
      initMap()
    }
  }, [location, selectedType, mapLoaded])

  const initMap = () => {
    markersRef.current.forEach((marker) => marker.setMap(null))
    markersRef.current = []

    const map = new google.maps.Map(document.getElementById('map'), {
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
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBCM2ot11FNw8A4nm1C8lKh0UIytdeEbQ4&libraries=places`}
        strategy="afterInteractive"
        onLoad={() => setMapLoaded(true)}
      />

      <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Find Services Near You
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              Select the type of animal-related service you’re looking for
            </p>
          </div>

          <div className="max-w-xs mx-auto">
            <label htmlFor="service-type" className="block text-sm font-medium text-gray-700 mb-1">
              Service Type
            </label>
            <select
              id="service-type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(SERVICE_TYPES).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div id="map" className="h-[500px] w-full rounded-xl border border-gray-200 shadow-md" />
        </div>

        {/* 👇 Activists and Lawyers section */}
        <div className="max-w-4xl mx-auto mt-16 space-y-16 px-4 md:px-0">
          {/* Animal Rights Activists */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Prominent Animal Rights Activists
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  name: 'Maneka Gandhi',
                  role: 'Founder, People for Animals',
                  bio: 'A prominent Indian animal rights activist and former Union Minister known for strong legal advocacy for animal protection.',
                  link: 'https://en.wikipedia.org/wiki/Maneka_Gandhi',
                },
                {
                  name: 'Anjali Gopalan',
                  role: 'Founder, Naz Foundation',
                  bio: 'While known for HIV advocacy, she has also been vocal in promoting compassionate treatment of animals in urban settings.',
                  link: 'https://en.wikipedia.org/wiki/Anjali_Gopalan',
                },
              ].map((person, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-lg border shadow hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold text-blue-700">{person.name}</h3>
                  <p className="text-sm text-gray-600 mb-1 italic">{person.role}</p>
                  <p className="text-sm text-gray-700 mb-2">{person.bio}</p>
                  <a
                    href={person.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 underline"
                  >
                    Read more
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Animal Rights Lawyers */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Notable Animal Rights Lawyers
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  name: 'Raj Panjwani',
                  role: 'Senior Advocate, Supreme Court',
                  bio: 'Known for his PILs and legal interventions in major animal welfare cases across India.',
                  link: 'https://www.livelaw.in/news-updates/animal-rights-advocate-raj-panjwani-legal-reforms-218921',
                },
                {
                  name: 'Alokparna Sengupta',
                  role: 'Director, Humane Society International India',
                  bio: 'Combines legal strategy with activism to improve the treatment of animals through policy and law.',
                  link: 'https://www.hsi.org/team/alokparna-sengupta/',
                },
              ].map((person, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-lg border shadow hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold text-blue-700">{person.name}</h3>
                  <p className="text-sm text-gray-600 mb-1 italic">{person.role}</p>
                  <p className="text-sm text-gray-700 mb-2">{person.bio}</p>
                  <a
                    href={person.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 underline"
                  >
                    Learn more
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
