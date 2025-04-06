# Fares Church Website

A beautiful website for Fares Church built with Next.js, Tailwind CSS, and Sanity.io CMS.

## Features

- Responsive design that works on all devices
- Dynamic content management for blog posts, sermons, and gallery
- Beautiful UI with a church-appropriate color scheme
- Contact form in the footer
- Donation functionality

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **CMS**: Sanity.io
- **Styling**: Tailwind CSS, shadcn/ui components
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn
- Sanity.io account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/fares-church-website.git
   cd fares-church-website
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file with the following:
   ```
   SANITY_PROJECT_ID=your-project-id
   SANITY_DATASET=production
   SANITY_API_TOKEN=your-api-token
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Visit `http://localhost:3000` to see your site

## Setting Up Sanity

1. Create a new Sanity project at [sanity.io/manage](https://www.sanity.io/manage)
2. Install Sanity CLI: `npm install -g @sanity/cli`
3. Login to Sanity: `sanity login`
4. Set up your project ID and dataset in `.env.local`

