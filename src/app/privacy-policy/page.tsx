import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function PrivacyPolicy() {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 pt-32">
                <div className="max-w-4xl mx-auto px-6 sm:px-8">
                    <div className="bg-white rounded-2xl shadow-xl border border-purple-100 p-8 md:p-12">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-primary)] text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-4">
                                Privacy Policy
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Your privacy is important to us. This policy explains how we collect, use, and protect your information.
                            </p>
                            <p className="text-sm text-gray-500 mt-4">
                                Last updated: June 13, 2025
                            </p>
                        </div>

                        <div className="space-y-8 text-gray-700 leading-relaxed">
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-primary)]">
                                    Information We Collect
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Personal Information</h3>
                                        <p>When you create an account or use our ticket booking service, we collect:</p>
                                        <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                                            <li>Full name and nickname</li>
                                            <li>Email address</li>
                                            <li>Phone number</li>
                                            <li>Password (encrypted)</li>
                                            <li>Payment information (processed securely through PayPal)</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Usage Information</h3>
                                        <p>We automatically collect information about how you use our service:</p>
                                        <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                                            <li>IP address and location data</li>
                                            <li>Browser type and version</li>
                                            <li>Pages visited and time spent</li>
                                            <li>Device information</li>
                                            <li>Ticket purchase history and preferences</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-primary)]">
                                    How We Use Your Information
                                </h2>
                                <div className="space-y-4">
                                    <p>We use your information to:</p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li><strong>Provide ticket services:</strong> Process your ticket purchases and manage your Tomorrowland account</li>
                                        <li><strong>Send notifications:</strong> Email and WhatsApp notifications about ticket availability and purchase links</li>
                                        <li><strong>Account management:</strong> Create and maintain your user account and preferences</li>
                                        <li><strong>Customer support:</strong> Respond to your inquiries and provide assistance</li>
                                        <li><strong>Service improvement:</strong> Analyze usage patterns to enhance our platform</li>
                                        <li><strong>Security:</strong> Protect against fraud and unauthorized access</li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-primary)]">
                                    Information Sharing
                                </h2>
                                <div className="space-y-4">
                                    <p>We do not sell or rent your personal information. We may share your information only in these circumstances:</p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li><strong>With Tomorrowland:</strong> Necessary information to complete ticket purchases and transfers</li>
                                        <li><strong>Payment processors:</strong> PayPal and other secure payment partners for transaction processing</li>
                                        <li><strong>Service providers:</strong> Trusted third parties who assist in operating our platform</li>
                                        <li><strong>Legal requirements:</strong> When required by law or to protect our rights and safety</li>
                                        <li><strong>With your consent:</strong> Any other sharing will require your explicit permission</li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-primary)]">
                                    Data Security
                                </h2>
                                <div className="space-y-4">
                                    <p>We implement industry-standard security measures to protect your information:</p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>SSL encryption for all data transmission</li>
                                        <li>Secure password hashing and storage</li>
                                        <li>Regular security audits and updates</li>
                                        <li>Limited access to personal information</li>
                                        <li>Secure servers and backup systems</li>
                                    </ul>
                                    <p className="mt-4">
                                        While we strive to protect your information, no method of transmission over the internet is 100% secure. 
                                        We cannot guarantee absolute security but will notify you of any significant security breaches.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-primary)]">
                                    Your Rights
                                </h2>
                                <div className="space-y-4">
                                    <p>You have the following rights regarding your personal information:</p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                                        <li><strong>Correction:</strong> Update or correct inaccurate personal information</li>
                                        <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                                        <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format</li>
                                        <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
                                    </ul>
                                    <p className="mt-4">
                                        To exercise these rights, please contact us at{" "}
                                        <a href="mailto:privacy@gettomorrowlandtickets.com" className="text-purple-600 hover:text-purple-800 font-medium">
                                            privacy@gettomorrowlandtickets.com
                                        </a>
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-primary)]">
                                    Cookies and Tracking
                                </h2>
                                <div className="space-y-4">
                                    <p>We use cookies and similar technologies to:</p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Remember your login preferences</li>
                                        <li>Analyze website traffic and usage patterns</li>
                                        <li>Provide personalized content and recommendations</li>
                                        <li>Ensure security and prevent fraud</li>
                                    </ul>
                                    <p className="mt-4">
                                        You can control cookie settings through your browser preferences. Disabling cookies may affect some functionality of our service.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-primary)]">
                                    Contact Information
                                </h2>
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <p className="mb-4">
                                        If you have any questions about this Privacy Policy or our data practices, please contact us:
                                    </p>
                                    <div className="space-y-2">
                                        <p><strong>Email:</strong> privacy@gettomorrowlandtickets.com</p>
                                        <p><strong>General Inquiries:</strong> gettomorrowlandtickets@gettomorrowlandtickets.com</p>
                                        <p><strong>Website:</strong> www.gettomorrowlandtickets.com</p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-primary)]">
                                    Changes to This Policy
                                </h2>
                                <p>
                                    We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. 
                                    We will notify you of any significant changes by email or through our website. Your continued use of our service 
                                    after such modifications constitutes your acceptance of the updated policy.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
