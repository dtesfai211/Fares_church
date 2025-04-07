import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center">
        <h1 className="text-6xl font-bold text-primary mb-6">404</h1>
        <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-md mb-8">
          We couldn't find the page you're looking for. It might have been moved, deleted,
          or perhaps never existed.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}

