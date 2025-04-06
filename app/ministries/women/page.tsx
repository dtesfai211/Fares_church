import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays, Clock, MapPin, Heart, BookOpen, Coffee } from "lucide-react"

export default function WomensMinistryPage() {
  // Sample upcoming women's ministry events
  const upcomingEvents = [
    {
      id: 1,
      title: "Women's Bible Study",
      date: "Every Tuesday",
      time: "10:00 AM - 11:30 AM",
      location: "Fellowship Hall",
      description: "Join us as we study the book of Psalms and discover God's heart for us.",
    },
    {
      id: 2,
      title: "Ladies' Night Out",
      date: "Last Friday of each month",
      time: "7:00 PM - 9:00 PM",
      location: "Various Locations",
      description: "A time of fellowship, fun, and building relationships with other women.",
    },
    {
      id: 3,
      title: "Women's Retreat",
      date: "October 15-17, 2023",
      time: "All Weekend",
      location: "Mountain View Retreat Center",
      description: "Annual women's retreat focused on rest, renewal, and spiritual growth.",
    },
  ]

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section - Modern Design */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-r from-primary/90 to-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Women's Ministry</h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                Empowering women to grow in faith, connect in authentic community, and serve with their unique gifts.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white hover:bg-white/90 text-primary font-semibold">
                  Join Us
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Our Events
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?height=800&width=600"
                  alt="Women's Ministry"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary rounded-lg shadow-lg hidden md:flex items-center justify-center">
                <Heart className="h-16 w-16 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Our Women's Ministry */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">About Our Women's Ministry</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Our women's ministry is designed to create spaces where women can connect with God and each other in
              meaningful ways. We believe that when women are equipped and encouraged, they can make a profound impact
              in their families, church, and community.
            </p>
          </div>

          {/* Bento Grid for Women's Ministry Features */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-blue-50 dark:bg-blue-950 border-none shadow-md overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Bible Study</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Diving deep into God's Word together to grow in knowledge and application.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-indigo-50 dark:bg-indigo-950 border-none shadow-md overflow-hidden md:translate-y-4">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-4">
                  <Coffee className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Fellowship</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Building authentic relationships through shared experiences and support.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-cyan-50 dark:bg-cyan-950 border-none shadow-md overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Service</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Using our gifts to serve others in our church and community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Regular Gatherings */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary text-center">Regular Gatherings</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Tuesday Morning Bible Study</h3>
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 mr-2 text-secondary" />
                  <span>10:00 AM - 11:30 AM</span>
                </div>
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 mr-2 text-secondary" />
                  <span>Fellowship Hall</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  In-depth Bible study with childcare provided. Currently studying the book of Psalms.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Thursday Evening Study</h3>
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 mr-2 text-secondary" />
                  <span>7:00 PM - 8:30 PM</span>
                </div>
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 mr-2 text-secondary" />
                  <span>Room 205</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Evening Bible study for women who work during the day or prefer evening gatherings.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Monthly Fellowship</h3>
                <div className="flex items-center mb-2">
                  <CalendarDays className="h-5 w-5 mr-2 text-secondary" />
                  <span>Last Friday of each month</span>
                </div>
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 mr-2 text-secondary" />
                  <span>7:00 PM - 9:00 PM</span>
                </div>
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 mr-2 text-secondary" />
                  <span>Various Locations</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Social gatherings to build relationships and have fun together.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Upcoming Events</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Join us for these special events designed for women in our church and community.
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
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{event.description}</p>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Involved</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            There are many ways to connect with our women's ministry and grow in your faith journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white hover:bg-white/90 text-primary font-semibold">
              Join a Bible Study
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Volunteer
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

