import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import ApartmentListing from "@/components/apartment-listing"
import { apartmentData } from "@/lib/apartment-data"

export const metadata: Metadata = {
  title: "Apartments | Nubihab Real Estate",
  description: "Browse our selection of premium apartments",
}

export default function ApartmentsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium hover:underline mb-4">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Apartments</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Browse our selection of premium apartments in prime locations.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
              {apartmentData.map((apartment) => (
                <ApartmentListing key={apartment.id} apartment={apartment} />
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Link href="/quote">
                <Button>Get a Quote</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
