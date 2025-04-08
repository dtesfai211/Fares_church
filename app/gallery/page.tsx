import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { getAllGalleries, getGalleryCategories } from "@/lib/sanity.client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GridGallery } from "@/components/grid-gallery"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

export const metadata: Metadata = {
  title: "Gallery | Fares Church",
  description: "View photos from our church events, services, and community.",
}

export default async function GalleryPage() {
  const [galleries, categories] = await Promise.all([
    getAllGalleries(),
    getGalleryCategories(),
  ])

  // Group galleries by category
  const galleryGroups = categories.reduce((acc, category) => {
    acc[category] = galleries.filter(gallery => gallery.category === category);
    return acc;
  }, {} as Record<string, typeof galleries>);

  // Include "All" category with all galleries
  galleryGroups["all"] = galleries;

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-r from-primary/90 to-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Photo Gallery</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Capturing moments of faith, fellowship, and community at Fares Church.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {categories.length > 0 ? (
            <Tabs defaultValue="all" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="h-auto p-1">
                  <TabsTrigger value="all" className="px-4 py-2">
                    All Photos
                  </TabsTrigger>
                  {categories.map((category) => (
                    <TabsTrigger key={category} value={category} className="px-4 py-2">
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <TabsContent value="all" className="mt-0">
                <div className="space-y-16">
                  {galleries.map((gallery) => (
                    <Card key={gallery._id} className="bg-background border-0 shadow-sm overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                          <div>
                            <Link href={`/gallery/${gallery.slug.current}`} className="hover:underline">
                              <h2 className="text-2xl md:text-3xl font-bold">{gallery.title}</h2>
                            </Link>
                            {gallery.date && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {format(new Date(gallery.date), "MMMM d, yyyy")}
                              </p>
                            )}
                          </div>
                          
                          {gallery.category && (
                            <Badge variant="outline" className="mt-2 md:mt-0">
                              {gallery.category}
                            </Badge>
                          )}
                        </div>
                        
                        {gallery.images && gallery.images.length > 0 ? (
                          <GridGallery 
                            images={gallery.images}
                            title=""
                            columns={4}
                            gap={4}
                            metadata={{
                              title: gallery.title,
                              category: gallery.category,
                              description: gallery.description,
                              date: gallery.date
                            }}
                          />
                        ) : (
                          <div className="text-center py-12 bg-muted rounded-lg">
                            <p className="text-muted-foreground">No images in this gallery</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {categories.map((category) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <div className="space-y-16">
                    {galleryGroups[category].map((gallery) => (
                      <Card key={gallery._id} className="bg-background border-0 shadow-sm overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                            <div>
                              <Link href={`/gallery/${gallery.slug.current}`} className="hover:underline">
                                <h2 className="text-2xl md:text-3xl font-bold">{gallery.title}</h2>
                              </Link>
                              {gallery.date && (
                                <p className="text-sm text-muted-foreground mt-1">
                                  {format(new Date(gallery.date), "MMMM d, yyyy")}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          {gallery.images && gallery.images.length > 0 ? (
                            <GridGallery 
                              images={gallery.images}
                              title=""
                              columns={4}
                              gap={4}
                              metadata={{
                                title: gallery.title,
                                category: gallery.category,
                                description: gallery.description,
                                date: gallery.date
                              }}
                            />
                          ) : (
                            <div className="text-center py-12 bg-muted rounded-lg">
                              <p className="text-muted-foreground">No images in this gallery</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold mb-4">No galleries found</h3>
              <p className="mb-8 text-muted-foreground">Check back later for photo galleries.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

