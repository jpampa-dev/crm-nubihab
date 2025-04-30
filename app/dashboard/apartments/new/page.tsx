"use client"

import { useState } from "react"
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
import { useToast } from "@/hooks/use-toast"

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

export default function NewApartmentPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      bedrooms: 0,
      bathrooms: 0,
      area: 0,
      price: 0,
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
        title: "Apartment Added",
        description: "The new apartment has been added successfully.",
      })

      router.push("/dashboard/apartments")
    }, 1500)
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
        <h1 className="text-2xl font-bold tracking-tight">Add New Apartment</h1>
        <p className="text-muted-foreground">Create a new apartment listing with all the necessary details.</p>
      </div>

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
                  {isSubmitting ? "Adding..." : "Add Apartment"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
