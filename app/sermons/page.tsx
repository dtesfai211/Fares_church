import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { ArrowRight, MicIcon, PlayCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllSermons } from "@/lib/sanity.client"

export const metadata: Metadata = {
  title: "Sermons | Fares Church",
  description: "Watch and listen to our sermons to be inspired and grow in your faith.",
}

export default async function SermonsPage() {
  const sermons = await getAllSermons()

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-r from-primary/90 to-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Sermons</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Watch and listen to our sermons to be inspired and grow in your faith.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {sermons.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sermons.map((sermon) => (
                <Card key={sermon._id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={sermon.imageUrl || "/placeholder.svg?height=400&width=600"}
                      alt={sermon.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <PlayCircle className="h-16 w-16 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {sermon.sermon_date ? format(new Date(sermon.sermon_date), "MMMM dd, yyyy") : "No date"}
                    </div>
                    <h2 className="text-xl font-bold mb-2">{sermon.title}</h2>
                    <div className="flex items-center mb-4 text-sm text-gray-500 dark:text-gray-400">
                      <MicIcon className="h-4 w-4 mr-2" />
                      <span>{sermon.preacher || "Unknown"}</span>
                    </div>
                    {sermon.description && (
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {sermon.description.length > 120 
                          ? `${sermon.description.substring(0, 120)}...` 
                          : sermon.description}
                      </p>
                    )}
                    <Button variant="link" className="p-0 h-auto font-medium text-primary flex items-center" asChild>
                      <Link href={`/sermons/${sermon.slug.current}`}>
                        Watch Sermon <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold mb-4">No sermons found</h3>
              <p className="mb-8">Check back later for new content.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

