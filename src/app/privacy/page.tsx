import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - LATAM Buildathon",
  description: "Privacy policy for the LATAM Buildathon",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold text-foreground">
          Privacy Policy
        </h1>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-sm text-black/60 dark:text-white/60">
            Last updated: December 17, 2025
          </p>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-foreground">1. Introduction</h2>
            <p className="mt-4 text-black/80 dark:text-white/80">
              This Privacy Policy describes how the LATAM Buildathon (the "Event") collects, uses, and protects your personal information. We are committed to protecting your privacy and handling your data in an open and transparent manner.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-foreground">2. Information We Collect</h2>
            <p className="mt-4 text-black/80 dark:text-white/80">
              We collect the following types of information:
            </p>

            <h3 className="mt-6 text-xl font-semibold text-foreground">2.1 Registration Information</h3>
            <ul className="mt-2 list-disc pl-6 text-black/80 dark:text-white/80">
              <li>Team name</li>
              <li>Team member names</li>
              <li>Email addresses</li>
              <li>GitHub usernames (optional)</li>
              <li>Country of residence</li>
              <li>EVM wallet address</li>
            </ul>

            <h3 className="mt-6 text-xl font-semibold text-foreground">2.2 Project Submission Information</h3>
            <ul className="mt-2 list-disc pl-6 text-black/80 dark:text-white/80">
              <li>Karma Gap project links</li>
              <li>Project descriptions and metadata</li>
              <li>Submission timestamps</li>
            </ul>

            <h3 className="mt-6 text-xl font-semibold text-foreground">2.3 Technical Information</h3>
            <ul className="mt-2 list-disc pl-6 text-black/80 dark:text-white/80">
              <li>IP addresses</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Usage data and analytics</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-foreground">3. How We Use Your Information</h2>
            <p className="mt-4 text-black/80 dark:text-white/80">
              We use your information for the following purposes:
            </p>
            <ul className="mt-2 list-disc pl-6 text-black/80 dark:text-white/80">
              <li>To process and manage your Event registration</li>
              <li>To communicate with you about the Event</li>
              <li>To distribute deployment funds to registered teams</li>
              <li>To track and manage project submissions</li>
              <li>To ensure compliance with Event rules and terms</li>
              <li>To improve the Event experience and platform</li>
              <li>To prevent fraud and ensure security</li>
              <li>To fulfill legal obligations</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-foreground">4. Legal Basis for Processing</h2>
            <p className="mt-4 text-black/80 dark:text-white/80">
              We process your personal information based on:
            </p>
            <ul className="mt-2 list-disc pl-6 text-black/80 dark:text-white/80">
              <li><strong>Consent:</strong> You have given explicit consent for registration and participation</li>
              <li><strong>Contract:</strong> Processing is necessary to fulfill our agreement with you</li>
              <li><strong>Legitimate interests:</strong> For Event administration, security, and improvement</li>
              <li><strong>Legal obligations:</strong> To comply with applicable laws and regulations</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-foreground">5. Information Sharing and Disclosure</h2>
            <p className="mt-4 text-black/80 dark:text-white/80">
              We may share your information with:
            </p>
            <ul className="mt-2 list-disc pl-6 text-black/80 dark:text-white/80">
              <li><strong>Event organizers and partners:</strong> To administer and promote the Event</li>
              <li><strong>Service providers:</strong> Third-party services that help us operate the platform (e.g., hosting, analytics)</li>
              <li><strong>Public display:</strong> Team names and project information may be publicly displayed on the Event website and promotional materials</li>
              <li><strong>Legal requirements:</strong> When required by law or to protect our rights</li>
            </ul>
            <p className="mt-4 text-black/80 dark:text-white/80">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-foreground">6. Data Security</h2>
            <p className="mt-4 text-black/80 dark:text-white/80">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="mt-2 list-disc pl-6 text-black/80 dark:text-white/80">
              <li>Encryption of data in transit and at rest</li>
              <li>Secure database storage</li>
              <li>Access controls and authentication</li>
              <li>Regular security assessments</li>
            </ul>
            <p className="mt-4 text-black/80 dark:text-white/80">
              However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-foreground">7. Data Retention</h2>
            <p className="mt-4 text-black/80 dark:text-white/80">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. After the Event concludes, we may retain certain information for:
            </p>
            <ul className="mt-2 list-disc pl-6 text-black/80 dark:text-white/80">
              <li>Record-keeping and compliance purposes</li>
              <li>Historical and archival purposes related to the Event</li>
              <li>Future Event communications (with your consent)</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-foreground">8. Your Rights</h2>
            <p className="mt-4 text-black/80 dark:text-white/80">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul className="mt-2 list-disc pl-6 text-black/80 dark:text-white/80">
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your information (subject to legal requirements)</li>
              <li><strong>Objection:</strong> Object to certain processing of your information</li>
              <li><strong>Portability:</strong> Request transfer of your information to another service</li>
              <li><strong>Withdraw consent:</strong> Withdraw your consent at any time (may affect participation)</li>
            </ul>
            <p className="mt-4 text-black/80 dark:text-white/80">
              To exercise these rights, please contact us through the official Event communication channels.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-foreground">9. Cookies and Tracking Technologies</h2>
            <p className="mt-4 text-black/80 dark:text-white/80">
              We use cookies and similar tracking technologies to:
            </p>
            <ul className="mt-2 list-disc pl-6 text-black/80 dark:text-white/80">
              <li>Maintain your session and authentication state</li>
              <li>Remember your preferences</li>
              <li>Analyze usage patterns and improve the platform</li>
              <li>Ensure security and prevent fraud</li>
            </ul>
            <p className="mt-4 text-black/80 dark:text-white/80">
              You can control cookies through your browser settings, but disabling certain cookies may affect platform functionality.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-foreground">10. International Data Transfers</h2>
            <p className="mt-4 text-black/80 dark:text-white/80">
              Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-foreground">11. Children's Privacy</h2>
            <p className="mt-4 text-black/80 dark:text-white/80">
              The Event is not directed to individuals under the age of 18 without parental consent. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child without proper consent, we will take steps to delete that information.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-foreground">12. Changes to This Privacy Policy</h2>
            <p className="mt-4 text-black/80 dark:text-white/80">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. Your continued participation in the Event after such changes constitutes acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-foreground">13. Third-Party Links</h2>
            <p className="mt-4 text-black/80 dark:text-white/80">
              The Event website may contain links to third-party websites or services (such as Karma Gap, GitHub, etc.). We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any personal information.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-foreground">14. Contact Us</h2>
            <p className="mt-4 text-black/80 dark:text-white/80">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us through the official Event communication channels.
            </p>
          </section>
        </div>

        <div className="mt-12">
          <a
            href="/"
            className="text-sm text-black/70 transition-colors hover:text-foreground hover:underline dark:text-white/70"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
