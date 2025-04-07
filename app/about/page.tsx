import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Heart, Users, Clock, ChevronRight } from "lucide-react"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

// Define interface for leadership team members
interface TeamMember {
  _id: string;
  name: string;
  position: string;
  bio: string;
  imageUrl?: string;
  slug?: {
    current: string;
  };
}

// Fetch leadership team from Sanity
async function getLeadershipTeam(): Promise<TeamMember[]> {
  return client.fetch(`
    *[_type == "author" && isLeadershipTeam == true] | order(leadershipOrder asc) {
      _id,
      name,
      position,
      bio,
      "imageUrl": image.asset->url,
      slug
    }
  `)
}

// Hard-coded about us sections
const aboutSections = [
  {
    id: 1,
    title: "Our History",
    content: `
      <p>Fares Church was founded in 1952 by a small group of devoted believers who sought to create a place of worship that would serve the community for generations to come. What began as a modest gathering in a local school gymnasium has grown into a vibrant church community with hundreds of members.</p>
      <p>Through the decades, our church has weathered many changes in society while remaining steadfast in our commitment to spreading God's word and serving others. We've expanded our facilities, developed numerous ministries, and touched countless lives along the way.</p>
      <p>Today, we continue to build on the strong foundation laid by our founders, honoring their vision while embracing new ways to connect with our community and share the timeless message of faith, hope, and love.</p>
    `,
    icon: BookOpen,
    color: "blue",
  },
  {
    id: 2,
    title: "Our Mission",
    content: `
      <p>At Fares Church, our mission is to love God, love people, and make disciples. We believe that faith should be lived out in practical ways that transform both individuals and communities.</p>
      <p>We are committed to:</p>
      <ul>
        <li>Providing authentic worship experiences that honor God</li>
        <li>Teaching the Bible in ways that are relevant and applicable to daily life</li>
        <li>Creating a welcoming environment where people from all walks of life can find belonging</li>
        <li>Equipping believers to discover and use their spiritual gifts</li>
        <li>Serving our local community and supporting global missions</li>
      </ul>
      <p>Through these commitments, we strive to be a church that not only gathers on Sundays but impacts our world every day of the week.</p>
    `,
    icon: Heart,
    color: "indigo",
  },
  {
    id: 3,
    title: "Our Beliefs",
    content: `
      <p>Fares Church is grounded in the historic Christian faith, with beliefs centered on the Bible as God's inspired word and Jesus Christ as our Lord and Savior.</p>
      <p>We believe in:</p>
      <ul>
        <li>The Trinity: One God eternally existing as Father, Son, and Holy Spirit</li>
        <li>The divinity and humanity of Jesus Christ, His virgin birth, sinless life, atoning death, and bodily resurrection</li>
        <li>Salvation by grace through faith in Jesus Christ alone</li>
        <li>The ongoing work of the Holy Spirit in the life of believers</li>
        <li>The importance of baptism and communion as sacred ordinances</li>
        <li>The church as the body of Christ, called to worship, fellowship, and service</li>
        <li>The return of Jesus Christ and the eternal kingdom of God</li>
      </ul>
      <p>While we hold firmly to these core beliefs, we recognize that Christians may differ on secondary issues, and we strive to maintain unity in essentials, liberty in non-essentials, and charity in all things.</p>
    `,
    icon: Users,
    color: "cyan",
  },
]

// Service times
const serviceTimes = [
  {
    day: "Sunday",
    time: "10:00 AM",
    description: "Main Worship Service",
  },
  {
    day: "Wednesday",
    time: "7:00 PM",
    description: "Midweek Bible Study",
  },
  {
    day: "Friday",
    time: "6:30 PM",
    description: "Youth Group",
  },
]

export default async function AboutPage() {
  // Fetch leadership team members from Sanity
  const leadershipTeam = await getLeadershipTeam()
  
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section - Modern Design */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-r from-primary/90 to-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">About Fares Church</h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                Learn about our history, mission, values, and the people who make our church a community.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-semibold">
                  Join Us Sunday
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Us
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/about.jpg"
                  alt="Church Community"
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

      {/* About Sections - Bento Grid */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Who We Are</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Fares Church is a vibrant community of believers dedicated to sharing God's love and making a positive
              impact in our community and beyond.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aboutSections.map((section) => {
              const IconComponent = section.icon
              return (
                <Card
                  key={section.id}
                  className={`bg-${section.color}-50 dark:bg-${section.color}-950 border-none shadow-md overflow-hidden h-full`}
                >
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-full bg-${section.color}-100 dark:bg-${section.color}-900 flex items-center justify-center mb-4`}
                    >
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
                    <div
                      className="prose prose-sm dark:prose-invert"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Service Times - Bento Style */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Join Us in Worship</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              We invite you to join us for our regular services and experience the warmth of our community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {serviceTimes.map((service, index) => (
              <Card key={index} className={`overflow-hidden ${index === 1 ? "md:translate-y-4" : ""}`}>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                    <Clock className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.day}</h3>
                  <p className="text-2xl font-semibold text-primary mb-2">{service.time}</p>
                  <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button className="bg-primary hover:bg-primary/90 text-white">View Full Schedule</Button>
          </div>
        </div>
      </section>

      {/* Our Team - Bento Grid */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Our Leadership Team</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Meet the dedicated individuals who lead and serve our church community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipTeam.map((member: TeamMember) => (
              <Card
                key={member._id}
                className="overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="relative h-64">
                  <Image 
                    src={member.imageUrl || "/placeholder.jpg"} 
                    alt={member.name} 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-secondary font-medium mb-4">{member.position}</p>
                  <p className="text-gray-700 dark:text-gray-300 line-clamp-3">{member.bio}</p>
                  {member.slug && (
                    <Button variant="link" className="p-0 mt-2 h-auto font-medium text-primary flex items-center">
                      Read More <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            We invite you to be a part of our church family. Come worship with us and experience the love and fellowship
            of our community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white hover:bg-white/90 text-primary font-semibold">
              Plan Your Visit
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

