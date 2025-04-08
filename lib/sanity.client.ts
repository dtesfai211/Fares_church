import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"

// Add SanityDocument interface
export interface SanityDocument {
  _id: string;
  _type: string;
  _rev?: string;
  _createdAt?: string;
  _updatedAt?: string;
}

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  useCdn: process.env.NODE_ENV === "production",
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Helper for robust fetch requests with retry logic
async function fetchWithRetry(query: string, params = {}, retries = 3, backoff = 300) {
  try {
    return await client.fetch(query, params)
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying fetch... ${retries} attempts left`)
      await new Promise(resolve => setTimeout(resolve, backoff))
      return fetchWithRetry(query, params, retries - 1, backoff * 2)
    }
    console.error("Error fetching from Sanity:", error)
    return null
  }
}

// Sermon types and queries
export interface Sermon extends SanityDocument {
  title: string
  slug: { current: string }
  preacher: string
  sermon_date: string
  description?: string
  scripture?: string
  audio?: any
  video?: string
  image?: any
  imageUrl?: string
  audioUrl?: string
  tags?: string[]
}

export async function getLatestSermon(): Promise<Sermon | null> {
  return client.fetch(
    `*[_type == "sermon"] | order(sermon_date desc) [0] {
      _id,
      title,
      slug,
      preacher,
      sermon_date,
      description,
      scripture,
      "audioUrl": audio.asset->url,
      video,
      "imageUrl": image.asset->url,
      tags
    }`
  )
}

export async function getAllSermons(): Promise<Sermon[]> {
  return client.fetch(
    `*[_type == "sermon"] | order(sermon_date desc) {
      _id,
      title,
      slug,
      preacher,
      sermon_date,
      description,
      scripture,
      "audioUrl": audio.asset->url,
      video,
      "imageUrl": image.asset->url,
      tags
    }`
  )
}

export async function getSermonBySlug(slug: string): Promise<Sermon | null> {
  return client.fetch(
    `*[_type == "sermon" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      preacher,
      sermon_date,
      description,
      scripture,
      "audioUrl": audio.asset->url,
      video,
      "imageUrl": image.asset->url,
      tags
    }`,
    { slug }
  )
}

// Blog post types and queries
export interface Post extends SanityDocument {
  title: string
  slug: { current: string }
  author?: { name: string; image?: any }
  featured_image?: any
  categories?: string[]
  published_at: string
  excerpt?: string
  content?: any
}

export async function getLatestPosts(limit = 3): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post"] | order(published_at desc) [0...$limit] {
      _id,
      title,
      slug,
      "author": author->{name, "image": image.asset->url},
      "featured_image": featured_image.asset->url,
      categories,
      published_at,
      excerpt,
      content
    }`,
    { limit: limit - 1 }
  )
}

export async function getAllPosts(): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post"] | order(published_at desc) {
      _id,
      title,
      slug,
      "author": author->{name, "image": image.asset->url},
      "featured_image": featured_image.asset->url,
      categories,
      published_at,
      excerpt,
      content
    }`
  )
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      "author": author->{name, "image": image.asset->url},
      "featured_image": featured_image.asset->url,
      categories,
      published_at,
      excerpt,
      content
    }`,
    { slug }
  )
}

export async function getPostCategories(): Promise<string[]> {
  const categories = await client.fetch(
    `*[_type == "post"].categories[]`
  )
  // Ensure we're returning only strings and filtering out any null/undefined values
  return [...new Set(categories)].filter(Boolean).map(category => String(category))
}

// Event types and queries
export interface Event extends SanityDocument {
  title: string
  slug: { current: string }
  date: string
  end_date?: string
  time?: string
  is_recurring?: boolean
  recurrence_info?: string
  location: string
  description?: string
  image?: any
  imageUrl?: string
}

