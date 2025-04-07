import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllPosts, getPostCategories, Post, SanityDocument } from "@/lib/sanity.client"

export const metadata: Metadata = {
  title: "Blog | Fares Church",
  description: "Read our latest articles and stay updated with church news and insights.",
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getPostCategories(),
  ])

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-r from-primary/90 to-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Our Blog</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Read our latest articles and stay updated with church news and insights.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {categories.length > 0 && (
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="mb-2" asChild>
                  <Link href="/blog">All</Link>
                </Button>
                {categories.map((category) => (
                  <Button key={category} variant="outline" className="mb-2" asChild>
                    <Link href={`/blog/category/${encodeURIComponent(category)}`}>{category}</Link>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card key={post._id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={post.featured_image || "/placeholder.jpg"}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {post.published_at ? format(new Date(post.published_at), "MMMM dd, yyyy") : "No date"} | {post.categories?.[0] || 'Uncategorized'}
                    </div>
                    <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {post.excerpt || 'Read more about this post...'}
                    </p>
                    <Button variant="link" className="p-0 h-auto font-medium text-primary flex items-center" asChild>
                      <Link href={`/blog/${post.slug.current}`}>
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold mb-4">No blog posts found</h3>
              <p className="mb-8">Check back later for new content.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

