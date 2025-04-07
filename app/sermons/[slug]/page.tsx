import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { ArrowLeft, MicIcon, BookOpen, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getSermonBySlug } from "@/lib/sanity.client"

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const sermon = await getSermonBySlug(params.slug)
  
  if (!sermon) {
    return {
      title: "Sermon Not Found"
    }
  }

  return {
    title: `${sermon.title} | Fares Church`,
    description: sermon.description || undefined,
  }
}

export default async function SermonPage({ params }: PageProps) {
  const sermon = await getSermonBySlug(params.slug)

  if (!sermon) {
    notFound()
  }

  const formattedDate = sermon.sermon_date 
    ? format(new Date(sermon.sermon_date), "MMMM dd, yyyy")
    : "No date"

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" className="flex items-center mb-8" asChild>
            <Link href="/sermons">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Sermons
            </Link>
          </Button>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="order-2 md:order-1">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{sermon.title}</h1>
              
              <div className="flex flex-col space-y-4 mb-8">
                <div className="flex items-center">
                  <MicIcon className="h-5 w-5 mr-3 text-primary" />
                  <span className="font-medium">{sermon.preacher || "Unknown"}</span>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-3 text-primary" />
                  <span>{formattedDate}</span>
                </div>
                
                {sermon.scripture && (
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-3 text-primary" />
                    <span>{sermon.scripture}</span>
                  </div>
                )}
              </div>

              {sermon.description && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Description</h2>
                  <p className="text-gray-700 dark:text-gray-300">{sermon.description}</p>
                </div>
              )}
              
              {sermon.tags && sermon.tags.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {sermon.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="order-1 md:order-2">
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                {sermon.video ? (
                  <iframe
                    src={sermon.video}
                    className="w-full h-full border-0"
                    title={sermon.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : sermon.imageUrl ? (
                  <div className="relative h-full">
                    <Image
                      src={sermon.imageUrl}
                      alt={sermon.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">Video not available</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                    <span>No media available</span>
                  </div>
                )}
              </div>
              
              {sermon.audioUrl && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Audio Version</h3>
                  <audio controls className="w-full">
                    <source src={sermon.audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
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