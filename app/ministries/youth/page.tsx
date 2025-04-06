import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays, Clock, MapPin, Users, Heart, Award } from "lucide-react"

export default function YouthMinistryPage() {
  // Sample upcoming youth events
  const upcomingEvents = [
    {
      id: 1,
      title: "Youth Game Night",
      date: "Every Friday",
      time: "6:30 PM - 9:00 PM",
      location: "Youth Center",
      description: "Join us for games, snacks, and fellowship with other teens.",
    },
    {
      id: 2,
      title: "Summer Camp Registration",
      date: "May 15, 2023",
      time: "All Day",
      location: "Online",
      description: "Last day to register for our annual summer youth camp.",
    },
    {
      id: 3,
      title: "Bible Study for Teens",
      date: "Every Wednesday",
      time: "7:00 PM - 8:30 PM",
      location: "Room 201",
      description: "Weekly Bible study focused on issues relevant to teenagers.",
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Youth Ministry</h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                Building the next generation of faith-filled leaders through community, discipleship, and fun.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white hover:bg-white/90 text-primary font-semibold">
                  Join Us
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Meet Our Team
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image src="/placeholder.svg?height=800&width=600" alt="Youth Group" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary rounded-lg shadow-lg hidden md:flex items-center justify-center">
                <Users className="h-16 w-16 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Our Youth Ministry */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">About Our Youth Ministry</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Our youth ministry is dedicated to helping teenagers grow in their faith, build meaningful relationships,
              and discover their God-given purpose. We provide a safe and fun environment where youth can ask questions,
              explore their faith, and be equipped to live out their beliefs in everyday life.
            </p>
          </div>

          {/* Bento Grid for Youth Ministry Features */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-blue-50 dark:bg-blue-950 border-none shadow-md overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Building lasting friendships and a sense of belonging in a Christ-centered community.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-indigo-50 dark:bg-indigo-950 border-none shadow-md overflow-hidden md:translate-y-4">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Growth</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Developing spiritual maturity through Bible study, mentorship, and practical application.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-cyan-50 dark:bg-cyan-950 border-none shadow-md overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Service</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Putting faith into action through local and global service opportunities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Weekly Schedule */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary text-center">Weekly Schedule</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Sunday</h3>
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 mr-2 text-secondary" />
                  <span>9:30 AM - 10:45 AM</span>
                </div>
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 mr-2 text-secondary" />
                  <span>Youth Room</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Sunday School for teens with age-appropriate Bible lessons and discussions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Wednesday</h3>
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 mr-2 text-secondary" />
                  <span>7:00 PM - 8:30 PM</span>
                </div>
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 mr-2 text-secondary" />
                  <span>Room 201</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Midweek Bible study focused on relevant topics for teenagers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Friday</h3>
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 mr-2 text-secondary" />
                  <span>6:30 PM - 9:00 PM</span>
                </div>
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 mr-2 text-secondary" />
                  <span>Youth Center</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Youth night with games, worship, teaching, and small groups.
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
              Join us for these special events designed for our youth community.
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
            There are many ways for both teens and adults to get involved with our youth ministry.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white hover:bg-white/90 text-primary font-semibold">
              For Teens
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              For Parents
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Volunteer
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

