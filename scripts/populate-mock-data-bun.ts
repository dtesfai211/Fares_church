#!/usr/bin/env bun
/**
 * This script populates your Sanity database with mock content for testing
 * Run it with: bun scripts/populate-mock-data-bun.ts
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Type definitions
interface Author {
  _type: string;
  name: string;
  role: string;
  bio: string;
  image?: ImageReference;
}

interface Sermon {
  _type: string;
  title: string;
  slug: { _type: string; current: string };
  preacher: string;
  sermon_date: string;
  description: string;
  scripture: string;
  video: string;
  tags: string[];
  image?: ImageReference;
}

interface Event {
  _type: string;
  title: string;
  slug: { _type: string; current: string };
  date: string;
  time: string;
  location: string;
  description: string;
  is_recurring: boolean;
  recurrence_info?: string;
  image?: ImageReference;
}

interface Post {
  _type: string;
  title: string;
  slug: { _type: string; current: string };
  published_at: string;
  categories: string[];
  excerpt: string;
  content: any[];
  featured_image?: ImageReference;
  author?: { _type: string; _ref: string };
}

interface Ministry {
  _type: string;
  title: string;
  slug: { _type: string; current: string };
  leader: string;
  email: string;
  description: string;
  meeting_times: string;
  meeting_location: string;
  content: any[];
  image?: ImageReference;
}

interface ImageReference {
  _type: string;
  asset: {
    _type: string;
    _ref: string;
  }
}

// Initialize the Sanity client with proper type safety and authentication
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  token: process.env.SANITY_API_TOKEN!, 
  useCdn: false,
  withCredentials: true, // Include credentials in request
})

console.log('Sanity client configured with:')
console.log('- Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
console.log('- Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET)
console.log('- API Version:', process.env.NEXT_PUBLIC_SANITY_API_VERSION)
console.log('- Token exists:', !!process.env.SANITY_API_TOKEN)

// Helper function to upload an image file and return its asset reference
async function uploadImageAsset(imagePath: string, filename: string): Promise<string | null> {
  try {
    console.log(`Uploading image: ${filename}`)
    const imageBuffer = fs.readFileSync(imagePath)
    const asset = await client.assets.upload('image', imageBuffer, {
      filename
    })
    console.log(`Successfully uploaded ${filename} with ID: ${asset._id}`)
    return asset._id
  } catch (error) {
    console.error(`Error uploading image ${filename}:`, error)
    return null
  }
}

// Mock Authors
const mockAuthors: Author[] = [
  {
    _type: 'author',
    name: 'Pastor Michael Johnson',
    role: 'Lead Pastor',
    bio: 'Pastor Michael has been leading our congregation for 15 years with wisdom and compassion.',
  },
  {
    _type: 'author',
    name: 'Sarah Thompson',
    role: 'Youth Minister',
    bio: 'Sarah has a passion for guiding our youth and helping them grow in their faith journey.',
  },
  {
    _type: 'author',
    name: 'Elder David Williams',
    role: 'Church Elder',
    bio: 'David has been serving as an elder for over a decade, providing spiritual guidance to our community.',
  }
]

// Mock Sermons
const mockSermons: Sermon[] = [
  {
    _type: 'sermon',
    title: 'Finding Peace in Troubled Times',
    slug: { _type: 'slug', current: 'finding-peace-in-troubled-times' },
    preacher: 'Pastor Michael Johnson',
    sermon_date: new Date('2025-04-06').toISOString(),
    description: 'In this powerful message, Pastor Michael explores how we can find God\'s peace even in the midst of life\'s most challenging seasons.',
    scripture: 'John 14:27',
    video: 'https://www.youtube.com/watch?v=example1',
    tags: ['peace', 'faith', 'challenges'],
  },
  {
    _type: 'sermon',
    title: 'The Power of Community',
    slug: { _type: 'slug', current: 'power-of-community' },
    preacher: 'Pastor Michael Johnson',
    sermon_date: new Date('2025-03-30').toISOString(),
    description: 'Discover how the early church model of community can transform our lives and deepen our faith walk together.',
    scripture: 'Acts 2:42-47',
    video: 'https://www.youtube.com/watch?v=example2',
    tags: ['community', 'church', 'fellowship'],
  },
  {
    _type: 'sermon',
    title: 'Living with Purpose',
    slug: { _type: 'slug', current: 'living-with-purpose' },
    preacher: 'Elder David Williams',
    sermon_date: new Date('2025-03-23').toISOString(),
    description: 'Elder David shares insights on discovering and living out God\'s unique purpose for your life.',
    scripture: 'Jeremiah 29:11',
    video: 'https://www.youtube.com/watch?v=example3',
    tags: ['purpose', 'calling', 'direction'],
  },
  {
    _type: 'sermon',
    title: 'Faith That Moves Mountains',
    slug: { _type: 'slug', current: 'faith-that-moves-mountains' },
    preacher: 'Pastor Michael Johnson',
    sermon_date: new Date('2025-03-16').toISOString(),
    description: 'Learn about the extraordinary power of faith and how even small acts of belief can transform impossible situations.',
    scripture: 'Matthew 17:20',
    video: 'https://www.youtube.com/watch?v=example4',
    tags: ['faith', 'belief', 'miracles'],
  },
  {
    _type: 'sermon',
    title: 'Serving with a Joyful Heart',
    slug: { _type: 'slug', current: 'serving-with-a-joyful-heart' },
    preacher: 'Pastor Michael Johnson',
    sermon_date: new Date('2025-03-09').toISOString(),
    description: 'Discover how serving others with joy can transform both your life and the lives of those around you.',
    scripture: '1 Peter 4:10',
    video: 'https://www.youtube.com/watch?v=example5',
    tags: ['service', 'joy', 'giving'],
  }
]

// Mock Events
const mockEvents: Event[] = [
  {
    _type: 'event',
    title: 'Easter Sunday Celebration',
    slug: { _type: 'slug', current: 'easter-sunday-celebration' },
    date: new Date('2025-04-20T10:00:00Z').toISOString(),
    time: '10:00 AM',
    location: 'Main Sanctuary',
    description: 'Join us for a special Easter Sunday service as we celebrate the resurrection of Jesus Christ. Special music, inspiring message, and activities for children.',
    is_recurring: false,
  },
  {
    _type: 'event',
    title: 'Community Outreach Day',
    slug: { _type: 'slug', current: 'community-outreach-day' },
    date: new Date('2025-04-26T09:00:00Z').toISOString(),
    time: '9:00 AM - 2:00 PM',
    location: 'Church Parking Lot & Surrounding Community',
    description: 'Help us serve our community through various projects including food distribution, neighborhood cleanup, and home repairs for seniors.',
    is_recurring: false,
  },
  {
    _type: 'event',
    title: 'Prayer & Worship Night',
    slug: { _type: 'slug', current: 'prayer-worship-night' },
    date: new Date('2025-04-18T19:00:00Z').toISOString(),
    time: '7:00 PM',
    location: 'Worship Center',
    description: 'A special evening of extended prayer and worship. Come experience God\'s presence and pray for our church, community, and world.',
    is_recurring: false,
  },
  {
    _type: 'event',
    title: 'Sunday Worship Service',
    slug: { _type: 'slug', current: 'sunday-worship-service' },
    date: new Date('2025-04-13T10:00:00Z').toISOString(),
    time: '10:00 AM',
    location: 'Main Sanctuary',
    description: 'Join us for our weekly worship service featuring uplifting music, prayer, and biblical teaching.',
    is_recurring: true,
    recurrence_info: 'Every Sunday',
  },
  {
    _type: 'event',
    title: 'Wednesday Bible Study',
    slug: { _type: 'slug', current: 'wednesday-bible-study' },
    date: new Date('2025-04-09T19:00:00Z').toISOString(),
    time: '7:00 PM',
    location: 'Fellowship Hall',
    description: 'Our weekly Bible study focuses on deepening our understanding of Scripture and applying it to our daily lives.',
    is_recurring: true,
    recurrence_info: 'Every Wednesday',
  },
  {
    _type: 'event',
    title: 'Youth Group Meeting',
    slug: { _type: 'slug', current: 'youth-group-meeting' },
    date: new Date('2025-04-11T18:30:00Z').toISOString(),
    time: '6:30 PM',
    location: 'Youth Center',
    description: 'A fun and engaging time for teens to connect, play games, worship, and learn about their faith in relevant ways.',
    is_recurring: true,
    recurrence_info: 'Every Friday',
  }
]

// Mock Blog Posts
const mockPosts: Post[] = [
  {
    _type: 'post',
    title: 'Finding God in Everyday Moments',
    slug: { _type: 'slug', current: 'finding-god-in-everyday-moments' },
    published_at: new Date('2025-04-05').toISOString(),
    categories: ['Devotional', 'Faith'],
    excerpt: 'Discover how to recognize God\'s presence in the simple moments of your daily life.',
    content: [
      {
        _type: 'block',
        style: 'normal',
        _key: 'intro',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'intro-span',
            text: 'In our fast-paced world, it\'s easy to miss the subtle ways God speaks to us through everyday experiences. This post explores practices to help us become more aware of divine presence in ordinary moments.',
            marks: []
          }
        ]
      },
    ]
  },
  {
    _type: 'post',
    title: 'The Importance of Christian Community',
    slug: { _type: 'slug', current: 'importance-of-christian-community' },
    published_at: new Date('2025-03-28').toISOString(),
    categories: ['Community', 'Church Life'],
    excerpt: 'Why being part of a faith community is essential for spiritual growth and emotional wellbeing.',
    content: [
      {
        _type: 'block',
        style: 'normal',
        _key: 'intro',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'intro-span',
            text: 'God designed us for community. In this post, we explore the biblical foundation for fellowship and practical ways to deepen your connections within the church family.',
            marks: []
          }
        ]
      }
    ]
  },
  {
    _type: 'post',
    title: 'Talking to Your Children About Faith',
    slug: { _type: 'slug', current: 'talking-to-children-about-faith' },
    published_at: new Date('2025-03-20').toISOString(),
    categories: ['Family', 'Parenting'],
    excerpt: 'Practical advice for parents who want to nurture their children\'s spiritual development.',
    content: [
      {
        _type: 'block',
        style: 'normal',
        _key: 'intro',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'intro-span',
            text: 'As parents, we have the privilege and responsibility of guiding our children\'s spiritual journey. Here are age-appropriate ways to discuss faith that will resonate with kids from toddlers to teens.',
            marks: []
          }
        ]
      }
    ]
  },
  {
    _type: 'post',
    title: 'Prayer Practices for Busy Lives',
    slug: { _type: 'slug', current: 'prayer-practices-for-busy-lives' },
    published_at: new Date('2025-03-15').toISOString(),
    categories: ['Prayer', 'Spiritual Disciplines'],
    excerpt: 'Simple ways to maintain a vibrant prayer life even with a hectic schedule.',
    content: [
      {
        _type: 'block',
        style: 'normal',
        _key: 'intro',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'intro-span',
            text: 'Many of us struggle to find time for prayer in our busy lives. This post shares practical approaches to prayer that fit into even the most demanding schedules.',
            marks: []
          }
        ]
      }
    ]
  },
  {
    _type: 'post',
    title: 'Serving in Your Spiritual Gifts',
    slug: { _type: 'slug', current: 'serving-in-spiritual-gifts' },
    published_at: new Date('2025-03-08').toISOString(),
    categories: ['Service', 'Spiritual Gifts'],
    excerpt: 'How to identify and use your God-given gifts to serve the church and community.',
    content: [
      {
        _type: 'block',
        style: 'normal',
        _key: 'intro',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'intro-span',
            text: 'Everyone has been gifted by God with unique abilities and talents meant to build up the body of Christ. Learn how to discover and deploy your spiritual gifts effectively.',
            marks: []
          }
        ]
      }
    ]
  }
]

// Mock Ministries
const mockMinistries: Ministry[] = [
  {
    _type: 'ministry',
    title: 'Children\'s Ministry',
    slug: { _type: 'slug', current: 'childrens-ministry' },
    leader: 'Rebecca Wilson',
    email: 'children@fareschurch.org',
    description: 'Our Children\'s Ministry provides a safe, fun, and faith-building environment for kids from birth through 5th grade.',
    meeting_times: 'Sundays at 10:00 AM',
    meeting_location: 'Children\'s Wing',
    content: [
      {
        _type: 'block',
        style: 'normal',
        _key: 'intro',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'intro-span',
            text: 'We believe in nurturing the faith of our youngest members through age-appropriate Bible teaching, worship, crafts, and games. Our trained volunteers are passionate about helping children know Jesus and grow in their relationship with Him.',
            marks: []
          }
        ]
      }
    ]
  },
  {
    _type: 'ministry',
    title: 'Youth Ministry',
    slug: { _type: 'slug', current: 'youth-ministry' },
    leader: 'Sarah Thompson',
    email: 'youth@fareschurch.org',
    description: 'Our Youth Ministry serves students in grades 6-12, helping them navigate adolescence with Christ-centered teaching and mentoring.',
    meeting_times: 'Fridays at 6:30 PM',
    meeting_location: 'Youth Center',
    content: [
      {
        _type: 'block',
        style: 'normal',
        _key: 'intro',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'intro-span',
            text: 'The teenage years are pivotal in faith development. Our youth program combines fun activities with meaningful discussions about real-life issues from a biblical perspective. We aim to equip teens to live out their faith confidently in school and beyond.',
            marks: []
          }
        ]
      }
    ]
  },
  {
    _type: 'ministry',
    title: 'Men\'s Ministry',
    slug: { _type: 'slug', current: 'mens-ministry' },
    leader: 'James Robertson',
    email: 'men@fareschurch.org',
    description: 'Our Men\'s Ministry focuses on building strong men of faith through Bible study, fellowship, and service opportunities.',
    meeting_times: 'First Saturday of each month at 8:00 AM',
    meeting_location: 'Fellowship Hall',
    content: [
      {
        _type: 'block',
        style: 'normal',
        _key: 'intro',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'intro-span',
            text: 'Men face unique challenges in living out their faith. Our ministry provides accountability, encouragement, and practical teaching to help men lead with integrity in their homes, workplaces, and communities.',
            marks: []
          }
        ]
      }
    ]
  },
  {
    _type: 'ministry',
    title: 'Women\'s Ministry',
    slug: { _type: 'slug', current: 'womens-ministry' },
    leader: 'Patricia Gonzalez',
    email: 'women@fareschurch.org',
    description: 'Our Women\'s Ministry creates spaces for women to connect, grow, and serve together in ways that honor God and reflect His love.',
    meeting_times: 'Second Tuesday of each month at 7:00 PM',
    meeting_location: 'Room 201',
    content: [
      {
        _type: 'block',
        style: 'normal',
        _key: 'intro',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'intro-span',
            text: 'Women of all ages and stages of life find community and purpose through our women\'s ministry. From Bible studies to service projects to social events, we offer diverse opportunities for connection and growth.',
            marks: []
          }
        ]
      }
    ]
  },
  {
    _type: 'ministry',
    title: 'Worship Ministry',
    slug: { _type: 'slug', current: 'worship-ministry' },
    leader: 'Daniel Martinez',
    email: 'worship@fareschurch.org',
    description: 'Our Worship Ministry leads the congregation in meaningful worship experiences that honor God and inspire spiritual growth.',
    meeting_times: 'Rehearsals on Thursdays at 6:30 PM',
    meeting_location: 'Sanctuary',
    content: [
      {
        _type: 'block',
        style: 'normal',
        _key: 'intro',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'intro-span',
            text: 'Music and creative arts have a unique ability to express our devotion to God. Our worship team consists of vocalists, musicians, and tech volunteers who use their talents to facilitate authentic worship experiences.',
            marks: []
          }
        ]
      }
    ]
  },
  {
    _type: 'ministry',
    title: 'Missions & Outreach',
    slug: { _type: 'slug', current: 'missions-outreach' },
    leader: 'Thomas & Maria Chen',
    email: 'missions@fareschurch.org',
    description: 'Our Missions & Outreach Ministry coordinates local and global efforts to share God\'s love through practical service and evangelism.',
    meeting_times: 'Third Monday of each month at 6:30 PM',
    meeting_location: 'Conference Room',
    content: [
      {
        _type: 'block',
        style: 'normal',
        _key: 'intro',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'intro-span',
            text: 'Jesus called us to be His hands and feet in a hurting world. Through partnerships with local organizations and international missionaries, we seek to meet physical and spiritual needs in our community and around the globe.',
            marks: []
          }
        ]
      }
    ]
  }
]

// Upload a default placeholder image and get its reference
async function uploadDefaultPlaceholderImage(): Promise<string | null> {
  try {
    const placeholderPath = path.join(process.cwd(), 'public', 'placeholder.jpg')
    if (fs.existsSync(placeholderPath)) {
      return await uploadImageAsset(placeholderPath, 'default-placeholder.jpg')
    }
    console.log('Placeholder image not found at expected path. Will continue without images.')
    return null
  } catch (error) {
    console.error('Error uploading default placeholder image:', error)
    return null
  }
}

// Function to upload mock content
async function uploadMockContent(): Promise<void> {
  try {
    console.log('Starting to upload mock content to Sanity...')
    
    // Upload a default placeholder image that we'll use for all content
    console.log('Uploading default placeholder image...')
    const placeholderImageId = await uploadDefaultPlaceholderImage()
    
    // Prepare image reference if we have an uploaded placeholder
    let imageReference: ImageReference | null = null
    if (placeholderImageId) {
      imageReference = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: placeholderImageId
        }
      }
    }
    
    // Upload authors
    console.log('Uploading authors...')
    const authorIds: Record<string, string> = {}
    for (const author of mockAuthors) {
      // Add placeholder image reference if available
      const authorWithImage = imageReference 
        ? { ...author, image: imageReference } 
        : author
      
      const result = await client.create(authorWithImage)
      authorIds[author.name] = result._id
      console.log(`Created author: ${author.name} with ID: ${result._id}`)
    }
    
    // Upload sermons
    console.log('Uploading sermons...')
    for (const sermon of mockSermons) {
      // Add placeholder image reference if available
      const sermonWithImage = imageReference 
        ? { ...sermon, image: imageReference } 
        : sermon
      
      const result = await client.create(sermonWithImage)
      console.log(`Created sermon: ${sermon.title}`)
    }
    
    // Upload events
    console.log('Uploading events...')
    for (const event of mockEvents) {
      // Add placeholder image reference if available
      const eventWithImage = imageReference 
        ? { ...event, image: imageReference } 
        : event
      
      const result = await client.create(eventWithImage)
      console.log(`Created event: ${event.title}`)
    }
    
    // Upload blog posts
    console.log('Uploading blog posts...')
    for (const post of mockPosts) {
      // Add a random author reference
      const authorKeys = Object.keys(authorIds)
      const randomAuthor = authorKeys[Math.floor(Math.random() * authorKeys.length)]
      
      // Add author and featured image if available
      const postWithReferences = {
        ...post,
        author: { _type: 'reference', _ref: authorIds[randomAuthor] }
      }
      
      if (imageReference) {
        postWithReferences.featured_image = imageReference
      }
      
      const result = await client.create(postWithReferences)
      console.log(`Created blog post: ${post.title}`)
    }
    
    // Upload ministries
    console.log('Uploading ministries...')
    for (const ministry of mockMinistries) {
      // Add placeholder image reference if available
      const ministryWithImage = imageReference 
        ? { ...ministry, image: imageReference } 
        : ministry
      
      const result = await client.create(ministryWithImage)
      console.log(`Created ministry: ${ministry.title}`)
    }
    
    console.log('Mock content upload completed successfully!')
  } catch (error) {
    console.error('Error uploading mock content:', error)
  }
}

// Run the upload function
uploadMockContent()