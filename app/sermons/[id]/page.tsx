import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CalendarDays, User, BookOpen, Download, ArrowLeft, Play } from "lucide-react"
import { sql } from "@/lib/db"

async function getSermon(id: string) {
  try {
    const sermons = await sql`SELECT * FROM sermons WHERE id = ${Number.parseInt(id)}`
    return sermons[0] || null
  } catch (error) {
    console.error("Error fetching sermon:", error)
    return null
  }
}

export default async function SermonPage({
  params,
}: {
  params: { id: string }
}) {
  const sermon = await getSermon(params.id)

  if (!sermon) {
    notFound()
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button variant="outline" asChild>
              <Link href="/sermons" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Sermons
              </Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
                <Image src="/placeholder.svg?height=720&width=1280" alt={sermon.title} fill className="object-cover" />
                {/* Video player would go here in a real implementation */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                  <Button size="lg" className="rounded-full bg-secondary hover:bg-secondary/90 text-black h-16 w-16">
                    <Play className="h-8 w-8" />
                    <span className="sr-only">Play sermon</span>
                  </Button>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">{sermon.title}</h1>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <CalendarDays className="h-5 w-5 mr-2" />
                  <span>{new Date(sermon.sermon_date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <User className="h-5 w-5 mr-2" />
                  <span>{sermon.preacher}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <BookOpen className="h-5 w-5 mr-2" />
                  <span>{sermon.scripture_reference}</span>
                </div>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                <p>{sermon.description}</p>
                {/* Additional sermon content would go here */}
              </div>

              <div className="flex flex-wrap gap-4">
                {sermon.notes_url && (
                  <Button variant="outline" asChild>
                    <Link href={sermon.notes_url} className="flex items-center">
                      <Download className="mr-2 h-4 w-4" /> Download Notes
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            <div>
              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Recent Sermons</h2>
                <div className="space-y-4">
                  {/* This would be populated with actual recent sermons */}
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex gap-4 pb-4 border-b border-gray-200 dark:border-gray-800 last:border-0"
                    >
                      <div className="relative h-16 w-24 flex-shrink-0 rounded overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=100&width=160"
                          alt="Sermon thumbnail"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium line-clamp-2">
                          <Link href={`/sermons/${i}`} className="hover:text-primary">
                            Sample Sermon Title {i}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Pastor Name</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/sermons">View All Sermons</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

