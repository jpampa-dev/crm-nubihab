"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { apartmentData } from "@/lib/apartment-data"

const formSchema = z.object({
  type: z.string().min(2, {
    message: "Apartment type must be at least 2 characters.",
  }),
  bedrooms: z.coerce.number().min(0, {
    message: "Bedrooms must be a valid number.",
  }),
  bathrooms: z.coerce.number().min(0, {
    message: "Bathrooms must be a valid number.",
  }),
  area: z.coerce.number().min(1, {
    message: "Area must be a valid number.",
  }),
  price: z.coerce.number().min(1, {
    message: "Price must be a valid number.",
  }),
  description: z.string().optional(),
  features: z.string().optional(),
})

export default function EditApartmentPage({ params }: { params: { id: string } }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apartment, setApartment] = useState<any>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Find the apartment by ID
    const foundApartment = apartmentData.find((apt) => apt.id === Number.parseInt(params.id))

    if (foundApartment) {
      setApartment(foundApartment)
    } else {
      // Redirect if apartment not found
      router.push("/dashboard/apartments")
    }
  }, [params.id, router])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: apartment?.type || "",
      bedrooms: apartment?.bedrooms || 0,
      bathrooms: apartment?.bathrooms || 0,
      area: apartment?.area || 0,
      price: apartment?.price || 0,
      description: "",
      features: "",
    },
    values: {
      type: apartment?.type || "",
      bedrooms: apartment?.bedrooms || 0,
      bathrooms: apartment?.bathrooms || 0,
      area: apartment?.area || 0,
      price: apartment?.price || 0,
      description: "",
      features: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)

      toast({
        title: "Apartment Updated",
        description: "The apartment has been updated successfully.",
      })

      router.push("/dashboard/apartments")
    }, 1500)
  }

  if (!apartment) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link
          href="/dashboard/apartments"
          className="flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Apartments
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Apartment</h1>
        <p className="text-muted-foreground">Update the details for {apartment.type}.</p>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="floor-plan">Floor Plan</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Apartment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Apartment Type</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Studio Apartment" {...field} />
                          </FormControl>
                          <FormDescription>The type or name of the apartment.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price ($)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="e.g. 250000" {...field} />
                          </FormControl>
                          <FormDescription>The listing price in dollars.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bedrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bedrooms</FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(Number.parseInt(value))}
                            defaultValue={field.value.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select number of bedrooms" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="0">Studio (0)</SelectItem>
                              <SelectItem value="1">1 Bedroom</SelectItem>
                              <SelectItem value="2">2 Bedrooms</SelectItem>
                              <SelectItem value="3">3 Bedrooms</SelectItem>
                              <SelectItem value="4">4 Bedrooms</SelectItem>
                              <SelectItem value="5">5+ Bedrooms</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bathrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bathrooms</FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(Number.parseFloat(value))}
                            defaultValue={field.value.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select number of bathrooms" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1">1 Bathroom</SelectItem>
                              <SelectItem value="1.5">1.5 Bathrooms</SelectItem>
                              <SelectItem value="2">2 Bathrooms</SelectItem>
                              <SelectItem value="2.5">2.5 Bathrooms</SelectItem>
                              <SelectItem value="3">3 Bathrooms</SelectItem>
                              <SelectItem value="3.5">3.5 Bathrooms</SelectItem>
                              <SelectItem value="4">4+ Bathrooms</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="area"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Area (sq ft)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="e.g. 850" {...field} />
                          </FormControl>
                          <FormDescription>The total area in square feet.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter a detailed description of the apartment..."
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="features"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Features & Amenities</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="List the features and amenities, one per line..."
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Enter each feature on a new line (e.g., Modern Kitchen, Hardwood Floors, etc.)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 justify-end">
                    <Link href="/dashboard/apartments">
                      <Button variant="outline" type="button">
                        Cancel
                      </Button>
                    </Link>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="floor-plan">
          <Card>
            <CardHeader>
              <CardTitle>Floor Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4 flex flex-col items-center justify-center">
                  <img
                    src={apartment.floorPlanImage || "/placeholder.svg"}
                    alt={`${apartment.type} Floor Plan`}
                    className="max-w-full h-auto max-h-[400px] object-contain"
                  />
                  <div className="mt-4 flex gap-4">
                    <Button>Upload New Floor Plan</Button>
                    <Button variant="outline">Remove Floor Plan</Button>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Upload a clear floor plan image to help potential buyers understand the layout of the apartment.
                  Recommended size: 1200x800 pixels, JPG or PNG format.
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="images">
          <Card>
            <CardHeader>
              <CardTitle>Apartment Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Existing images */}
                  <div className="border rounded-lg p-2 relative group">
                    <img
                      src="/placeholder.svg?height=300&width=300"
                      alt="Living Room"
                      className="w-full h-48 object-cover rounded"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded">
                      <Button variant="secondary" size="sm">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Remove
                      </Button>
                    </div>
                    <p className="mt-2 text-sm font-medium">Living Room</p>
                  </div>
                  <div className="border rounded-lg p-2 relative group">
                    <img
                      src="/placeholder.svg?height=300&width=300"
                      alt="Kitchen"
                      className="w-full h-48 object-cover rounded"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded">
                      <Button variant="secondary" size="sm">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Remove
                      </Button>
                    </div>
                    <p className="mt-2 text-sm font-medium">Kitchen</p>
                  </div>
                  <div className="border rounded-lg p-2 relative group">
                    <img
                      src="/placeholder.svg?height=300&width=300"
                      alt="Bedroom"
                      className="w-full h-48 object-cover rounded"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded">
                      <Button variant="secondary" size="sm">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Remove
                      </Button>
                    </div>
                    <p className="mt-2 text-sm font-medium">Bedroom</p>
                  </div>
                  <div className="border rounded-lg p-2 relative group">
                    <img
                      src="/placeholder.svg?height=300&width=300"
                      alt="Bathroom"
                      className="w-full h-48 object-cover rounded"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded">
                      <Button variant="secondary" size="sm">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Remove
                      </Button>
                    </div>
                    <p className="mt-2 text-sm font-medium">Bathroom</p>
                  </div>

                  {/* Upload new image */}
                  <div className="border rounded-lg p-2 flex flex-col items-center justify-center h-48 border-dashed">
                    <Button variant="outline">
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
                        className="mr-2 h-4 w-4"
                      >
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                        <line x1="16" x2="22" y1="5" y2="5" />
                        <line x1="19" x2="19" y1="2" y2="8" />
                        <circle cx="9" cy="9" r="2" />
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                      </svg>
                      Add Image
                    </Button>
                    <p className="mt-2 text-xs text-muted-foreground">Upload high-quality images</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Upload high-quality images of the apartment to showcase its features. Recommended size: at least
                  1200x800 pixels, JPG or PNG format.
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
