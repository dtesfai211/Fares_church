import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getGalleryBySlug } from "@/lib/sanity.client"
import { GridGallery } from "@/components/grid-gallery"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <Button variant="outline" size="sm" className="flex items-center w-fit mb-4 md:mb-0" asChild>
              <Link href="/gallery">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Gallery
              </Link>
            </Button>
            
            <div className="flex flex-wrap items-center gap-2">
              {gallery.category && (
                <Badge variant="secondary" className="font-normal">
                  {gallery.category}
                </Badge>
              )}
              
              {gallery.date && (
                <span className="text-sm text-muted-foreground">
                  {format(new Date(gallery.date), "MMMM d, yyyy")}
                </span>
              )}
            </div>
          </div>
          
          <Card className="bg-background border-0 shadow-sm overflow-hidden mb-8">
            <CardContent className="p-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{gallery.title}</h1>
              
              {gallery.description && (
                <>
                  <p className="text-muted-foreground">{gallery.description}</p>
                  <Separator className="my-6" />
                </>
              )}
              
              {gallery.images && gallery.images.length > 0 ? (
                <div className="mt-2">
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
                </div>
              ) : (
                <div className="text-center py-12 bg-muted rounded-lg">
                  <p className="text-muted-foreground">No images found in this gallery.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  )
}