import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Bed, Bath, Home, MapPin, DollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import { apartmentData } from "@/lib/apartment-data"

interface ApartmentPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ApartmentPageProps): Promise<Metadata> {
  const apartment = apartmentData.find((apt) => apt.id === Number.parseInt(params.id))

  if (!apartment) {
    return {
      title: "Apartment Not Found | Nubihab Real Estate",
      description: "The requested apartment could not be found.",
    }
  }

  return {
    title: `${apartment.type} | Nubihab Real Estate`,
    description: `${apartment.bedrooms} bedroom, ${apartment.bathrooms} bathroom apartment with ${apartment.area} sq ft of space.`,
  }
}

export default function ApartmentPage({ params }: ApartmentPageProps) {
  const apartment = apartmentData.find((apt) => apt.id === Number.parseInt(params.id))

  if (!apartment) {
    return (
      <div className="container px-4 py-12 md:px-6 md:py-24 lg:py-32">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Apartment Not Found</h1>
          <p className="mt-4 text-muted-foreground">
            The apartment you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/apartments" className="mt-8">
            <Button>View All Apartments</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Link
              href="/apartments"
              className="inline-flex items-center gap-2 text-sm font-medium hover:underline mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Apartments
            </Link>

            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={apartment.floorPlanImage || "/placeholder.svg"}
                    alt={`${apartment.type} Floor Plan`}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src="/placeholder.svg?height=300&width=300"
                      alt="Living Room"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src="/placeholder.svg?height=300&width=300"
                      alt="Kitchen"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src="/placeholder.svg?height=300&width=300"
                      alt="Bedroom"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src="/placeholder.svg?height=300&width=300"
                      alt="Bathroom"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{apartment.type}</h1>
                  <div className="flex items-center gap-2 mt-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Prime Location, Cityville</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                    <Bed className="h-6 w-6 mb-2 text-primary" />
                    <span className="text-sm text-muted-foreground">Bedrooms</span>
                    <span className="font-medium">{apartment.bedrooms}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                    <Bath className="h-6 w-6 mb-2 text-primary" />
                    <span className="text-sm text-muted-foreground">Bathrooms</span>
                    <span className="font-medium">{apartment.bathrooms}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                    <Home className="h-6 w-6 mb-2 text-primary" />
                    <span className="text-sm text-muted-foreground">Area</span>
                    <span className="font-medium">{apartment.area} sq ft</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                    <DollarSign className="h-6 w-6 mb-2 text-primary" />
                    <span className="text-sm text-muted-foreground">Price</span>
                    <span className="font-medium">${apartment.price.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Description</h2>
                  <p className="text-muted-foreground">
                    This beautiful {apartment.type.toLowerCase()} offers modern living in a prime location. With{" "}
                    {apartment.bedrooms} {apartment.bedrooms === 1 ? "bedroom" : "bedrooms"} and {apartment.bathrooms}{" "}
                    {apartment.bathrooms === 1 ? "bathroom" : "bathrooms"}, this apartment provides {apartment.area}{" "}
                    square feet of thoughtfully designed living space.
                  </p>
                  <p className="text-muted-foreground">
                    The open floor plan features high ceilings and large windows that fill the space with natural light.
                    The kitchen is equipped with high-end appliances and elegant finishes. The bedrooms offer ample
                    closet space and the bathrooms feature modern fixtures and premium materials.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Features & Amenities</h2>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Modern Kitchen</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Hardwood Floors</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Central Air Conditioning</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>In-unit Laundry</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Fitness Center</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Swimming Pool</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>24/7 Security</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Parking Included</span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link href={`/quote?apartment=${apartment.id}`} className="w-full">
                    <Button className="w-full">Get a Quote</Button>
                  </Link>
                  <Link href="/contact" className="w-full">
                    <Button variant="outline" className="w-full">
                      Contact Agent
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