export async function getUpcomingEvents(limit = 3): Promise<Event[]> {
  const now = new Date().toISOString()
  
  try {
    // First try to get upcoming non-recurring events
    const upcomingEvents = await client.fetch(
      `*[_type == "event" && date >= $now] | order(date asc) [0...$limit] {
        _id,
        title,
        slug,
        date,
        end_date,
        time,
        is_recurring,
        recurrence_info,
        location,
        description,
        "imageUrl": image.asset->url
      }`,
      { now, limit: limit - 1 }
    )
    
    // If we don't have enough events, add recurring events
    if (upcomingEvents.length < limit) {
      const recurringEvents = await client.fetch(
        `*[_type == "event" && is_recurring == true] | order(date asc) [0...${limit - upcomingEvents.length}] {
          _id,
          title,
          slug,
          date,
          end_date,
          time,
          is_recurring,
          recurrence_info,
          location,
          description,
          "imageUrl": image.asset->url
        }`
      )
      
      return [...upcomingEvents, ...recurringEvents]
    }
    
    return upcomingEvents
  } catch (error) {
    console.error('Error fetching upcoming events:', error)
    return []
  }
}

export async function getAllEvents(): Promise<Event[]> {
  try {
    const events = await fetchWithRetry(`
      *[_type == "event"] {
        _id,
        title,
        slug,
        date,
        time,
        location,
        description,
        "imageUrl": image.asset->url
      }
    `)
    return events || []
  } catch (error) {
    console.error("Error fetching all events:", error)
    return []
  }
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  try {
    const event = await fetchWithRetry(`
      *[_type == "event" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        date,
        time,
        location,
        description,
        content,
        "imageUrl": image.asset->url,
        "relatedEvents": *[_type == "event" && slug.current != $slug] | order(date desc) [0...3] {
          _id,
          title,
          slug,
          date
        }
      }
    `, { slug })
    return event
  } catch (error) {
    console.error(`Error fetching event with slug ${slug}:`, error)
    return null
  }
}

export async function getSimilarEventSlugs(slug: string): Promise<string[]> {
  try {
    const slugs = await fetchWithRetry(`
      *[_type == "event" && slug.current != $slug].slug.current
    `, { slug })
    return slugs || []
  } catch (error) {
    console.error("Error fetching similar event slugs:", error)
    return []
  }
}

// Ministry types and queries
export interface Ministry extends SanityDocument {
  title: string
  slug: { current: string }
  leader?: string
  email?: string
  image?: any
  imageUrl?: string
  description: string
  content?: any
  meeting_times?: string
  meeting_location?: string
}

export async function getAllMinistries(): Promise<Ministry[]> {
  return client.fetch(
    `*[_type == "ministry"] | order(title asc) {
      _id,
      title,
      slug,
      leader,
      email,
      "imageUrl": image.asset->url,
      description,
      content,
      meeting_times,
      meeting_location
    }`
  )
}

export async function getMinistryBySlug(slug: string): Promise<Ministry | null> {
  return client.fetch(
    `*[_type == "ministry" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      leader,
      email,
      "imageUrl": image.asset->url,
      description,
      content,
      meeting_times,
      meeting_location
    }`,
    { slug }
  )
}

// Gallery types and queries
export interface Gallery extends SanityDocument {
  title: string
  slug: { current: string }
  description?: string
  images: {
    _key: string
    alt?: string
    caption?: string
    url: string // Changed from asset to direct url property
  }[]
  category?: string
  date?: string
}

export async function getAllGalleries(): Promise<Gallery[]> {
  return client.fetch(
    `*[_type == "gallery"] | order(date desc) {
      _id,
      title,
      slug,
      description,
      "images": images[]{
        _key,
        alt,
        caption,
        "url": asset->url
      },
      category,
      date
    }`
  )
}

export async function getGalleryBySlug(slug: string): Promise<Gallery | null> {
  return client.fetch(
    `*[_type == "gallery" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      "images": images[]{
        _key,
        alt,
        caption,
        "url": asset->url
      },
      category,
      date
    }`,
    { slug }
  )
}

export async function getGalleryCategories(): Promise<string[]> {
  const categories = await client.fetch(
    `*[_type == "gallery"].category`
  )
  return [...new Set(categories)].filter(Boolean).map(category => String(category))
}

// Team member types and queries
export interface TeamMember extends SanityDocument {
  name: string;
  position: string;
  slug: { current: string };
  imageUrl?: string;
  bio?: string;
  bioContent?: any;
  email?: string;
  phone?: string;
  isLeadershipTeam?: boolean;
}

export async function getTeamMemberBySlug(slug: string): Promise<TeamMember | null> {
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

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  return client.fetch(`
    *[_type == "author" && isLeadershipTeam == true] | order(leadershipOrder asc) {
      _id,
      name,
      position,
      "slug": slug.current,
      "imageUrl": image.asset->url,
      bio
    }
  `)
}