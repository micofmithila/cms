export const metadata = {
  title: 'Terms of Use | MIC of Mithila',
  description: 'Read the terms of use for MIC of Mithila to understand the rules and guidelines for using our platform.',
};

export default function TermsOfUsePage() {
  const lastUpdated = 'March 30, 2026';

  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: [
        {
          text: 'By accessing or using the MIC of Mithila website at micofmithila.in, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our website or services. These terms apply to all visitors, registered participants, and performers.',
        },
      ],
    },
    {
      title: '2. About MIC of Mithila',
      content: [
        {
          text: 'MIC of Mithila is a community-driven open mic platform based in Madhubani, Bihar, India. We organize events that provide a stage for artists, poets, storytellers, singers, comedians, and other performers to showcase their talent. Our platform serves as a bridge between performers and audiences in the Mithila region.',
        },
      ],
    },
    {
      title: '3. Use of the Website',
      content: [
        {
          text: 'You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others. You must not:',
          list: [
            'Use the website for any fraudulent, harmful, or illegal purpose',
            'Submit false or misleading information during registration',
            'Attempt to gain unauthorized access to any part of the website or its systems',
            'Interfere with or disrupt the website\'s functionality or servers',
            'Use automated tools, bots, or scrapers to extract data from the website',
            'Impersonate another person or organization',
          ],
        },
      ],
    },
    {
      title: '4. Event Registration',
      content: [
        {
          text: 'When registering for an event, you agree to provide accurate and complete information. Registrations are subject to availability and approval by the MIC of Mithila team. We reserve the right to:',
          list: [
            'Accept or decline any registration at our discretion',
            'Close registrations at any time without prior notice',
            'Cancel or reschedule events due to unforeseen circumstances',
            'Remove a participant from an event if they violate our community guidelines',
          ],
        },
        {
          text: 'Registering for an event does not guarantee participation. Performers will be notified of their selection status via email or phone.',
        },
      ],
    },
    {
      title: '5. Performer Responsibilities',
      content: [
        {
          text: 'If you register as a performer, you agree to the following:',
          list: [
            'Your performance content must be original or you must have the legal right to perform it',
            'Content must not be offensive, hateful, discriminatory, or violate any applicable laws',
            'You grant MIC of Mithila the right to photograph or record your performance for promotional purposes',
            'You will arrive on time and follow the event guidelines provided by our team',
            'You are responsible for the accuracy of the content you upload during registration',
          ],
        },
      ],
    },
    {
      title: '6. Content and Intellectual Property',
      content: [
        {
          subtitle: 'Your Content',
          text: 'Any content you submit — including performance scripts, audio, video, or images — remains your intellectual property. By submitting content, you grant MIC of Mithila a non-exclusive, royalty-free license to use, display, and share that content for event-related and promotional purposes.',
        },
        {
          subtitle: 'Our Content',
          text: 'All content on this website — including logos, graphics, text, event materials, and photographs — is the property of MIC of Mithila and is protected by applicable intellectual property laws. You may not copy, reproduce, or distribute our content without prior written permission.',
        },
      ],
    },
    {
      title: '7. Photography and Recording at Events',
      content: [
        {
          text: 'By attending or participating in a MIC of Mithila event, you acknowledge and consent that:',
          list: [
            'The event may be photographed, filmed, or recorded by our team',
            'Your image, voice, or performance may appear in event photos or videos',
            'Such content may be shared on our website, social media, and promotional materials',
            'If you do not wish to be photographed or recorded, you must inform our team before the event',
          ],
        },
      ],
    },
    {
      title: '8. Registration Fees',
      content: [
        {
          text: 'Most MIC of Mithila events are free to attend and participate in. In cases where a registration fee applies, it will be clearly mentioned on the event page. All fees are non-refundable unless the event is cancelled by MIC of Mithila.',
        },
      ],
    },
    {
      title: '9. Community Guidelines',
      content: [
        {
          text: 'MIC of Mithila is a safe and inclusive space for all. All participants — performers and audience alike — are expected to:',
          list: [
            'Treat fellow participants, organizers, and staff with respect and dignity',
            'Refrain from any form of harassment, bullying, or discrimination',
            'Avoid disruptive behavior during events',
            'Not engage in any activity that creates an unsafe environment',
            'Report any concerns to our team immediately',
          ],
        },
        {
          text: 'Violation of these guidelines may result in removal from the event and a ban from future participation.',
        },
      ],
    },
    {
      title: '10. Disclaimers and Limitation of Liability',
      content: [
        {
          text: 'MIC of Mithila provides this website and its services on an "as is" basis. We do not guarantee uninterrupted or error-free access to the website. To the fullest extent permitted by law, MIC of Mithila shall not be liable for:',
          list: [
            'Any loss or damage arising from your use of the website',
            'Inaccuracies or errors in event information',
            'Technical issues, downtime, or data loss',
            'Any harm resulting from attending or participating in our events',
          ],
        },
      ],
    },
    {
      title: '11. Third-Party Links',
      content: [
        {
          text: 'Our website may contain links to third-party platforms such as Instagram, YouTube, or payment gateways. These links are provided for convenience only. MIC of Mithila is not responsible for the content, privacy practices, or terms of any third-party website.',
        },
      ],
    },
    {
      title: '12. Modifications to These Terms',
      content: [
        {
          text: 'We reserve the right to update or modify these Terms of Use at any time. Changes will be posted on this page with a revised "Last Updated" date. Continued use of the website after changes are posted constitutes your acceptance of the updated terms.',
        },
      ],
    },
    {
      title: '13. Governing Law',
      content: [
        {
          text: 'These Terms of Use are governed by and construed in accordance with the laws of India. Any disputes arising from your use of this website or participation in our events shall be subject to the jurisdiction of the courts in Bihar, India.',
        },
      ],
    },
    {
      title: '14. Contact Us',
      content: [
        {
          text: 'If you have any questions or concerns about these Terms of Use, please reach out to us:',
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
            Terms of Use
          </h1>
          <p className="text-gray-300 text-sm max-w-xl mx-auto">
            Please read these terms carefully before using the MIC of Mithila
            website or registering for any of our events.
          </p>
          <p className="text-blue-300 text-xs mt-4 font-medium">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">

        {/* Intro box */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-sm text-amber-800 leading-relaxed">
            These Terms of Use govern your access to and use of the MIC of Mithila
            website and services. By using our platform, registering for events, or
            submitting any content, you agree to these terms in full.
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
          <p className="text-sm font-semibold mb-1">Thank You for Being Part of MIC of Mithila</p>
          <p className="text-xs text-blue-100 leading-relaxed max-w-md mx-auto">
            We built this platform to celebrate art, culture, and expression in Mithila.
            By following these terms, you help us keep this space safe, respectful, and inspiring for everyone.
          </p>
        </div>

      </div>
    </div>
  );
}