import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions - LATAM Buildathon",
  description: "Terms and conditions for the LATAM Buildathon registration and participation",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold text-foreground">
          Terms & Conditions
        </h1>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-sm text-black/60 dark:text-white/60">
            Last updated: December 17, 2025
          </p>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p className="mt-4 text-black/80 dark:text-white/80">
              By registering for and participating in the LATAM Buildathon (the "Event"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not register for or participate in the Event.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-foreground">2. Eligibility</h2>
            <p className="mt-4 text-black/80 dark:text-white/80">
              The Event is open to individuals and teams who:
            </p>
            <ul className="mt-2 list-disc pl-6 text-black/80 dark:text-white/80">
              <li>Are at least 18 years of age or have parental/guardian consent</li>
              <li>Have the legal capacity to enter into binding agreements</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-foreground">3. Registration</h2>
            <p className="mt-4 text-black/80 dark:text-white/80">
              Participants must provide accurate and complete information during registration. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-foreground">4. Team Participation</h2>
            <p className="mt-4 text-black/80 dark:text-white/80">
              Teams must:
            </p>
            <ul className="mt-2 list-disc pl-6 text-black/80 dark:text-white/80">
              <li>Register all team members with valid email addresses</li>
              <li>Designate one wallet address for receiving deployment funds</li>
              <li>Ensure all team members agree to these Terms and Conditions</li>
              <li>Not use the same email address across multiple teams</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-foreground">5. Project Submissions</h2>
            <p className="mt-4 text-black/80 dark:text-white/80">
              All submissions must:
            </p>
            <ul className="mt-2 list-disc pl-6 text-black/80 dark:text-white/80">
              <li>Be original work created by the team members</li>
              <li>Not infringe on any third-party intellectual property rights</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Be submitted within the designated submission period</li>
              <li>Include a valid Karma Gap link for project tracking</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-foreground">6. Deployment Funds</h2>
            <p className="mt-4 text-black/80 dark:text-white/80">
              Registered teams may receive 3 CELO tokens for deployment purposes. These funds are provided as-is for legitimate deployment and testing activities related to the buildathon project. Misuse of these funds may result in disqualification.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-foreground">7. Intellectual Property</h2>
            <p className="mt-4 text-black/80 dark:text-white/80">
              Participants retain all intellectual property rights to their submissions. By submitting a project, you grant the Event organizers a non-exclusive, worldwide, royalty-free license to use, reproduce, and display your submission for promotional purposes related to the Event.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-foreground">8. Code of Conduct</h2>
            <p className="mt-4 text-black/80 dark:text-white/80">
              All participants must:
            </p>
            <ul className="mt-2 list-disc pl-6 text-black/80 dark:text-white/80">
              <li>Treat all participants, organizers, and sponsors with respect</li>
              <li>Not engage in harassment, discrimination, or abusive behavior</li>
              <li>Not attempt to cheat, manipulate, or gain unfair advantages</li>
              <li>Follow all Event rules and guidelines</li>
            </ul>
            <p className="mt-4 text-black/80 dark:text-white/80">
              Violation of the code of conduct may result in immediate disqualification and removal from the Event.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-foreground">9. Privacy and Data Protection</h2>
            <p className="mt-4 text-black/80 dark:text-white/80">
              Your personal information will be collected, stored, and processed in accordance with our Privacy Policy. By registering for the Event, you consent to the collection and use of your information as described in the Privacy Policy.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-foreground">10. Disclaimer of Warranties</h2>
            <p className="mt-4 text-black/80 dark:text-white/80">
              The Event is provided "as is" without warranties of any kind, either express or implied. The organizers do not guarantee the availability, accuracy, or reliability of the Event platform or any services provided.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-foreground">11. Limitation of Liability</h2>
            <p className="mt-4 text-black/80 dark:text-white/80">
              To the maximum extent permitted by law, the Event organizers, sponsors, and partners shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your participation in the Event or use of any Event-related services.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-foreground">12. Modifications</h2>
            <p className="mt-4 text-black/80 dark:text-white/80">
              The organizers reserve the right to modify these Terms and Conditions at any time. Changes will be effective upon posting to the Event website. Continued participation in the Event after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-foreground">13. Termination</h2>
            <p className="mt-4 text-black/80 dark:text-white/80">
              The organizers reserve the right to disqualify or remove any participant who violates these Terms and Conditions or engages in conduct that is detrimental to the Event or other participants.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-foreground">14. Governing Law</h2>
            <p className="mt-4 text-black/80 dark:text-white/80">
              These Terms and Conditions shall be governed by and construed in accordance with applicable international laws, without regard to conflict of law principles.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-foreground">15. Contact Information</h2>
            <p className="mt-4 text-black/80 dark:text-white/80">
              If you have any questions about these Terms and Conditions, please contact the Event organizers through the official Event communication channels.
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
