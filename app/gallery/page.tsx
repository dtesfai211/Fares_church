import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleries.map((gallery) => (
                <Link key={gallery._id} href={`/gallery/${gallery.slug.current}`} className="block">
                  <div className="group relative overflow-hidden rounded-lg shadow-md">
                    {/* Show the first image as the gallery cover */}
                    {gallery.images?.[0]?.url ? (
                      <div className="aspect-[4/3] relative">
                        <Image 
                          src={gallery.images[0].url}
                          alt={gallery.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                        <div className="absolute bottom-0 w-full p-4 text-white">
                          <h3 className="text-xl font-bold mb-1">{gallery.title}</h3>
                          <div className="flex items-center justify-between">
                            <span>{gallery.images.length} photos</span>
                            {gallery.category && (
                              <span className="bg-white/20 px-2 py-1 text-sm rounded">{gallery.category}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                        <span>No images</span>
                      </div>
                    )}
                  </div>
                </Link>
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

