import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { sql } from "@/lib/db"

async function getGalleryImages() {
  try {
    const images = await sql`SELECT * FROM gallery_images ORDER BY created_at DESC`
    return images
  } catch (error) {
    console.error("Error fetching gallery images:", error)
    return []
  }
}

async function getGalleryCategories() {
  try {
    const categories = await sql`SELECT DISTINCT category FROM gallery_images WHERE category IS NOT NULL`
    return categories.map((cat) => cat.category)
  } catch (error) {
    console.error("Error fetching gallery categories:", error)
    return []
  }
}

export default async function GalleryPage() {
  const images = await getGalleryImages()
  const categories = await getGalleryCategories()

  // Group images by category
  const imagesByCategory = images.reduce((acc, image) => {
    const category = image.category || "Uncategorized"
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(image)
    return acc
  }, {})

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 z-0">
          <Image src="/placeholder.svg?height=600&width=1920" alt="Gallery" fill className="object-cover" />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Gallery</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Browse through moments captured at our church events and activities.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="all">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map((image) => (
                  <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden gallery-item">
                    <Image
                      src={image.image_url || "/placeholder.svg?height=500&width=500"}
                      alt={image.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/70 opacity-0 transition-opacity duration-300 flex flex-col justify-end p-4 gallery-overlay">
                      <h3 className="text-white font-bold text-lg">{image.title}</h3>
                      {image.description && <p className="text-white/90 text-sm">{image.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {imagesByCategory[category]?.map((image) => (
                    <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden gallery-item">
                      <Image
                        src={image.image_url || "/placeholder.svg?height=500&width=500"}
                        alt={image.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/70 opacity-0 transition-opacity duration-300 flex flex-col justify-end p-4 gallery-overlay">
                        <h3 className="text-white font-bold text-lg">{image.title}</h3>
                        {image.description && <p className="text-white/90 text-sm">{image.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <Footer />
    </main>
  )
}

