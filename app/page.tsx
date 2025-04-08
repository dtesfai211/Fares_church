import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays, Clock, MapPin, ArrowRight, Heart, Users, Sparkles } from "lucide-react"
import { getLatestSermon, getUpcomingEvents, getLatestPosts } from "@/lib/sanity.client"

// Mock data for when Sanity doesn't return content
const MOCK_SERMON = {
  _id: 'mock-sermon-1',
  title: 'Finding Peace in Troubled Times',
  slug: { current: 'finding-peace-in-troubled-times' },
  preacher: 'Pastor Michael Johnson',
  sermon_date: '2025-04-06T00:00:00Z',
  description: 'In this powerful message, Pastor Michael explores how we can find God\'s peace even in the midst of life\'s most challenging seasons.',
  scripture: 'John 14:27',
  video: 'https://www.youtube.com/watch?v=example1',
  tags: ['peace', 'faith', 'challenges'],
  imageUrl: '/placeholder.jpg'
}

const MOCK_EVENTS = [
  {
    _id: 'mock-event-1',
    title: 'Easter Sunday Celebration',
    slug: { current: 'easter-sunday-celebration' },
    date: '2025-04-20T10:00:00Z',
    time: '10:00 AM',
    location: 'Main Sanctuary',
    description: 'Join us for a special Easter Sunday service as we celebrate the resurrection of Jesus Christ. Special music, inspiring message, and activities for children.',
    is_recurring: false,
    imageUrl: '/placeholder.jpg'
  },
  {
    _id: 'mock-event-2',
    title: 'Community Outreach Day',
    slug: { current: 'community-outreach-day' },
    date: '2025-04-26T09:00:00Z',
    time: '9:00 AM - 2:00 PM',
    location: 'Church Parking Lot & Surrounding Community',
    description: 'Help us serve our community through various projects including food distribution, neighborhood cleanup, and home repairs for seniors.',
    is_recurring: false,
    imageUrl: '/placeholder.jpg'
  },
  {
    _id: 'mock-event-3',
    title: 'Prayer & Worship Night',
    slug: { current: 'prayer-worship-night' },
    date: '2025-04-18T19:00:00Z',
    time: '7:00 PM',
    location: 'Worship Center',
    description: 'A special evening of extended prayer and worship. Come experience God\'s presence and pray for our church, community, and world.',
    is_recurring: false,
    imageUrl: '/placeholder.jpg'
  }
]

const MOCK_BLOG_POSTS = [
  {
    _id: 'mock-post-1',
    title: 'Finding God in Everyday Moments',
    slug: { current: 'finding-god-in-everyday-moments' },
    author: { name: 'Pastor Michael Johnson', role: 'Lead Pastor' },
    published_at: '2025-04-05T00:00:00Z',
    categories: ['Devotional', 'Faith'],
    excerpt: 'Discover how to recognize God\'s presence in the simple moments of your daily life.',
    featured_image: '/placeholder.jpg',
    content: 'In our fast-paced world, it\'s easy to miss the subtle ways God speaks to us through everyday experiences...'
  },
  {
    _id: 'mock-post-2',
    title: 'The Importance of Christian Community',
    slug: { current: 'importance-of-christian-community' },
    author: { name: 'Elder David Williams', role: 'Church Elder' },
    published_at: '2025-03-28T00:00:00Z',
    categories: ['Community', 'Church Life'],
    excerpt: 'Why being part of a faith community is essential for spiritual growth and emotional wellbeing.',
    featured_image: '/placeholder.jpg',
    content: 'God designed us for community. In this post, we explore the biblical foundation for fellowship...'
  },
  {
    _id: 'mock-post-3',
    title: 'Talking to Your Children About Faith',
    slug: { current: 'talking-to-children-about-faith' },
    author: { name: 'Sarah Thompson', role: 'Youth Minister' },
    published_at: '2025-03-20T00:00:00Z',
    categories: ['Family', 'Parenting'],
    excerpt: 'Practical advice for parents who want to nurture their children\'s spiritual development.',
    featured_image: '/placeholder.jpg',
    content: 'As parents, we have the privilege and responsibility of guiding our children\'s spiritual journey...'
  }
]

async function getHomePageData() {
  try {
    // Try to fetch from Sanity
    const latestSermon = await getLatestSermon()
    const upcomingEvents = await getUpcomingEvents(3)
    const latestBlogPosts = await getLatestPosts(3)

    return {
      latestSermon: latestSermon || MOCK_SERMON,
      upcomingEvents: upcomingEvents?.length > 0 ? upcomingEvents : MOCK_EVENTS,
      latestBlogPosts: latestBlogPosts?.length > 0 ? latestBlogPosts : MOCK_BLOG_POSTS
    }
  } catch (error) {
    console.error("Error fetching data from Sanity:", error)
    // Return mock data if there's an error
    return {
      latestSermon: MOCK_SERMON,
      upcomingEvents: MOCK_EVENTS,
      latestBlogPosts: MOCK_BLOG_POSTS
    }
  }
}

