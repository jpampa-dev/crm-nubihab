import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { apartmentData } from "@/lib/apartment-data"

export default function FeaturedApartments() {
  // Only show the first 3 apartments as featured
  const featuredApartments = apartmentData.slice(0, 3)

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Apartments</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore our selection of premium apartments in prime locations.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredApartments.map((apartment) => (
            <Card key={apartment.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative">
                  <img
                    src={apartment.floorPlanImage || "/placeholder.svg"}
                    alt={`${apartment.type} Floor Plan`}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 right-2">{apartment.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-2 text-xl">{apartment.type}</CardTitle>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center gap-1">
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
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M3 22v-2a4 4 0 0 1 4-4h2" />
                      <path d="M17 16h2a4 4 0 0 1 4 4v2" />
                      <circle cx="9" cy="10" r="4" />
                      <path d="M17 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                    </svg>
                    <span className="text-sm">{apartment.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center gap-1">
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
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
                      <line x1="10" x2="8" y1="5" y2="7" />
                      <line x1="2" x2="22" y1="12" y2="12" />
                      <line x1="7" x2="7" y1="19" y2="21" />
                      <line x1="17" x2="17" y1="19" y2="21" />
                    </svg>
                    <span className="text-sm">{apartment.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center gap-1">
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
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                    <span className="text-sm">{apartment.area} sq ft</span>
                  </div>
                  <div className="flex items-center gap-1">
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
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    <span className="text-sm font-medium">${apartment.price.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex gap-2">
                <Link href={`/apartments/${apartment.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
                <Link href={`/quote?apartment=${apartment.id}`} className="w-full">
                  <Button className="w-full">Get Quote</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link href="/apartments">
            <Button variant="outline">View All Apartments</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
