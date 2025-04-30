"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit, MoreHorizontal, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { apartmentData } from "@/lib/apartment-data"

export default function ApartmentsPage() {
  const [apartments, setApartments] = useState(apartmentData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedApartment, setSelectedApartment] = useState<any>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Filter apartments based on search term
  const filteredApartments = apartments.filter((apartment) =>
    apartment.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteApartment = () => {
    if (selectedApartment) {
      setApartments(apartments.filter((apt) => apt.id !== selectedApartment.id))
      setIsDeleteDialogOpen(false)
      setSelectedApartment(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Apartment Management</h1>
        <Link href="/dashboard/apartments/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Apartment
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Apartments</CardTitle>
          <CardDescription>Manage your apartment listings, edit details, and add new properties.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <Input
              placeholder="Search apartments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Bedrooms</TableHead>
                <TableHead>Bathrooms</TableHead>
                <TableHead>Area (sq ft)</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApartments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No apartments found. Try adjusting your search or add a new apartment.
                  </TableCell>
                </TableRow>
              ) : (
                filteredApartments.map((apartment) => (
                  <TableRow key={apartment.id}>
                    <TableCell>{apartment.id}</TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded overflow-hidden">
                          <img
                            src={apartment.floorPlanImage || "/placeholder.svg"}
                            alt={apartment.type}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {apartment.type}
                      </div>
                    </TableCell>
                    <TableCell>{apartment.bedrooms}</TableCell>
                    <TableCell>{apartment.bathrooms}</TableCell>
                    <TableCell>{apartment.area}</TableCell>
                    <TableCell>${apartment.price.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/dashboard/apartments/${apartment.id}`}>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </Link>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">More</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/apartments/${apartment.id}`}>View on Website</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/apartments/${apartment.id}`}>Edit Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/apartments/${apartment.id}/floor-plan`}>Manage Floor Plan</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => {
                                setSelectedApartment(apartment)
                                setIsDeleteDialogOpen(true)
                              }}
                            >
                              Delete Apartment
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the {selectedApartment?.type}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteApartment}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
