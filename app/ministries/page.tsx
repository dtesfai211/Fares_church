import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllMinistries } from "@/lib/sanity.client"

export const metadata: Metadata = {
  title: "Ministries | Fares Church",
  description: "Learn about the various ministries at Fares Church and how you can get involved.",
}

export default async function MinistriesPage() {
  const ministries = await getAllMinistries()

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-r from-primary/90 to-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Our Ministries</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover the various ways we serve our church family and community.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get Involved</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              We believe that everyone has unique gifts and talents that can be used to serve God and others.
              Explore our ministries and find the perfect place to get involved.
            </p>
          </div>

          {ministries.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ministries.map((ministry) => (
                <Card key={ministry._id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={ministry.imageUrl || "/placeholder.svg?height=400&width=600"}
                      alt={ministry.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{ministry.title}</h3>
                    {ministry.leader && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        Led by: {ministry.leader}
                      </p>
                    )}
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {ministry.description.length > 120
                        ? `${ministry.description.substring(0, 120)}...`
                        : ministry.description}
                    </p>
                    <Button variant="link" className="p-0 h-auto font-medium text-primary flex items-center" asChild>
                      <Link href={`/ministries/${ministry.slug.current}`}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold mb-4">No ministries found</h3>
              <p className="mb-8">Check back later for updates on our ministry opportunities.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Want to Start a Ministry?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            If you have a passion for serving in a way that isn't currently represented in our existing ministries,
            we'd love to hear your ideas and help you get started.
          </p>
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}