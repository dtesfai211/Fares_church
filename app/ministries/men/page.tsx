import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays, Clock, MapPin, Shield, PenToolIcon as Tool, Coffee } from "lucide-react"

export default function MensMinistryPage() {
  // Sample upcoming men's ministry events
  const upcomingEvents = [
    {
      id: 1,
      title: "Men's Breakfast",
      date: "First Saturday of each month",
      time: "8:00 AM - 9:30 AM",
      location: "Fellowship Hall",
      description: "Monthly breakfast with fellowship, devotional, and discussion.",
    },
    {
      id: 2,
      title: "Men's Bible Study",
      date: "Every Thursday",
      time: "6:30 AM - 7:30 AM",
      location: "Room 103",
      description: "Early morning Bible study before work. Currently studying the book of James.",
    },
    {
      id: 3,
      title: "Service Project: Home Repairs",
      date: "June 10, 2023",
      time: "9:00 AM - 3:00 PM",
      location: "Meet at Church Parking Lot",
      description: "Helping elderly church members and community residents with home repairs.",
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Men's Ministry</h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                Building men of faith, integrity, and purpose through fellowship, discipleship, and service.
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
                <Image src="/placeholder.svg?height=800&width=600" alt="Men's Ministry" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary rounded-lg shadow-lg hidden md:flex items-center justify-center">
                <Shield className="h-16 w-16 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Our Men's Ministry */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">About Our Men's Ministry</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Our men's ministry exists to help men grow in their relationship with God, build meaningful friendships
              with other men, and develop as leaders in their homes, workplaces, church, and community. We believe that
              when men are equipped with biblical truth and surrounded by godly relationships, they can make a
              significant impact for the Kingdom of God.
            </p>
          </div>

          {/* Bento Grid for Men's Ministry Features */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-blue-50 dark:bg-blue-950 border-none shadow-md overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Discipleship</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Growing in faith and biblical understanding through study and mentorship.
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
                  Building authentic relationships with other men through shared experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-cyan-50 dark:bg-cyan-950 border-none shadow-md overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center mb-4">
                  <Tool className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Service</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Using our skills and strengths to serve others and make a difference.
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
                <h3 className="text-xl font-bold mb-4">Thursday Morning Bible Study</h3>
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 mr-2 text-secondary" />
                  <span>6:30 AM - 7:30 AM</span>
                </div>
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 mr-2 text-secondary" />
                  <span>Room 103</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Early morning Bible study before work. Currently studying the book of James.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Monthly Breakfast</h3>
                <div className="flex items-center mb-2">
                  <CalendarDays className="h-5 w-5 mr-2 text-secondary" />
                  <span>First Saturday of each month</span>
                </div>
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 mr-2 text-secondary" />
                  <span>8:00 AM - 9:30 AM</span>
                </div>
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 mr-2 text-secondary" />
                  <span>Fellowship Hall</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Monthly breakfast with fellowship, devotional, and discussion.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Service Projects</h3>
                <div className="flex items-center mb-2">
                  <CalendarDays className="h-5 w-5 mr-2 text-secondary" />
                  <span>Quarterly</span>
                </div>
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 mr-2 text-secondary" />
                  <span>Various Locations</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Quarterly service projects to help those in need in our church and community.
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
              Join us for these special events designed for men in our church and community.
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
            There are many ways to connect with our men's ministry and grow in your faith journey.
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

