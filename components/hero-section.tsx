import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Find Your Perfect Home with Nubihab
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Discover premium apartments in prime locations. Your dream home is just a click away.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/apartments">
                <Button className="w-full sm:w-auto">Browse Apartments</Button>
              </Link>
              <Link href="/quote">
                <Button variant="outline" className="w-full sm:w-auto">
                  Get a Quote
                </Button>
              </Link>
            </div>
          </div>
          <div className="mx-auto flex w-full max-w-[400px] flex-col justify-center lg:max-w-none">
            <Image
              src="/page/home/banner.jpeg"
              width="550"
              height="550"
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:aspect-square"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
