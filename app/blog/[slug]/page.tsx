import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { sql } from "@/lib/db"

async function getBlogPost(slug: string) {
  try {
    const posts = await sql`SELECT * FROM blog_posts WHERE slug = ${slug}`
    return posts[0] || null
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return null
  }
}

async function getRecentPosts(currentSlug: string) {
  try {
    const posts = await sql`SELECT * FROM blog_posts WHERE slug != ${currentSlug} ORDER BY published_at DESC LIMIT 5`
    return posts
  } catch (error) {
    console.error("Error fetching recent posts:", error)
    return []
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const recentPosts = await getRecentPosts(params.slug)

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button variant="outline" asChild>
              <Link href="/blog" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
              </Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="relative h-80 rounded-lg overflow-hidden mb-8">
                <Image
                  src={post.featured_image || "/placeholder.svg?height=600&width=1200"}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

              <div className="flex items-center mb-6 text-gray-600 dark:text-gray-400">
                <span>
                  {new Date(post.published_at).toLocaleDateString()} | {post.category} | By {post.author}
                </span>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>

              <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-8">
                <h3 className="text-xl font-bold mb-4">Share this post</h3>
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm">
                    Facebook
                  </Button>
                  <Button variant="outline" size="sm">
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm">
                    Email
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
                <div className="space-y-4">
                  {recentPosts.map((recentPost) => (
                    <div
                      key={recentPost.id}
                      className="flex gap-4 pb-4 border-b border-gray-200 dark:border-gray-800 last:border-0"
                    >
                      <div className="relative h-16 w-24 flex-shrink-0 rounded overflow-hidden">
                        <Image
                          src={
                            recentPost.featured_image || "/placeholder.svg?height=100&width=160" || "/placeholder.svg"
                          }
                          alt={recentPost.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium line-clamp-2">
                          <Link href={`/blog/${recentPost.slug}`} className="hover:text-primary">
                            {recentPost.title}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(recentPost.published_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/blog">View All Posts</Link>
                  </Button>
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

