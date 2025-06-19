import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function DataProtection() {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 pt-32">
                <div className="max-w-4xl mx-auto px-6 sm:px-8">
                    <div className="bg-white rounded-2xl shadow-xl border border-purple-100 p-8 md:p-12">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-primary)] text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-4">
                                Data Protection
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Learn how we protect your personal data and maintain the highest security standards.
                            </p>
                            <p className="text-sm text-gray-500 mt-4">
                                Last updated: June 13, 2025
                            </p>
                        </div>

                        <div className="space-y-8 text-gray-700 leading-relaxed">
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-primary)]">
                                    Our Commitment to Data Protection
                                </h2>
                                <div className="space-y-4">
                                    <p>
                                        At Get Tomorrowland Tickets, we take data protection seriously. We implement comprehensive 
                                        security measures and follow industry best practices to ensure your personal information 
                                        is safe, secure, and handled responsibly.
                                    </p>
                                    <p>
                                        This page outlines our specific data protection measures, security protocols, and your 
                                        rights regarding the protection of your personal data.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-primary)]">
                                    Data Security Measures
                                </h2>
                                <div className="space-y-6">
                                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                                        <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            Encryption & Secure Transmission
                                        </h3>
                                        <ul className="space-y-2 text-green-700">
                                            <li>• SSL/TLS encryption for all data transmission</li>
                                            <li>• 256-bit AES encryption for data storage</li>
                                            <li>• Encrypted database connections</li>
                                            <li>• Secure API endpoints with authentication</li>
                                            <li>• HTTPS enforcement across all pages</li>
                                        </ul>
                                    </div>

                                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                                        <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                                            </svg>
                                            Access Control & Authentication
                                        </h3>
                                        <ul className="space-y-2 text-blue-700">
                                            <li>• Multi-factor authentication for admin access</li>
                                            <li>• Role-based access control systems</li>
                                            <li>• Regular access review and audit</li>
                                            <li>• Secure password policies</li>
                                            <li>• Automated session timeout</li>
                                        </ul>
                                    </div>

                                    <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                                        <h3 className="text-lg font-semibold text-purple-800 mb-3 flex items-center">
                                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1V8z" clipRule="evenodd" />
                                            </svg>
                                            Infrastructure Security
                                        </h3>
                                        <ul className="space-y-2 text-purple-700">
                                            <li>• Secure cloud hosting with tier-1 providers</li>
                                            <li>• Regular security patches and updates</li>
                                            <li>• Network firewalls and intrusion detection</li>
                                            <li>• Automated backup systems</li>
                                            <li>• Disaster recovery protocols</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-primary)]">
                                    Data Processing Principles
                                </h2>
                                <div className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="bg-gray-50 p-6 rounded-lg">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Data Minimization</h3>
                                            <p className="text-gray-600">
                                                We collect only the personal data that is necessary for providing our ticket booking service. 
                                                No excessive or irrelevant information is requested or stored.
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 p-6 rounded-lg">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Purpose Limitation</h3>
                                            <p className="text-gray-600">
                                                Your data is used exclusively for the purposes stated in our Privacy Policy. 
                                                We do not use your information for unrelated marketing or commercial activities.
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 p-6 rounded-lg">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Storage Limitation</h3>
                                            <p className="text-gray-600">
                                                We retain your personal data only as long as necessary to fulfill our service obligations 
                                                and comply with legal requirements.
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 p-6 rounded-lg">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Accuracy</h3>
                                            <p className="text-gray-600">
                                                We maintain accurate and up-to-date records. You can update your information 
                                                at any time through your account settings.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-primary)]">
                                    Data Protection by Design
                                </h2>
                                <div className="space-y-4">
                                    <p>
                                        We implement data protection principles from the earliest stages of system design:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li><strong>Privacy by Default:</strong> The most privacy-friendly settings are applied automatically</li>
                                        <li><strong>Built-in Protections:</strong> Security measures are integrated into our system architecture</li>
                                        <li><strong>Minimal Data Collection:</strong> Our forms and systems request only essential information</li>
                                        <li><strong>User Control:</strong> You have granular control over your data and privacy settings</li>
                                        <li><strong>Transparent Processing:</strong> Clear information about data use is provided at all times</li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-primary)]">
                                    Third-Party Data Sharing
                                </h2>
                                <div className="space-y-4">
                                    <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                                        <h3 className="text-lg font-semibold text-yellow-800 mb-3">Limited and Secure Sharing</h3>
                                        <p className="text-yellow-700 mb-3">
                                            We share your data only when absolutely necessary and with strict security requirements:
                                        </p>
                                        <ul className="space-y-2 text-yellow-700">
                                            <li>• <strong>Tomorrowland:</strong> Minimal information required for ticket purchases</li>
                                            <li>• <strong>PayPal:</strong> Secure payment processing with industry-leading encryption</li>
                                            <li>• <strong>Email/SMS Services:</strong> Delivery of purchase links and notifications</li>
                                            <li>• <strong>All partners:</strong> Must meet our strict data protection standards</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-primary)]">
                                    Your Data Protection Rights
                                </h2>
                                <div className="space-y-4">
                                    <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
                                        <h3 className="text-lg font-semibold text-indigo-800 mb-4">Exercise Your Rights</h3>
                                        <div className="grid md:grid-cols-2 gap-4 text-indigo-700">
                                            <div>
                                                <h4 className="font-semibold mb-2">🔍 Right to Access</h4>
                                                <p className="text-sm">Request a copy of all personal data we hold about you</p>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-2">✏️ Right to Rectification</h4>
                                                <p className="text-sm">Correct any inaccurate or incomplete personal data</p>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-2">🗑️ Right to Erasure</h4>
                                                <p className="text-sm">Request deletion of your personal data</p>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-2">⏸️ Right to Restrict</h4>
                                                <p className="text-sm">Limit how we process your personal data</p>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-2">📤 Right to Portability</h4>
                                                <p className="text-sm">Receive your data in a machine-readable format</p>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-2">❌ Right to Object</h4>
                                                <p className="text-sm">Object to processing based on legitimate interests</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-primary)]">
                                    Data Breach Response
                                </h2>
                                <div className="space-y-4">
                                    <p>
                                        In the unlikely event of a data breach, we have comprehensive response procedures:
                                    </p>
                                    <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                                        <h3 className="text-lg font-semibold text-red-800 mb-3">Our Response Protocol</h3>
                                        <ul className="space-y-2 text-red-700">
                                            <li>• Immediate containment and assessment of the breach</li>
                                            <li>• Notification to relevant authorities within 72 hours</li>
                                            <li>• Direct notification to affected users without undue delay</li>
                                            <li>• Clear communication about the nature and extent of the breach</li>
                                            <li>• Remedial actions taken and recommendations for users</li>
                                            <li>• Investigation and measures to prevent future incidents</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-primary)]">
                                    Regular Security Audits
                                </h2>
                                <div className="space-y-4">
                                    <p>
                                        We conduct regular security assessments to ensure our data protection measures remain effective:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Quarterly security audits by independent third parties</li>
                                        <li>Regular penetration testing of our systems</li>
                                        <li>Continuous monitoring for security vulnerabilities</li>
                                        <li>Staff training on data protection best practices</li>
                                        <li>Annual review and update of security policies</li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-primary)]">
                                    Contact Our Data Protection Team
                                </h2>
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <p className="mb-4">
                                        For any data protection concerns, questions, or to exercise your rights, contact our dedicated team:
                                    </p>
                                    <div className="space-y-2">
                                        <p><strong>Data Protection Officer:</strong> dpo@gettomorrowlandtickets.com</p>
                                        <p><strong>Security Team:</strong> security@gettomorrowlandtickets.com</p>
                                        <p><strong>General Privacy:</strong> privacy@gettomorrowlandtickets.com</p>
                                        <p><strong>Response Time:</strong> We respond to all data protection inquiries within 48 hours</p>
                                    </div>
                                    <div className="mt-4 p-4 bg-blue-100 rounded border border-blue-300">
                                        <p className="text-blue-800 text-sm">
                                            <strong>Emergency Security Contact:</strong> For urgent security matters, 
                                            email emergency@gettomorrowlandtickets.com for immediate response.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <div className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Our Data Protection Promise</h3>
                                    <p className="text-gray-700">
                                        We are committed to maintaining the highest standards of data protection and security. 
                                        Your trust is essential to our service, and we work continuously to earn and maintain it.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
