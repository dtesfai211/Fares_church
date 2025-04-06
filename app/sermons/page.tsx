import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays, User, BookOpen, Play } from "lucide-react"
import { sql } from "@/lib/db"

async function getSermons() {
  try {
    const sermons = await sql`SELECT * FROM sermons ORDER BY sermon_date DESC`
    return sermons
  } catch (error) {
    console.error("Error fetching sermons:", error)
    return []
  }
}

export default async function SermonsPage() {
  const sermons = await getSermons()

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 z-0">
          <Image src="/placeholder.svg?height=600&width=1920" alt="Sermons" fill className="object-cover" />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Sermons</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Listen to our latest messages and grow in your faith journey.
          </p>
        </div>
      </section>

      {/* Sermons List */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sermons.map((sermon) => (
              <Card key={sermon.id} className="overflow-hidden sermon-card">
                <div className="relative h-48">
                  <Image src="/placeholder.svg?height=400&width=600" alt={sermon.title} fill className="object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 bg-black/60 sermon-overlay">
                    <Button size="icon" className="rounded-full bg-secondary hover:bg-secondary/90 text-black" asChild>
                      <Link href={`/sermons/${sermon.id}`}>
                        <Play className="h-6 w-6" />
                        <span className="sr-only">Play sermon</span>
                      </Link>
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{sermon.title}</h3>
                  <div className="flex items-center mb-2 text-sm text-gray-600 dark:text-gray-400">
                    <CalendarDays className="h-4 w-4 mr-2" />
                    <span>{new Date(sermon.sermon_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center mb-2 text-sm text-gray-600 dark:text-gray-400">
                    <User className="h-4 w-4 mr-2" />
                    <span>{sermon.preacher}</span>
                  </div>
                  <div className="flex items-center mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span>{sermon.scripture_reference}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{sermon.description}</p>
                  <Button asChild>
                    <Link href={`/sermons/${sermon.id}`}>Watch Sermon</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

