import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import QuoteForm from "@/components/quote-form"

export const metadata: Metadata = {
  title: "Get a Quote | Nubihab Real Estate",
  description: "Request a personalized quote for your dream apartment",
}

export default function QuotePage() {
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Get a Personalized Quote
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Fill out the form below to receive a customized quote for your dream apartment.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Why Get a Quote?</div>
                <h2 className="text-3xl font-bold">Tailored to Your Needs</h2>
                <p className="text-muted-foreground">
                  Our personalized quotes take into account your specific requirements, preferences, and budget to
                  provide you with the most accurate pricing information.
                </p>
                <ul className="grid gap-2 py-4">
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
                    <span>Detailed pricing breakdown</span>
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
                    <span>Financing options available</span>
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
                    <span>No obligation to purchase</span>
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
                    <span>Expert consultation included</span>
                  </li>
                </ul>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/apartments">
                    <Button variant="outline">View Apartments</Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline">Contact Us</Button>
                  </Link>
                </div>
              </div>
              <div className="rounded-lg border bg-background p-6 shadow-sm">
                <QuoteForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
