"use client"

import { useState } from "react"
import { Check, MoreHorizontal, Phone, X } from "lucide-react"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample lead data
const initialLeads = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "(123) 456-7890",
    apartmentType: "2 Bedroom Apartment",
    budget: "$300,000 - $400,000",
    status: "New",
    date: "2023-04-28",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "(234) 567-8901",
    apartmentType: "Penthouse",
    budget: "$500,000+",
    status: "Contacted",
    date: "2023-04-27",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert@example.com",
    phone: "(345) 678-9012",
    apartmentType: "Studio Apartment",
    budget: "$100,000 - $200,000",
    status: "Qualified",
    date: "2023-04-26",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "(456) 789-0123",
    apartmentType: "1 Bedroom Apartment",
    budget: "$200,000 - $300,000",
    status: "Negotiation",
    date: "2023-04-25",
  },
  {
    id: 5,
    name: "Michael Wilson",
    email: "michael@example.com",
    phone: "(567) 890-1234",
    apartmentType: "3 Bedroom Apartment",
    budget: "$400,000 - $500,000",
    status: "Closed",
    date: "2023-04-24",
  },
  {
    id: 6,
    name: "Sarah Brown",
    email: "sarah@example.com",
    phone: "(678) 901-2345",
    apartmentType: "Luxury Suite",
    budget: "$500,000+",
    status: "Lost",
    date: "2023-04-23",
  },
  {
    id: 7,
    name: "David Miller",
    email: "david@example.com",
    phone: "(789) 012-3456",
    apartmentType: "2 Bedroom Apartment",
    budget: "$300,000 - $400,000",
    status: "New",
    date: "2023-04-22",
  },
  {
    id: 8,
    name: "Jennifer Garcia",
    email: "jennifer@example.com",
    phone: "(890) 123-4567",
    apartmentType: "Penthouse",
    budget: "$500,000+",
    status: "Contacted",
    date: "2023-04-21",
  },
]

export default function LeadsPage() {
  const [leads, setLeads] = useState(initialLeads)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedLead, setSelectedLead] = useState<any>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Filter leads based on search term and status
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.apartmentType.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || lead.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleStatusChange = (leadId: number, newStatus: string) => {
    setLeads(leads.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead)))
  }

  const handleDeleteLead = () => {
    if (selectedLead) {
      setLeads(leads.filter((lead) => lead.id !== selectedLead.id))
      setIsDeleteDialogOpen(false)
      setSelectedLead(null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "New":
        return <Badge variant="outline">New</Badge>
      case "Contacted":
        return <Badge variant="secondary">Contacted</Badge>
      case "Qualified":
        return <Badge variant="default">Qualified</Badge>
      case "Negotiation":
        return <Badge className="bg-orange-500">Negotiation</Badge>
      case "Closed":
        return <Badge className="bg-green-500">Closed</Badge>
      case "Lost":
        return <Badge variant="destructive">Lost</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Lead Management</h1>
        <Button>Export Leads</Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setStatusFilter("all")}>
              All Leads
            </TabsTrigger>
            <TabsTrigger value="new" onClick={() => setStatusFilter("New")}>
              New
            </TabsTrigger>
            <TabsTrigger value="contacted" onClick={() => setStatusFilter("Contacted")}>
              Contacted
            </TabsTrigger>
            <TabsTrigger value="qualified" onClick={() => setStatusFilter("Qualified")}>
              Qualified
            </TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Input
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Contacted">Contacted</SelectItem>
                <SelectItem value="Qualified">Qualified</SelectItem>
                <SelectItem value="Negotiation">Negotiation</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
                <SelectItem value="Lost">Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Apartment Type</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        No leads found. Try adjusting your search or filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLeads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm">{lead.email}</span>
                            <span className="text-sm text-muted-foreground">{lead.phone}</span>
                          </div>
                        </TableCell>
                        <TableCell>{lead.apartmentType}</TableCell>
                        <TableCell>{lead.budget}</TableCell>
                        <TableCell>{getStatusBadge(lead.status)}</TableCell>
                        <TableCell>{new Date(lead.date).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Phone className="h-4 w-4" />
                              <span className="sr-only">Call</span>
                            </Button>
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
                                <DropdownMenuItem onClick={() => handleStatusChange(lead.id, "Contacted")}>
                                  Mark as Contacted
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(lead.id, "Qualified")}>
                                  Mark as Qualified
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(lead.id, "Negotiation")}>
                                  Move to Negotiation
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(lead.id, "Closed")}>
                                  Mark as Closed
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(lead.id, "Lost")}>
                                  Mark as Lost
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => {
                                    setSelectedLead(lead)
                                    setIsDeleteDialogOpen(true)
                                  }}
                                >
                                  Delete Lead
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
        </TabsContent>

        <TabsContent value="new" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>New Leads</CardTitle>
              <CardDescription>These leads have recently been submitted and need your attention.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Same table but filtered for new leads only */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Apartment Type</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        No new leads found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLeads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm">{lead.email}</span>
                            <span className="text-sm text-muted-foreground">{lead.phone}</span>
                          </div>
                        </TableCell>
                        <TableCell>{lead.apartmentType}</TableCell>
                        <TableCell>{lead.budget}</TableCell>
                        <TableCell>{new Date(lead.date).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStatusChange(lead.id, "Contacted")}
                            >
                              <Check className="mr-1 h-4 w-4" />
                              Mark Contacted
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Phone className="h-4 w-4" />
                              <span className="sr-only">Call</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacted" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contacted Leads</CardTitle>
              <CardDescription>These leads have been contacted and are waiting for follow-up.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Similar table structure for contacted leads */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Apartment Type</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        No contacted leads found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLeads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm">{lead.email}</span>
                            <span className="text-sm text-muted-foreground">{lead.phone}</span>
                          </div>
                        </TableCell>
                        <TableCell>{lead.apartmentType}</TableCell>
                        <TableCell>{lead.budget}</TableCell>
                        <TableCell>{new Date(lead.date).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStatusChange(lead.id, "Qualified")}
                            >
                              <Check className="mr-1 h-4 w-4" />
                              Qualify
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-600"
                              onClick={() => handleStatusChange(lead.id, "Lost")}
                            >
                              <X className="mr-1 h-4 w-4" />
                              Disqualify
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="qualified" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Qualified Leads</CardTitle>
              <CardDescription>These leads have been qualified and are ready for the next steps.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Apartment Type</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        No qualified leads found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLeads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm">{lead.email}</span>
                            <span className="text-sm text-muted-foreground">{lead.phone}</span>
                          </div>
                        </TableCell>
                        <TableCell>{lead.apartmentType}</TableCell>
                        <TableCell>{lead.budget}</TableCell>
                        <TableCell>{new Date(lead.date).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStatusChange(lead.id, "Negotiation")}
                            >
                              <Check className="mr-1 h-4 w-4" />
                              Move to Negotiation
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the lead for {selectedLead?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteLead}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
