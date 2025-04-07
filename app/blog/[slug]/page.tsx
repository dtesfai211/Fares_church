import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getPostBySlug, urlFor } from "@/lib/sanity.client"

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: "Post Not Found"
    }
  }

  return {
    title: `${post.title} | Fares Church`,
    description: post.excerpt || undefined,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const formattedDate = post.published_at 
    ? format(new Date(post.published_at), "MMMM dd, yyyy")
    : "No date"

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex-grow">
        {/* Post content section */}
        <article className="pt-10 pb-24">
          <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <Button variant="ghost" className="flex items-center mb-8" asChild>
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
                </Link>
              </Button>

              {post.featured_image && (
                <div className="relative w-full h-80 md:h-96 lg:h-[500px] mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={post.featured_image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
                
                <div className="flex items-center mb-8">
                  {post.author?.image && (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={post.author.image}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{post.author?.name || "Anonymous"}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{formattedDate}</p>
                  </div>
                </div>

                {post.excerpt && (
                  <p className="text-xl mb-8 text-gray-700 dark:text-gray-300 italic border-l-4 border-primary pl-4">
                    {post.excerpt}
                  </p>
                )}

                {/* This is a simplified rendering, in a real project you'd want to use Portable Text renderer */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {typeof post.content === 'string' ? (
                    <p>{post.content}</p>
                  ) : post.content ? (
                    <p>Content available in Sanity Studio</p>
                  ) : (
                    <p>No content available</p>
                  )}
                </div>

                {post.categories && post.categories.length > 0 && (
                  <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex flex-wrap gap-2">
                      {post.categories.map((category) => (
                        <span
                          key={category}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </article>
      </div>
      
      <Footer />
    </main>
  )
}

