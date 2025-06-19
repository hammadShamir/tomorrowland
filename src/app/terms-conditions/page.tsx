import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function TermsConditions() {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 pt-32">
                <div className="max-w-4xl mx-auto px-6 sm:px-8">
                    <div className="bg-white rounded-2xl shadow-xl border border-purple-100 p-8 md:p-12">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-primary)] text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-4">
                                Terms & Conditions
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Please read these terms carefully before using our ticket booking service.
                            </p>
                            <p className="text-sm text-gray-500 mt-4">
                                Last updated: June 13, 2025
                            </p>
                        </div>

                        <div className="space-y-8 text-gray-700 leading-relaxed">
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-primary)]">
                                    1. Service Description
                                </h2>
                                <div className="space-y-4">
                                    <p>
                                        Get Tomorrowland Tickets provides a ticket booking assistance service for Tomorrowland festivals, 
                                        including Tomorrowland Belgium, Tomorrowland Brazil, and Tomorrowland Winter. Our service helps 
                                        users secure purchase links during official ticket sales.
                                    </p>
                                    <p>
                                        <strong>Important:</strong> We are not affiliated with Tomorrowland or its official organizers. 
                                        We provide an independent service to help facilitate ticket purchases through official channels.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-primary)]">
                                    2. How Our Service Works
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 1: Registration</h3>
                                        <p>You provide your personal information (name, email, phone) and select your desired Tomorrowland event.</p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 2: Queue Bypass</h3>
                                        <p>On sale day, we use our technology and pre-registered accounts to bypass the official queue and secure purchase links.</p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 3: Link Delivery</h3>
                                        <p>We send you the purchase link via email and WhatsApp. You have 10 minutes to complete your purchase directly with Tomorrowland.</p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Step 4: Account Transfer</h3>
                                        <p>After purchase, pay our €100 service fee to receive full control of your Tomorrowland account and personalize your tickets.</p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-primary)]">
                                    3. Service Fees and Payments
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Registration</h3>
                                        <p>Initial registration for our service is free. You only pay if we successfully provide you with a purchase link.</p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Ticket Purchase</h3>
                                        <p>You pay Tomorrowland directly for your tickets using the purchase link we provide. This payment is separate from our service fee.</p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Service Fee</h3>
                                        <p>Our €100 service fee is charged only after successful ticket purchase and is required to transfer the Tomorrowland account to your control.</p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Payment Methods</h3>
                                        <p>Service fees are processed securely through PayPal. We do not store your payment information.</p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-primary)]">
                                    4. User Responsibilities
                                </h2>
                                <div className="space-y-4">
                                    <p>By using our service, you agree to:</p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Provide accurate and complete information during registration</li>
                                        <li>Monitor your email and WhatsApp for purchase link notifications</li>
                                        <li>Complete your ticket purchase within the 10-minute window provided</li>
                                        <li>Pay the service fee promptly to receive account access</li>
                                        <li>Comply with all Tomorrowland terms and conditions for ticket holders</li>
                                        <li>Not share or resell purchase links provided to you</li>
                                        <li>Use the service only for personal ticket purchases</li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-primary)]">
                                    5. Service Limitations and Disclaimers
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">No Guarantee</h3>
                                        <p>
                                            While we use advanced technology to improve your chances, we cannot guarantee that tickets will be available 
                                            or that our service will be successful for every user. Ticket availability depends on Tomorrowland&apos;s inventory.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Technical Issues</h3>
                                        <p>
                                            We are not responsible for technical issues on Tomorrowland&apos;s website, internet connectivity problems, 
                                            or other factors beyond our control that may affect ticket purchasing.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Third-Party Services</h3>
                                        <p>
                                            Our service relies on Tomorrowland&apos;s official systems. We are not responsible for changes to their 
                                            policies, technical systems, or sale processes that may affect our service.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-primary)]">
                                    6. Refund Policy
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Service Fee Refunds</h3>
                                        <p>
                                            Our €100 service fee is non-refundable once paid, as it covers the cost of account management 
                                            and transfer services that have already been performed.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Ticket Refunds</h3>
                                        <p>
                                            Ticket refunds are subject to Tomorrowland&apos;s official refund policy. We do not process 
                                            ticket refunds directly, as tickets are purchased from Tomorrowland.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Service Failure</h3>
                                        <p>
                                            If we fail to provide you with a purchase link, no service fee will be charged. 
                                            Registration is free, and you only pay upon successful delivery of our service.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-primary)]">
                                    7. Account Security and Access
                                </h2>
                                <div className="space-y-4">
                                    <p>
                                        Initially, tickets are linked to Tomorrowland accounts under our management for technical reasons. 
                                        After paying the service fee:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>You receive full access credentials to your Tomorrowland account</li>
                                        <li>You can change passwords and personalize account information</li>
                                        <li>You gain complete control over your tickets and account</li>
                                        <li>We permanently transfer ownership and remove our access</li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-primary)]">
                                    8. Privacy and Data Protection
                                </h2>
                                <div className="space-y-4">
                                    <p>
                                        Your privacy is important to us. Please review our Privacy Policy for detailed information 
                                        about how we collect, use, and protect your personal information. By using our service, 
                                        you consent to our data practices as described in the Privacy Policy.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-primary)]">
                                    9. Prohibited Uses
                                </h2>
                                <div className="space-y-4">
                                    <p>You may not use our service to:</p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Resell tickets at inflated prices</li>
                                        <li>Purchase tickets for commercial resale purposes</li>
                                        <li>Share purchase links with unauthorized third parties</li>
                                        <li>Attempt to hack or interfere with our systems</li>
                                        <li>Provide false information during registration</li>
                                        <li>Use our service in violation of applicable laws</li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-primary)]">
                                    10. Limitation of Liability
                                </h2>
                                <div className="space-y-4">
                                    <p>
                                        To the maximum extent permitted by law, Get Tomorrowland Tickets shall not be liable for any 
                                        indirect, incidental, special, or consequential damages arising from your use of our service, 
                                        including but not limited to lost profits, travel expenses, or missed opportunities.
                                    </p>
                                    <p>
                                        Our total liability for any claims related to our service shall not exceed the amount of 
                                        service fees you have paid to us.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-primary)]">
                                    11. Contact Information
                                </h2>
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <p className="mb-4">
                                        If you have questions about these Terms & Conditions, please contact us:
                                    </p>
                                    <div className="space-y-2">
                                        <p><strong>Email:</strong> legal@gettomorrowlandtickets.com</p>
                                        <p><strong>General Support:</strong> gettomorrowlandtickets@gettomorrowlandtickets.com</p>
                                        <p><strong>Website:</strong> www.gettomorrowlandtickets.com</p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-primary)]">
                                    12. Changes to Terms
                                </h2>
                                <p>
                                    We reserve the right to modify these Terms & Conditions at any time. We will notify users of 
                                    significant changes via email or website notification. Your continued use of our service after 
                                    such modifications constitutes your acceptance of the updated terms.
                                </p>
                            </section>

                            <div className="mt-12 p-6 bg-purple-50 rounded-lg border border-purple-200">
                                <p className="text-center text-gray-600">
                                    <strong>By using our service, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
