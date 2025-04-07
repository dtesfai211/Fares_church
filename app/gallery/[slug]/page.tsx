import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getGalleryBySlug } from "@/lib/sanity.client"

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const gallery = await getGalleryBySlug(params.slug)
  
  if (!gallery) {
    return {
      title: "Gallery Not Found"
    }
  }

  return {
    title: `${gallery.title} | Gallery | Fares Church`,
    description: gallery.description || "View photos from our church events and community.",
  }
}

export default async function GalleryDetailPage({ params }: PageProps) {
  const gallery = await getGalleryBySlug(params.slug)

  if (!gallery) {
    notFound()
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" className="flex items-center mb-8" asChild>
            <Link href="/gallery">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Gallery
            </Link>
          </Button>

          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{gallery.title}</h1>
            
            <div className="flex items-center text-gray-600 dark:text-gray-300 mb-8 text-sm">
              {gallery.date && (
                <span className="mr-6">{format(new Date(gallery.date), "MMMM dd, yyyy")}</span>
              )}
              {gallery.category && (
                <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                  {gallery.category}
                </span>
              )}
            </div>
            
            {gallery.description && (
              <p className="text-lg mb-8">{gallery.description}</p>
            )}
            
            {gallery.images && gallery.images.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gallery.images.map((image) => (
                  <div 
                    key={image._key}
                    className="aspect-[4/3] relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <Image
                      src={image.url}
                      alt={image.alt || gallery.title}
                      fill
                      className="object-cover"
                    />
                    
                    {/* Optional caption overlay */}
                    {image.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 text-sm">
                        {image.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p>No images found in this gallery.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}