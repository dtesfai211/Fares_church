import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { format } from "date-fns"
import { ArrowLeft, Calendar, Clock, MapPin, Share2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import { getAllEvents } from "@/lib/sanity.client"
import { client } from "@/sanity/lib/client"

// Import SanityDocument interface
import { Event, SanityDocument } from "@/lib/sanity.client"

interface PageProps {
  params: {
    slug: string
  }
}

interface EventData extends SanityDocument {
  title: string;
  slug: { current: string };
  date?: string;
  time?: string;
  location: string;
  description?: string;
  image?: string;
  imageUrl?: string;
  is_recurring?: boolean;
  recurrence_info?: string;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const event = await fetchEventBySlug(params.slug)
  
  if (!event) {
    return {
      title: "Event Not Found | Fares Church"
    }
  }

  return {
    title: `${event.title} | Events | Fares Church`,
    description: event.description || "Join us for this special event at Fares Church!",
  }
}

// Handle redirect for mistyped URLs
async function checkRedirect(slug: string) {
  // Handle specific typos we know about
  if (slug === "saturdat-event") {
    // Check if 'saturday-event' exists
    const correctEvent = await fetchEventBySlug("saturday-event")
    if (correctEvent) {
      return "saturday-event"
    }
  } 
  
  // For future typo handling, add more conditions here
  return null
}

// Fetch a specific event by slug
async function fetchEventBySlug(slug: string): Promise<EventData | null> {
  try {
    const event = await client.fetch(
      `*[_type == "event" && slug.current == $slug][0]{
        _id,
        _type,
        title,
        slug,
        date,
        time,
        location,
        description,
        is_recurring,
        recurrence_info,
        "imageUrl": image.asset->url
      }`,
      { slug }
    )
    return event
  } catch (error) {
    console.error("Error fetching event by slug:", error)
    return null
  }
}

export default async function EventPage({ params }: PageProps) {
  console.log("Event page rendering for slug:", params.slug);
  
  // Check if we need to redirect for known typos
  const redirectSlug = await checkRedirect(params.slug)
  if (redirectSlug) {
    console.log(`Redirecting from ${params.slug} to ${redirectSlug}`)
    redirect(`/events/${redirectSlug}`)
  }
  
  // Try to get the event - with retries and typo correction handled by the client
  const event = await fetchEventBySlug(params.slug);
  
  // If event still not found, show our custom error page
  if (!event) {
    console.log("Event not found, preparing error page");
    
    // Get all events for suggestions
    const allEvents = await getAllEvents();
    const suggestedEvents = allEvents.slice(0, 3); 
    
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950 flex-1">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Button variant="ghost" className="flex items-center mb-8" asChild>
              <Link href="/events">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
              </Link>
            </Button>
            
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Event Not Found</h1>
              
              <Alert className="mb-8" variant="warning">
                <AlertCircle className="h-5 w-5" />
                <AlertTitle>We couldn't find the event you're looking for</AlertTitle>
                <AlertDescription>
                  The event with slug "{params.slug}" doesn't exist or might have been removed.
                </AlertDescription>
              </Alert>
              
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-6 text-center">Events You Might Be Interested In</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {suggestedEvents.map((event) => (
                    <Card key={event._id} className="flex flex-col">
                      {event.imageUrl && (
                        <div className="relative h-40 w-full">
                          <Image 
                            src={event.imageUrl} 
                            alt={event.title} 
                            fill 
                            className="object-cover rounded-t-lg" 
                          />
                        </div>
                      )}
                      <CardContent className="p-4 flex-1 flex flex-col">
                        <h3 className="font-bold mb-2">{event.title}</h3>
                        <p className="text-sm mb-3">
                          {event.date ? format(new Date(event.date), "MMMM dd, yyyy") : "Date TBA"}
                        </p>
                        <div className="mt-auto pt-2">
                          <Button variant="outline" size="sm" className="w-full" asChild>
                            <Link href={`/events/${event.slug.current}`}>
                              View Details
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button asChild>
                  <Link href="/events">View All Events</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </main>
    );
  }

  // Found the event, show the details
  const formattedDate = event.date 
    ? format(new Date(event.date), "EEEE, MMMM dd, yyyy")
    : "Date TBA"

  // Check if event is in the past
  const isPastEvent = event.date && new Date(event.date) < new Date()

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" className="flex items-center mb-8" asChild>
            <Link href="/events">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
            </Link>
          </Button>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12">
            <div>
              <div className="relative h-80 md:h-[400px] rounded-lg overflow-hidden">
                <Image
                  src={event.imageUrl || "/placeholder.jpg"}
                  alt={event.title}
                  fill
                  className={`object-cover ${isPastEvent ? 'filter grayscale' : ''}`}
                  priority
                />
                {isPastEvent && (
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="bg-black bg-opacity-70 text-white px-6 py-3 text-xl font-bold rounded-md transform -rotate-12">
                      Past Event
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-6">{event.title}</h1>
              
              <div className="flex flex-col space-y-4 mb-8">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-3 text-primary" />
                  <span><strong>Date:</strong> {formattedDate}</span>
                </div>
                
                {event.time && (
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-3 text-primary" />
                    <span><strong>Time:</strong> {event.time}</span>
                  </div>
                )}
                
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-primary" />
                  <span><strong>Location:</strong> {event.location}</span>
                </div>
              </div>

              {event.description && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Description</h2>
                  <p className="text-gray-700 dark:text-gray-300">{event.description}</p>
                </div>
              )}

              {/* Display recurring info if the event is recurring */}
              {event.is_recurring && event.recurrence_info && (
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6">
                  <p className="font-medium">This is a recurring event: {event.recurrence_info}</p>
                </div>
              )}
              
              {/* Only show action buttons for future events */}
              {!isPastEvent && (
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <Link href="/contact">Contact for Details</Link>
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <Share2 className="mr-2 h-4 w-4" /> Share Event
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function MapPinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}