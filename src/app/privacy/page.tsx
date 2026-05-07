import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | GrowWithMaya",
  description: "How we collect, use, and protect your personal information at GrowWithMaya.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight mb-8">Privacy Policy</h1>
      <div className="prose-custom text-muted-foreground">
        <p><strong>Last updated:</strong> {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>

        <h2>1. Introduction</h2>
        <p>Welcome to GrowWithMaya. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website.</p>

        <h2>2. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul>
          <li><strong>Personal Information:</strong> Name, email address, and other details you provide when subscribing to our newsletter or contacting us.</li>
          <li><strong>Usage Data:</strong> Information about how you use our website, including pages visited, time spent, and device information.</li>
          <li><strong>Cookies:</strong> We use cookies to enhance your browsing experience and analyze website traffic.</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Provide and maintain our website</li>
          <li>Send newsletters and updates (only if you subscribe)</li>
          <li>Respond to your inquiries</li>
          <li>Analyze website usage to improve our content</li>
          <li>Prevent fraud and ensure security</li>
        </ul>

        <h2>4. Data Sharing</h2>
        <p>We do not sell your personal information. We may share data with:</p>
        <ul>
          <li>Service providers who help us operate our website</li>
          <li>Analytics providers (such as Google Analytics) to understand website usage</li>
          <li>Legal authorities if required by law</li>
        </ul>

        <h2>5. Advertising & Cookies (Google AdSense)</h2>
        <p>This website uses Google AdSense, a web advertising service provided by Google LLC. Google AdSense uses cookies, including the DoubleClick cookie, to serve ads based on your prior visits to this website and other websites on the internet. You may opt out of personalized advertising by visiting Google's Ads Settings at <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="underline">https://www.google.com/settings/ads</a>. For more information about how Google uses data from sites that use their services, visit <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="underline">https://policies.google.com/technologies/partner-sites</a>. This website also uses Google Analytics to analyze website traffic. Google Analytics uses cookies to collect information about how visitors use this site.</p>

        <h2>6. Your Rights</h2>
        <p>Depending on your location, you may have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Request correction or deletion of your data</li>
          <li>Opt out of marketing communications</li>
          <li>Request a copy of your data</li>
        </ul>

        <h2>7. Data Security</h2>
        <p>We implement reasonable security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>

        <h2>8. Changes to This Policy</h2>
        <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>

        <h2>9. Contact Us</h2>
        <p>If you have any questions about this privacy policy, please contact us through our contact page.</p>
      </div>
    </div>
  );
}
