import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Apartment {
  id: number
  type: string
  bedrooms: number
  bathrooms: number
  area: number
  floorPlanImage: string
  price: number
}

interface ApartmentListingProps {
  apartment: Apartment
}

export default function ApartmentListing({ apartment }: ApartmentListingProps) {
  return (
    <Card className="overflow-hidden">
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
  )
}
