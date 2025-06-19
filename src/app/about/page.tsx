import Faqs from '@/components/Faqs'
import Footer from '@/components/Footer'
import GuidelineCard from '@/components/GuidelineCard'
import Header from '@/components/Header'
import AboutVideo from '@/components/AboutVideo'
import Whatsapp from '@/components/Whatsapp'
import Image from 'next/image'
import React from 'react'
import { FaQuestionCircle, FaTicketAlt, FaEnvelope, FaLock } from 'react-icons/fa'

const about = () => {
    return (
        <>
            <Header />
            <AboutVideo videoUrl="https://www.youtube.com/embed/fZEMbJ5oGoE?autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=0&loop=1&playlist=fZEMbJ5oGoE" />

            {/* Guidelines Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 font-serif text-foreground">How to Get Your Tickets</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto font-[family-name:var(--font-secondary)]">
                        <GuidelineCard
                            icon={<FaTicketAlt className="text-3xl text-secondary" />}
                            title="1. Choose Your Event"
                            description="Select your preferred Tomorrowland event from our verified listings. Whether it's Winter, Belgium, or Brasil - we've got you covered."
                        />
                        <GuidelineCard
                            icon={<FaLock className="text-3xl text-secondary" />}
                            title="2. Secure Purchase"
                            description="Complete your purchase through our secure payment system to free your tomorrowland tickets. All transactions are protected and guaranteed."
                        />
                        <GuidelineCard
                            icon={<FaEnvelope className="text-3xl text-secondary" />}
                            title="3. Receive buy ticket link"
                            description="Get instant confirmation of tomorrowland buy tickets link via email. Your tickets will be delivered according to the buy tickets event's timeline.."
                        />
                        <GuidelineCard
                            icon={<FaQuestionCircle className="text-3xl text-secondary" />}
                            title="4. Need Help?"
                            description="Our dedicated support team is available 24/7 to assist you with any questions or concerns about your tickets."
                        />
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 font-[family-name:var(--font-primary)] text-foreground">Why Choose Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div className="text-center p-6">
                            <Image
                                src="/authentic.png"
                                alt="Authentic Tickets"
                                width={100}
                                height={100}
                                className="mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold mb-2 font-serif text-secondary">100% TRUSTED</h3>
                            <p className="text-gray-600 font-sans">All Buy Tickets are Original and Trusted</p>
                        </div>
                        <div className="text-center p-6">
                            <Image
                                src="/secure.png"
                                alt="Secure Payments"
                                width={100}
                                height={100}
                                className="mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold mb-2 font-serif text-secondary">Secure Payments</h3>
                            <p className="text-gray-600 font-sans">Your transactions are protected and encrypted</p>
                        </div>
                        <div className="text-center p-6">
                            <Image
                                src="/support.png"
                                alt="24/7 Support"
                                width={100}
                                height={100}
                                className="mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold mb-2 font-serif text-secondary">24/7 Support</h3>
                            <p className="text-gray-600 font-sans">Our team is always here to help you</p>
                        </div>
                    </div>
                </div>
            </section>
            <Faqs />
            <Footer />
            <Whatsapp />
        </>
    )
}

export default about
