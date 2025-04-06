import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays, Clock, MapPin, ArrowRight } from "lucide-react"
import { sql } from "@/lib/db"

async function getLatestSermon() {
  try {
    const sermons = await sql`SELECT * FROM sermons ORDER BY sermon_date DESC LIMIT 1`
    return sermons[0] || null
  } catch (error) {
    console.error("Error fetching latest sermon:", error)
    return null
  }
}

async function getUpcomingEvents() {
  // This would be from an events table, but we'll mock it for now
  return [
    {
      id: 1,
      title: "Sunday Worship Service",
      date: "Every Sunday",
      time: "10:00 AM",
      location: "Main Sanctuary",
    },
    {
      id: 2,
      title: "Bible Study",
      date: "Every Wednesday",
      time: "7:00 PM",
      location: "Fellowship Hall",
    },
    {
      id: 3,
      title: "Youth Group Meeting",
      date: "Every Friday",
      time: "6:30 PM",
      location: "Youth Center",
    },
  ]
}

async function getLatestBlogPosts() {
  try {
    const posts = await sql`SELECT * FROM blog_posts ORDER BY published_at DESC LIMIT 3`
    return posts
  } catch (error) {
    console.error("Error fetching latest blog posts:", error)
    return []
  }
}

export default async function Home() {
  const latestSermon = await getLatestSermon()
  const upcomingEvents = await getUpcomingEvents()
  const latestBlogPosts = await getLatestBlogPosts()

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section - Modern Design */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-r from-primary/90 to-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Welcome to Fares Church</h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                A place of worship, community, and spiritual growth
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-semibold">
                  <Link href="/about">Learn More</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="#service-times">Service Times</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?height=800&width=600"
                  alt="Church Community"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary rounded-lg shadow-lg hidden md:flex items-center justify-center">
                <Clock className="h-16 w-16 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Welcome to Our Church Family</h2>
              <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
                Fares Church is a vibrant, welcoming community dedicated to spreading God's love and message. We believe
                in creating a space where everyone can experience spiritual growth, find community, and serve others.
              </p>
              <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
                Whether you're seeking answers, looking for a church home, or simply curious, we invite you to join us
                and experience the difference that faith can make in your life.
              </p>
              <Button asChild>
                <Link href="/about">About Our Church</Link>
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=800&width=600" alt="Church Community" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Service Times */}
      <section id="service-times" className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary">Join Us in Worship</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-4">Sunday Service</h3>
                <div className="flex justify-center mb-4">
                  <Clock className="h-12 w-12 text-secondary" />
                </div>
                <p className="text-lg font-medium">10:00 AM</p>
                <p className="text-gray-600 dark:text-gray-400">Main Sanctuary</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-4">Bible Study</h3>
                <div className="flex justify-center mb-4">
                  <Clock className="h-12 w-12 text-secondary" />
                </div>
                <p className="text-lg font-medium">Wednesdays at 7:00 PM</p>
                <p className="text-gray-600 dark:text-gray-400">Fellowship Hall</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-4">Youth Group</h3>
                <div className="flex justify-center mb-4">
                  <Clock className="h-12 w-12 text-secondary" />
                </div>
                <p className="text-lg font-medium">Fridays at 6:30 PM</p>
                <p className="text-gray-600 dark:text-gray-400">Youth Center</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Sermon */}
      {latestSermon && (
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Latest Sermon</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Listen to our most recent message and be inspired by God's word.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
              <div className="grid md:grid-cols-2">
                <div className="relative h-[300px] md:h-auto">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt={latestSermon.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{latestSermon.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {latestSermon.preacher} | {new Date(latestSermon.sermon_date).toLocaleDateString()}
                  </p>
                  <p className="mb-6">{latestSermon.description}</p>
                  <div className="flex flex-wrap gap-4">
                    <Button asChild>
                      <Link href={`/sermons/${latestSermon.id}`}>Watch Sermon</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/sermons">All Sermons</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Upcoming Events</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Join us for these upcoming events and be part of our community.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <Card key={event.id}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">{event.title}</h3>
                  <div className="flex items-center mb-2">
                    <CalendarDays className="h-5 w-5 mr-2 text-secondary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <Clock className="h-5 w-5 mr-2 text-secondary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <MapPin className="h-5 w-5 mr-2 text-secondary" />
                    <span>{event.location}</span>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/events">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild>
              <Link href="/events">View All Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      {latestBlogPosts.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">From Our Blog</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Read our latest articles and stay updated with church news and insights.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {latestBlogPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={post.featured_image || "/placeholder.svg?height=400&width=600" || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {new Date(post.published_at).toLocaleDateString()} | {post.category}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content.substring(0, 120)}...</p>
                    <Button variant="link" className="p-0 h-auto font-medium text-primary flex items-center" asChild>
                      <Link href={`/blog/${post.slug}`}>
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild>
                <Link href="/blog">View All Posts</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            We invite you to be a part of our church family. Come worship with us and experience the love and fellowship
            of our community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-black">
              <Link href="/about">Learn More</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/donate">Support Our Mission</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

