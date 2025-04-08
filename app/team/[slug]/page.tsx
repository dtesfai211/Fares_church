import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PortableText } from "@portabletext/react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Mail, Phone, ArrowLeft } from "lucide-react"
import { Metadata } from "next"
import { client } from "@/sanity/lib/client"

interface PageProps {
  params: {
    slug: string
  }
}

// Direct query without getTeamMemberBySlug function
async function fetchTeamMember(slug: string) {
  return client.fetch(`
    *[_type == "author" && slug.current == $slug][0] {
      _id,
      name,
      position,
      "slug": slug.current,
      "imageUrl": image.asset->url,
      bio,
      bioContent,
      email,
      phone,
      isLeadershipTeam
    }
  `, { slug })
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const teamMember = await fetchTeamMember(slug)

  if (!teamMember) {
    return {
      title: 'Team Member Not Found | Fares Church',
      description: 'The requested team member could not be found'
    }
  }

  return {
    title: `${teamMember.name} | Leadership Team | Fares Church`,
    description: teamMember.bio || `Learn more about ${teamMember.name}, ${teamMember.position} at Fares Church`
  }
}

export default async function TeamMemberPage({ params }: PageProps) {
  const { slug } = await params
  const teamMember = await fetchTeamMember(slug)

  if (!teamMember) {
    notFound()
  }

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      
      <section className="flex-grow py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            variant="outline" 
            className="mb-8 inline-flex items-center" 
            asChild
          >
            <Link href="/about">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Leadership Team
            </Link>
          </Button>
          
          <div className="grid md:grid-cols-3 gap-12 items-start">
            {/* Left column - Image and contact info */}
            <div className="space-y-6">
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                <Image 
                  src={teamMember.imageUrl || "/placeholder.jpg"} 
                  alt={teamMember.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">Contact Information</h3>
                
                {teamMember.email && (
                  <div className="flex items-center mb-4">
                    <Mail className="h-5 w-5 text-primary mr-3" />
                    <a href={`mailto:${teamMember.email}`} className="text-primary hover:underline">
                      {teamMember.email}
                    </a>
                  </div>
                )}
                
                {teamMember.phone && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-primary mr-3" />
                    <a href={`tel:${teamMember.phone}`} className="text-primary hover:underline">
                      {teamMember.phone}
                    </a>
                  </div>
                )}
                
                {!teamMember.email && !teamMember.phone && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Contact information is not available.
                  </p>
                )}
              </div>
            </div>
            
            {/* Right column - Bio and info */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{teamMember.name}</h1>
                <p className="text-xl text-secondary font-medium mb-6">{teamMember.position}</p>
                
                {/* Short bio */}
                <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                  <p>{teamMember.bio}</p>
                </div>
                
                {/* Extended bio content */}
                {teamMember.bioContent && (
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <PortableText value={teamMember.bioContent} />
                  </div>
                )}
              </div>
              
              {/* Decorative quote */}
              <div className="relative py-8">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white dark:bg-gray-950 px-4 text-gray-500 dark:text-gray-400">
                    <span className="text-4xl font-serif">"</span>
                  </span>
                </div>
                <blockquote className="italic text-center text-lg text-gray-600 dark:text-gray-300 px-8 mt-6">
                  Serving God and our community with dedication and compassion.
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
