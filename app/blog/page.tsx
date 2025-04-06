import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { sql } from "@/lib/db"

async function getBlogPosts() {
  try {
    const posts = await sql`SELECT * FROM blog_posts ORDER BY published_at DESC`
    return posts
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

async function getBlogCategories() {
  try {
    const categories = await sql`SELECT DISTINCT category FROM blog_posts`
    return categories.map((cat) => cat.category)
  } catch (error) {
    console.error("Error fetching blog categories:", error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts()
  const categories = await getBlogCategories()

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 z-0">
          <Image src="/placeholder.svg?height=600&width=1920" alt="Blog" fill className="object-cover" />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Blog</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Insights, stories, and updates from our church community.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 gap-8">
                {posts.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={post.featured_image || "/placeholder.svg?height=400&width=600" || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {new Date(post.published_at).toLocaleDateString()} | {post.category}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content.substring(0, 150)}...</p>
                      <Button variant="link" className="p-0 h-auto font-medium text-primary flex items-center" asChild>
                        <Link href={`/blog/${post.slug}`}>
                          Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Categories</h2>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category}>
                      <Link
                        href={`/blog/category/${category}`}
                        className="text-gray-700 dark:text-gray-300 hover:text-primary"
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
                <div className="space-y-4">
                  {posts.slice(0, 5).map((post) => (
                    <div
                      key={post.id}
                      className="flex gap-4 pb-4 border-b border-gray-200 dark:border-gray-800 last:border-0"
                    >
                      <div className="relative h-16 w-24 flex-shrink-0 rounded overflow-hidden">
                        <Image
                          src={post.featured_image || "/placeholder.svg?height=100&width=160" || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium line-clamp-2">
                          <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(post.published_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
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

