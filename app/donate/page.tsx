"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Check } from "lucide-react"

export default function DonatePage() {
  const [donationAmount, setDonationAmount] = useState<string>("")
  const [customAmount, setCustomAmount] = useState<string>("")
  const [donationType, setDonationType] = useState<string>("one-time")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const handleDonationAmountClick = (amount: string) => {
    setDonationAmount(amount)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value)
    setDonationAmount("custom")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real implementation, this would connect to a payment processor
    // For demo purposes, we'll simulate a successful donation after a delay
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1500)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 z-0">
          <Image src="/placeholder.svg?height=600&width=1920" alt="Donate" fill className="object-cover" />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Support Our Mission</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Your generosity helps us spread God's love and make a difference in our community.
          </p>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Make a Donation</h2>
              <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
                Your support enables us to continue our mission of spreading God's word, serving our community, and
                making a positive impact in people's lives.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Heart className="h-8 w-8 text-secondary" />
                  <div>
                    <h3 className="text-xl font-bold">Support Our Ministries</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Help fund our various ministries and outreach programs.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Heart className="h-8 w-8 text-secondary" />
                  <div>
                    <h3 className="text-xl font-bold">Community Outreach</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Support our efforts to serve the local community and those in need.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Heart className="h-8 w-8 text-secondary" />
                  <div>
                    <h3 className="text-xl font-bold">Building Maintenance</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Help us maintain and improve our facilities for worship and community gatherings.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {isSuccess ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="flex justify-center mb-6">
                      <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <Check className="h-8 w-8 text-green-600 dark:text-green-300" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Thank You for Your Donation!</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Your generosity helps us continue our mission and make a difference in our community.
                    </p>
                    <Button
                      onClick={() => setIsSuccess(false)}
                      className="bg-secondary hover:bg-secondary/90 text-black"
                    >
                      Make Another Donation
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="donation-type">Donation Type</Label>
                          <Select value={donationType} onValueChange={setDonationType}>
                            <SelectTrigger id="donation-type">
                              <SelectValue placeholder="Select donation type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="one-time">One-time</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="quarterly">Quarterly</SelectItem>
                              <SelectItem value="annually">Annually</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label>Donation Amount</Label>
                          <div className="grid grid-cols-3 gap-2 mb-2">
                            {["25", "50", "100", "250", "500", "custom"].map((amount) => (
                              <Button
                                key={amount}
                                type="button"
                                variant={donationAmount === amount ? "default" : "outline"}
                                onClick={() => handleDonationAmountClick(amount)}
                              >
                                {amount === "custom" ? "Custom" : `$${amount}`}
                              </Button>
                            ))}
                          </div>
                          {donationAmount === "custom" && (
                            <div className="mt-2">
                              <Label htmlFor="custom-amount">Custom Amount</Label>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                                <Input
                                  id="custom-amount"
                                  type="number"
                                  min="1"
                                  step="1"
                                  className="pl-7"
                                  value={customAmount}
                                  onChange={handleCustomAmountChange}
                                  placeholder="Enter amount"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="first-name">First Name</Label>
                            <Input id="first-name" placeholder="John" required />
                          </div>
                          <div>
                            <Label htmlFor="last-name">Last Name</Label>
                            <Input id="last-name" placeholder="Doe" required />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="john@example.com" required />
                        </div>

                        <div>
                          <Label htmlFor="message">Message (Optional)</Label>
                          <Textarea id="message" placeholder="Leave a message..." />
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-secondary hover:bg-secondary/90 text-black"
                          disabled={isSubmitting || !donationAmount || (donationAmount === "custom" && !customAmount)}
                        >
                          {isSubmitting ? "Processing..." : "Donate Now"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Other Ways to Give</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              There are several ways you can support our church and its mission.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-4">By Mail</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Send a check or money order to:</p>
                <address className="not-italic">
                  Fares Church
                  <br />
                  123 Church Street
                  <br />
                  City, State 12345
                </address>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-4">In Person</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Drop your donation in the offering plate during our Sunday services or at the church office during
                  business hours.
                </p>
                <p className="font-medium">Office Hours: Monday-Friday, 9am-5pm</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-4">Planned Giving</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Consider including Fares Church in your will or estate planning. Contact us for more information on
                  how to make a lasting impact.
                </p>
                <p className="font-medium">Email: giving@fareschurch.org</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

