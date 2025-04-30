import Link from "next/link"
import { Building, Home, MessageSquare, TrendingUp, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/dashboard/overview"
import { RecentLeads } from "@/components/dashboard/recent-leads"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Apartments</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">36</div>
            <p className="text-xs text-muted-foreground">+2 new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18.2%</div>
            <p className="text-xs text-muted-foreground">+2.4% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+18 from last week</p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="leads">Recent Leads</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>View your lead and sales metrics for the past 30 days.</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Popular Apartments</CardTitle>
                <CardDescription>Your most viewed apartment listings this month.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Luxury Suite", views: 1823, id: 6 },
                    { name: "Penthouse", views: 1429, id: 5 },
                    { name: "2 Bedroom Apartment", views: 952, id: 3 },
                    { name: "3 Bedroom Apartment", views: 842, id: 4 },
                    { name: "1 Bedroom Apartment", views: 654, id: 2 },
                  ].map((apartment) => (
                    <div key={apartment.id} className="flex items-center">
                      <div className="flex items-center gap-2 flex-1">
                        <Home className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{apartment.name}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{apartment.views} views</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="leads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Leads</CardTitle>
              <CardDescription>You have received 12 new leads in the last 7 days.</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentLeads />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and actions</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Link href="/dashboard/apartments/new">
              <Button className="w-full">Add New Apartment</Button>
            </Link>
            <Link href="/dashboard/leads">
              <Button variant="outline" className="w-full">
                View All Leads
              </Button>
            </Link>
            <Link href="/dashboard/apartments">
              <Button variant="outline" className="w-full">
                Manage Apartments
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New lead received", time: "2 minutes ago", user: "Quote Generator" },
                { action: "Apartment #5 updated", time: "1 hour ago", user: "Admin User" },
                { action: "New apartment added", time: "3 hours ago", user: "Admin User" },
                { action: "Lead #245 marked as contacted", time: "5 hours ago", user: "Sales Agent" },
                { action: "User settings updated", time: "Yesterday", user: "Admin User" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">By {activity.user}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
