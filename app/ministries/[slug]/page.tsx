import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Mail, Clock, MapPin, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getMinistryBySlug } from "@/lib/sanity.client"

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const ministry = await getMinistryBySlug(params.slug)
  
  if (!ministry) {
    return {
      title: "Ministry Not Found"
    }
  }

  return {
    title: `${ministry.title} | Fares Church`,
    description: ministry.description || undefined,
  }
}

export default async function MinistryPage({ params }: PageProps) {
  const ministry = await getMinistryBySlug(params.slug)

  if (!ministry) {
    notFound()
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" className="flex items-center mb-8" asChild>
            <Link href="/ministries">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Ministries
            </Link>
          </Button>

          {ministry.imageUrl && (
            <div className="relative w-full h-80 md:h-96 lg:h-[500px] mb-8 rounded-lg overflow-hidden">
              <Image
                src={ministry.imageUrl}
                alt={ministry.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{ministry.title}</h1>
            
            <div className="flex flex-col space-y-4 mb-8">
              {ministry.leader && (
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-3 text-primary" />
                  <span><strong>Leader:</strong> {ministry.leader}</span>
                </div>
              )}
              
              {ministry.email && (
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-primary" />
                  <span><strong>Contact:</strong> {ministry.email}</span>
                </div>
              )}
              
              {ministry.meeting_times && (
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-3 text-primary" />
                  <span><strong>Meeting Times:</strong> {ministry.meeting_times}</span>
                </div>
              )}
              
              {ministry.meeting_location && (
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-primary" />
                  <span><strong>Location:</strong> {ministry.meeting_location}</span>
                </div>
              )}
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
              <p className="text-xl font-medium">{ministry.description}</p>
            </div>

            {/* This is a simplified rendering, in a real project you'd want to use a Portable Text renderer */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {typeof ministry.content === 'string' ? (
                <p>{ministry.content}</p>
              ) : ministry.content ? (
                <p>Content available in Sanity Studio</p>
              ) : null}
            </div>

            <div className="mt-12 border-t pt-8 border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl font-bold mb-6">Get Involved</h2>
              <div className="flex flex-wrap gap-4">
                <Button asChild>
                  <Link href="/contact">Contact Ministry Leader</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/events">Related Events</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}