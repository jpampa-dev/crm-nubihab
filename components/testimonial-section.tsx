import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function TestimonialSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm">Testimonials</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Clients Say</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from our satisfied clients who found their dream homes with Nubihab.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt="Avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">John Doe</h3>
                  <p className="text-sm text-muted-foreground">Purchased a Luxury Apartment</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "Working with Nubihab was a fantastic experience. They helped me find the perfect apartment that met all
                my requirements. The process was smooth and transparent from start to finish."
              </p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-yellow-500"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt="Avatar" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Jane Smith</h3>
                  <p className="text-sm text-muted-foreground">Purchased a Family Apartment</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "I was impressed by the professionalism and dedication of the Nubihab team. They went above and beyond
                to ensure we found an apartment that was perfect for our family's needs."
              </p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-yellow-500"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt="Avatar" />
                  <AvatarFallback>RJ</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Robert Johnson</h3>
                  <p className="text-sm text-muted-foreground">Purchased a Studio Apartment</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "The quote generator tool was incredibly helpful in understanding the pricing and options available.
                Nubihab made the entire process of finding and purchasing my first apartment stress-free."
              </p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-yellow-500"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
