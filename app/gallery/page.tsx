import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ImageGallery } from "@/components/image-gallery"
import { getAllGalleries, getGalleryCategories, Gallery, SanityDocument } from "@/lib/sanity.client"

export const metadata: Metadata = {
  title: "Gallery | Fares Church",
  description: "View photos from our church events, services, and community.",
}

export default async function GalleryPage() {
  const [galleries, categories] = await Promise.all([
    getAllGalleries(),
    getGalleryCategories(),
  ])

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-r from-primary/90 to-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Gallery</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Moments captured from our church community, services, and special events.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {categories.length > 0 && (
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 justify-center">
                <Button variant="outline" className="mb-2" asChild>
                  <Link href="/gallery">All</Link>
                </Button>
                {categories.map((category) => (
                  <Button key={category} variant="outline" className="mb-2" asChild>
                    <Link href={`/gallery/category/${encodeURIComponent(category)}`}>{category}</Link>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {galleries.length > 0 ? (
            <div className="space-y-16">
              {galleries.map((gallery) => (
                <div key={gallery._id} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-sm">
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">{gallery.title}</h2>
                    {gallery.category && (
                      <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {gallery.category}
                      </span>
                    )}
                    {gallery.description && (
                      <p className="text-gray-600 dark:text-gray-300 mt-4">{gallery.description}</p>
                    )}
                    {gallery.date && (
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                        {new Date(gallery.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    )}
                  </div>

                  {gallery.images && gallery.images.length > 0 ? (
                    <ImageGallery 
                      images={gallery.images}
                      title={gallery.title}
                    />
                  ) : (
                    <div className="text-center py-12 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <p>No images in this gallery</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold mb-4">No galleries found</h3>
              <p className="mb-8">Check back later for photo galleries.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

