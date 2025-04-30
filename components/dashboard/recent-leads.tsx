"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function RecentLeads() {
  const recentLeads = [
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
  ]

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
    <div className="space-y-8">
      {recentLeads.map((lead) => (
        <div key={lead.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder-user.jpg" alt={lead.name} />
            <AvatarFallback>{lead.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{lead.name}</p>
            <p className="text-sm text-muted-foreground">{lead.email}</p>
          </div>
          <div className="ml-auto flex flex-col items-end gap-1">
            <div>{getStatusBadge(lead.status)}</div>
            <p className="text-xs text-muted-foreground">{new Date(lead.date).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
      <Button variant="outline" className="w-full">
        View All Leads
      </Button>
    </div>
  )
}
