import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | GrowWithMaya",
  description: "The terms and conditions governing your use of the GrowWithMaya website and services.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight mb-8">Terms & Conditions</h1>
      <div className="prose-custom text-muted-foreground">
        <p><strong>Last updated:</strong> {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>

        <h2>1. Agreement to Terms</h2>
        <p>By accessing or using GrowWithMaya, you agree to be bound by these Terms & Conditions. If you disagree with any part of the terms, you may not access the website.</p>

        <h2>2. Intellectual Property</h2>
        <p>All content on this website, including text, graphics, logos, images, and software, is the property of GrowWithMaya and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.</p>

        <h2>3. User Conduct</h2>
        <p>You agree to use our website only for lawful purposes. You must not:</p>
        <ul>
          <li>Use the website in any way that violates applicable laws</li>
          <li>Attempt to gain unauthorized access to any part of the website</li>
          <li>Interfere with the proper working of the website</li>
          <li>Transmit any harmful code or malware</li>
        </ul>

        <h2>4. Disclaimer</h2>
        <p>The information on this website is provided for general informational purposes only. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information.</p>

        <h2>5. Limitation of Liability</h2>
        <p>In no event shall GrowWithMaya, its owners, or contributors be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the website.</p>

        <h2>6. Third-Party Links</h2>
        <p>Our website may contain links to third-party websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites.</p>

        <h2>7. Changes to Terms</h2>
        <p>We reserve the right to modify these terms at any time. We will notify users of any changes by updating the "Last updated" date on this page.</p>

        <h2>8. Governing Law</h2>
        <p>These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which GrowWithMaya operates, without regard to its conflict of law provisions.</p>

        <h2>9. Contact Information</h2>
        <p>If you have any questions about these Terms & Conditions, please contact us through our contact page.</p>
      </div>
    </div>
  );
}
