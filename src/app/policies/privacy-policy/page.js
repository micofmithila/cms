export const metadata = {
    title: 'Privacy Policy | MIC of Mithila',
    description: 'Read the privacy policy of MIC of Mithila to understand how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {

    const lastUpdated = 'March 30, 2026';

    const sections = [
        {
            title: '1. Information We Collect',
            content: [
                {
                    subtitle: 'Event Registration Data',
                    text: 'When you register for an event as a performer or audience member, we collect your full name, email address, phone number, age, residential address, social media links, and any content you upload (such as scripts, audio, or video files).',
                },
                {
                    subtitle: 'Contact Form Data',
                    text: 'When you reach out to us via our contact form, we collect your name, phone number or email address, subject, and message content.',
                },
                {
                    subtitle: 'Automatically Collected Data',
                    text: 'We may collect basic technical information such as your browser type and device when you visit our website. We do not use cookies for tracking or advertising purposes.',
                },
            ],
        },
        {
            title: '2. How We Use Your Information',
            content: [
                {
                    text: 'We use the information we collect for the following purposes:',
                    list: [
                        'To process and confirm your event registrations',
                        'To communicate with you regarding your registration status, event updates, and confirmations',
                        'To review performer submissions and select participants',
                        'To respond to your queries submitted through the contact form',
                        'To manage and improve our events and platform',
                    ],
                },
            ],
        },
        {
            title: '3. How We Store Your Information',
            content: [
                {
                    text: 'Your data is stored securely in our database hosted on MongoDB Atlas. Uploaded content files are stored on Cloudinary, a secure cloud media platform. We take reasonable technical measures to protect your information from unauthorized access, loss, or misuse.',
                },
            ],
        },
        {
            title: '4. Sharing of Information',
            content: [
                {
                    text: 'We do not sell, trade, or share your personal information with any third parties for commercial purposes. Your data may only be accessed by:',
                    list: [
                        'The MIC of Mithila core team members for event management purposes',
                        'Trusted service providers (such as MongoDB Atlas and Cloudinary) solely for storing and processing your data on our behalf',
                    ],
                },
                {
                    text: 'We will never share your information with advertisers or unrelated third parties.',
                },
            ],
        },
        {
            title: '5. Performer Content',
            content: [
                {
                    text: 'If you register as a performer and upload content (scripts, audio, video, or other files), this content is used solely for the purpose of reviewing your performance submission. It will not be published publicly without your explicit consent.',
                },
            ],
        },
        {
            title: '6. Data Retention',
            content: [
                {
                    text: 'We retain your registration and contact data for as long as necessary to manage our events and communicate with participants. If you wish to have your data deleted, you may contact us at any time and we will process your request promptly.',
                },
            ],
        },
        {
            title: '7. Your Rights',
            content: [
                {
                    text: 'You have the right to:',
                    list: [
                        'Request access to the personal data we hold about you',
                        'Request correction of any inaccurate information',
                        'Request deletion of your personal data',
                        'Withdraw your consent at any time for future communications',
                    ],
                },
                {
                    text: 'To exercise any of these rights, please contact us using the details provided below.',
                },
            ],
        },
        {
            title: '8. Children\'s Privacy',
            content: [
                {
                    text: 'Our platform is open to participants of all ages, including minors. However, we encourage participants under the age of 18 to seek parental or guardian consent before registering or submitting any personal information through our website.',
                },
            ],
        },
        {
            title: '9. Third-Party Links',
            content: [
                {
                    text: 'Our website may contain links to third-party platforms such as Instagram, YouTube, and other social media. We are not responsible for the privacy practices of these external platforms. We encourage you to review their respective privacy policies.',
                },
            ],
        },
        {
            title: '10. Changes to This Policy',
            content: [
                {
                    text: 'We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. Any updates will be posted on this page with a revised "Last Updated" date. We encourage you to review this page periodically.',
                },
            ],
        },
        {
            title: '11. Contact Us',
            content: [
                {
                    text: 'If you have any questions, concerns, or requests regarding this Privacy Policy or the data we hold about you, please reach out to us:',
                    list: [
                        'Email: micofmithila@gmail.com',
                        'Website: micofmithila.in/contact',
                        'Instagram: @micofmithila',
                    ],
                },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

            {/* Header */}
            <div className="relative bg-gray-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 to-purple-900/70" />
                <div className="relative z-10 max-w-4xl mx-auto px-6 py-14 sm:py-20 text-center">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
                        Privacy Policy
                    </h1>
                    <p className="text-gray-300 text-sm max-w-xl mx-auto">
                        MIC of Mithila is committed to protecting your privacy.
                        This policy explains how we collect, use, and safeguard your information.
                    </p>
                    <p className="text-blue-300 text-xs mt-4 font-medium">
                        Last Updated: {lastUpdated}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">

                {/* Intro box */}
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                    <p className="text-sm text-blue-800 leading-relaxed">
                        This Privacy Policy applies to all information collected through the MIC of Mithila
                        website at <span className="font-semibold">micofmithila.in</span>, including event
                        registrations, contact form submissions, and general use of the platform. By using
                        our website, you agree to the terms described in this policy.
                    </p>
                </div>

                {/* Sections */}
                {sections.map((section, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                        <h2 className="text-lg font-bold text-gray-800">{section.title}</h2>

                        {section.content.map((block, j) => (
                            <div key={j} className="space-y-2">
                                {block.subtitle && (
                                    <p className="text-sm font-semibold text-purple-700">{block.subtitle}</p>
                                )}
                                {block.text && (
                                    <p className="text-sm text-gray-600 leading-relaxed">{block.text}</p>
                                )}
                                {block.list && (
                                    <ul className="space-y-1.5 mt-1">
                                        {block.list.map((item, k) => (
                                            <li key={k} className="flex items-start gap-2.5 text-sm text-gray-600">
                                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0 mt-2" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                ))}

                {/* Footer note */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-center text-white">
                    <p className="text-sm font-semibold mb-1">Your Trust Matters to Us</p>
                    <p className="text-xs text-blue-100 leading-relaxed max-w-md mx-auto">
                        MIC of Mithila is a community-driven platform built on trust and transparency.
                        We handle your data with care and will always prioritize your privacy.
                    </p>
                </div>

            </div>
        </div>
    );
}