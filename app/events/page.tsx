import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllEvents, SanityDocument } from "@/lib/sanity.client"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ReloadIcon } from "@/components/ui/icons"

export const metadata: Metadata = {
  title: "Events | Fares Church",
  description: "Join us for our upcoming events, services and community gatherings",
}

interface EventData extends SanityDocument {
  title: string;
  slug: { current: string };
  date?: string;
  time?: string;
  location: string;
  description?: string;
  imageUrl?: string;
}

export default async function EventsPage() {
  const events = await getAllEvents()
  
  // Separate events into upcoming and past
  const now = new Date()
  const upcomingEvents = events.filter(
    event => !event.date || new Date(event.date) >= now
  ).sort((a, b) => {
    if (!a.date) return 1
    if (!b.date) return -1
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })
  
  const pastEvents = events.filter(
    event => event.date && new Date(event.date) < now
  ).sort((a, b) => {
    if (!a.date) return 1
    if (!b.date) return -1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950 flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 dark:text-gray-100 mb-4">
              Events & Calendar
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              Join us for worship, fellowship, and community outreach opportunities
            </p>
          </div>
          
          {events.length === 0 ? (
            <div className="max-w-md mx-auto my-12">
              <Alert variant="default" className="mb-6">
                <AlertTitle>No events available</AlertTitle>
                <AlertDescription>
                  There was a problem loading events, or no events have been scheduled yet.
                </AlertDescription>
              </Alert>
              <div className="text-center">
                <Button 
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center"
                >
                  <ReloadIcon className="mr-2 h-4 w-4" /> Try Again
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Upcoming Events */}
              <div className="mb-16">
                <h2 className="text-2xl font-bold font-serif mb-8">Upcoming Events</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {upcomingEvents.length > 0 ? (
                    upcomingEvents.map((event) => (
                      <div key={event._id} className="flex flex-col bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
                        <div className="relative h-48 w-full">
                          <Image
                            src={event.imageUrl || "/placeholder.jpg"}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                          <div className="mb-4 text-gray-600 dark:text-gray-400">
                            <p>{event.date ? format(new Date(event.date), "MMMM dd, yyyy") : "Date TBA"}</p>
                            {event.time && <p>{event.time}</p>}
                            <p>{event.location}</p>
                          </div>
                          {event.description && (
                            <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                              {event.description}
                            </p>
                          )}
                          <div className="mt-auto">
                            <Button 
                              variant="link" 
                              className="flex items-center p-0 text-primary" 
                              asChild
                            >
                              <Link href={`/events/${event.slug.current}`}>
                                View Details <ChevronRight className="h-4 w-4 ml-1" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-lg text-gray-600 dark:text-gray-400">No upcoming events scheduled at the moment.</p>
                      <p className="mt-2">Check back soon for new events!</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Past Events */}
              {pastEvents.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold font-serif mb-8">Past Events</h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {pastEvents.slice(0, 3).map((event) => (
                      <div key={event._id} className="flex flex-col bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow opacity-75">
                        <div className="relative h-48 w-full">
                          <Image
                            src={event.imageUrl || "/placeholder.jpg"}
                            alt={event.title}
                            fill
                            className="object-cover filter grayscale"
                          />
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                          <div className="mb-4 text-gray-500 dark:text-gray-400">
                            <p>{format(new Date(event.date || ''), "MMMM dd, yyyy")}</p>
                            <p>{event.location}</p>
                          </div>
                          <div className="mt-auto">
                            <Button 
                              variant="link" 
                              className="flex items-center p-0 text-gray-500 dark:text-gray-400" 
                              asChild
                            >
                              <Link href={`/events/${event.slug.current}`}>
                                View Archive <ChevronRight className="h-4 w-4 ml-1" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {pastEvents.length > 3 && (
                    <div className="text-center mt-8">
                      <Button variant="outline">View All Past Events</Button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}