export default async function Home() {
  const { latestSermon, upcomingEvents, latestBlogPosts } = await getHomePageData()

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section - Immersive Design */}
      <section className="relative min-h-screen flex items-center">
        {/* Background parallax effect with semi-transparent overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.jpg" 
            alt="Church sanctuary"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
              Find Your <span className="relative inline-block">
                Home
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-secondary rounded-full"></span>
              </span> in Faith
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-white/90 leading-relaxed">
              At Fares Church, we journey together in worship, community, 
              and spiritual growth. Join us as we seek God's purpose for our lives.
            </p>
            
            {/* Hero buttons with animated hover effect */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8 py-6 transition-transform hover:scale-105"
              >
                <Link href="#service-times">Worship With Us</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/20 font-medium text-lg px-8 py-6 transition-transform hover:scale-105"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
            
            {/* Scroll indicator */}
            <div className="hidden md:block absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-8 h-14 rounded-full border-2 border-white flex items-start justify-center p-1">
                <div className="w-1.5 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Message with Visual Story */}
      <section className="py-24 bg-white dark:bg-gray-950 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            {/* Left content */}
            <div className="md:col-span-5 space-y-8">
              <div className="inline-block">
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white relative mb-6">
                  Our Church Story
                  <span className="absolute -bottom-2 left-0 right-0 h-1 bg-secondary rounded-full"></span>
                </h2>
              </div>
              
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                Fares Church has been a beacon of hope and fellowship in our community for over 25 years. 
                We believe in creating a space where everyone can experience God's love, find meaningful 
                connections, and grow in their faith journey.
              </p>
              
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                Our congregation comes from all walks of life, united by our shared values of compassion, 
                service, and spiritual growth. We invite you to become part of our story.
              </p>
              
              <div className="pt-4">
                <Button 
                  className="group relative overflow-hidden rounded-full text-lg px-8 py-6 bg-primary hover:bg-primary/90 transition-all" 
                  asChild
                >
                  <Link href="/about">
                    <span className="relative z-10">Our Community</span>
                    <span className="absolute inset-0 bg-secondary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Right image collage */}
            <div className="md:col-span-7 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-xl transform translate-y-12 hover:translate-y-10 transition-transform duration-500">
                    <Image 
                      src="/about/1.jpg" 
                      alt="Church gathering" 
                      width={400} 
                      height={300}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-xl hover:-translate-y-2 transition-transform duration-500">
                    <Image 
                      src="/about/2.jpg" 
                      alt="Worship service" 
                      width={400} 
                      height={300}
                      className="w-full h-72 object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-xl hover:-translate-y-2 transition-transform duration-500">
                    <Image 
                      src="/about/3.jpg" 
                      alt="Community outreach" 
                      width={400} 
                      height={300}
                      className="w-full h-80 object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-xl transform translate-y-8 hover:translate-y-6 transition-transform duration-500">
                    <Image 
                      src="/about/4.jpg" 
                      alt="Youth activities" 
                      width={400} 
                      height={300}
                      className="w-full h-60 object-cover"
                    />
                  </div>
                </div>
              </div>
              
              {/* Decorative elements - replaced blur with subtle accent shapes */}
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-secondary/30 rounded-full"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-full"></div>
              <div className="absolute bottom-1/3 -right-3 w-12 h-12 bg-secondary/20 rounded-full"></div>
              <div className="absolute top-1/3 -left-3 w-10 h-10 bg-primary/15 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              The principles that guide our church community and shape our mission in serving God and others.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Faith Card */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Faith & Love</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We center our lives around faith in God and express His love through our actions, 
                words, and service to one another and our community.
              </p>
            </div>
            
            {/* Community Card */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Community</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We believe in fostering meaningful relationships, creating a sense of belonging, 
                and supporting each other through life's journey.
              </p>
            </div>
            
            {/* Growth Card */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Growth</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We are committed to continual spiritual growth through prayer, 
                Bible study, worship, and applying God's teachings in our daily lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Services with Beautiful Cards */}
      <section id="service-times" className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Join Us in Worship</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              We offer multiple opportunities to worship, learn, and grow in faith together.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Sunday Service */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-3xl blur-xl opacity-30 group-hover:opacity-100 transition-opacity"></div>
              <Card className="border-0 shadow-lg relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden rounded-3xl group-hover:transform group-hover:scale-[1.01] transition-all">
                <div className="h-48 overflow-hidden">
                  <Image 
                    src="/placeholder.jpg" 
                    alt="Sunday Worship" 
                    width={400} 
                    height={200}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-6">
                    <p className="text-white font-semibold text-sm uppercase tracking-wider">Every Sunday</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4 font-serif">Sunday Worship</h3>
                  <div className="flex items-center mb-3 text-gray-700 dark:text-gray-300">
                    <Clock className="h-5 w-5 mr-3 text-primary" />
                    <span className="font-medium">10:00 AM</span>
                  </div>
                  <div className="flex items-center mb-5 text-gray-700 dark:text-gray-300">
                    <MapPin className="h-5 w-5 mr-3 text-primary" />
                    <span>Main Sanctuary</span>
                  </div>
                  <p className="mb-6 text-gray-600 dark:text-gray-400">
                    Join us for inspiring worship, uplifting music, and a message that will encourage your faith.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Bible Study */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-3xl blur-xl opacity-30 group-hover:opacity-100 transition-opacity"></div>
              <Card className="border-0 shadow-lg relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden rounded-3xl group-hover:transform group-hover:scale-[1.01] transition-all">
                <div className="h-48 overflow-hidden">
                  <Image 
                    src="/placeholder.jpg" 
                    alt="Bible Study" 
                    width={400} 
                    height={200}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-6">
                    <p className="text-white font-semibold text-sm uppercase tracking-wider">Every Wednesday</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4 font-serif">Bible Study</h3>
                  <div className="flex items-center mb-3 text-gray-700 dark:text-gray-300">
                    <Clock className="h-5 w-5 mr-3 text-primary" />
                    <span className="font-medium">7:00 PM</span>
                  </div>
                  <div className="flex items-center mb-5 text-gray-700 dark:text-gray-300">
                    <MapPin className="h-5 w-5 mr-3 text-primary" />
                    <span>Fellowship Hall</span>
                  </div>
                  <p className="mb-6 text-gray-600 dark:text-gray-400">
                    Deepen your understanding of the scriptures in a supportive and engaging environment.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Youth Group */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-3xl blur-xl opacity-30 group-hover:opacity-100 transition-opacity"></div>
              <Card className="border-0 shadow-lg relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden rounded-3xl group-hover:transform group-hover:scale-[1.01] transition-all">
                <div className="h-48 overflow-hidden">
                  <Image 
                    src="/placeholder.jpg" 
                    alt="Youth Group" 
                    width={400} 
                    height={200}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-6">
                    <p className="text-white font-semibold text-sm uppercase tracking-wider">Every Friday</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4 font-serif">Youth Group</h3>
                  <div className="flex items-center mb-3 text-gray-700 dark:text-gray-300">
                    <Clock className="h-5 w-5 mr-3 text-primary" />
                    <span className="font-medium">6:30 PM</span>
                  </div>
                  <div className="flex items-center mb-5 text-gray-700 dark:text-gray-300">
                    <MapPin className="h-5 w-5 mr-3 text-primary" />
                    <span>Youth Center</span>
                  </div>
                  <p className="mb-6 text-gray-600 dark:text-gray-400">
                    A place for teens to connect, have fun, and explore their faith in relevant ways.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Sermon with Immersive Design */}
      {latestSermon && (
        <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
          {/* Abstract decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 to-blue-600/10">
            {/* Removed SVG linear gradient in favor of Tailwind gradient classes */}
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center justify-center mb-4 px-4 py-1.5 bg-primary/30 backdrop-blur-sm rounded-full">
                <span className="text-sm font-semibold text-white/90">Latest Message</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-white">Inspired By The Word</h2>
              <p className="text-xl text-white/80">
                Listen to our most recent sermon and allow God's word to guide and transform your life.
              </p>
            </div>
            
            <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl">
              <div className="grid md:grid-cols-2">
                <div className="relative h-80 md:h-auto">
                  <Image
                    src={latestSermon.imageUrl || "/placeholder.jpg"}
                    alt={latestSermon.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:bg-gradient-to-r md:from-black/60 md:to-transparent"></div>
                  
                  {/* Play button (decorative on mobile, visible on MD+ screens) */}
                  <div className="absolute inset-0 flex items-center justify-center md:items-start md:justify-start md:p-12">
                    <div className="hidden md:flex w-20 h-20 rounded-full bg-secondary text-white items-center justify-center shadow-lg transform hover:scale-110 transition-transform cursor-pointer group">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="transform group-hover:scale-110 transition-transform">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 md:p-12">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {latestSermon.tags?.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{latestSermon.title}</h3>
                  
                  <div className="flex items-center mb-6 text-white/80">
                    <span className="font-medium">{latestSermon.preacher} | {new Date(latestSermon.sermon_date).toLocaleDateString()}</span>
                  </div>
                  
                  <p className="mb-8 text-white/80">{latestSermon.description}</p>
                  
                  <div className="flex flex-wrap gap-4">
                    <Button 
                      className="bg-secondary hover:bg-secondary/90 text-white transition-transform hover:scale-105"
                      size="lg"
                      asChild
                    >
                      <Link href={`/sermons/${latestSermon.slug.current}`}>Watch Sermon</Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-white/30 text-white hover:bg-white/10 transition-transform hover:scale-105"
                      size="lg"
                      asChild
                    >
                      <Link href="/sermons">All Sermons</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events Carousel */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <div className="inline-block">
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 relative">
                  Upcoming Events
                  <span className="absolute -bottom-2 left-0 right-0 h-1 bg-secondary rounded-full"></span>
                </h2>
              </div>
              <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl">
                Join us for these community gatherings and be part of our church family.
              </p>
            </div>
            
            <div className="mt-6 md:mt-0">
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/10 dark:border-primary dark:text-primary"
                size="lg"
                asChild
              >
                <Link href="/events">
                  View All Events <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <div 
                key={`event-${event._id}-${index}`} 
                className={`relative group transform transition-all duration-500 hover:-translate-y-2 ${
                  index === 0 ? 'md:translate-y-8' : index === 2 ? 'md:-translate-y-8' : ''
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <Card className="border-0 shadow-lg overflow-hidden rounded-3xl h-full flex flex-col bg-white dark:bg-gray-800">
                  <div className="relative h-48">
                    <Image
                      src={event.imageUrl || "/placeholder.jpg"}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent"></div>
                    
                    <div className="absolute bottom-4 left-6">
                      <p className="text-white font-semibold text-sm uppercase tracking-wider">
                        {new Date(event.date).toLocaleDateString(undefined, {month: 'long', day: 'numeric'})}
                      </p>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-4">{event.title}</h3>
                    
                    <div className="space-y-3 mb-6 flex-1">
                      <div className="flex items-center text-gray-700 dark:text-gray-300">
                        <Clock className="h-5 w-5 mr-3 text-primary" />
                        <span>{event.time}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-700 dark:text-gray-300">
                        <MapPin className="h-5 w-5 mr-3 text-primary" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full group relative overflow-hidden"
                      variant="outline"
                      asChild
                    >
                      <Link href={event.slug?.current ? `/events/${event.slug.current}` : "/events"}>
                        <span className="relative z-10 group-hover:text-white transition-colors">Event Details</span>
                        <span className="absolute inset-0 bg-primary transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts with Modern Design */}
      {latestBlogPosts.length > 0 && (
        <section className="py-24 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
              <div>
                <div className="inline-block">
                  <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 relative">
                    From Our Blog
                    <span className="absolute -bottom-2 left-0 right-0 h-1 bg-secondary rounded-full"></span>
                  </h2>
                </div>
                <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl">
                  Insights, stories, and inspiration from our church community.
                </p>
              </div>
              
              <div className="mt-6 md:mt-0">
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary/10 dark:border-primary dark:text-primary"
                  size="lg"
                  asChild
                >
                  <Link href="/blog">
                    View All Posts <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {latestBlogPosts.map((post) => (
                <Card key={post._id} className="overflow-hidden border-0 shadow-lg rounded-3xl group hover:shadow-xl transition-all">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={post.featured_image || "/placeholder.jpg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <Button className="bg-white text-primary hover:bg-white/90" size="sm">Read Article</Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3 text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        {new Date(post.published_at).toLocaleDateString(undefined, {month: 'long', day: 'numeric', year: 'numeric'})}
                      </span>
                      {post.categories?.[0] && (
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                          {post.categories[0]}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {post.excerpt || (post.content && typeof post.content === 'string' 
                        ? post.content.substring(0, 120) + '...' 
                        : 'Read more about this post...')}
                    </p>
                    
                    <Link 
                      href={`/blog/${post.slug.current}`}
                      className="inline-flex items-center font-medium text-primary group"
                    >
                      <span className="group-hover:underline">Read More</span>
                      <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action with Perspective Design */}
      <section className="py-24 bg-gradient-to-br from-primary/90 to-primary relative overflow-hidden">
        {/* Dynamic background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Become Part of Our Church Family
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed">
              Join us on this journey of faith, community, and purpose. 
              Experience the difference that belonging to a caring church family can make.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-10 py-7 shadow-lg transition-transform hover:scale-105"
                asChild
              >
                <Link href="/about">Join Our Community</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white/20 font-semibold text-lg px-10 py-7 shadow-lg transition-transform hover:scale-105"
                asChild
              >
                <Link href="/donate">Support Our Mission</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

